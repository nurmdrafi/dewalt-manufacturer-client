module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        dewalt_theme: {
          primary: "#FEBD17",
          secondary: "#1A1A1A",
          "base-100": "#EEEEEE",
          info: "#3ABFF8",
          success: "#36D399",
          warning: "#FEBD17",
          error: "#F87272",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};