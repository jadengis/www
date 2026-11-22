/**
 * Railway infrastructure for john.deng.is.
 *
 * Preview:  railway config plan
 * Apply:    railway config apply
 *
 * Not expressed here (set in the Railway dashboard):
 * - PR environments: Project Settings → Environments → Enable PR Environments
 *   (base: production). Each PR gets `www-pr-<n>` at www-www-pr-<n>.up.railway.app.
 * - The Railway GitHub App must have access to jadengis/www. Without it there is
 *   no deploy trigger: pushes and PRs don't deploy, and `checkSuites` can't apply.
 */
import { defineRailway, github, project, service } from 'railway/iac'

export default defineRailway((ctx) => {
  const prod = ctx.environment === 'production'

  const www = service('www', {
    // checkSuites = "Wait for CI": deploys wait for .github/workflows/ci.yml to pass.
    source: github('jadengis/www', { branch: 'master', checkSuites: true }),
    build: { builder: 'DOCKERFILE', dockerfilePath: 'Dockerfile' },
    deploy: {
      healthcheckPath: '/',
      healthcheckTimeout: 120,
      restartPolicyType: 'ON_FAILURE',
      restartPolicyMaxRetries: 3,
      // Serverless: sleep when idle, wake on the next request (like Fly's auto_stop_machines).
      sleepApplication: true,
      multiRegionConfig: { 'us-west2': { numReplicas: 1 } },
      limitOverride: { containers: { cpu: 1, memoryBytes: 500_000_000 } },
    },
    // Edge caching on the public domains with Railway's defaults: HTML follows
    // the response's Cache-Control, other cacheable responses without one are
    // kept for 2 hours.
    cdn: { enabled: true },
    env: {
      // react-router-serve listens on PORT; the domains below target the same port.
      PORT: '3000',
    },
    domains: prod ? [{ domain: 'john.deng.is', port: 3000 }] : [],
  })

  return project('www', { resources: [www] })
})
