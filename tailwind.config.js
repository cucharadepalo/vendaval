/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./*.html", "./js/*.js"],
	theme: {
		fontFamily: {
			'mono': ['IBM Plex Mono', 'Menlo', 'DejaVu Sans Mono', 'Bitstream Vera Sans Mono', 'Courier', 'monospace'],
			'display': ['IBM Plex Sans Condensed', 'Bahnschrift', 'DIN Alternate', 'Franklin Gothic Medium', 'Nimbus Sans Narrow', 'sans-serif-condensed', 'sans-serif']
		},
		extend: {
			colors: {
				'verdescuro': '#0e6263',
				'black': '#191716',
				'amarelo': '#f59f03'
			},
			borderWidth: {
				'3': '3px',
				'5': '5px',
				'7': '7px',
			}
		},
	},
	plugins: [],
}