/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
const config = {
  semi: false,
  singleQuote: true,
  printWidth: 120,
  proseWrap: 'preserve',
  tailwindFunctions: ['clsx', 'tw'],
  plugins: ['prettier-plugin-tailwindcss', 'prettier-plugin-organize-imports'],
  overrides: [
    {
      files: ['*.yaml', '*.yml'],
      options: {
        useTabs: false,
        tabWidth: 2,
      },
    },
  ],
}

export default config
