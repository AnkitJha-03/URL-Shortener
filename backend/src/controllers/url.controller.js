import wrapAsync from "../utils/try_catch_wrapper.util.js";
import { BadRequestError } from "../utils/error_handler.util.js";
import { short_url_generator, get_all_urls, delete_user_url } from "../services/short_url.service.js";

const url_cleaner = (url) => {
  // Remove spaces at start and end
  let trimmed = url.trim();
  // Replace all groups of spaces/tabs/newlines inside with a single hyphen
  let modified_url = trimmed.replace(/\s+/g, "-");
  // Check if only allowed characters remain
  let allowed = /^[A-Za-z0-9_-]+$/;
  if (modified_url && !allowed.test(modified_url)) throw new BadRequestError("Invalid Short Url");

  return modified_url;
};

export const create_url = wrapAsync(async (req, res) => {
  let { url, custom_short_url } = req.body;
  let user_id = req.user_id;
  custom_short_url = url_cleaner(custom_short_url);

  const url_data = await short_url_generator(url, custom_short_url, user_id);

  res.status(201).json({
    success: true,
    message: "Short URL created successfully",
    data: {
      url_data,
    },
  });
});

export const get_urls = wrapAsync(async (req, res) => {
  const user_id = req.user_id;
  const urls = await get_all_urls(user_id);

  res.status(200).json({
    success: true,
    message: "URLs fetched successfully",
    data: {
      urls,
    },
  });
});

export const delete_url = wrapAsync(async (req, res) => {
  const user_id = req.user_id;
  const url_id = req.params.id;
  await delete_user_url(url_id, user_id);

  res.status(200).json({
    success: true,
    message: "Short URL deleted successfully",
  });
});

export const get_url_analytics = wrapAsync(async (_, res) => {
  // TODO: Implement analytics fetching logic

  res.status(501).json({
    success: true,
    message: "Service not implemented yet",
  });
});
