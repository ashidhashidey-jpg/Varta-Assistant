/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Core palette — purple/blue -> pink, on a near-white lavender base.
        base: {
          light: '#FAFAFE',
          DEFAULT: '#F4F2FB',
          dark: '#0F0D1A'
        },
        surface: {
          light: '#FFFFFF',
          dark: '#181527'
        },
        ink: {
          900: '#1E1B2E',
          700: '#3A3553',
          500: '#6B6478',
          300: '#A6A0BD',
          100: '#E7E3F5'
        },
        violet: {
          50: '#F2EEFE',
          100: '#E4DBFD',
          300: '#B49CFA',
          500: '#7C5CFC',
          600: '#6840F5',
          700: '#5530D6'
        },
        bloom: {
          400: '#F472B6',
          500: '#EC6FBB',
          600: '#D957A0'
        },
        sky: {
          400: '#6FA8F5',
          500: '#5B8DEF'
        },
        mint: {
          400: '#34D399',
          500: '#22B883'
        }
      },
      fontFamily: {
        display: ['Sora', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace']
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #7C5CFC 0%, #B45CF0 55%, #EC6FBB 100%)',
        'brand-gradient-soft': 'linear-gradient(135deg, rgba(124,92,252,0.12) 0%, rgba(236,111,187,0.12) 100%)',
        'mesh-light': 'radial-gradient(at 0% 0%, rgba(124,92,252,0.18) 0px, transparent 50%), radial-gradient(at 100% 0%, rgba(236,111,187,0.16) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(91,141,239,0.12) 0px, transparent 50%)'
      },
      boxShadow: {
        glass: '0 8px 32px rgba(76, 56, 158, 0.08)',
        'glass-lg': '0 20px 60px rgba(76, 56, 158, 0.14)',
        'glow-violet': '0 0 0 1px rgba(124,92,252,0.15), 0 8px 24px rgba(124,92,252,0.25)'
      },
      borderRadius: {
        xl2: '1.25rem',
        '2xl5': '1.75rem'
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: 0, transform: 'translateY(12px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' }
        },
        blink: {
          '0%, 80%, 100%': { opacity: 0.25 },
          '40%': { opacity: 1 }
        },
        'grid-pulse': {
          '0%, 100%': { opacity: 0.35 },
          '50%': { opacity: 1 }
        }
      },
      animation: {
        'fade-up': 'fade-up 0.5s cubic-bezier(0.16,1,0.3,1) both',
        blink: 'blink 1.4s infinite both',
        'grid-pulse': 'grid-pulse 3s ease-in-out infinite'
      }
    }
  },
  plugins: []
};
