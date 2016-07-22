import { Component, OnInit } from "@angular/core";

import { Balance } from "classes-common/balance";

import { AccountService } from "services/account.service";

import { promiseError } from "utils/utils";

@Component({
  moduleId: module.id,
  templateUrl: "balances.component.html",
})
export class BalancesComponent {
  private totals: {
    cash: number,
  } = {
    cash: 0,
  };
  private fetchFailed: boolean = false;

  constructor(private accountService: AccountService) {}

  ngOnInit() {
    this.accountService
      .getBalances()
      .then(data => data.forEach((elem) => this.totals[elem.type] += elem.value))
      .catch(promiseError)
      .catch(() => this.fetchFailed = true);
  }
};
