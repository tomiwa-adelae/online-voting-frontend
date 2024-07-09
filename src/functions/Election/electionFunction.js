import { getDataAPI, postDataAPI } from "../../utils/api";

export const fetchElectionHandler = async (values) => {
  try {
    const res = await getDataAPI("elections", values);
    return res;
  } catch (error) {
    throw error;
  }
};


