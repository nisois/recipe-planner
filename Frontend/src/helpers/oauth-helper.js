import Cookies from "js-cookie";

export const getAccessToken = () => {
  Cookies.get("token");
};
export const setAccessToken = token =>
  Cookies.set("token", token, { expires: 60 });
export const removeAccessToken = () => {
  Cookies.remove("token");
};
