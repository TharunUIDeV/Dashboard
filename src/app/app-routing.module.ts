import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from './app.component';
import {FastWidgetsComponent} from './fast-widgets/fast-widgets.component';


export const routes: Routes = [
  {
    path: 'newDashBoard',
    component: AppComponent,
  },
  {
    path: 'fastWidgets',
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
