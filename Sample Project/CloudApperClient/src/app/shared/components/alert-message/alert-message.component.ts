import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { EnumMessageType } from '@CloudApperClients/app-model';

@Component({
  selector: 'app-alert-message',
  templateUrl: './alert-message.component.html',
  styleUrls: ['./alert-message.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlertMessageComponent implements OnInit {
  get EnumMessageType() {
    return EnumMessageType
  }

  // class name based on alert type
  alertClass: string;
  alertIcon: string;

  @Input()
  type: EnumMessageType;

  @Input()
  message: string;

  constructor() { }

  ngOnInit() {
    // setting class name based on alert type
    if (this.type === EnumMessageType.Success) {
      this.alertClass = 'alert-msg-success';
    } else if (this.type === EnumMessageType.Warning) {
      this.alertClass = 'alert-msg-warning';
    } else if (this.type === EnumMessageType.Error) {
      this.alertClass = 'alert-msg-error';
    }
  }

}
