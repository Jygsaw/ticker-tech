import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { AuthService } from "services/auth.service";

import { promiseError } from "utils/utils";

@Component({
  moduleId: module.id,
  templateUrl: "sign-in.component.html",
  styleUrls: [ "sign-in.component.css" ],
})
export class SignInComponent {
  private username: string = null;
  private password: string = null;
  private loginFailed: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    // redirect if logged in
    if (this.authService.isLoggedIn) {
      this.router.navigate(["/account"]);
    }
  }

  login() {
    this.authService
      .login(this.username, this.password)
      .then(status => this.router.navigate(["/account"]))
      .catch(promiseError)
      .catch(() => this.loginFailed = true);
  }
}
