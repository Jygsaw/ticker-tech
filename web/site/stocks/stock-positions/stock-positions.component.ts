import { Component, OnInit } from "@angular/core";

import { Positions } from "classes/positions";

import { AccountService } from "services/account.service";

@Component({
  moduleId: module.id,
  templateUrl: "stock-positions.component.html",
})
export class StockPositionsComponent {
  private positions: Positions = {};
  private stocksValue: number = null;
  private positionsFailed: boolean = false;

  constructor(private accountService: AccountService) {}

  ngOnInit() {
    // fetch positions
    this.accountService
      .getPositions([ "stocks" ])
      .then((data: Positions) => {
        // update component
        Object.assign(this.positions, data);
      })
      .then(() => {
        // fetch market prices
        // TODO contact 3rd party for price data
        this.positions.stocks.map((position) => position.price = 5);
      })
      .then(() => {
        // calc total value
        this.stocksValue = 0;
        this.positions.stocks.map((position) => {
          position.value = position.quantity * position.price;
          this.stocksValue += position.value;
        });
      })
      .catch((err: any) => {
        console.error(err);
        this.positionsFailed = true;
      });
  }
};
