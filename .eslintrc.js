module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    jsx: true,
    useJSXTextNode: true,
  },
  "env": {
    "browser": true,
    "node": true,
    "jest": true,
  },
  extends: [
    "airbnb",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  "settings": {
    "react": {
      "version": "detect",
    },
  },
  plugins: ["@typescript-eslint", "react"],
  rules: {
    "semi": ["error", "never"],
    "comma-dangle": ["error", "always-multiline"],
    "quotes": ["error", "single"],
    "jsx-quotes": ["error", "prefer-single"],
    "jsx-a11y/anchor-is-valid": "off",
    "curly": ["error", "multi-line"],
    "arrow-body-style": "off",
    "react/jsx-props-no-spreading": 0,
    "react/react-in-jsx-scope": "off",
    "react/require-default-props": "off",
    "import/no-extraneous-dependencies": 0,
    "import/no-unresolved": 0,
    "import/extensions": 0,
    "@typescript-eslint/no-unused-vars": ["error", { "ignoreRestSiblings": true, "argsIgnorePattern": "^_" }],
    "@typescript-eslint/no-empty-function": "warn",
    "react/jsx-filename-extension": ["error", { "extensions": [".jsx", ".tsx"] }],
    "import/prefer-default-export": 0,
    "react/prop-types": 0,
    "react/static-property-placement": 0,
    "react/jsx-one-expression-per-line": 0,
    "consistent-return": 0,
    "react/no-unescaped-entities": 0,
    "react/jsx-wrap-multilines": ["error", { "prop": "ignore" }],
    "no-use-before-define": "off",
    "no-empty-pattern": "error",
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": ["error"],
    "@typescript-eslint/no-use-before-define": ["error"],
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
    "class-methods-use-this": "off",
  },
  "overrides": [
    {
      "files": ["*.ts", "*.tsx"],
      "rules": {
        "@typescript-eslint/explicit-function-return-type": ["off"],
      },
    },
  ],
}
