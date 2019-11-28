import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { map, catchError } from "rxjs/operators";

import { User } from "./../../models/user.model";
import { UserView } from "../../models/user-view.model";
import { UserService } from "../../service/user.service";
import * as constants from "./../../../core/constants/constants";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"]
})
export class UsersComponent implements OnInit {
  usersViews: UserView[] = [];
  currentPage: number = 0;
  constants = constants;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.handleUsersRetrieving();
  }

  handleUsersRetrieving() {
    this.userService
      .getUsers(this.currentPage + 1)
      .pipe(
        map(res => {
          if (!res) {
            return [];
          }
          return res;
        }),

        catchError(err => {
          console.log("err.message ", err.message);
          throw err;
        })
      )
      .subscribe(users => {
        this.usersViews = [];
        users.forEach(user => {
          const total_clicks: number = user.userStats
            .map(us => us.clicks)
            .reduce((sum, current) => sum + current, 0);

          const total_page_views: number = user.userStats
            .map(us => us.page_views)
            .reduce((sum, current) => sum + current, 0);

          this.usersViews.push(<UserView>{
            user,
            total_clicks,
            total_page_views
          });
        });
      });
  }

  changePage(isNextPage: boolean) {
    if (isNextPage) {
      if (this.usersViews.length >= constants.DEFAULT_PAGE_SIZE) {
        this.currentPage += 1;
        this.handleUsersRetrieving();
      }
    } else {
      if (this.currentPage != 0) {
        this.currentPage -= 1;
        this.handleUsersRetrieving();
      }
    }
  }

  openDetails(user: User) {
    this.userService.selectedUser = user;
    this.router.navigate(["users/" + user.id]);
  }
}
