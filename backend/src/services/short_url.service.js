import { nanoid_generator } from "../utils/helpers.util.js";
import { save_short_url } from "../DAO/url.dao.js";
import { get_urls_by_user_id } from "../DAO/url.dao.js";

export const short_url_generator = async (url, custom_short_url, user_id) => {
  const short_url = custom_short_url || nanoid_generator(7);
  await save_short_url(url, short_url, user_id);
  return short_url;
}

export const get_all_urls = async (user_id) => {
  return await get_urls_by_user_id(user_id);
}