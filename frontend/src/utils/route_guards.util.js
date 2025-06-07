import axios_instance from "./axios.util";
import { redirect } from "@tanstack/react-router";

export const checkAuth = async () => {
  try {
    const auth = await axios_instance.get("/auth/verify", { withCredentials: true });
    console.log(auth);
  } catch (error) {
    throw redirect({ to: "/auth" });
  }
};