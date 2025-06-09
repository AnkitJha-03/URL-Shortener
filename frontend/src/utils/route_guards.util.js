import { redirect } from "@tanstack/react-router";
import useAuthStore from "../stores/auth.store";
import { refresh_user } from "../api/user.api";

export const checkAuth = async () => {
  const isLoggedIn = useAuthStore.getState().isLoggedIn || await refresh_user();
  if (!isLoggedIn) throw redirect({ to: "/auth" });
};