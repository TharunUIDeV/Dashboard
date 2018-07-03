import {
  ActionReducer,
  ActionReducerMap, createFeatureSelector, createSelector,
  MetaReducer
} from '@ngrx/store';
import {environment} from '../../environments/environment';
import {RecentOrdersReducer, RecentOrdersState} from './recent-orders/recent-orders.reducer';

/**
 * storeFreeze prevents state from being mutated. When mutation occurs, an
 * exception will be thrown. This is useful during development mode to
 * ensure that none of the reducers accidentally mutates the state.
 */
import {storeFreeze} from 'ngrx-store-freeze';
import {RefillsCountReducer, RefillsCountState} from './refills-count/refills-count.reducer';
import {DrugSearchReducer, DrugSearchState} from './drug-search/drug-search.reducer';

export interface AppState {
  recentOrdersState: RecentOrdersState;
  refillsCountState: RefillsCountState;
  drugSearchState: DrugSearchState;
}

export const reducers: ActionReducerMap<AppState> = {
  recentOrdersState: RecentOrdersReducer,
  refillsCountState: RefillsCountReducer,
  drugSearchState: DrugSearchReducer,
};

// console.log all actions
export function logger(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
  return function (state: AppState, action: any): AppState {
    console.log('state', state);
    console.log('action', action);

    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [logger, storeFreeze] : [];
