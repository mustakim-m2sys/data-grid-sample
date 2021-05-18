import { NgModule, ErrorHandler } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { ErrorRoutes } from "./error.routing";
import { ErrorComponent } from "./error-component/error.component";
import { GlobalErrorHandler } from './global.error.handler';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ErrorRoutes)
  ],
  declarations: [ErrorComponent],
  providers: [
  ]
})
export class ErrorModule { }
