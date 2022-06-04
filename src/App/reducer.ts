export type State = {
	images: string[];
	camera: boolean;
};

export const initialState: State = {
	images: [],
	camera: false,
};

type AddImage = {
	type: 'add-image';
	payload: string;
};
type OpenCamera = {
	type: 'open-camera';
};
type CloseCamera = {
	type: 'close-camera';
};
export type Action = AddImage | OpenCamera | CloseCamera;

export default function reducer(state: State, action: Action) {
	switch (action.type) {
		case 'add-image':
			return {
				...state,
				images: state.images.concat(action.payload),
			};
		case 'open-camera':
			return {
				...state,
				camera: true,
			};
		case 'close-camera':
			return {
				...state,
				camera: false,
			};
		default:
			throw new Error();
	}
}
