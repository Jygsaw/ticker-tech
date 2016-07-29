import { Injectable } from "@angular/core";
import { Headers, Http, RequestOptions } from "@angular/http";
import "rxjs/add/operator/toPromise";

import { Balance } from "classes-common/balance";
import { Order } from "classes-common/order";
import { Position } from "classes-common/position";

import { AuthService } from "services/auth.service";

import { promiseError } from "utils/utils";

// TODO: move endpoint to central config file
// TODO: enable https
const endpoints = {
  balance: "../../api/balance",
  order: "../../api/order",
  position: "../../api/position",
};
const headers = new Headers({ "Content-Type": "application/json" });
const options = new RequestOptions({ "headers": headers });

@Injectable()
export class AccountService {
  constructor(private authService: AuthService, private http: Http) {}

  getBalances() {
    return this.http
      .get(endpoints.balance, options)
      .toPromise()
      .then(response => {
        let reply = response.json();
        if (reply.status === "success") {
          return Promise.resolve<Balance[]>(reply.data.result);
        } else {
          return Promise.reject<any>(reply);
        }
      })
      .catch(promiseError);
  }

  getPositions() {
    return this.http
      .get(endpoints.position, options)
      .toPromise()
      .then(response => {
        let reply = response.json();
        if (reply.status === "success") {
          return Promise.resolve<Position[]>(reply.data.result);
        } else {
          return Promise.reject<any>(reply);
        }
      })
      .catch(promiseError);
  }

  getOrders() {
    return this.http
      .get(endpoints.order, options)
      .toPromise()
      .then(response => {
        let reply = response.json();
        if (reply.status === "success") {
          return Promise.resolve<Order[]>(reply.data.result);
        } else {
          return Promise.reject<any>(reply);
        }
      })
      .catch(promiseError);
  }

  createOrder(order: Order) {
    return this.http
      .put(endpoints.order, order, options)
      .toPromise()
      .then(response => {
        let reply = response.json();
        if (reply.status === "success") {
          return Promise.resolve<Order[]>(reply.data.result);
        } else {
          return Promise.reject<any>(reply);
        }
      })
      .catch(promiseError);
  }
};
