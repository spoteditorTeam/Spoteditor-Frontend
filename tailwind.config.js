module.exports = {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        mobile: { max: '768px' }, // 480px ~ 768px
        web: '769px', // 769px 이상,
      },
      spacing: {
        '50px': '50px',
      },
      fontFamily: {
        pretendard: ['Pretendard', 'sans-serif'],
        untitled: ['UntitledSansLight', 'sans-serif'],
      },
      fontSize: {
        32: '32px',
        28: '28px',
        20: '20px',
        17: '17px',
        16: '16px',
        14: '14px',
        12: '12px',
        11: '11px',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        formBlack: '#242528',
        primarySlate: '#ABAFB5',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
