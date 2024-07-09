import axios from "axios";
import Cookies from "js-cookie";

export const apiUrl = "http://localhost:9000/api"; // Replace with your actual API URL

const setupAxiosInterceptors = (token) => {
	axios.interceptors.request.use(
		(config) => {
			// Add authorization header with token to the request
			config.headers.Authorization = token; // Assuming token type is just the token without Bearer

			return config;
		},
		(error) => {
			return Promise.reject(error);
		}
	);
};

export const initializeAxiosInterceptors = () => {
	// const token = Cookies.get("token");
	const token = localStorage.getItem("token");

	if (token) {
		setupAxiosInterceptors(token);
	}
};

export const getDataAPI = async (url, onProgress) => {
	try {
		const res = await axios.get(`${apiUrl}/${url}`, {
			withCredentials: true,
			onDownloadProgress: onProgress,
		});
		return res.data;
	} catch (error) {
		if (error.response && error.response.status === 401) {
			// Clear cookies for current user and token
			// Cookies.remove("currentUs  er");
			// Cookies.remove("token");
			localStorage.removeItem("currentUser");
			localStorage.removeItem("token");
			// Redirect to the login page or perform any other action as needed
			window.location.href = "/signin"; // Example redirect to login page
		}
		throw error;
	}
};

export const postDataAPI = async (url, post, onProgress) => {
	try {
		const res = await axios.post(`${apiUrl}/${url}`, post, {
			withCredentials: true,
			onUploadProgress: onProgress,
		});
		return res.data;
	} catch (error) {
		console.error("Error posting data:", error);
		throw error;
	}
};

export const putDataAPI = async (url, post, onProgress) => {
	try {
		const res = await axios.put(`${apiUrl}/${url}`, post, {
			withCredentials: true,
			onUploadProgress: onProgress,
		});
		return res.data;
	} catch (error) {
		throw error;
	}
};

export const patchDataAPI = async (url, post, onProgress) => {
	try {
		const res = await axios.patch(`${apiUrl}/${url}`, post, {
			withCredentials: true,
			onUploadProgress: onProgress,
		});
		return res.data;
	} catch (error) {
		throw error;
	}
};

export const deleteDataAPI = async (url, onProgress) => {
	try {
		const res = await axios.delete(`${apiUrl}/${url}`, {
			withCredentials: true,
			onDownloadProgress: onProgress,
		});
		return res.data;
	} catch (error) {
		throw error;
	}
};

// send Media
export const postMediaAPI = async (url, post, onProgress) => {
	try {
		const res = await axios.post(`${apiUrl}/${url}`, post, {
			withCredentials: true,
			headers: { "Content-Type": "multipart/form-data" },
			onUploadProgress: onProgress,
		});
		return res.data;
	} catch (error) {
		throw error;
	}
};
