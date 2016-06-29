import { Component } from "@angular/core";
import { ROUTER_DIRECTIVES } from "@angular/router";

import { MainMenuComponent } from "./main-menu/main-menu.component";

@Component({
  moduleId: module.id,
  selector: "app",
  templateUrl: "app.component.html",
  directives: [ ROUTER_DIRECTIVES, MainMenuComponent ],
})
export class AppComponent {
  title = "TickerTech";
};
