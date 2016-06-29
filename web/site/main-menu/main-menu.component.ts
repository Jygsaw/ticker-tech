import { Component } from "@angular/core";
import { ROUTER_DIRECTIVES } from "@angular/router";

@Component({
  moduleId: module.id,
  selector: "main-menu",
  templateUrl: "main-menu.component.html",
  directives: [ ROUTER_DIRECTIVES ],
})
export class MainMenuComponent {
};
