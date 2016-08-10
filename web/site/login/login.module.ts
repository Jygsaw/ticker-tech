import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { loginRouting } from "./login.routing";

import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { RegisterComponent } from "./register/register.component";
import { SignInComponent } from "./sign-in/sign-in.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    loginRouting,
  ],
  declarations: [
    ForgotPasswordComponent,
    RegisterComponent,
    SignInComponent,
  ],
  providers: [
  ],
})
export class LoginModule {}
