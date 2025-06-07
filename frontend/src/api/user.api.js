import axios_instance from "../utils/axios.util";

export const login_user = async (email, password) => {
  const response = await axios_instance.post("auth/login", {email, password}, {withCredentials: true});
  return response.data.data.user;
}

export const register_user = async (name, email, password) => {
  try {
    const response = await axios_instance.post("auth/register", {name, email, password}, {withCredentials: true});
    return response.data.data.user;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Something went wrong");
  }
}

export const logout_user = async () => {
  const response = await axios_instance.post("auth/logout", {}, {withCredentials: true});
  return response.data;
}