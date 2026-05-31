declare module '*.mdx' {
  import type { ComponentType } from 'react'

  /** Frontmatter exposed by remark-mdx-frontmatter. */
  export const frontmatter: {
    title: string
    date: string
    description: string
    image: {
      hero: string
      thumbnail: string
    }
    tags: string[]
    published: boolean
    [key: string]: unknown
  }

  const MDXComponent: ComponentType<Record<string, unknown>>
  export default MDXComponent
}
