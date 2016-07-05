import { Component } from "@angular/core";
import { ROUTER_DIRECTIVES } from "@angular/router";

import { AccountService } from "services/account.service";

@Component({
  template: "<router-outlet></router-outlet>",
  directives: [ ROUTER_DIRECTIVES ],
  providers: [ AccountService ],
})
export class AccountComponent {
};
