import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { AuthService } from "services/auth.service";

import { getCookie } from "utils/utils";

@Component({
  moduleId: module.id,
  selector: "app",
  templateUrl: "app.component.html",
})
export class AppComponent {
  private title: string = "TickerTech";
  private name: string = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    // check for user cookie
    let signedIn = getCookie("signedIn");
    if (signedIn !== "") {
      this.authService.isLoggedIn = true;
      this.name = signedIn;
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(["/home"]);
  }
};
