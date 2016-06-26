import { provideRouter, RouterConfig } from "@angular/router";

import { AuthService } from "services/auth.service";

import { LoginRoutes } from "./login/login.routes";
import { PublicRoutes } from "./public/public.routes";

export const routes: RouterConfig = [
  {
    path: "",
    redirectTo: "/home",
    terminal: true,
  },
  ...LoginRoutes,
  ...PublicRoutes,
];

export const APP_ROUTER_PROVIDERS = [
  AuthService,
  provideRouter(routes),
];
