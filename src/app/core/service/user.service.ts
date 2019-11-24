import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { User } from "./../models/user.model";
import { environment } from "./../../../environments/environment.prod";
import * as constants from "./../../core/constants/constants";

@Injectable({ providedIn: "root" })
export class UserService {
  selectedUser: User;

  constructor(private httpClient: HttpClient) {}

  getUsers(
    page: number,
    pageSize: number = constants.DEFAULT_PAGE_SIZE,
    userDetails: boolean = true
  ): Observable<User[]> {
    const url: string = `${environment.apiURL}/users`;

    const params = new HttpParams()
      .append("userDetails", String(userDetails))
      .append("pageSize", String(pageSize))
      .append("page", String(page));

    return this.httpClient.get<User[]>(url, { params });
  }
}
