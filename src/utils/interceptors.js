/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
import { logout } from "../features/auth/authSlice";

import axios from "axios";
// import { toast } from "react-toastify";

/**
 * Define interceptor to handle api resoponse and set header value
 */
export default {
	setupInterceptors: (store) => {
		axios.interceptors.response.use(
			(response) => {
				return response;
			},
			(error) => {
				if (error?.response?.data?.message === 'Invalid api-token') {
					// store.
					localStorage.clear();
					localStorage.removeItem("user");
					store.dispatch(logout())
				}
				return Promise.reject(error);
			}
		);
	},
};
