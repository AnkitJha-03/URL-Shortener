import User from "../models/user_schema.model.js";
import { AppError, ConflictError, NotFoundError } from "../utils/error_handler.util.js";

export const create_user = async (name, email, password) => {
  try {
    const existing_user = await User.findOne({email});
    if(existing_user) throw new ConflictError("User already exists");

    const user = new User({name, email, password});
    await user.save();
    return user;
  } catch (error) {
    throw new AppError("Internal server error");
  }
}

export const get_user_by_email = async (email) => {
  const user = await User.findOne({email});
  if(!user) throw new NotFoundError("User not found");

  return user;
}

export const get_user_by_id = async (id) => {
  const user = await User.findById(id);
  if(!User) throw new NotFoundError("User not found");

  return user;
}

export const update_user_refresh_token = async (user, refresh_token) => {
  user.refresh_token = refresh_token;
  await user.save();
}