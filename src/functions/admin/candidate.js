import {
  postDataAPI,
  putDataAPI,
  getDataAPI,
  deleteDataAPI,
} from "../../utils/api";

export const addCandidate = async (values) => {
  try {
    const res = await postDataAPI("candidates", values);
    return res;
  } catch (error) {
    throw error;
  }
};


export const fetchAllCandidate = async () => {
  try {
    const res = await getDataAPI("candidates");
    return res;
  } catch (error) {
    throw error;
  }
};


export const updateCandidate = async (candidateId, updatedData) => {
  try {
    const res = await putDataAPI(`candidates/${candidateId}`, updatedData);
    return res;
  } catch (error) {
    throw error;
  }
};

export const getCandidate = async (candidateId) => {
  try {
    const res = await getDataAPI(`candidates/${candidateId}`);
    return res;
  } catch (error) {
    throw error;
  }
};

export const deleteCandidate = async (candidateId) => {
  try {
    const res = await deleteDataAPI(`/elections/${candidateId}/candidates/`);
    return res;
  } catch (error) {
    throw error;
  }
};


export const getElectionCandidate = async (candidateId) => {
  try {
    const res = await getDataAPI(`elections/${candidateId}/candidates`);
    return res;
  } catch (error) {
    throw error;
  }
};