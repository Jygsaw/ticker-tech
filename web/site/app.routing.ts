import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AuthGuard } from "guards/auth.guard";

import { BalancesComponent } from "./balances/balances.component";
import { OrdersComponent } from "./orders/orders.component";
import { PositionsComponent } from "./positions/positions.component";
import { TradeComponent } from "./trade/trade.component";

const appRoutes: Routes = [
  {
    path: "",
    redirectTo: "/home",
    pathMatch: "full",
  },
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
  {
    path: "trade",
    component: TradeComponent,
    canActivate: [ AuthGuard ],
  },
];

export const appRoutingProviders: any[] = [
  AuthGuard,
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
