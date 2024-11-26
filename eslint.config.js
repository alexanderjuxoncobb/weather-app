module.exports = [
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    ignores: ['node_modules', 'dist'],
    plugins: {
      prettier: require('eslint-plugin-prettier') // Explicitly load Prettier plugin
    },
    rules: {
      'prettier/prettier': 'error',
      'no-unused-vars': 'warn',
      'no-console': 'warn'
    }
  }
]
