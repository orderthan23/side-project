module.exports = {
  extends: ["next", "turbo", "prettier"],
  rules: {
    "@next/next/no-html-link-for-pages": "off",
    "react/jsx-key": "off",
    "no-unused-vars": "error",
    "no-unsafe-optional-chaining": "off",
    "react/prop-types": "off",
    "react/display-name": "off",
    "react-hooks/exhaustive-deps": "off",
    "react/react-in-jsx-scope": "off",
    "camelcase": "warn",
    "curly": [
      "error",
      "all"
    ],
    "eqeqeq": [
      "error",
      "always",
      {
        "null": "ignore"
      }
    ],
    "no-eval": "error",
    "no-extra-boolean-cast": "error",
    "no-proto": "error",
    "no-return-await": "off",
    "no-var": "error",
    "no-console": "warn",
    "no-mixed-spaces-and-tabs": "warn",
    "react/no-unknown-property": [
      "error",
      {
        "ignore": [
          "css"
        ]
      }
    ],
    "@next/next/no-img-element": "off",
    "jsx-a11y/alt-text": "off",
    "no-useless-escape": "warn"
  },
};
