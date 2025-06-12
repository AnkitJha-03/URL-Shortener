import wrapAsync from "../utils/try_catch_wrapper.util.js";
import { get_long_url } from "../DAO/url.dao.js";

export const redirector = wrapAsync(async (req, res) => {
  const { short_url } = req.params;
  const long_url = await get_long_url(short_url);

  res.redirect(301, long_url);
});
