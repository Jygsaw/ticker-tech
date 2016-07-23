import { Component, OnInit } from "@angular/core";
import { ROUTER_DIRECTIVES, Router } from "@angular/router";

import { AccountService } from "services/account.service";
import { AuthService } from "services/auth.service";

import { MainMenuComponent } from "./main-menu/main-menu.component";

import { getCookie } from "utils/utils";

@Component({
  moduleId: module.id,
  selector: "app",
  templateUrl: "app.component.html",
  directives: [ ROUTER_DIRECTIVES, MainMenuComponent ],
  providers: [ AccountService ],
})
export class AppComponent {
  title = "TickerTech";

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    // check for user cookie
    let userCookie = getCookie("user");
    if (userCookie !== "") {
      this.authService.isLoggedIn = true;
      this.authService.user = JSON.parse(userCookie);
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(["/home"]);
  }
};
