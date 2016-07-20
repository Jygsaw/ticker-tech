import { Component } from "@angular/core";
import { ROUTER_DIRECTIVES, Router } from "@angular/router";

import { AuthService } from "services/auth.service";

import { promiseError } from "utils/utils";

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
      .then(status => this.router.navigate(["/account"]))
      .catch(promiseError)
      .catch(() => this.loginFailed = true);
  }
}
