import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from './app.component';
import {FastWidgetsComponent, FastWidgetTypes} from './fast-widgets/fast-widgets.component';
import {DashboardComponent} from './dashboard/dashboard.component';


export let routes: Routes = [
    {
      path: '',
      pathMatch: 'full',
      redirectTo: ''
    },
  ];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
