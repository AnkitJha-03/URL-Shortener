import { rootRoute } from "./root.route.js";
import { createRoute } from "@tanstack/react-router";
import AboutPage from "../pages/AboutPage.jsx";

export const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: AboutPage,
});
