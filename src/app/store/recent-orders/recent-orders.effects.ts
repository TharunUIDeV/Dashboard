import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import {RecentOrdersActions, RecentOrdersActionTypes, RecentOrdersFetch} from './recent-orders.actions';
import {Observable} from 'rxjs/Observable';
import {Action} from '@ngrx/store';
import {OrderStatusService} from '../../order-status/order-status.service';

@Injectable()
export class RecentOrdersEffects {

  constructor(private actions$: Actions,
              private recentOrdersFetch: RecentOrdersFetch,
              private orderStatusService: OrderStatusService) {}

  @Effect()
  recentOrdersFetch$: Observable<Action> = this.actions$
    .ofType(RecentOrdersActionTypes.RecentOrdersFetch)
    .switchMap(action => this.orderStatusService.getRecentOrders)
    .map((orders: any) => this.RecentOrdersActions.rece
    ;
}
