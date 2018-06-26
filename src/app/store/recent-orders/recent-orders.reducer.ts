import {Action} from '@ngrx/store';
import {RecentOrdersActions, RecentOrdersActionTypes} from './recent-orders.actions';
import {OrderStatus} from '../../order-status/order-status.interface';

export interface RecentOrdersState {
  loading: boolean;
  error: string;
  OrdersCount: number;
  Orders: OrderStatus[];
}

export const initialRecentOrderState: RecentOrdersState = {
  loading: true,
  error: '',
  OrdersCount: undefined,
  Orders: []};

export function RecentOrdersReducer(state = initialRecentOrderState, action: RecentOrdersActions): RecentOrdersState {
  switch (action.type) {

    case RecentOrdersActionTypes.RecentOrdersFetch:
      return state;

    case RecentOrdersActionTypes.RecentOrdersFetchComplete:
      return {loading: false, error: '', OrdersCount: action.payload.length, Orders: action.payload};

    case RecentOrdersActionTypes.RecentOrdersFetchError:
      return  {loading: false, error: action.payload, OrdersCount: undefined, Orders: []};

    default:
      return state;
  }
}

