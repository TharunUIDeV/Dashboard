import {Action} from '@ngrx/store';
import {RecentOrdersActions, RecentOrdersActionTypes} from './recent-orders.actions';
import {OrderStatus} from '../../order-status/order-status.interface';

export interface RecentOrdersState {
  OrdersCount: number;
  Orders: OrderStatus[];
}

const initialState: RecentOrdersState = {OrdersCount: undefined, Orders: []};

export function RecentOrdersReducer(state = initialState, action: RecentOrdersActions): RecentOrdersState {
  switch (action.type) {

    case RecentOrdersActionTypes.RecentOrdersFetch:
      return state;

    case RecentOrdersActionTypes.RecentOrdersFetchComplete:
      return {OrdersCount: action.payload.length, Orders: action.payload};

    case RecentOrdersActionTypes.RecentOrdersPost:
      return state;

    default:
      return state;
  }
}
