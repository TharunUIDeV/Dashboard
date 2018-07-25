import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from './app.component';
import {FastWidgetsComponent, FastWidgetTypes} from './fast-widgets/fast-widgets.component';
import {DashboardComponent} from './dashboard/dashboard.component';


export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'new-dashboard'
  },
  {
    path: 'new-dashboard',
    component: DashboardComponent
  },
  {
    path: FastWidgetTypes.FAST_CDC_V4,
    component: FastWidgetsComponent
  },
  {
    path: FastWidgetTypes.FAST_ORDER_STATUS,
    component: FastWidgetsComponent
  },
  {
    path: FastWidgetTypes.FAST_PLAN_SUMMARY,
    component: FastWidgetsComponent
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
