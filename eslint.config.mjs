import js from "@eslint/js";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import importPlugin from "eslint-plugin-import";
import prettier from "eslint-config-prettier";
import globals from "globals";

/** @type {import('eslint').Linter.Config[]} */
export default [
  // Files/dirs ESLint should never look at
  {
    ignores: [
      "**/node_modules/**",
      "**/.expo/**",
      "**/dist/**",
      "**/build/**",
      "**/babel.config.js",
      "**/metro.config.js",
      "**/*.config.mjs",
    ],
  },

  // Base JS recommended rules
  js.configs.recommended,

  // TypeScript recommended (no type-aware checking -> fast, no `project` needed)
  ...tseslint.configs.recommended,

  // React + React Hooks for all TS/JS source
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      react,
      "react-hooks": reactHooks,
      import: importPlugin,
    },
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        __DEV__: "readonly",
      },
    },
    settings: {
      react: { version: "detect" },
    },
    rules: {
      // React: new JSX transform (React 17+), no need to import React in scope
      ...react.configs.flat.recommended.rules,
      ...react.configs.flat["jsx-runtime"].rules,

      // Classic react-hooks rules (the de-facto standard).
      // NOTE: react-hooks v7 `recommended` also enables many experimental
      // React Compiler rules (react-hooks/refs etc.) that are very noisy —
      // we deliberately enable only the two battle-tested ones.
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // RN/TS specifics
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",

      // Enforced as errors (your choice)
      "@typescript-eslint/no-explicit-any": "error",
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],

      // Warnings (don't fail CI, but flag)
      "no-console": ["warn", { allow: ["warn", "error", "log"] }],

      // Import ordering
      "import/order": [
        "error",
        {
          groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
          pathGroups: [{ pattern: "react", group: "external", position: "before" }],
          pathGroupsExcludedImportTypes: ["builtin"],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],
    },
  },

  // Turn OFF every formatting rule — Prettier owns formatting. MUST be last.
  prettier,
];
