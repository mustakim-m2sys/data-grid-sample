import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-incomplete',
  templateUrl: './app.incomplete.component.html',
  styleUrls: ['./app.incomplete.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppIncompleteComponent implements OnInit, OnDestroy {

  @Input()
  showPopup: boolean;

  @Input()
  showConsoleButton: boolean;

  @Output()
  redirectToDesignApp = new EventEmitter<boolean>();

  constructor(
    public router: Router
  ) { }

  ngOnInit() {
  }

  startRedirectionToDesignApp() {
    this.redirectToDesignApp.emit(true);
  }

  ngOnDestroy() {
  }

}
