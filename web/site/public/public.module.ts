import { NgModule } from "@angular/core";

import { publicRouting } from "./public.routing";

import { AboutComponent } from "./about/about.component";
import { ContactComponent } from "./contact/contact.component";
import { HomeComponent } from "./home/home.component";
import { PrivacyComponent } from "./privacy/privacy.component";
import { TermsComponent } from "./terms/terms.component";

@NgModule({
  imports: [
    publicRouting,
  ],
  declarations: [
    AboutComponent,
    ContactComponent,
    HomeComponent,
    PrivacyComponent,
    TermsComponent,
  ],
  providers: [
  ],
})
export class PublicModule {}
