import {Action} from '@ngrx/store';
import {DrugSearchActions, DrugSearchActionTypes} from './drug-search.actions';

export interface DrugSearchState {
  loading: boolean;
  error: string;
  DrugSearchResults: any[];
  DefaultPharmacy?: any;
}

export const initialDrugSearchState: DrugSearchState = {
  loading: true,
  error: '',
  DrugSearchResults: [],
  DefaultPharmacy: undefined,
  };

export function DrugSearchReducer(state = initialDrugSearchState, action: DrugSearchActions): DrugSearchState {
  switch (action.type) {

    case DrugSearchActionTypes.DrugSearchFetch:
      return state;

    case DrugSearchActionTypes.DrugSearchFetchComplete:
      return {loading: false, error: '', DrugSearchResults: action.payload};

    case DrugSearchActionTypes.DrugSearchFetchError:
      return  {loading: false, error: action.payload, DrugSearchResults: []};

      case DrugSearchActionTypes.DrugSearchFetchDefaultPharmacy:
      return state;

    case DrugSearchActionTypes.DrugSearchFetchDefaultPharmacyComplete:
      return {loading: false, error: '', DrugSearchResults: undefined, DefaultPharmacy: action.payload};

    case DrugSearchActionTypes.DrugSearchFetchDefaultPharmacyError:
      return  {loading: false, error: action.payload, DrugSearchResults: undefined, DefaultPharmacy: undefined};

    default:
      return state;
  }
}

