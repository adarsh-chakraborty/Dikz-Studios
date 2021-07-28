module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily:{
        font_Lato: ['Lato', 'sans-serif'],
        font_Roboto: ['Roboto', 'sans-serif'],
        font_openSans: ['Open Sans', 'sans-serif'],
        Montserrat: ['Montserrat', 'sans-serif'],
        RobotoMono: ['Roboto Mono', 'sans-serif'],
        RobotoSlab: ['Roboto Slab', 'sans-serif'],

    },
    colors: {
      youtube: '#FF0000'
    },
    screens: {
      m_320: '320px',
      m_375: '375px',
      m_480: '480px',
    }
    },
  },
  variants: {
    extend: {
      
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
