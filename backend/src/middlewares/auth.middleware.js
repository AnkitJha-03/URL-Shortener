import wrapAsync from "../utils/try_catch_wrapper.util.js";
import { ApiError, UnauthorizedError } from "../utils/error_handler.util.js";
import { decode_token, generate_tokens } from "../utils/jwt.util.js";
import { set_cookies } from "../utils/cookies.util.js";
import { get_user_by_id, update_user_refresh_token } from "../DAO/user.dao.js";

export const isAuthenticated = wrapAsync(async (req, res, next) => {
  const access_token = req.cookies.access_token;
  const refresh_token = req.cookies.refresh_token;

  // No tokens provided
  if (!access_token && !refresh_token) {
    throw new UnauthorizedError("Authentication required - please log in");
  }

  try {
    // Try to verify access token first
    const { id: user_id } = decode_token(access_token);
    req.user_id = user_id;
    return next();
  } catch (accessTokenError) {
    // Access token is invalid (expired or malformed)
    if (!refresh_token) {
      throw new UnauthorizedError("Session expired - please log in again");
    }

    try {
      // Verify refresh token
      const { id: user_id } = decode_token(refresh_token);
      const user = await get_user_by_id(user_id);

      if (!user) {
        throw new UnauthorizedError("Invalid refresh token - please log in again");
      }

      if (user.refresh_token !== refresh_token) {
        throw new UnauthorizedError("Refresh token mismatch - possible security issue");
      }

      const { access_token: new_access_token, refresh_token: new_refresh_token } = generate_tokens(user._id);
      await update_user_refresh_token(user, new_refresh_token);
      set_cookies(res, new_access_token, new_refresh_token);

      req.user_id = user_id;
      return next();
    } catch (refreshTokenError) {
      throw refreshTokenError;
    }
  }
});
