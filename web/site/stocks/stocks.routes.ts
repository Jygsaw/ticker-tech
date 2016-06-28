import { RouterConfig } from "@angular/router";

import { AuthGuard } from "guards/auth.guard";

import { StocksComponent } from "./stocks.component";

export const StocksRoutes: RouterConfig = [
  {
    path: "stocks",
    component: StocksComponent,
    canActivate: [ AuthGuard ],
  }
];
