import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'form-incomplete',
  templateUrl: './form.incomplete.component.html',
  styleUrls: ['./form.incomplete.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormIncompleteComponent implements OnInit, OnDestroy {

  @Input()
  showPopup: boolean;

  @Input()
  showConsoleButton: boolean;

  @Output()
  redirectToDesignApp = new EventEmitter<boolean>();

  @Output()
  redirectToHomepage = new EventEmitter<boolean>();

  constructor(
    public router: Router
  ) { }

  ngOnInit() {
  }

  startRedirectionToDesignApp() {
    this.redirectToDesignApp.emit(true);
  }

  startRedirectionToHomepage(){
    this.redirectToHomepage.emit(true);
  }

  ngOnDestroy() {
  }

}
