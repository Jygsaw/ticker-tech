import { Injectable } from "@angular/core";
import { Headers, Http, RequestOptions } from "@angular/http";
import "rxjs/add/operator/toPromise";

import { Balances } from "classes/balances";
import { Order } from "classes-common/order";
import { Position } from "classes-common/position";

import { AuthService } from "services/auth.service";

import { promiseError } from "utils/utils";

// TODO: move endpoint to central config file
// TODO: enable https
const endpoints = {
  "balances": "../../api/account/balances",
  order: "../../api/order",
  position: "../../api/position",
};

@Injectable()
export class AccountService {
  private balances: Balances = {};

  constructor(private authService: AuthService, private http: Http) {}

  getBalances(types: string[]) {
    let data = JSON.stringify({
      "userId": this.authService.user.id,
      "types": types,
    });
    let headers = new Headers({ "Content-Type": "application/json" });
    let options = new RequestOptions({ "headers": headers });

    // TODO: review promise return implementation
    return this.http
      .post(endpoints.balances, data, options)
      .toPromise()
      .then(response => {
        let reply = response.json();

        if (reply.status === "success") {
          Object.assign(this.balances, reply.data.balances);
          return Promise.resolve<Balances>(this.balances);
        } else {
          return Promise.reject<any>(reply);
        }
      })
      .catch(promiseError);
  }

  getPositions() {
    let headers = new Headers({ "Content-Type": "application/json" });
    let options = new RequestOptions({ "headers": headers });

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
    let headers = new Headers({ "Content-Type": "application/json"});
    let options = new RequestOptions({ "headers": headers });

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
};
