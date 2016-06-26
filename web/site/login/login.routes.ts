import { RouterConfig } from "@angular/router";

import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { SignInComponent } from "./sign-in/sign-in.component";

export const LoginRoutes: RouterConfig = [
  {
    path: "forgot-password",
    component: ForgotPasswordComponent,
  },
  {
    path: "sign-in",
    component: SignInComponent,
  },
];
