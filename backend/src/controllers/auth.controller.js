import wrapAsync from "../utils/try_catch_wrapper.util.js"
import { register_user, login_user } from "../services/auth.service.js";
import cookie_options from "../configs/cookie.config.js";
import { extract_user_data } from "../utils/helpers.util.js";

export const register = wrapAsync(async (req, res) => {
  const {name, email, password} = req.body;
  const {user, token} = await register_user(name, email, password);

  res.cookie("access_token", token, cookie_options);

  res.status(201).json({
    success: true,
    message: "User created successfully",
    data: {
      user: extract_user_data(user)
    }
  });
});

export const login = wrapAsync(async (req, res) => {
  const {email, password} = req.body;
  const {user, token} = await login_user(email, password);

  res.cookie("access_token", token, cookie_options);

  res.status(200).json({
    success: true,
    message: "User logged in successfully",
    data: {
      user: extract_user_data(user)
    }
  });
});

export const logout = wrapAsync(async (req, res) => {
  res.clearCookie("access_token", cookie_options);

  res.status(200).json({
    success: true,
    message: "User logged out successfully"
  });
});