module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    container: {
      center: true,
    },
    extend: {},
  },
  daisyui: {
    themes: [
      {
        dewalt_theme: {
          primary: "#FEBD17",
          secondary: "#1A1A1A",
          "base-100": "#EEEEEE",
          success: "#07b03f",
          warning: "#FEBD17",
          error: "#EF4444",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
