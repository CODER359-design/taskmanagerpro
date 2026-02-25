import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#f5f7ff',
        muted: '#9aa6b2',
        accent: '#2dd4bf',
        'accent-amber': '#f59e0b',
        surface: '#101826',
        card: '#141e2e',
        bg: '#0b0f14',
      },
      boxShadow: {
        glow: '0 24px 60px rgba(3,8,18,0.45)',
      },
    },
  },
  plugins: [],
};

export default config;
