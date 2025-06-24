import { rootRoute } from "./root.route.js";
import { createRoute } from "@tanstack/react-router";
import AuthPage from "../pages/AuthPage";
import { ifNotLoggedIn } from "../utils/protect.route.util.js";

export const authRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/auth",
  component: AuthPage,
  beforeLoad: () => ifNotLoggedIn(),
});
