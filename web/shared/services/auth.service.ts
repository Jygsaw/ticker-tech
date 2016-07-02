import { Injectable } from "@angular/core";
import { Headers, Http, RequestOptions } from "@angular/http";
import "rxjs/add/operator/toPromise";

import { User } from "classes/user";
import { promiseError } from "utils/utils";

// TODO: move endpoint to central config file
// TODO: enable https
const endpoint = "../../api/auth";

@Injectable()
export class AuthService {
  isLoggedIn: boolean = false;
  accessToken: string = null;
  user: User = null;

  constructor(private http: Http) {}

  login(username: string = null, password: string = null) {
    let credentials = JSON.stringify({
      "username": username,
      "password": password,
    });
    let headers = new Headers({ "Content-Type": "application/json" });
    let options = new RequestOptions({ "headers": headers });

    // TODO: review promise return implementation
    return this.http
      .post(endpoint, credentials, options)
      .toPromise()
      .then(response => {
        let reply = response.json();

        if (reply.status === "success") {
          this.isLoggedIn = true;
          this.accessToken = reply.data.accessToken;
          this.user = reply.data.user;
          return Promise.resolve<string>(reply.status);
        } else {
          return Promise.reject<any>(reply);
        }
      })
      .catch(promiseError);
  }

  logout() {
    this.isLoggedIn = false;
  }
};
