/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  
    extend: {
      backgroundImage: {
        'custom-gradient': 'linear-gradient(90deg, #4f46e5, #825ee4)', 
      },
      
      fontFamily: {
        'nunito-light': ['Nunito-Light', 'sans-serif'],
        pacifico: ['Pacifico-Regular', 'cursive'],
      },
    },
  },
}

