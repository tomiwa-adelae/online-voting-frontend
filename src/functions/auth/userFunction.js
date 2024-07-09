import { putDataAPI, postDataAPI } from "../../utils/api";

export const updateUserProfile = async (data) => {
	try {
		const res = await putDataAPI("user", data);
		return res;
	} catch (error) {
		throw new error();
	}
};

export const castVote = async (data, id) => {
	try {
		const res = await postDataAPI(`candidates/${id}/vote`, data);
		return res;
	} catch (error) {
		throw new error();
	}
};
