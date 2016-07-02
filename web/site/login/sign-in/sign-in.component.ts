import { Component } from "@angular/core";
import { ROUTER_DIRECTIVES, Router } from "@angular/router";

import { AuthService } from "services/auth.service";

@Component({
  moduleId: module.id,
  templateUrl: "sign-in.component.html",
  directives: [ ROUTER_DIRECTIVES ],
})
export class SignInComponent {
  private username: string = null;
  private password: string = null;
  private loginFailed: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService
      .login(this.username, this.password)
      .then((status: string) => this.router.navigate(["/account"]))
      .catch((err: string) => this.loginFailed = true);
  }
}
