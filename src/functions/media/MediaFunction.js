import { postDataAPI } from "../../utils/api";

export const uploadMedia = async (data) => {
	try {
		let formData = new FormData();
		formData.append("path", data.path); // Append upload path to FormData

		// Append media files to FormData
		data.files.forEach((media) => {
			formData.append("file", media); // Append each media file
		});

		const res = await postDataAPI("uploadMedia", formData); // Ensure await is used
		return res;
	} catch (error) {
		throw error;
	}
};
