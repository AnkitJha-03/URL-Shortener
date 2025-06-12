import { redirect } from "@tanstack/react-router";
import useAuthStore from "../stores/auth.store";

const protectRoute = async () => {
  const isLoggedIn = useAuthStore.getState().isLoggedIn;
  if (!isLoggedIn) throw redirect({ to: "/auth" });
};

export default protectRoute;
