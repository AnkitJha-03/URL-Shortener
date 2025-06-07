import { rootRoute } from "./root.route.js";
import { createRoute } from "@tanstack/react-router";
import AboutPage from "../pages/AboutPage.jsx";

export const authRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/auth",
  component: AboutPage
});