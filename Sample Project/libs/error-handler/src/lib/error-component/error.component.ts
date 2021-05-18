import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-error",
  templateUrl: "./error.component.html",
  styleUrls: ["./error.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorComponent implements OnInit {
  public errorRouteParams;
  public errorData;

  constructor(private cd: ChangeDetectorRef, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.errorRouteParams = this.activatedRoute.snapshot.queryParams;
    this.errorData = this.activatedRoute.snapshot.data;
    this.cd.markForCheck();
  }
}
