import axios_instance from "../utils/axios.utils";

export const get_short_url = async (url) => {
  const response = await axios_instance.post("/api/v1/create", {url});
  return response.data.data.short_url;
}