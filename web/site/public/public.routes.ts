import { RouterConfig } from "@angular/router";

import { HomeComponent } from "./home/home.component";

export const PublicRoutes: RouterConfig = [
  {
    path: 'home',
    component: HomeComponent,
  }
];
