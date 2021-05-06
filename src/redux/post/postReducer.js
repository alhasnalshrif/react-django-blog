import {
	ALL_POST_SUCCESS,
	ALL_POST_FAIL,
	DETAIL_POST_SUCCESS,
	DETAIL_POST_FAIL,
	CATEGORY_SUCCESS,
	CATEGORY_FAIL,
} from "./types";

const initialState = {
	posts: [],
	categories: [],
	post: {},
};
// console.log(action)

export default function (state = initialState, action) {
	const { type, payload } = action;

	switch (type) {

		case ALL_POST_SUCCESS:
			return {
				...state,
				posts: payload,
			};

		case DETAIL_POST_SUCCESS:
			return {
				...state,
				post: payload,
			};
		case CATEGORY_SUCCESS:
			return {
				...state,
				categories: payload,
			};
		case ALL_POST_FAIL:
		case DETAIL_POST_FAIL:
		case CATEGORY_FAIL:
			return {
				...state,
			};
		default:
			return state;
	}
}
