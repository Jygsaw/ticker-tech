import { Component, OnInit } from "@angular/core";

import { Position } from "classes-common/position";

import { AccountService } from "services/account.service";

import { promiseError } from "utils/utils";

interface DisplayPosition extends Position {
  price?: number;
  value?: number;
}

@Component({
  moduleId: module.id,
  templateUrl: "stock-positions.component.html",
})
export class StockPositionsComponent {
  private positions: DisplayPosition[] = [];
  private totalValue: number = null;
  private fetchFailed: boolean = false;

  constructor(private accountService: AccountService) {}

  ngOnInit() {
    // fetch positions
    this.accountService
      .getPositions()
      .then(data => this.positions = data)
      .then(() => {
        // TODO fetch price data from 3rd party?
        // fetch market prices
        this.positions.map((position) => position.price = 5);
      })
      .then(() => {
        // calc total value
        this.totalValue = 0;
        this.positions.map((position) => {
          position.value = position.quantity * position.price;
          this.totalValue += position.value;
        });
      })
      .catch(promiseError)
      .catch(() => this.fetchFailed = true);
  }
};
