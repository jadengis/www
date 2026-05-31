import { type RouteConfig, index, layout, route } from '@react-router/dev/routes'

export default [
  layout('layouts/site.tsx', [
    index('routes/home.tsx'),
    route('about', 'routes/about.tsx'),
    route('projects', 'routes/projects.tsx'),
    route('blog', 'routes/blog._index.tsx'),
    route('blog/:slug', 'routes/blog.$slug.tsx'),
    route('music', 'routes/music.tsx'),
  ]),
  // Resource routes — raw XML, no layout chrome.
  route('rss.xml', 'routes/rss[.]xml.tsx'),
  route('sitemap.xml', 'routes/sitemap[.]xml.tsx'),
] satisfies RouteConfig
