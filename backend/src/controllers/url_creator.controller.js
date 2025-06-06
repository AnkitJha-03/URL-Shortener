import wrapAsync from "../utils/try_catch_wrapper.util.js";
import short_url_generator from "../services/short_url.service.js";

export const url_creator = wrapAsync(async (req, res) => {
  const {url, custom_short_url} = req.body;
  const short_url = await short_url_generator(url, req.user, custom_short_url);

  res.status(201).json({
    success: true,
    message: "Short URL created successfully",
    data: {
      short_url
    }
  });
});