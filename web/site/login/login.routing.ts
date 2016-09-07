import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { SignInComponent } from "./sign-in/sign-in.component";

const loginRoutes: Routes = [
  {
    path: "forgot-password",
    component: ForgotPasswordComponent,
  },
  {
    path: "sign-in",
    component: SignInComponent,
  },
];

export const loginRouting: ModuleWithProviders = RouterModule.forChild(loginRoutes);
