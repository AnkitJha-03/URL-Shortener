import jwt from "jsonwebtoken";
import { update_user_refresh_token } from "../DAO/user.dao.js";
import { format_user } from "./helpers.util.js";

export const jwt_generator = (user_id, expIn) => {
  const token = jwt.sign(user_id, process.env.JWT_SECRET, { expiresIn: expIn });
  return token;
};

export const decode_token = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

export const generate_tokens = (user_id) => {
  const access_token = jwt_generator(format_user(user_id), "1h");
  const refresh_token = jwt_generator(format_user(user_id), "2d");
  return { access_token, refresh_token };
};
