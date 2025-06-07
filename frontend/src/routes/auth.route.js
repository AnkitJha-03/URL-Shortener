import { rootRoute } from "./root.route.js";
import { createRoute } from "@tanstack/react-router";
import AuthPage from "../pages/AuthPage";

export const authRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/auth",
  component: AuthPage
});