import { decode_token } from "../utils/helpers.util.js";
import { get_user_by_id } from "../DAO/user.dao.js";
import { UnauthorizedError } from "../utils/error_handler.util.js";

export const isAuthenticated = async (req, res, next) => {
  const token = req.cookies.access_token;
  
  try {
    const decode = decode_token(token);
    const user = await get_user_by_id(decode.user_id);
    if(!user) throw new UnauthorizedError("Unauthorized access");

    req.user = user;
    next();
  } catch {
    throw new UnauthorizedError("authentication failed");
  }
}