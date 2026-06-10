import { type RouteConfig, index, layout, route } from '@react-router/dev/routes'

export default [
  layout('routes/layout.tsx', [
    index('routes/home.tsx'),
    route('about', 'routes/about.tsx'),
    route('projects', 'routes/projects.tsx'),
    route('blog', 'routes/blog/index.tsx'),
    route('blog/tags/:tag', 'routes/blog/tag.tsx'),
    route('blog/:slug', 'routes/blog/post.tsx'),
    route('music', 'routes/music.tsx'),
  ]),
  // Resource routes: raw XML/text, no layout chrome.
  route('rss.xml', 'routes/rss.xml.tsx'),
  route('sitemap.xml', 'routes/sitemap.xml.tsx'),
  route('llms.txt', 'routes/llms.txt.tsx'),
] satisfies RouteConfig
