module.exports = {
  root: true
, parser: '@typescript-eslint/parser'
, plugins: [
    '@typescript-eslint'
  ]
, extends: [
    'eslint:recommended'
  , 'plugin:@typescript-eslint/recommended'
  ]
, rules: {
    '@typescript-eslint/no-empty-function': 'off'
  , 'require-yield': 'off'
  , 'no-empty': 'off'
  }
}
