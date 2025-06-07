import { rootRoute } from "./root.route.js";
import { createRoute } from "@tanstack/react-router";
import Dashboard from "../pages/Dashboard";
import { checkAuth } from "../utils/route_guards.util.js";

export const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/Dashboard",
  component: Dashboard,
  beforeLoad: checkAuth
});