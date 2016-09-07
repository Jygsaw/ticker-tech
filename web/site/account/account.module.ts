import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { AccountService } from "services/account.service";

import { AuthGuard } from "guards/auth.guard";

import { accountRouting } from "./account.routing";

import { AccountComponent } from "./account.component";
import { BeneficiariesComponent } from "./beneficiaries/beneficiaries.component";
import { ProfileComponent } from "./profile/profile.component";
import { SecurityComponent } from "./security/security.component";
import { TransfersComponent } from "./transfers/transfers.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    accountRouting,
  ],
  declarations: [
    AccountComponent,
    BeneficiariesComponent,
    ProfileComponent,
    SecurityComponent,
    TransfersComponent,
  ],
  providers: [
    AccountService,
    AuthGuard,
  ],
})
export class AccountModule {}
