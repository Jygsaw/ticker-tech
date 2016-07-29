import { Component, OnInit } from "@angular/core";

import { AccountService } from "services/account.service";

import { promiseError } from "utils/utils";

@Component({
  moduleId: module.id,
  templateUrl: "security.component.html",
})
export class SecurityComponent {
  // TODO research initialization of variables before Angular binds to page
  // note: initialization of user to null causes page to error
  private auth: {
    password: string;
    security_question: string;
    security_answer: string;
  } = {
    password: null,
    security_question: null,
    security_answer: null,
  };
  private fetchFailed: boolean = false;
  private updateFailed: boolean = false;

  constructor(private accountService: AccountService) {}

  ngOnInit() {
    this.accountService
      .getUserAuth()
      .then(data => this.auth = data)
      .catch(promiseError)
      .catch(() => this.fetchFailed = true);
  }

  submit() {
    let delta = this.auth;
    this.accountService
      .updateUserAuth(delta)
      .then(data => this.auth = data)
      .catch(promiseError)
      .catch(() => this.updateFailed = true);
  }
};
