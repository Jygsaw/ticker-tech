import { RouterConfig } from "@angular/router";

import { AuthGuard } from "guards/auth.guard";

import { OptionsComponent } from "./options.component";
import { OptionPositionsComponent } from  "./option-positions/option-positions.component";
import { OptionTradesComponent } from  "./option-trades/option-trades.component";

export const OptionsRoutes: RouterConfig = [
  {
    path: "options",
    component: OptionsComponent,
    canActivate: [ AuthGuard ],
    children: [
      {
        path: "",
        component: OptionPositionsComponent,
      },
      {
        path: "option-positions",
        component: OptionPositionsComponent,
      },
      {
        path: "option-trades",
        component: OptionTradesComponent,
      },
    ],
  }
];
