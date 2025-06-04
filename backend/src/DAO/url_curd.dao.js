import URL from "../models/url_schema.model.js";

export const save_short_url = async (long_url, short_url) => {
  const new_url = new URL({
    long_url,
    short_url,
  });
  await new_url.save();
}

export const get_long_url = async (short_url) => {
  const url = await URL.findOneAndUpdate({short_url}, {$inc: {clicks: 1}});
  if(!url) {
    console.log("Short URL not found");
    return null;
  }

  return url.long_url;
}