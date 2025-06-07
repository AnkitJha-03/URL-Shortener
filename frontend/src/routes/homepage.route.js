import { rootRoute } from "./root.route.js";
import { createRoute } from "@tanstack/react-router";
import HomePage from "../pages/HomePage";

export const homepageRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});
