import { nanoid } from "nanoid";
import bcrypt from "bcrypt";

export const nanoid_generator = (length) => {
  return nanoid(length);
};

export const hash_password = async (password) => {
  return await bcrypt.hash(password, 10);
};

export const compare_password = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

export const format_user = (user) => {
  return {
    id: user._id || user.id,
    name: user.name,
    email: user.email,
  };
};
