import { Component, OnInit } from "@angular/core";

import { environment } from "./../../../../environments/environment.prod";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  title = environment.appTitle;

  constructor() {}

  ngOnInit() {}
}
