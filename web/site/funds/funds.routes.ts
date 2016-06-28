import { RouterConfig } from "@angular/router";

import { AuthGuard } from "guards/auth.guard";

import { FundsComponent } from "./funds.component";

export const FundsRoutes: RouterConfig = [
  {
    path: "funds",
    component: FundsComponent,
    canActivate: [ AuthGuard ],
  }
];
