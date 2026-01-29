import base from "./base.mjs";

import nextPlugin from "@next/eslint-plugin-next";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";

/**
 * Next.js preset
 */
export default [
  ...base,

  // Next ignores (next-env, output dirs)
  {
    ignores: ["next-env.d.ts", ".next/**", "out/**", "build/**"],
  },

  // React recommended (Next 프로젝트도 React 규칙 포함)
  {
    ...reactPlugin.configs.flat.recommended,
    settings: { react: { version: "detect" } },
    rules: {
      ...(reactPlugin.configs.flat.recommended.rules ?? {}),
      "react/react-in-jsx-scope": "off",
    },
  },

  // React Hooks
  {
    plugins: { "react-hooks": reactHooksPlugin },
    rules: {
      ...reactHooksPlugin.configs.recommended.rules,
    },
  },

  // Next rules
  {
    plugins: { "@next/next": nextPlugin },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
    },
  },
];
