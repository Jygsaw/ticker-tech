import { RouterConfig } from "@angular/router";

import { AuthGuard } from "guards/auth.guard";

import { AccountComponent } from "./account.component";
import { BalancesComponent } from "./balances/balances.component";

export const AccountRoutes: RouterConfig = [
  {
    path: "account",
    component: AccountComponent,
    canActivate: [ AuthGuard ],
    children: [
      {
        path: "",
        component: BalancesComponent,
      },
      {
        path: "balances",
        component: BalancesComponent,
      },
    ],
  }
];
