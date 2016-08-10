import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { AccountService } from "services/account.service";
import { AuthService } from "services/auth.service";

import { promiseError } from "utils/utils";

@Component({
  moduleId: module.id,
  templateUrl: "register.component.html",
}) export class RegisterComponent {
  private register: {
    username: string;
    email: string;
    password: string;
    security_question: string;
    security_answer: string;
  } = {
    username: null,
    email: null,
    password: null,
    security_question: null,
    security_answer: null,
  };
  private registerFailed: boolean = false;

  constructor(
    private accountService: AccountService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    // redirect if logged in
    if (this.authService.isLoggedIn) {
      this.router.navigate(["/account"]);
    }
  }

  submit() {
    this.accountService
      .createUser(this.register)
      .then(() => this.authService.login(this.register.username, this.register.password))
      .then(() => this.router.navigate(["/account/profile"]))
      .catch(promiseError)
      .catch(() => this.registerFailed = true);
  }
}
