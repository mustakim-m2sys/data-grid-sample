import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';

import { SessionQuery } from './../../../../CloudApperClient/src/app/core/states/session/session.query';
import { ProcessedError } from './error.model';


@Injectable({ providedIn: "root" })
export class ErrorService {
  constructor(private injector: Injector, private router: Router) { }

  redirectToErrorPage(error: any) {
    this.router.navigate(["/error"], { queryParams: this.processError(error) });
  }

  processError(error: any): ProcessedError {
    const appId = "CloudApperClient";
    const userId = this.injector.get(SessionQuery).getUser().Id || "";
    const time = new Date();
    const id = `${appId}-${userId}-${time}`;

    const url = this.router.url;
    const name = error.name || "";
    const status = error.status || "";
    const message = error.message || "";
    let errorDetails: any;
    if (error instanceof Object) {
      try {
        errorDetails = JSON.stringify(error);
      } catch{ }
    } else {
      errorDetails = error;
    }
    return { id, url, name, status, message, errorDetails };
  }
}
