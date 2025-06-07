import { createRootRoute, createRouter } from "@tanstack/react-router";
import RootLayout from "../layouts/RootLayout.jsx";
import { authRoute } from "./auth.route.js"
import { homepageRoute } from "./homepage.route.js";
import { dashboardRoute } from "./dashboard.route.js"

export const rootRoute = createRootRoute({
  component: RootLayout
})

rootRoute.addChildren([
  authRoute,
  homepageRoute,
  dashboardRoute
]);

export const router = createRouter({
  routeTree: rootRoute
});