import { RouterConfig } from "@angular/router";

import { AuthGuard } from "guards/auth.guard";

import { OptionsComponent } from "./options.component";
import { OptionPositionsComponent } from  "./option-positions/option-positions.component";
import { OptionPulseComponent } from  "./option-pulse/option-pulse.component";
import { OptionResearchComponent } from  "./option-research/option-research.component";
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
        path: "option-pulse",
        component: OptionPulseComponent,
      },
      {
        path: "option-research",
        component: OptionResearchComponent,
      },
      {
        path: "option-trades",
        component: OptionTradesComponent,
      },
    ],
  }
];
