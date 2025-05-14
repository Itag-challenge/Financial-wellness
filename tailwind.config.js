/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./pages/**/*.{js,jsx}",
      "./components/**/*.{js,jsx}",
      "./app/**/*.{js,jsx}",
      "./src/**/*.{js,jsx}",
      "*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
      extend: {
        colors: {
          background: "#191919",
          foreground: "#FFFFFF",
          primary: {
            DEFAULT: "#01ea75",
            foreground: "#191919",
          },
          secondary: {
            DEFAULT: "#9900fe",
            foreground: "#FFFFFF",
          },
          accent: {
            DEFAULT: "#FF9900",
            foreground: "#191919",
          },
          alert: {
            DEFAULT: "#FF0000",
            foreground: "#FFFFFF",
          },
          gray: {
            50: "#F1F2F4",
            100: "#E3E6E9",
            200: "#D0D4DC",
          },
          text: {
            primary: "#FFFFFF",
            secondary: "#E3E6E9",
          },
        },
        fontFamily: {
          sans: ['"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif'],
        },
        fontSize: {
          hero: ['2.25rem', { lineHeight: '2.5rem', fontWeight: '700' }],
          subtitle: ['1.125rem', { lineHeight: '1.75rem', fontWeight: '500' }],
          base: ['1rem', { lineHeight: '1.75rem' }],
        },
        borderRadius: {
          lg: "var(--radius)",
          md: "calc(var(--radius) - 2px)",
          sm: "calc(var(--radius) - 4px)",
        },
        keyframes: {
          "accordion-down": {
            from: { height: 0 },
            to: { height: "var(--radix-accordion-content-height)" },
          },
          "accordion-up": {
            from: { height: "var(--radix-accordion-content-height)" },
            to: { height: 0 },
          },
        },
        animation: {
          "accordion-down": "accordion-down 0.2s ease-out",
          "accordion-up": "accordion-up 0.2s ease-out",
        },
      },
    },
    plugins: [require("tailwindcss-animate")],
  }
