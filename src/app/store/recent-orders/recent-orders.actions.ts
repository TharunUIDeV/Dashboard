import {Action} from '@ngrx/store';
import {OrderStatus} from '../../order-status/order-status.interface';

export enum RecentOrdersActionTypes {
  RecentOrdersFetch = '[RecentOrders] Fetch',
  RecentOrdersPost = '[RecentOrders] Post',
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

export class RecentOrdersPost implements Action {
  readonly type = RecentOrdersActionTypes.RecentOrdersPost;
}

export type RecentOrdersActions = RecentOrdersFetch | RecentOrdersPost | RecentOrdersFetchComplete | RecentOrdersFetchError;
