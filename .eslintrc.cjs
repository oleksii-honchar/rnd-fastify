module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    allowImportExportEverywhere: false,
    codeFrame: false,
    ecmaVersion: "es2022",
    errorOnUnknownASTType: true,
    errorOnTypeScriptSyntacticAndSemanticIssues: true,
    project: "**/tsconfig.json",
    "createDefaultProgram": true,
    tsconfigRootDir: "./",
    sourceType: "module",
  },
  extends: [
    "prettier",
    "plugin:prettier/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:you-dont-need-lodash-underscore/compatible",
    "plugin:node/recommended",
  ],
  rules: {
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/no-namespace": "off",
    "import/namespace": "off",
    "import/no-unresolved": "error",
    "class-methods-use-this": "off",
    "dot-notation": ["error", { allowPattern: "^(code)$" }],
    "function-paren-newline": ["error", "consistent"],
    "max-len": [
      "error",
      {
        code: 120,
        tabWidth: 2,
        ignoreComments: true,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
      },
    ],
    "no-unused-vars": "off",
    "no-underscore-dangle": ["error", { allow: ["_id", "_headers"] }],
    "node/no-missing-import": "off",
    "node/no-unpublished-import": "off",
    'prettier/prettier': [
      'error',
      {
        tabWidth: 2,
        eslintIntegration: true,
        printWidth: 120,
      },
    ],
    "quote-props": ["error", "consistent-as-needed"],
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  globals: {
    beforeEach: true,
    afterEach: true,
    describe: true,
    it: true,
    expect: true,
  },
  plugins: ["@typescript-eslint", "node", "prettier", "import", ],
  settings: {
    "import/extensions": [".js", ".jsx", ".ts", ".tsx"],
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/resolver": {
      typescript: {
        project: "./tsconfig.json",
      },
      node: true,
    },
  },
};