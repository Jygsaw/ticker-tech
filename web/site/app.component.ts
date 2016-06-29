import { Component } from "@angular/core";

import { MainMenuComponent } from "./main-menu/main-menu.component";

@Component({
  moduleId: module.id,
  selector: "app",
  templateUrl: "app.component.html",
  directives: [ MainMenuComponent ],
})
export class AppComponent {
  title = "TickerTech";
};
