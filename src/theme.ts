import { createTheme } from '@mui/material/styles';

const theme = createTheme({
	palette: {
		mode: 'dark',
	},
	components: {
		MuiIconButton: {
			defaultProps: {
				centerRipple: false,
				size: 'large',
			},
		},
		MuiSvgIcon: {
			defaultProps: {
				fontSize: 'large',
			},
		},
	},
});

export default theme;
