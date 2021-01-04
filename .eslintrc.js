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
    'require-yield': 'off'
  , 'no-empty': 'off'
  , '@typescript-eslint/no-empty-function': 'off'
  , '@typescript-eslint/no-extra-semi': 'off'
  }
}
