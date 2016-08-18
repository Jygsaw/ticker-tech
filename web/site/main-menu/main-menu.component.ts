import { Component } from "@angular/core";

import { AuthService} from "services/auth.service";

@Component({
  moduleId: module.id,
  selector: "main-menu",
  templateUrl: "main-menu.component.html",
  styleUrls: [ "main-menu.component.css" ],
})
export class MainMenuComponent {
  constructor(private authService: AuthService) {}
};
