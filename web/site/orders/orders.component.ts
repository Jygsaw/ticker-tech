import { Component, OnInit } from "@angular/core";

import { Order } from "classes-common/order";

import { AccountService } from "services/account.service";

import { promiseError } from "utils/utils";

@Component({
  moduleId: module.id,
  templateUrl: "orders.component.html",
})
export class OrdersComponent {
  private orders: Order[] = [];
  private fetchFailed: boolean = false;

  constructor(private accountService: AccountService) {}

  ngOnInit() {
    // fetch orders
    this.accountService
      .getOrders()
      .then(data => this.orders = data)
      .catch(promiseError)
      .catch(() => this.fetchFailed = true);
  }
};
