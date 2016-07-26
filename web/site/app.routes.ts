import { provideRouter, RouterConfig } from "@angular/router";

import { AuthGuard } from "guards/auth.guard";
import { AuthService } from "services/auth.service";

import { AccountRoutes } from "./account/account.routes";
import { LoginRoutes } from "./login/login.routes";
import { PublicRoutes } from "./public/public.routes";

import { BalancesComponent } from "./balances/balances.component";
import { OrdersComponent } from "./orders/orders.component";
import { PositionsComponent } from "./positions/positions.component";

export const routes: RouterConfig = [
  {
    path: "",
    redirectTo: "/home",
    terminal: true,
  },
  ...AccountRoutes,
  ...LoginRoutes,
  ...PublicRoutes,
  {
    path: "balances",
    component: BalancesComponent,
    canActivate: [ AuthGuard ],
  },
  {
    path: "orders",
    component: OrdersComponent,
    canActivate: [ AuthGuard ],
  },
  {
    path: "positions",
    component: PositionsComponent,
    canActivate: [ AuthGuard ],
  },
];

export const APP_ROUTER_PROVIDERS = [
  AuthGuard,
  AuthService,
  provideRouter(routes),
];
