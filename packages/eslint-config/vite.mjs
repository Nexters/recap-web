import base from "./base.mjs";

import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";

/**
 * Vite(React) preset
 */
export default [
  ...base,

  // React recommended (flat config)
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
];
