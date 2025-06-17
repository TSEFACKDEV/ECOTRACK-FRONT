/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      container:{
        center: true,
        padding:{
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '3rem',
          xl: '4rem',
          '2xl': '5rem',
        },
        screens: {
          '2xl': '1400px',
        }
      },
      colors: {
        primary: {
          DEFAULT: "#2e7d32", // Vert principal (écologie)
          light: "#60ad5e",
          dark: "#005005",
        },
        secondary: {
          DEFAULT: "#0288d1", // Bleu (confiance, propreté)
          light: "#5eb8ff",
          dark: "#005b9f",
        },
        accent: {
          DEFAULT: "#ffd600", // Jaune accent (alerte, tri)
          light: "#ffff52",
          dark: "#c7a500",
        },
        neutral: {
          DEFAULT: "#f5f5f5", // Fond doux
          dark: "#263238",    // Texte sombre
          light: "#ffffff",
        },
        danger: {
          DEFAULT: "#d32f2f", // Pour erreurs ou alertes
        },
        success: {
          DEFAULT: "#388e3c", // Pour succès/validation
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      borderRadius: {
        'xl': '1rem',
      },
    },
  },
  plugins: [],
}