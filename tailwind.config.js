module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './layouts/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      borderWidth: {
        1.5: '1.5px',
      },
      gridTemplateRows: {
        13: 'repeat(13, minmax(0, 1fr))',
        14: 'repeat(14, minmax(0, 1fr))',
        18: 'repeat(18, minmax(0, 1fr))',
        23: 'repeat(23, minmax(0, 1fr))',
      },
      gridTemplateColumns: {
        14: 'repeat(14, minmax(0, 1fr))',
      },
      gridRow: {
        'span-7': 'span 7 / span 7',
        'span-8': 'span 8 / span 8',
        'span-9': 'span 9 / span 9',
        'span-10': 'span 10 / span 10',
        'span-11': 'span 11 / span 11',
        'span-14': 'span 14 / span 14',
      },
      padding: {
        2.5: '.625rem',
        3.5: '.875rem',
        4.5: '1.125rem',
        7.5: '1.875rem',
        9.5: '2.375rem',
        13: '3.25rem',
        15: '3.75rem',
        22: '5.5rem',
      },
      margin: {
        2.5: '.625rem',
        4.5: '1.125rem',
        7: '1.75rem',
        15.5: '3.875rem',
      },
      fontSize: {
        xxs: ['.625rem', '.75rem'],
        xxl: ['1.375rem', '1.875rem'],
        '2.5xl': ['1.75rem', '2.125rem'],
      },
      width: {
        9.5: '2.375rem',
        75: '18.75rem',
        78: '19.5rem',
        103: '25.75rem',
        130: '32.5rem',
        140: '35rem',
        142.5: '35.625rem',
        147: '36.75rem',
        163: '40.75rem',
        270: '67.5rem',
      },
      height: {
        1.5: '.375rem',
        8.5: '2.125rem',
        9.5: '2.375rem',
        11.5: '2.875rem',
        12.5: '3.125rem',
        18.5: '4.625rem',
        30: '7.5rem',
        35: '8.75rem',
        262.5: '65.625rem',
      },
      inset: {
        0.5: '.125rem',
      },
      minWidth: {
        4: '1rem',
        9.5: '2.375rem',
        10: '2.5rem',
        11: '2.75rem',
        11.5: '2.875rem',
        75: '18.75rem',
      },
      minHeight: {
        4: '1rem',
        9.5: '2.375rem',
        10: '2.5rem',
        11: '2.75rem',
        11.5: '2.875rem',
        12.5: '3.125rem',
      },
      maxHeight: {
        75: '18.75rem',
      },
      maxWidth: {
        75: '18.75rem',
      },
      spacing: {
        1.5: '.375rem',
      },
    },
    backgroundImage: {
      auth: "url('/images/auth-bg.png')",
    },
    boxShadow: {
      DEFAULT: '0px 4px 10px #2a2a3408',
      'react-select': '0 0 0 1px #0000001a, 0 4px 11px #0000001a',
    },
    fontFamily: {
      inter: ['Inter'],
      urbanist: ['Urbanist'],
    },
    colors: {
      shark: '#1F2024',
      nevada: '#6B6E75',
      emperor: '#545454',
      mineshaft: '#1F1F1F',
      ebonyclay: '#1D212B',
      transparent: 'transparent',
      gallery: '#ECECEC',
      red: '#E40808',
      schoolbusyellow: '#FFD800',
      lapalma: '#2CB117',
      woodsmoke: '#0F0F11',
      santasgray: '#A0A2AD',
      abbey: '#484A54',
      stormgray: '#717583',
      frenchgray: '#B8BAC2',
      manatee: '#888B99',
      wildsand: '#F5F5F5',
      black: '#000000',
      iron: '#CFD1D6',
      athensgray: '#E7E8EB',
      tuna: '#33353C',
      pattensblue: '#DEEBFF',

      onyx: '#32343D',
      white: '#FFFFFF',
      rhythm: '#8D8D7C',
      waterloo: '#7C7C8D',
      honeydew: '#E9FAF3',
      linen: '#FFF0E9',
      magnolia: '#F9EFFF',
      'bright-gray': '#E8E8EF',
      'metallic-silver': '#ABABB9',
      'cosmic-latte': '#FFF6EA',
      'ghost-white': '#FAFAFC',
      'jungle-green': '#2BB67D',
      'lavender-gray': '#C5C5CC',
      'deep-saffron': '#F3A02E',
      'vivid-red-tangelo': '#D25C2A',
      'bleu-de-france': '#2F96EB',
      'alice-blue': '#E9F5FF',
      'purple-x11': '#A232E7',
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
}
