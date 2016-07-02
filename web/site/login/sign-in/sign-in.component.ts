import { Component } from "@angular/core";
import { ROUTER_DIRECTIVES, Router } from "@angular/router";

import { AuthService } from "services/auth.service";

@Component({
  moduleId: module.id,
  templateUrl: "sign-in.component.html",
  directives: [ ROUTER_DIRECTIVES ],
})
export class SignInComponent {
  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService
      .login()
      .then(() => this.router.navigate(["/account"]))
      .catch(() => console.error("login failed"));
  }
}
