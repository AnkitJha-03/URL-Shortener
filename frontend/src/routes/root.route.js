import { createRootRoute, createRouter } from "@tanstack/react-router";
import RootLayout from "../layouts/RootLayout.jsx";
import { authRoute } from "./auth.route.js";
import { homepageRoute } from "./homepage.route.js";
import { dashboardRoute } from "./dashboard.route.js";
import { aboutRoute } from "./about.route.js";
import readyAuthStore from "../stores/auth.store.ready.js";

export const rootRoute = createRootRoute({
  component: RootLayout,
  beforeLoad: () => readyAuthStore(),
});

rootRoute.addChildren([authRoute, homepageRoute, dashboardRoute, aboutRoute]);

export const router = createRouter({
  routeTree: rootRoute,
});
