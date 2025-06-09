import wrapAsync from "../utils/try_catch_wrapper.util.js"
import { register_user, login_user, get_user } from "../services/auth.service.js";
import { set_cookies, clear_cookies } from "../utils/cookies.util.js";
import { format_user } from "../utils/helpers.util.js";

export const register = wrapAsync(async (req, res) => {
  const {name, email, password} = req.body;
  const {user, access_tokens, refresh_token} = await register_user(name, email, password);

  set_cookies(res, access_tokens, refresh_token);

  res.status(201).json({
    success: true,
    message: "User created successfully",
    data: {
      user: format_user(user)
    }
  });
});

// email verification
// export const verify = wrapAsync(async (req, res) => {})

export const login = wrapAsync(async (req, res) => {
  const {email, password} = req.body;
  const {user, access_token, refresh_token} = await login_user(email, password);
  
  set_cookies(res, access_token, refresh_token);

  res.status(200).json({
    success: true,
    message: "User logged in successfully",
    data: {
      user: format_user(user)
    }
  });
});

export const logout = wrapAsync(async (req, res) => {
  clear_cookies(res);

  res.status(200).json({
    success: true,
    message: "User logged out successfully"
  });
});

export const refresh = wrapAsync(async (req, res) => {
  const user = req.user || await get_user(req.user_id);
  res.status(200).json({
    success: true,
    message: "User fetched successfully",
    data: {
      user: format_user(user)
    }
  });
});