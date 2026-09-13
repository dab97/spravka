import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        rgsu: {
          sapphire: '#082567',
          cobalt: '#102FA1',
          ice: '#D5E4F4',
          ruby: '#A91917',
          azure: '#0085FF',
        },
      },
      borderRadius: {
        '3xl': '1.5rem', // 24px
        '2xl': '1rem',   // 16px
        'xl': '0.75rem', // 12px
        'lg': '0.5rem',  // 8px
        'md': 'calc(var(--radius) - 2px)',
        'sm': 'calc(var(--radius) - 4px)'
      },
      boxShadow: {
        // Микро-тень для легкого отделения
        'subtle': '0 1px 2px 0 rgba(15, 23, 42, 0.04), 0 2px 6px -1px rgba(15, 23, 42, 0.03)',
        // Apple-style Card Hover (3-слойная плавная глубина)
        'apple-hover': '0 2px 4px 0 rgba(15, 23, 42, 0.02), 0 8px 16px -2px rgba(15, 23, 42, 0.06), 0 16px 32px -4px rgba(15, 23, 42, 0.04)',
        // Apple Sheet / Dialog (глубокий рассеянный свет без черных ореолов)
        'apple-modal': '0 4px 16px -2px rgba(15, 23, 42, 0.06), 0 16px 40px -6px rgba(15, 23, 42, 0.12), 0 32px 64px -12px rgba(15, 23, 42, 0.1)',
        // Всплывающая подсказка (Tooltip)
        'apple-tooltip': '0 2px 6px -1px rgba(15, 23, 42, 0.06), 0 6px 16px -2px rgba(15, 23, 42, 0.08)',
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
