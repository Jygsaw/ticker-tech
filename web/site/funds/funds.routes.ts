import { RouterConfig } from "@angular/router";

import { AuthGuard } from "guards/auth.guard";

import { FundsComponent } from "./funds.component";
import { FundPositionsComponent } from "./fund-positions/fund-positions.component";
import { FundTradesComponent } from "./fund-trades/fund-trades.component";

export const FundsRoutes: RouterConfig = [
  {
    path: "funds",
    component: FundsComponent,
    canActivate: [ AuthGuard ],
    children: [
      {
        path: "",
        component: FundPositionsComponent,
      },
      {
        path: "fund-positions",
        component: FundPositionsComponent,
      },
      {
        path: "fund-trades",
        component: FundTradesComponent,
      },
    ],
  }
];
