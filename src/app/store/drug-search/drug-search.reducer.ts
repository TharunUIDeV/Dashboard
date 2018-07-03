import {Action} from '@ngrx/store';
import {DrugSearchActions, DrugSearchActionTypes} from './drug-search.actions';

export interface DrugSearchState {
  loading: boolean;
  error: string;
  DrugSearchResults: any[];
}

export const initialDrugSearchState: DrugSearchState = {
  loading: true,
  error: '',
  DrugSearchResults: [],
  };

export function DrugSearchReducer(state = initialDrugSearchState, action: DrugSearchActions): DrugSearchState {
  switch (action.type) {

    case DrugSearchActionTypes.DrugSearchFetch:
      return state;

    case DrugSearchActionTypes.DrugSearchFetchComplete:
      return {loading: false, error: '', DrugSearchResults: action.payload};

    case DrugSearchActionTypes.DrugSearchFetchError:
      return  {loading: false, error: action.payload, DrugSearchResults: []};

    default:
      return state;
  }
}

