import { Component } from "@angular/core";
import { Router } from "@angular/router";

import { Order } from "classes-common/order";

import { AccountService } from "services/account.service";

import { promiseError } from "utils/utils";

@Component({
  moduleId: module.id,
  templateUrl: "trade.component.html",
})
export class TradeComponent {
  private order: Order = {
    id: null,
    user_id: null,
    quantity: null,
    listing_id: null,
    action: null,
    type: null,
    price: null,
    status: null,
  };
  private submitFailed: boolean = false;

  constructor(private accountService: AccountService, private router: Router) {}

  submit() {
    this.accountService
      .createOrder(this.order)
      .then(() => this.router.navigate(["/orders"]))
      .catch(promiseError)
      .catch(() => this.submitFailed = true);
  }
};
