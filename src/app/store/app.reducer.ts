import {
  ActionReducer,
  ActionReducerMap, createFeatureSelector, createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import {RecentOrdersReducer, RecentOrdersState} from './recent-orders/recent-orders.reducer';

/**
 * storeFreeze prevents state from being mutated. When mutation occurs, an
 * exception will be thrown. This is useful during development mode to
 * ensure that none of the reducers accidentally mutates the state.
 */
import { storeFreeze } from 'ngrx-store-freeze';

export interface AppState {
  recetnOrdersState: RecentOrdersState;
}

export const reducers: ActionReducerMap<AppState> = {
  recetnOrdersState: RecentOrdersReducer,

};

// console.log all actions
export function logger(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
  return function(state: AppState, action: any): AppState {
    console.log('state', state);
    console.log('action', action);

    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [logger, storeFreeze] : [];


export const getRecentOrdersState = createFeatureSelector<RecentOrdersState>('recentOrderState');

export const getRecentOrders = createSelector(getRecentOrdersState, (state: RecentOrdersState) => state);
