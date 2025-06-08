import { nanoid_generator } from "../utils/helpers.util.js";
import { save_short_url } from "../DAO/url.dao.js";

const short_url_generator = async (url, custom_short_url, user) => {
  const short_url = custom_short_url || nanoid_generator(7);
  await save_short_url(url, short_url, user);
  return short_url;
}

export default short_url_generator;