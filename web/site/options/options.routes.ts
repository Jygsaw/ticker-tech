import { RouterConfig } from "@angular/router";

import { AuthGuard } from "guards/auth.guard";

import { OptionsComponent } from "./options.component";

export const OptionsRoutes: RouterConfig = [
  {
    path: "options",
    component: OptionsComponent,
    canActivate: [ AuthGuard ],
  }
];
