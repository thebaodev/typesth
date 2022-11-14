module.exports = {
	content: ['./app/**/*.{ts,tsx,jsx,js}'],
	theme: {
		extend: {
			keyframes: {
				blink: {
					'50%': {
						opacity: 0,
					},
				},
			},
			animation: {
				blink: 'blink 1s linear infinite',
			},
			fontFamily: {
				mono: ['SpaceMono', 'Courier New', 'serif'],
				sans: ['SpaceGrotest', 'Roboto', 'san-serif'],
			},
		},
	},
	plugins: [require("daisyui")],
  daisyui: {
    themes: [
      "light",
      "dark",
      "cupcake",
      "bumblebee",
      "emerald",
      "corporate",
      "synthwave",
      "retro",
      "cyberpunk",
      "valentine",
      "halloween",
      "garden",
      "forest",
      "aqua",
      "lofi",
      "pastel",
      "fantasy",
      "wireframe",
      "black",
      "luxury",
      "dracula",
      "cmyk",
      "autumn",
      "business",
      "acid",
      "lemonade",
      "night",
      "coffee",
      "winter",
    ],
  },
};
