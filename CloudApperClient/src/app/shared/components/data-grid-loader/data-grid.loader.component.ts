import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: "app-data-grid-loader",
  templateUrl: "./data-grid.loader.component.html",
  styleUrls: ["./data-grid.loader.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataGridLoaderComponent {

  /*
    A switch to handle loading
    This value will come from data grid component
  */  
  @Input()
  isLoading: boolean;

  constructor() {
  }
}
