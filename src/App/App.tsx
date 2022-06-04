import { useReducer } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { makeStyles } from '@mui/styles';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

import reducer, { initialState } from './reducer';
import Header from 'components/layouts/Header';
import Camera from 'components/layouts/Camera';

const useStyles = makeStyles({
	root: {
		minHeight: '100vh',
	},
});

const App = () => {
	const classes = useStyles();

	const [{ images, camera }, dispatch] = useReducer(reducer, initialState);

	return (
		<div className={classes.root}>
			<CssBaseline />

			<Header openCamera={() => dispatch({ type: 'open-camera' })} />

			<Camera
				open={camera}
				addPhoto={url =>
					dispatch({
						type: 'add-image',
						payload: url,
					})
				}
				closeModal={() => dispatch({ type: 'close-camera' })}
			/>

			<ImageList sx={{ overflow: 'hidden', m: 0 }} cols={3} rowHeight={400}>
				{images.map(image => (
					<ImageListItem key={image}>
						<img src={image} alt='' />
					</ImageListItem>
				))}
			</ImageList>
		</div>
	);
};

export default App;
