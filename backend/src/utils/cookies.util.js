export const access_cookie_options = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "None",
  maxAge: 1000 * 60 * 60, // 1 hr
};

export const refresh_cookie_options = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "None",
  maxAge: 1000 * 60 * 60 * 24 * 2, // 2 day
};

export const set_cookies = (res, access_token, refresh_token) => {
  res.cookie("access_token", access_token, access_cookie_options);
  res.cookie("refresh_token", refresh_token, refresh_cookie_options);
};

export const clear_cookies = (res) => {
  res.clearCookie("access_token", access_cookie_options);
  res.clearCookie("refresh_token", refresh_cookie_options);
};
