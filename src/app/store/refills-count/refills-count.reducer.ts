import {Action} from '@ngrx/store';
import {RefillsCountActions, RefillsCountActionTypes} from './refills-count.actions';

export interface RefillsCountState {
  loading: boolean;
  error: string;
  RefillAvailableCount: number;
}

export const initialRefillsCountState: RefillsCountState = {
  loading: true,
  error: '',
  RefillAvailableCount: undefined,
  };

export function RefillsCountReducer(state = initialRefillsCountState, action: RefillsCountActions): RefillsCountState {
  switch (action.type) {

    case RefillsCountActionTypes.RefillsCountFetch:
      return state;

    case RefillsCountActionTypes.RefillsCountFetchComplete:
      return {loading: false, error: '', RefillAvailableCount: action.payload.refillsAvailable};

    case RefillsCountActionTypes.RefillsCountFetchError:
      return  {loading: false, error: action.payload, RefillAvailableCount: undefined};

    default:
      return state;
  }
}

