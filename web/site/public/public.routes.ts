import { RouterConfig } from "@angular/router";

import { HomeComponent } from "./home/home.component";
import { TermsComponent } from "./terms/terms.component";

export const PublicRoutes: RouterConfig = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'terms',
    component: TermsComponent,
  }
];
