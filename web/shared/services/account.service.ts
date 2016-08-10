import { Injectable } from "@angular/core";
import { Headers, Http, RequestOptions } from "@angular/http";
import "rxjs/add/operator/toPromise";

import { Balance } from "classes-common/balance";
import { Order } from "classes-common/order";
import { Position } from "classes-common/position";

import { AuthService } from "services/auth.service";

import { promiseError } from "utils/utils";

// TODO move endpoint to central config file
// TODO enable https
const endpoints = {
  balance: "../../api/balance",
  order: "../../api/order",
  position: "../../api/position",
  register: "../../api/register",
  user: "../../api/user",
  userAuth: "../../api/user/auth",
};
const headers = new Headers({ "Content-Type": "application/json" });
const options = new RequestOptions({ "headers": headers });

@Injectable()
export class AccountService {
  constructor(private authService: AuthService, private http: Http) {}

  getUser() {
    return this.http
      .get(endpoints.user, options)
      .toPromise()
      .then(processResponse)
      .catch(promiseError);
  }

  getUserAuth() {
    return this.http
      .get(endpoints.userAuth, options)
      .toPromise()
      .then(processResponse)
      .catch(promiseError);
  }

  getBalances() {
    return this.http
      .get(endpoints.balance, options)
      .toPromise()
      .then(processResponse)
      .catch(promiseError);
  }

  getPositions() {
    return this.http
      .get(endpoints.position, options)
      .toPromise()
      .then(processResponse)
      .catch(promiseError);
  }

  getOrders() {
    return this.http
      .get(endpoints.order, options)
      .toPromise()
      .then(processResponse)
      .catch(promiseError);
  }

  createOrder(order: Order) {
    return this.http
      .put(endpoints.order, order, options)
      .toPromise()
      .then(processResponse)
      .catch(promiseError);
  }

  createUser(data) {
    return this.http
      .put(endpoints.register, data, options)
      .toPromise()
      .then(processResponse)
      .catch(promiseError);
  }

  updateUser(data) {
    return this.http
      .post(endpoints.user, data, options)
      .toPromise()
      .then(processResponse)
      .catch(promiseError);
  }

  updateUserAuth(data) {
    return this.http
      .post(endpoints.userAuth, data, options)
      .toPromise()
      .then(processResponse)
      .catch(promiseError);
  }
};

// TODO implement strongly typed multiple return types
// helper funcs
function processResponse(response) {
  let reply = response.json();
  if (reply.status === "success") {
    return Promise.resolve(reply.data.result);
  } else {
    return Promise.reject(reply);
  }
}
