import { RouterConfig } from "@angular/router";

import { AuthGuard } from "guards/auth.guard";

import { StocksComponent } from "./stocks.component";
import { StockPositionsComponent } from "./stock-positions/stock-positions.component";
import { StockPulseComponent } from "./stock-pulse/stock-pulse.component";
import { StockResearchComponent } from "./stock-research/stock-research.component";
import { StockTradesComponent } from "./stock-trades/stock-trades.component";

export const StocksRoutes: RouterConfig = [
  {
    path: "stocks",
    component: StocksComponent,
    canActivate: [ AuthGuard ],
    children: [
      {
        path: "",
        component: StockPositionsComponent,
      },
      {
        path: "stock-positions",
        component: StockPositionsComponent,
      },
      {
        path: "stock-pulse",
        component: StockPulseComponent,
      },
      {
        path: "stock-research",
        component: StockResearchComponent,
      },
      {
        path: "stock-trades",
        component: StockTradesComponent,
      },
    ],
  }
];
