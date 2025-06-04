import { nanoid_generator } from "../utils/helpers.util.js";
import { save_short_url } from "../DAO/url_curd.dao.js";

const short_url_generator = async (url) => {
  const short_url = nanoid_generator(7);
  await save_short_url(url, short_url);
  return short_url;
}

export default short_url_generator;