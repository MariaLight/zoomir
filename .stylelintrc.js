module.exports = {
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-prettier'
  ],
  rules: {
    'selector-class-pattern': null,
    'scss/at-import-partial-extension': null,
    'scss/dollar-variable-pattern': null,
    'scss/selector-no-redundant-nesting-selector': null,
    'no-descending-specificity': null,
    'scss/at-mixin-pattern': null,
    'scss/at-function-pattern': null
  }
}
