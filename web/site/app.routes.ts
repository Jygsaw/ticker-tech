import { provideRouter, RouterConfig } from "@angular/router";

import { PublicRoutes } from "./public/public.routes";

export const routes: RouterConfig = [
  {
    path: "",
    redirectTo: "/home",
    terminal: true,
  },
  ...PublicRoutes,
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes),
];
