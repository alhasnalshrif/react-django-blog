import {
	SIGNUP_SUCCESS,
	SIGNUP_FAIL,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
	RESET_PASSWORD_SUCCESS,
	RESET_PASSWORD_FAIL,
	RESET_PASSWORD_CONFIRM_SUCCESS,
	RESET_PASSWORD_CONFIRM_FAIL,
	AUTHENTICATED_FAIL,
	AUTHENTICATED_SUCCESS,
	USER_LOADED_SUCCESS,
	USER_LOADED_FAIL,
} from "./types";

const initialState = {
	access: localStorage.getItem("access"),
	refresh: localStorage.getItem("refresh"),
	isAuthenticated: null,
	user: null,
};

export default function (state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case AUTHENTICATED_SUCCESS:
			return {
				...state,
				isAuthenticated: true,
			};
		case LOGIN_SUCCESS:
			localStorage.setItem("access", payload.access);
			return {
				...state,
				isAuthenticated: true,
				access: payload.access,
				refresh: payload.refresh,
			};
		case USER_LOADED_SUCCESS:
			return {
				...state,
				user: payload,
			};
		case SIGNUP_SUCCESS:
			return {
				...state,
				isAuthenticated: false,
			};
		case AUTHENTICATED_FAIL:
			return {
				...state,
				isAuthenticated: false,
			};
		case USER_LOADED_FAIL:
			return {
				...state,
				user: null,
			};
		case SIGNUP_FAIL:
		case LOGIN_FAIL:
		case LOGOUT:
			localStorage.removeItem("access");
			localStorage.removeItem("refresh");
			return {
				...state,
				access: null,
				refresh: null,
				isAuthenticated: false,
				user: null,
			};
		case RESET_PASSWORD_SUCCESS:
		case RESET_PASSWORD_FAIL:
		case RESET_PASSWORD_CONFIRM_SUCCESS:
		case RESET_PASSWORD_CONFIRM_FAIL:
			return {
				...state,
			};
		default:
			return state;
	}
}
