import { Component } from "@angular/core";
import { Router } from "@angular/router";

import { AuthService } from "services/auth.service";

@Component({
  moduleId: module.id,
  templateUrl: "sign-in.component.html",
})
export class SignInComponent {
  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login();
    this.router.navigate(["/home"]);
  }
}
