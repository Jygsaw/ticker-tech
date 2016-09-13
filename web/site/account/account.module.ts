import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";

import { AccountService } from "services/account.service";

import { AuthGuard } from "guards/auth.guard";

import { accountRouting } from "./account.routing";

import { AccountComponent } from "./account.component";
import { BeneficiariesComponent } from "./beneficiaries/beneficiaries.component";
import { ProfileComponent } from "./profile/profile.component";
import { SecurityComponent } from "./security/security.component";
import { TransfersComponent } from "./transfers/transfers.component";

import { CapitalizePipe } from "pipes/capitalize.pipe";
import { UnderspacePipe } from "pipes/underspace.pipe";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    accountRouting,
  ],
  declarations: [
    AccountComponent,
    BeneficiariesComponent,
    ProfileComponent,
    SecurityComponent,
    TransfersComponent,
    CapitalizePipe,
    UnderspacePipe,
  ],
  providers: [
    AccountService,
    AuthGuard,
  ],
})
export class AccountModule {}
