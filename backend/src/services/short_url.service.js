import { nanoid_generator } from "../utils/helpers.util.js";
import { save_short_url, get_urls_by_user_id, delete_url } from "../DAO/url.dao.js";

export const short_url_generator = async (url, custom_short_url, user_id) => {
  const short_url = custom_short_url || nanoid_generator(7);
  const url_data = await save_short_url(url, short_url, user_id);
  return url_data;
};

export const get_all_urls = async (user_id) => {
  return await get_urls_by_user_id(user_id);
};

export const delete_user_url = async (url_id, user_id) => {
  await delete_url(url_id, user_id);
};
