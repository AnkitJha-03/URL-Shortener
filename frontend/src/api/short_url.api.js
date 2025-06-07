import axios_instance from "../utils/axios.util";

export const get_short_url = async (url) => {
  const response = await axios_instance.post("/create", {url});
  return response.data.data.short_url;
}