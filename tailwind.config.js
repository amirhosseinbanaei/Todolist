module.exports = {
  content: ["./public/**/*.html", "./src/js/app.js"],
  daisyui: {
    themes: ["night"],
  },
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Vazirmatn', 'sans-serif']
      },
      colors: {
        'gray/2': '#1D1929',
        'gray/6': '#77757F',
        'gray/8': '#A5A3A9',
        'gray/10': '#D2D1D4',
        'gray/11': '#E8E8EA',
        'gray/12': '#f9f9f9',
      },
    },
  },
  plugins: [require("daisyui")],
}