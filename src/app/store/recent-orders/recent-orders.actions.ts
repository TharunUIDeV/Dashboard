import { Action } from '@ngrx/store';

export enum RecentOrdersActionTypes {
  RecentOrdersFetch = '[RecentOrders] Fetch',
  RecentOrdersPost = '[RecentOrders] Post'
}

export class RecentOrdersFetch implements Action {
  readonly type = RecentOrdersActionTypes.RecentOrdersFetch;
}


export class RecentOrdersPost implements Action {
  readonly type = RecentOrdersActionTypes.RecentOrdersPost;
}

export type RecentOrdersActions = RecentOrdersFetch | RecentOrdersPost;
