import axios_instance from "../utils/axios.util";

export const get_short_url = async (url, custom_short_url) => {
  const response = await axios_instance.post("/url/create", { url, custom_short_url }, { withCredentials: true });
  return response.data.data.url_data;
};

export const delete_url = async (url) => {
  const response = await axios_instance.delete(`/url/delete/${url._id}`, {
    withCredentials: true,
  });
  return response.data;
};
