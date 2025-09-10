import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import prettierPlugin from "eslint-plugin-prettier";
import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// FlatCompat permite usar configs antigas do Next.js
const compat = new FlatCompat({ baseDirectory: __dirname });

export default [
  // Next.js recommended configs
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  {
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },

    ignores: [
      "node_modules/",
      ".next/",
      "dist/",
      "build/",
      "public/",
      "*.config.js",
      "*.config.mjs",
      "*.lock",
      "*.log",
      ".env*",
      "__tests__/coverage/",
    ],

    plugins: {
      "@typescript-eslint": tsPlugin,
      prettier: prettierPlugin,
    },

    rules: {
      "prettier/prettier": ["error", { endOfLine: "auto" }],
      "react/react-in-jsx-scope": "off",
      "@typescript-eslint/triple-slash-reference": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-empty-function": "off",
      "@typescript-eslint/no-empty-interface": "off",
    },
  },
];
