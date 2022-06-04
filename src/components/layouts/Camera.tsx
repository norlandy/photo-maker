import { forwardRef, useRef, useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { TransitionProps } from '@mui/material/transitions';
import Skeleton from '@mui/material/Skeleton';
import { makeStyles } from '@mui/styles';

import isMobile from 'utils/isMobile';

const Transition = forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement;
	},
	ref: React.Ref<unknown>,
) {
	return <Slide direction='up' ref={ref} {...props} />;
});

const useStyles = makeStyles({
	video: {
		width: '100%',
		height: '100%',
		backgroundColor: 'black',
	},
	loader: {
		position: 'absolute',
		top: 0,
		left: 0,
	},
});

type Props = {
	open: boolean;
	addPhoto: (url: string) => void;
	closeModal: () => void;
};

const Camera = ({ open, addPhoto, closeModal }: Props) => {
	const classes = useStyles();

	const videoRef = useRef<HTMLVideoElement>({} as HTMLVideoElement);

	const [stream, setStream] = useState<MediaStream | null>(null);
	const [imageCapture, setImageCapture] = useState<ImageCapture>({} as ImageCapture);
	const [loading, setLoading] = useState(true);

	const makePhoto = async () => {
		navigator.vibrate(200);

		const blob = await imageCapture.takePhoto();

		const src = URL.createObjectURL(blob);

		addPhoto(src);

		closeModal();
	};

	useEffect(() => {
		async function startStream() {
			setLoading(true);

			try {
				const stream = await navigator.mediaDevices.getUserMedia({
					video: {
						// user - front camera
						// environment - back camera
						facingMode: isMobile() ? 'user' : 'environment',
					},
				});

				videoRef.current.srcObject = stream;

				setStream(stream);

				const videoTrack = stream.getVideoTracks()[0];

				setImageCapture(new ImageCapture(videoTrack));

				setLoading(false);
			} catch (err) {
				console.log(err);

				closeModal();
			}
		}

		if (open) {
			startStream();
		}
	}, [open]);

	useEffect(() => {
		if (!open && stream) {
			stream.getTracks().forEach(track => track.stop());
			videoRef.current.srcObject = null;
		}
	}, [open, stream]);

	return (
		<Dialog
			fullScreen
			open={open}
			onClose={loading ? undefined : closeModal}
			onDoubleClick={loading ? undefined : makePhoto}
			TransitionComponent={Transition}
		>
			<AppBar color='transparent' sx={{ boxShadow: 0 }}>
				<Toolbar sx={{ p: 1 }}>
					<Box sx={{ flexGrow: 1 }} />

					<IconButton
						edge='start'
						color='inherit'
						onClick={closeModal}
						aria-label='close'
						disabled={loading}
					>
						<CloseIcon />
					</IconButton>
				</Toolbar>
			</AppBar>

			<video muted ref={videoRef} autoPlay className={classes.video} />

			{loading && (
				<Skeleton
					width='100%'
					height='100%'
					variant='rectangular'
					animation='pulse'
					className={classes.loader}
				/>
			)}
		</Dialog>
	);
};

export default Camera;
