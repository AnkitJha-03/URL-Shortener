import useAuthStore from "./auth.store";
import { refresh_user } from "../api/user.api";

const login = useAuthStore.getState().login;
const logout = useAuthStore.getState().logout;

const readyAuthStore = async () => {
  if (useAuthStore.getState().isAuthReady) return;

  try {
    const { user, urls } = await refresh_user();
    login(user, urls);
  } catch (err) {
    await logout();
  }
};

export default readyAuthStore;
