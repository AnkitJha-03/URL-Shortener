import { redirect } from "@tanstack/react-router";
import useAuthStore from "../stores/auth.store";

export const ifLoggedIn = async () => {
  const isLoggedIn = useAuthStore.getState().isLoggedIn;
  if (!isLoggedIn) throw redirect({ to: "/auth" });
};

export const ifNotLoggedIn = async () => {
  const isLoggedIn = useAuthStore.getState().isLoggedIn;
  if (isLoggedIn) throw redirect({ to: "/" });
};