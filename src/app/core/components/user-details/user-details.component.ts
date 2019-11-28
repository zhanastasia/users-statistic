import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ChartDataSets, ChartOptions } from "chart.js";
import { Color, Label } from "ng2-charts";

import { UserService } from "./../../service/user.service";
import { UserStats } from "./../../models/user-stats.model";
import { Observable, of } from "rxjs";

@Component({
  selector: "app-user-details",
  templateUrl: "./user-details.component.html",
  styleUrls: ["./user-details.component.scss"]
})
export class UserDetailsComponent implements OnInit {
  userStats: UserStats[] = [];

  chartReady: boolean = false;

  lineChartData: ChartDataSets[];
  lineChartLabels: Label[];
  lineChartOptions: ChartOptions;
  lineChartColors: Color[];
  lineChartLegend: boolean;
  lineChartPlugins: any[];
  lineChartType: string;

  fromDate: string;
  toDate: string;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.lineChart();
  }

  lineChart() {
    let userStats$: Observable<UserStats[]>;

    if (!this.userService.selectedUser) {
      const userId = this.route.snapshot.paramMap.get("id");
      userStats$ = this.userService.getUserStatsById(userId);
    } else {
      userStats$ = of(this.userService.selectedUser.userStats);
    }

    userStats$.subscribe(result => {
      this.userStats = result;

      this.lineChartData = [
        { data: this.userStats.map(us => us.clicks), label: "Clicks" },
        { data: this.userStats.map(us => us.page_views), label: "Page Views" }
      ];

      this.lineChartLabels = this.userStats.map(us => us.date);

      this.chartReady = true;
    });

    this.lineChartOptions = {
      responsive: true
    };

    this.lineChartColors = [
      {
        backgroundColor: "rgba(105, 0, 132, .2)",
        borderColor: "rgba(200, 99, 132, .7)",
        borderWidth: 2
      },
      {
        backgroundColor: "rgba(0, 137, 132, .2)",
        borderColor: "rgba(0, 10, 130, .7)",
        borderWidth: 2
      }
    ];

    this.lineChartLegend = true;
    this.lineChartPlugins = [];
    this.lineChartType = "line";
  }

  fitreringDate() {
    this.userService
      .getUserStatsDateFilter(
        this.route.snapshot.paramMap.get("id"),
        this.fromDate,
        this.toDate
      )
      .subscribe(result => {
        this.userStats = result;
        this.lineChartData = [
          { data: this.userStats.map(us => us.clicks), label: "Clicks" },
          { data: this.userStats.map(us => us.page_views), label: "Page Views" }
        ];
        this.lineChartLabels = this.userStats.map(us => us.date);
      });
  }
}
