import { HttpClientModule } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { UsersComponent } from "./core/components/users/users.component";
import { HeaderComponent } from "./core/components/header/header.component";
import { UserDetailsComponent } from './core/components/user-details/user-details.component';

@NgModule({
  declarations: [AppComponent, UsersComponent, HeaderComponent, UserDetailsComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
