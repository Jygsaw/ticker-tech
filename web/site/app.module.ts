import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";

import { PublicModule } from "./public/public.module";

import { AuthService } from "services/auth.service";

import { routing, appRoutingProviders } from "./app.routing";

import { AppComponent } from "./app.component";
import { MainMenuComponent } from "./main-menu/main-menu.component";
import { BalancesComponent } from "./balances/balances.component";
import { OrdersComponent } from "./orders/orders.component";
import { PositionsComponent } from "./positions/positions.component";
import { TradeComponent } from "./trade/trade.component";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    PublicModule,
  ],
  declarations: [
    AppComponent,
    MainMenuComponent,
    BalancesComponent,
    OrdersComponent,
    PositionsComponent,
    TradeComponent,
  ],
  providers: [
    AuthService,
    appRoutingProviders,
  ],
  bootstrap: [ AppComponent ],
})
export class AppModule {}
