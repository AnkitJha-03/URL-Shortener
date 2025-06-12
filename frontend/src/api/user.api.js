import axios_instance from "../utils/axios.util";

export const register_user = async (name, email, password) => {
  const response = await axios_instance.post("auth/register", { name, email, password }, { withCredentials: true });
  return response.data.data;
};

export const login_user = async (email, password) => {
  const response = await axios_instance.post("auth/login", { email, password }, { withCredentials: true });
  return response.data.data;
};

export const logout_user = async () => {
  const response = await axios_instance.post("auth/logout", {}, { withCredentials: true });
  return response.data;
};

export const refresh_user = async () => {
  const response = await axios_instance.post("auth/refresh", {}, { withCredentials: true });
  return response.data.data;
};
