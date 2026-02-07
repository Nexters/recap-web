import eslintConfigPrettier from "eslint-config-prettier";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";

import base from "./base.mjs";

export default [
  ...base,
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
  eslintConfigPrettier,
];
