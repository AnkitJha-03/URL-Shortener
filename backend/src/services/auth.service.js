import { UnauthorizedError } from "../utils/error_handler.util.js";
import { create_user, get_user_by_email, get_user_by_id, update_user_refresh_token } from "../DAO/user.dao.js";
import { hash_password, compare_password } from "../utils/helpers.util.js";
import { generate_tokens } from "../utils/jwt.util.js";
import { decode } from "jsonwebtoken";

export const register_user = async (name, email, password) => {
  const hashed_password = await hash_password(password);
  const user = await create_user(name, email, hashed_password);

  const {access_token, refresh_token} = generate_tokens(user._id);
  await update_user_refresh_token(user, refresh_token);
  
  return {user, access_token, refresh_token};
};

// email verification
// export const verify_user = async () => {}

export const login_user = async (email, password) => {
  const user = await get_user_by_email(email);
  if(!user) throw new UnauthorizedError("Invalid credentials");

  const is_password_correct = await compare_password(password, user.password);
  if(!is_password_correct) throw new UnauthorizedError("Invalid credentials");

  const {access_token, refresh_token} = generate_tokens(user._id);
  await update_user_refresh_token(user, refresh_token);

  return {user, access_token, refresh_token};
}

export const get_user = async (user_id) => {
  const user = await get_user_by_id(user_id);
  return user;
}