import nextPlugin from "@next/eslint-plugin-next";
import eslintConfigPrettier from "eslint-config-prettier";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";

import base from "./base.mjs";

export default [
  ...base,
  {
    ignores: ["next-env.d.ts", ".next/**", "out/**", "build/**"],
  },
  {
    ...reactPlugin.configs.flat.recommended,
    settings: { react: { version: "detect" } },
    rules: {
      ...(reactPlugin.configs.flat.recommended.rules ?? {}),
      "react/react-in-jsx-scope": "off",
    },
  },
  {
    plugins: { "react-hooks": reactHooksPlugin },
    rules: {
      ...reactHooksPlugin.configs.recommended.rules,
    },
  },
  {
    plugins: { "@next/next": nextPlugin },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
    },
  },
  eslintConfigPrettier,
];
