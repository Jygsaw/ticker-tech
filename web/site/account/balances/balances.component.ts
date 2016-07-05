import { Component, OnInit } from "@angular/core";

import { Balances } from "classes/balances";

import { AccountService } from "services/account.service";
import { AuthService } from "services/auth.service";

@Component({
  moduleId: module.id,
  templateUrl: "balances.component.html",
})
export class BalancesComponent {
  private balances: Balances = {};
  private balancesFailed: boolean = false;

  constructor(private authService: AuthService, private accountService: AccountService) {}

  ngOnInit() {
    this.accountService
      .getBalances([ "cash" ])
      .then((data) => {
        Object.assign(this.balances, data);
      })
      .catch((err: any) => {
        console.error(err);
        this.balancesFailed = true;
      });
  }
};
