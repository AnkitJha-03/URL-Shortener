import wrapAsync from "../utils/try_catch_wrapper.util.js";
import short_url_generator from "../services/short_url.service.js";
import { get_user_by_id } from "../DAO/user.dao.js";
import { BadRequestError } from "../utils/error_handler.util.js";

const url_cleaner = (url) => {
  // Remove spaces at start and end
  let trimmed = url.trim();
  // Replace all groups of spaces/tabs/newlines inside with a single hyphen
  let modified_url = trimmed.replace(/\s+/g, '-');
  // Check if only allowed characters remain
  let allowed = /^[A-Za-z0-9_-]+$/;
  if(modified_url && !allowed.test(modified_url)) throw new BadRequestError("Invalid Short Url");

  return modified_url
}

export const url_creator = wrapAsync(async (req, res) => {
  let {url, custom_short_url} = req.body;
  let user_id = req.user_id;
  custom_short_url = url_cleaner(custom_short_url);

  const user = req.user || (await get_user_by_id(user_id));

  const short_url = await short_url_generator(url, custom_short_url, user);

  res.status(201).json({
    success: true,
    message: "Short URL created successfully",
    data: {
      short_url
    }
  });
});