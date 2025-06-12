import URL from "../models/url_schema.model.js";
import { ConflictError, NotFoundError } from "../utils/error_handler.util.js";

export const save_short_url = async (long_url, short_url, user) => {
  try {
    const new_url = new URL({
      long_url,
      short_url,
      user,
    });

    return await new_url.save();
  } catch (error) {
    throw new ConflictError("URL already exists");
  }
};

export const get_long_url = async (short_url) => {
  const url = await URL.findOneAndUpdate({ short_url }, { $inc: { clicks: 1 } });
  if (!url) throw new NotFoundError("URL not found");

  return url.long_url;
};

export const get_urls_by_user_id = async (user_id) => {
  return await URL.find({ user: user_id });
};

export const delete_url = async (url_id, user_id) => {
  const result = await URL.deleteOne({ _id: url_id, user: user_id });
  if (result.deletedCount === 0) throw new NotFoundError("URL not found or you do not have permission to delete it");
};
