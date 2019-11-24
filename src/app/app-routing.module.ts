import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { UsersComponent } from "./core/components/users/users.component";
import { UserDetailsComponent } from "./core/components/user-details/user-details.component";

const routes: Routes = [
  { path: "users", component: UsersComponent },
  { path: "users/:id", component: UserDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
