import {
	postDataAPI,
	putDataAPI,
	getDataAPI,
	deleteDataAPI,
} from "../../utils/api";

export const createElections = async (values) => {
	try {
		const res = await postDataAPI("elections", values);
		return res;
	} catch (error) {
		throw error;
	}
};

export const updateElection = async (electionId, updatedData) => {
	try {
		const res = await putDataAPI(`elections/${electionId}`, updatedData);
		return res;
	} catch (error) {
		throw error;
	}
};

export const getElection = async (electionId) => {
	try {
		const res = await getDataAPI(`elections/${electionId}`);
		return res;
	} catch (error) {
		throw error;
	}
};

export const deleteElection = async (electionId) => {
	try {
		const res = await deleteDataAPI(`elections/${electionId}`);
		return res;
	} catch (error) {
		throw error;
	}
};
