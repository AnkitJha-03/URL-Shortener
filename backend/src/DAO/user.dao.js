import User from "../models/user_schema.model.js";
import { ConflictError, NotFoundError } from "../utils/error_handler.util.js";

export const create_user = async (name, email, password) => {
  try {
    const user = new User({name, email, password});
    await user.save();
    return user;
  } catch (error) {
    throw new ConflictError("User already exists");
  }
}

export const get_user_by_email = async (email) => {
  const user = await User.findOne({email});
  if(!User) throw new NotFoundError("User not found");

  return user;
}

export const get_user_by_id = async (id) => {
  const user = await User.findById(id);
  if(!User) throw new NotFoundError("User not found");

  return user;
}