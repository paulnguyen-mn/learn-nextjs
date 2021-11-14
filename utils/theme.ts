import { createTheme, SimplePaletteColorOptions, PaletteOptions } from '@mui/material/styles'
import { red } from '@mui/material/colors'

const palette: PaletteOptions = {
	primary: {
		main: '#FF6464',
	},
	secondary: {
		main: '#00A8CC',
	},
	error: {
		main: red.A400,
	},
	text: {
		primary: '#21243D',
	},
}

// Create a theme instance.
export const theme = createTheme({
	palette,
	components: {
		MuiLink: {
			defaultProps: {
				underline: 'hover',
			},
			styleOverrides: {
				root: {
					color: palette.text?.primary,

					':hover, &.active': {
						color: (palette?.primary as SimplePaletteColorOptions)?.main,
						textDecoration: 'none',
					},
				},
			},
		},
	},
})
