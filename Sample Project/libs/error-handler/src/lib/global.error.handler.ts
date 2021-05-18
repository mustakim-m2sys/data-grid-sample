
import { ErrorHandler, Injectable, Injector } from '@angular/core';

import { LoggerService } from './../../../logger-service/src/lib/logger.service';
import { ErrorService } from './error.service';
import { GlobalLoaderService } from 'CloudApperClient/src/app/core/services';

@Injectable({ providedIn: "root" })
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private injector: Injector) {
  }

  handleError(error: Error) {
    //stop global loader if there is any
    this.injector.get(GlobalLoaderService).stopLoader();
    //log the error
    const processedError = this.injector.get(ErrorService).processError(error);
    this.injector.get(LoggerService).logError("Client Error", processedError);
  }
}
