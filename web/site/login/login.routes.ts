import { RouterConfig } from "@angular/router";

import { SignInComponent } from "./sign-in/sign-in.component";

export const LoginRoutes: RouterConfig = [
  {
    path: "sign-in",
    component: SignInComponent,
  },
];
