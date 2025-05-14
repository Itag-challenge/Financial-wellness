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
          background: "var(--background)",
          foreground: "var(--foreground)",
          accent: {
            DEFAULT: "var(--accent)",
            foreground: "var(--accent-foreground)",
          },
          muted: {
            DEFAULT: "var(--muted)",
            foreground: "var(--muted-foreground)",
          },
          textPrimary: "var(--text-primary)",
          textSecondary: "var(--text-secondary)",
          border: "var(--border)",
          card: {
            DEFAULT: "var(--card-background)",
            shadow: "var(--card-shadow)",
          },
          input: "var(--input-background)",
          primary: {
            DEFAULT: "var(--primary)",
            foreground: "var(--primary-foreground)",
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
  