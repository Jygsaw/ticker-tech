import { provideRouter, RouterConfig } from "@angular/router";

import { AuthGuard } from "guards/auth.guard";
import { AuthService } from "services/auth.service";

import { AccountRoutes } from "./account/account.routes";
import { LoginRoutes } from "./login/login.routes";
import { PublicRoutes } from "./public/public.routes";
import { SettingsRoutes } from "./settings/settings.routes";

export const routes: RouterConfig = [
  {
    path: "",
    redirectTo: "/home",
    terminal: true,
  },
  ...AccountRoutes,
  ...LoginRoutes,
  ...PublicRoutes,
  ...SettingsRoutes,
];

export const APP_ROUTER_PROVIDERS = [
  AuthGuard,
  AuthService,
  provideRouter(routes),
];
