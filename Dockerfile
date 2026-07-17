# syntax = docker/dockerfile:1
ARG NODE_VERSION=26
ARG RELEASE="unset"

FROM node:${NODE_VERSION}-alpine AS base
ARG RELEASE
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV RELEASE=${RELEASE}
ENV NODE_ENV=production
ENV COREPACK_ENABLE_DOWNLOAD_PROMPT=0

# Activate pnpm via corepack (version pinned by package.json "packageManager").
# Node 26 no longer bundles corepack, so install it before enabling.
RUN npm install -g corepack@latest && corepack enable

FROM base AS development-dependencies-env
COPY . /app
WORKDIR /app
RUN pnpm install --frozen-lockfile

FROM base AS production-dependencies-env
COPY ./package.json ./pnpm-lock.yaml ./.pnpmfile.mjs /app/
WORKDIR /app
RUN pnpm install --prod --frozen-lockfile

FROM base AS build-env
COPY . /app/
COPY --from=development-dependencies-env /app/node_modules /app/node_modules
WORKDIR /app
RUN pnpm run build

FROM base
COPY ./package.json ./pnpm-lock.yaml ./.pnpmfile.mjs /app/
COPY --from=production-dependencies-env /app/node_modules /app/node_modules
COPY --from=build-env /app/build /app/build
WORKDIR /app
CMD ["pnpm", "start"]
