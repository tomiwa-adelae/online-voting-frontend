import { postDataAPI } from "../../utils/api";
import Cookies from "js-cookie";

export const registerFunction = async (values) => {
  try {
    const res = await postDataAPI("auth/register", values);
    // Store user information in a cookie
    const userInfo = JSON.stringify(res.user);
    Cookies.set("currentUser", userInfo, {
      sameSite: "None",
      secure: true,
    });
    Cookies.set("token", res?.token, {
      sameSite: "None",
      secure: true,
    });
    

    return res;
  } catch (error) {
    throw error;
  }
};



export const loginFunction = async (values) => {
  try {
    const res = await postDataAPI("auth/login", values);
    // Store user information in a cookie
    const userInfo = JSON.stringify(res.user);
    Cookies.set("currentUser", userInfo, {
      sameSite: "None",
      secure: true,
    });
    Cookies.set("token", res?.token, {
      sameSite: "None",
      secure: true,
    });

    return res;
  } catch (error) {
    throw error;
  }
};
