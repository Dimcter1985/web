module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    jsx: true,
    useJSXTextNode: true,
  },
  env: {
    jest: true,
  },
  extends: [
    "airbnb",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  rules: {
    "semi": ["error", "never"],
    "comma-dangle": ["error", "always-multiline"],
    "jsx-quotes": ["error", "prefer-single"],
    "curly": ["error", "multi-line"],
    "camelcase": "off",
    "react/jsx-props-no-spreading": 0,
    "import/no-extraneous-dependencies": 0,
    "import/no-unresolved": 0,
    "import/extensions": 0,
    "@typescript-eslint/no-unused-vars": ["error", { "ignoreRestSiblings": true, "argsIgnorePattern": "^_" }],
    "@typescript-eslint/no-empty-function": "warn",
    "react/jsx-filename-extension": ["error", { "extensions": [".jsx", ".tsx"] }],
    "@typescript-eslint/explicit-function-return-type": "off",
    "import/prefer-default-export": 0,
    "react/prop-types": 0,
    "react/static-property-placement": 0,
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": ["error"],
    "react/jsx-one-expression-per-line": 0,
    "consistent-return": 0,
    "no-param-reassign": 0,
    "react/no-unescaped-entities": 0,
    "no-use-before-define": "off",
    "class-methods-use-this": 0,
    "@typescript-eslint/no-use-before-define": ["error"],
    "react/jsx-wrap-multilines": ["error", { "prop": "ignore" }],
    "@typescript-eslint/naming-convention": [
      "error",
      {
        "selector": "interface",
        "format": ["PascalCase"],
        "custom": {
          "regex": "^I[A-Z]",
          "match": true,
        },
      },
    ],
  },
  "overrides": [
    {
      "files": ["*.ts", "*.tsx"],
      "rules": {
        "@typescript-eslint/explicit-function-return-type": ["error"],
      },
    },
  ],
  plugins: [
    "@typescript-eslint",
    "react",
  ],
}
