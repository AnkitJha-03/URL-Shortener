import wrapAsync from "../utils/try_catch_wrapper.util.js";
import { ApiError, UnauthorizedError } from "../utils/error_handler.util.js";
import { decode_token, generate_tokens } from "../utils/jwt.util.js";
import { set_cookies } from "../utils/cookies.util.js";
import { get_user_by_id, update_user_refresh_token } from "../DAO/user.dao.js";

export const isAuthenticated = wrapAsync(async (req, res, next) => {
  const access_token = req.cookies.access_token;
  const refresh_token = req.cookies.refresh_token;

  if(!access_token && !refresh_token) throw new UnauthorizedError("Session expired");
  
  try {
    const { id: user_id } = decode_token(access_token);
    req.user_id = user_id
    next();
  } catch (error) {
    try {
      const { id: user_id } = decode_token(refresh_token);
      const user = await get_user_by_id(user_id);
      if(!user) throw new UnauthorizedError("invalid refresh token");
      
      const {access_token: new_access_token, refresh_token: new_refresh_token} = generate_tokens(user._id);
      await update_user_refresh_token(user, new_refresh_token);
      
      set_cookies(res, new_access_token, new_refresh_token);
      req.user_id = user_id;
      req.user = user;
      next();
    } catch (error) {
      throw new ApiError("Internal server error");
    }
  }
});