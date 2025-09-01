import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals"),
  {
    rules: {
      // 👇 turn off unescaped quote errors
      "react/no-unescaped-entities": "off",

      // (Optional) make hook naming stricter if needed
      "react-hooks/rules-of-hooks": "error",
    },
  },
];

export default eslintConfig;
