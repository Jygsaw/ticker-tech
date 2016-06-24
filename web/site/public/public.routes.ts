import { RouterConfig } from "@angular/router";

import { HomeComponent } from "./home/home.component";
import { PrivacyComponent } from "./privacy/privacy.component";
import { TermsComponent } from "./terms/terms.component";

export const PublicRoutes: RouterConfig = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'privacy',
    component: PrivacyComponent,
  },
  {
    path: 'terms',
    component: TermsComponent,
  }
];
