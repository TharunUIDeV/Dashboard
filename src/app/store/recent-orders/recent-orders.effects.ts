import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {
  RecentOrdersActionTypes,
  RecentOrdersFetch,
  RecentOrdersFetchComplete,
  RecentOrdersFetchError
} from './recent-orders.actions';
import {Observable} from 'rxjs/Observable';
import {Action} from '@ngrx/store';
import {OrderStatusService} from '../../order-status/order-status.service';
import {catchError, map, mapTo, switchMap} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';
import 'rxjs/add/observable/fromPromise';
import {fromPromise} from 'rxjs/observable/fromPromise';
import {OrderStatus} from '../../order-status/order-status.interface';

@Injectable()
export class RecentOrdersEffects {

  constructor(private actions$: Actions,
              private orderStatusService: OrderStatusService) {
  }

  @Effect()
  recentOrdersFetch$: Observable<Action> = this.actions$.pipe(
    ofType<RecentOrdersFetch>(RecentOrdersActionTypes.RecentOrdersFetch),
    switchMap((value, index) => {
      return fromPromise(this.orderStatusService.getRecentOrders()).pipe(
        map((response: OrderStatus[]) => {
          return new RecentOrdersFetchComplete(response);
        }),
        catchError((err) => {
          return of(new RecentOrdersFetchError());
        }));
    }));
}


