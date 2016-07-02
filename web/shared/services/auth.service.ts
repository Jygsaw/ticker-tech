import { Injectable } from "@angular/core";

@Injectable()
export class AuthService {
  isLoggedIn: boolean = false;

  login() {
    return new Promise((resolve, reject) => {
      this.isLoggedIn = true;
      resolve();
    });
  }

  logout() {
    this.isLoggedIn = false;
  }
};
