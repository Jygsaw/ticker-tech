import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AuthGuard } from "guards/auth.guard";

import { AccountComponent } from "./account.component";
import { BeneficiariesComponent } from "./beneficiaries/beneficiaries.component";
import { ProfileComponent } from "./profile/profile.component";
import { SecurityComponent } from "./security/security.component";
import { TransfersComponent } from "./transfers/transfers.component";

const accountRoutes: Routes = [
  {
    path: "account",
    component: AccountComponent,
    canActivate: [ AuthGuard ],
    children: [
      {
        path: "",
        component: ProfileComponent,
      },
      {
        path: "beneficiaries",
        component: BeneficiariesComponent,
      },
      {
        path: "profile",
        component: ProfileComponent,
      },
      {
        path: "security",
        component: SecurityComponent,
      },
      {
        path: "transfers",
        component: TransfersComponent,
      },
    ],
  }
];

export const accountRouting: ModuleWithProviders = RouterModule.forChild(accountRoutes);
