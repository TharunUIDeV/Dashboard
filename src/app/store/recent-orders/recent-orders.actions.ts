import {Action} from '@ngrx/store';
import {OrderStatus} from '../../order-status/order-status.interface';

export enum RecentOrdersActionTypes {
  RecentOrdersFetch = '[RecentOrders] Fetch',
  RecentOrdersFetchComplete = '[RecentOrders] Fetch Complete',
  RecentOrdersFetchError = '[RecentOrders] Fetch Error',
}

export class RecentOrdersFetch implements Action {
  readonly type = RecentOrdersActionTypes.RecentOrdersFetch;
}

export class RecentOrdersFetchComplete implements Action {
  readonly type = RecentOrdersActionTypes.RecentOrdersFetchComplete;

  constructor(public payload: OrderStatus[]) {
  }
}

export class RecentOrdersFetchError implements Action {
  readonly type = RecentOrdersActionTypes.RecentOrdersFetchError;
  constructor(public payload: string) {
  }
}

export type RecentOrdersActions = RecentOrdersFetch | RecentOrdersFetchComplete | RecentOrdersFetchError;
