import mdx from '@mdx-js/rollup'
import { reactRouter } from '@react-router/dev/vite'
import tailwindcss from '@tailwindcss/vite'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import { defineConfig } from 'vite'
import { readingTimeMinutes } from './app/lib/reading-time'

/**
 * Adds `export const readingTime = <minutes>` to every MDX post module, so
 * the estimate is computed at build time and no raw post text ships in any
 * bundle. (A `?raw` glob doesn't work here: the MDX plugin transforms the
 * module before Vite's raw handling sees it.)
 */
function remarkReadingTime() {
  return (tree: { children: unknown[] }, file: { value: unknown }) => {
    const minutes = readingTimeMinutes(String(file.value))
    tree.children.unshift({
      type: 'mdxjsEsm',
      value: '',
      data: {
        estree: {
          type: 'Program',
          sourceType: 'module',
          body: [
            {
              type: 'ExportNamedDeclaration',
              specifiers: [],
              declaration: {
                type: 'VariableDeclaration',
                kind: 'const',
                declarations: [
                  {
                    type: 'VariableDeclarator',
                    id: { type: 'Identifier', name: 'readingTime' },
                    init: { type: 'Literal', value: minutes },
                  },
                ],
              },
            },
          ],
        },
      },
    })
  }
}

export default defineConfig({
  plugins: [
    // MDX must run before reactRouter so .mdx is transformed to JSX first.
    mdx({
      remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter, remarkGfm, remarkReadingTime],
      rehypePlugins: [
        rehypeSlug,
        [rehypeAutolinkHeadings, { behavior: 'wrap' }],
        [rehypePrettyCode, { theme: { light: 'github-light', dark: 'github-dark' } }],
      ],
    }),
    tailwindcss(),
    reactRouter(),
  ],
  resolve: {
    tsconfigPaths: true,
  },
})
