import { rootRoute } from "./root.route.js";
import { createRoute } from "@tanstack/react-router";
import Dashboard from "../pages/Dashboard";
import { ifLoggedIn } from "../utils/protect.route.util.js";

export const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/Dashboard",
  component: Dashboard,
  beforeLoad: () => ifLoggedIn(),
});
