import { Injectable } from "@angular/core";
import { Headers, Http, RequestOptions } from "@angular/http";
import "rxjs/add/operator/toPromise";

import { promiseError, setCookie, deleteCookie } from "utils/utils";

// TODO move endpoint to central config file
// TODO enable https
const endpoint = "../../api/auth";
const headers = new Headers({ "Content-Type": "application/json" });
const options = new RequestOptions({ "headers": headers });

@Injectable()
export class AuthService {
  isLoggedIn: boolean = false;

  constructor(private http: Http) {}

  login(username: string = null, password: string = null) {
    let credentials = JSON.stringify({
      "username": username,
      "password": password,
    });

    // TODO review promise return implementation
    // TODO refactor promises implementation to observables
    return this.http
      .post(endpoint, credentials, options)
      .toPromise()
      .then(response => {
        let reply = response.json();
        if (reply.status === "success") {
          this.isLoggedIn = true;
          setCookie("signedIn", reply.data.result);
          return Promise.resolve<string>(reply.status);
        } else {
          return Promise.reject<any>(reply);
        }
      })
      .catch(promiseError);
  }

  logout() {
    this.isLoggedIn = false;
    deleteCookie("signedIn");
  }
};
