import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from '@CloudApperClients/error-handler';
import { AppComponent } from './app.component';

const appRoutes: Routes = [
  {path: '', component: AppComponent },
  { path: '**', component: ErrorComponent, data: { error: 404 } }
];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

