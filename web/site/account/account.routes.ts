import { RouterConfig } from "@angular/router";

import { AuthGuard } from "guards/auth.guard";

import { AccountComponent } from "./account.component";
import { BalancesComponent } from "./balances/balances.component";
import { OrdersComponent } from "./orders/orders.component";
import { PositionsComponent } from "./positions/positions.component";
import { TransfersComponent } from "./transfers/transfers.component";

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
      {
        path: "orders",
        component: OrdersComponent,
      },
      {
        path: "positions",
        component: PositionsComponent,
      },
      {
        path: "transfers",
        component: TransfersComponent,
      },
    ],
  }
];
