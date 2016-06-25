import { RouterConfig } from "@angular/router";

import { AuthGuard } from "guards/auth.guard";

import { AccountComponent } from "./account.component";

export const AccountRoutes: RouterConfig = [
  {
    path: "account",
    component: AccountComponent,
    canActivate: [ AuthGuard ],
  }
];
