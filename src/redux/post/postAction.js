import axios from "axios";
import {
	ALL_POST_SUCCESS,
	ALL_POST_FAIL,
	DETAIL_POST_SUCCESS,
	DETAIL_POST_FAIL,
	CATEGORY_SUCCESS,
	CATEGORY_FAIL,
} from "./types";


// get all post

export const getPosts = () => async (dispatch) => {
	if (localStorage.getItem("access")) {
		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `JWT ${localStorage.getItem("access")}`,
				Accept: "application/json",
			},
		};

		try {
			const res = await axios.get(
				`${process.env.REACT_APP_API_URL}/api/posts/`,
				config
			);

			dispatch({
				type: ALL_POST_SUCCESS,
				payload: res.data,
			});
			console.log(res.data)

		} catch (err) {
			dispatch({
				type: ALL_POST_FAIL,
			});
		}

	} else {
		dispatch({
			type: ALL_POST_FAIL,
		});
	}
};

// get detail post

export const detailPost = (articleID) => async (dispatch) => {
	if (localStorage.getItem("access")) {
		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `JWT ${localStorage.getItem("access")}`,
				Accept: "application/json",
			},
		};

		try {
			const res = await axios.get(
				`${process.env.REACT_APP_API_URL}/api/${articleID}/`,
				config
			);

			dispatch({
				type: DETAIL_POST_SUCCESS,
				payload: res.data,
			});
		} catch (err) {
			dispatch({
				type: DETAIL_POST_FAIL,
			});
		}
	} else {
		dispatch({
			type: DETAIL_POST_FAIL,
		});
	}
};


// get all category

export const categories = () => async (dispatch) => {
	if (localStorage.getItem("access")) {
		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `JWT ${localStorage.getItem("access")}`,
				Accept: "application/json",
			},
		};

		try {
			const res = await axios.get(
				`${process.env.REACT_APP_API_URL}/api/category/`,
				config
			);

			dispatch({
				type: CATEGORY_SUCCESS,
				payload: res.data,
			});
		} catch (err) {
			dispatch({
				type: CATEGORY_FAIL,
			});
		}
	} else {
		dispatch({
			type: CATEGORY_FAIL,
		});
	}
};
