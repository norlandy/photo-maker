import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import IconButton from '@mui/material/IconButton';

type Props = {
	openCamera: () => void;
};

const Header = ({ openCamera }: Props) => {
	return (
		<AppBar position='static'>
			<Toolbar sx={{ p: 1 }}>
				<Typography variant='h5' component='div' sx={{ flexGrow: 1 }}>
					Photo Maker
				</Typography>

				<IconButton onClick={openCamera} size='large'>
					<PhotoCameraIcon />
				</IconButton>
			</Toolbar>
		</AppBar>
	);
};

export default Header;
