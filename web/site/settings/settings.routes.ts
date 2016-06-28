import { RouterConfig } from "@angular/router";

import { AuthGuard } from "guards/auth.guard";

import { SettingsComponent } from "./settings.component";
import { ProfileComponent } from "./profile/profile.component";
import { SecurityComponent } from "./security/security.component";

export const SettingsRoutes: RouterConfig = [
  {
    path: "settings",
    component: SettingsComponent,
    canActivate: [ AuthGuard ],
    children: [
      {
        path: "",
        component: ProfileComponent,
      },
      {
        path: "profile",
        component: ProfileComponent,
      },
      {
        path: "security",
        component: SecurityComponent,
      }
    ],
  }
];