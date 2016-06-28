import { RouterConfig } from "@angular/router";

import { AuthGuard } from "guards/auth.guard";

import { SettingsComponent } from "./settings.component";

export const SettingsRoutes: RouterConfig = [
  {
    path: "settings",
    component: SettingsComponent,
    canActivate: [ AuthGuard ],
  }
];
