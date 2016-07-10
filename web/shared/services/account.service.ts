import { Injectable } from "@angular/core";
import { Headers, Http, RequestOptions } from "@angular/http";
import "rxjs/add/operator/toPromise";

import { Balances } from "classes/balances";
import { promiseError } from "utils/utils";

import { AuthService } from "services/auth.service";

// TODO: move endpoint to central config file
// TODO: enable https
const endpoints = {
  "balances": "../../api/account/balances",
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
};
