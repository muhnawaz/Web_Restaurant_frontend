import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"], // keep "light" as your override class; default is dark from :root
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",

        card: "hsl(var(--card))",
        "card-foreground": "hsl(var(--card-foreground))",

        popover: "hsl(var(--popover))",
        "popover-foreground": "hsl(var(--popover-foreground))",

        primary: "hsl(var(--primary))",
        "primary-foreground": "hsl(var(--primary-foreground))",

        secondary: "hsl(var(--secondary))",
        "secondary-foreground": "hsl(var(--secondary-foreground))",

        muted: "hsl(var(--muted))",
        "muted-foreground": "hsl(var(--muted-foreground))",

        accent: "hsl(var(--accent))",
        "accent-foreground": "hsl(var(--accent-foreground))",

        destructive: "hsl(var(--destructive))",
        "destructive-foreground": "hsl(var(--destructive-foreground))",

        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",

        gold: "hsl(var(--gold))",
        "gold-foreground": "hsl(var(--gold-foreground))",
        "warm-white": "hsl(var(--warm-white))",
        charcoal: "hsl(var(--charcoal))",
        burgundy: "hsl(var(--burgundy))",
        copper: "hsl(var(--copper))",
      },

      borderRadius: {
        DEFAULT: "var(--radius)",
        lg: "calc(var(--radius) + 2px)",
        xl: "calc(var(--radius) + 6px)",
        "2xl": "calc(var(--radius) + 12px)",
      },

      boxShadow: {
        elegant: "var(--shadow-elegant)",
        gold: "var(--shadow-gold)",
        card: "var(--shadow-card)",
      },

      backgroundImage: {
        "gradient-hero": "var(--gradient-hero)",
        "gradient-gold": "var(--gradient-gold)",
        "gradient-card": "var(--gradient-card)",
      },

      fontFamily: {
        display: ['Georgia', '"Times New Roman"', "serif"],
        elegant: ['Inter', '"Helvetica Neue"', "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
