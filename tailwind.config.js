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
				sans: ['SpaceGrotesk', 'serif'],
			},
		},
	},
	plugins: [],
};
