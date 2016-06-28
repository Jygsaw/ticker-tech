import { Component } from "@angular/core";
import { ROUTER_DIRECTIVES, Router } from "@angular/router";

import { AuthService } from "services/auth.service";

import { MainMenuComponent } from "./main-menu/main-menu.component";

@Component({
  moduleId: module.id,
  selector: "app",
  templateUrl: "app.component.html",
  directives: [ ROUTER_DIRECTIVES, MainMenuComponent ],
})
export class AppComponent {
  title = "TickerTech";

  constructor(private authService: AuthService, private router: Router) {}

  logout() {
    this.authService.logout();
    this.router.navigate(["/home"]);
  }
};
