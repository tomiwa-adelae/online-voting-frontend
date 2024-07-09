import { getDataAPI } from "../../utils/api";

export const fetchUsers = async () => {
  try {
    const res = await getDataAPI("users");
    return res;
  } catch (error) {
    throw error;
  }
};
