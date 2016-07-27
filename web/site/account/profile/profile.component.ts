import { Component, OnInit } from "@angular/core";

import { User } from "classes-common/user";

import { AccountService } from "services/account.service";

import { promiseError } from "utils/utils";

@Component({
  moduleId: module.id,
  templateUrl: "profile.component.html",
})
export class ProfileComponent {
  // TODO research initialization of variables before Angular binds to page
  // note: initialization of user to null causes page to error
  private user: User = {
    id: null,
    username: null,
    first_name: null,
    last_name: null,
    address: null,
    city: null,
    state: null,
    country: null,
    postal_code: null,
    phone: null,
    email: null,
  };
  private fetchFailed: boolean = false;
  private updateFailed: boolean = false;

  constructor(private accountService: AccountService) {}

  ngOnInit() {
    this.accountService
      .getUser()
      .then(data => this.user = data)
      .catch(promiseError)
      .catch(() => this.fetchFailed = true);
  }

  submit() {
    let delta = this.user;
    this.accountService
      .updateUser(delta)
      .then(data => this.user = data)
      .catch(promiseError)
      .catch(() => this.updateFailed = true);
  }
};
