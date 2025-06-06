import { create_user, get_user_by_email } from "../DAO/user.dao.js";
import { UnauthorizedError } from "../utils/error_handler.util.js";
import { hashed_password, compare_password, jwt_generator } from "../utils/helpers.util.js";

export const register_user = async (name, email, password) => {
  const hash_password = await hashed_password(password);
  const user = await create_user(name, email, hash_password);
  const token = jwt_generator(user._id);
  return {user, token};
};

// email verification
// export const verify_user = async () => {}

export const login_user = async (email, password) => {
  const user = await get_user_by_email(email);
  if(!user) throw new UnauthorizedError("Invalid credentials");

  const is_password_correct = await compare_password(password, user.password);
  if(!is_password_correct) throw new UnauthorizedError("Invalid credentials");

  const token = jwt_generator(user._id);
  return {user, token};
}