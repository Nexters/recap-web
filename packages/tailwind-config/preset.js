/** @type {import('tailwindcss').Config} */
const preset = {
  // 추후 extension 상황에 따라 prefix 추가
  //   prefix: "rc-",

  theme: {
    extend: {
      fontFamily: {
        sans: [
          '"IBM Plex Sans KR"',
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Noto Sans KR",
          "Apple SD Gothic Neo",
          "sans-serif",
        ],
      },
      colors: {
        bg: "var(--color-bg)",
        surface: "var(--color-surface)",

        text: "var(--color-text)",
        subtext: "var(--color-subtext)",
        "icon-sub": "var(--color-icon-sub)",

        border1: "var(--color-border-1)",
        border2: "var(--color-border-2)",

        primary: "var(--color-primary)",
        "primary-weak": "var(--color-primary-weak)",
        "primary-strong": "var(--color-primary-strong)",

        positive: "var(--color-positive)",
        cautionary: "var(--color-cautionary)",
        destructive: "var(--color-destructive)",
      },
      fontSize: {
        // Display
        "display-1": [
          "2.5rem",
          { lineHeight: "3.25rem", letterSpacing: "-0.002em" },
        ],
        "display-2": [
          "2.25rem",
          { lineHeight: "3rem", letterSpacing: "-0.002em" },
        ],
        "display-3": [
          "2rem",
          { lineHeight: "2.5rem", letterSpacing: "-0.002em" },
        ],
        "title-1": [
          "1.75rem",
          { lineHeight: "2.375rem", letterSpacing: "-0.024em" },
        ],
        "title-2": [
          "1.5rem",
          { lineHeight: "2rem", letterSpacing: "-0.002em" },
        ],
        "heading-sb": [
          "1.375rem",
          { lineHeight: "2rem", letterSpacing: "-0.002em" },
        ],
        "heading-md": [
          "1.375rem",
          { lineHeight: "2rem", letterSpacing: "-0.004em" },
        ],
        "heading-rg": [
          "1.375rem",
          { lineHeight: "2rem", letterSpacing: "-0.004em" },
        ],
        "headline-sb": [
          "1.25rem",
          { lineHeight: "1.75rem", letterSpacing: "-0.02em" },
        ],
        "headline-md": [
          "1.25rem",
          { lineHeight: "1.75rem", letterSpacing: "0em" },
        ],
        "headline-rg": [
          "1.25rem",
          { lineHeight: "1.75rem", letterSpacing: "0em" },
        ],
        "subtitle-1-sb": [
          "1.125rem",
          { lineHeight: "1.5rem", letterSpacing: "-0.004em" },
        ],
        "subtitle-1-md": [
          "1.125rem",
          { lineHeight: "1.5rem", letterSpacing: "-0.002em" },
        ],
        "subtitle-2-sb": [
          "0.9375rem",
          { lineHeight: "1.5625rem", letterSpacing: "-0.004em" },
        ],
        "subtitle-2-rg": [
          "0.9375rem",
          { lineHeight: "1.5625rem", letterSpacing: "-0.004em" },
        ],
        "body-1": [
          "1.125rem",
          { lineHeight: "1.875rem", letterSpacing: "0.0057em" },
        ],
        "body-2": ["1rem", { lineHeight: "1.625rem", letterSpacing: "0em" }],
        "body-3": ["0.875rem", { lineHeight: "1.5rem", letterSpacing: "0em" }],
        "label-1": [
          "1rem",
          { lineHeight: "1.25rem", letterSpacing: "0.0057em" },
        ],
        "label-2": [
          "0.875rem",
          { lineHeight: "1.125rem", letterSpacing: "0.0057em" },
        ],
        "caption-1": [
          "0.75rem",
          { lineHeight: "1rem", letterSpacing: "0.0057em" },
        ],
      },
    },
  },
  plugins: [],
};

export default preset;
