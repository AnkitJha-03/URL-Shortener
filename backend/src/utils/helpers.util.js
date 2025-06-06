import { nanoid } from "nanoid";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

export const nanoid_generator = (length) => {
  return nanoid(length);
}

export const jwt_generator = (user_id) => {
  const token = jwt.sign(
    {user_id},
    process.env.JWT_SECRET,
    {expiresIn: "1d"}
  );
  return token;
}

export const hashed_password = (password) => {
  return bcrypt.hash(password, 10);
}

export const compare_password = (password, hashed_password) => {
  return bcrypt.compare(password, hashed_password);
}

export const decode_token = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
}

export const extract_user_data = (user) => {
  return {
    id: user._id,
    name: user.name,
    email: user.email
  }
}