import {Action} from '@ngrx/store';

export enum DrugSearchActionTypes {
  DrugSearchFetch = '[RefillsCount] Fetch',
  DrugSearchFetchComplete = '[RefillsCount] Fetch Complete',
  DrugSearchFetchError = '[RefillsCount] Fetch Error',
}

export class DrugSearchFetch implements Action {
  readonly type = DrugSearchActionTypes.DrugSearchFetch;
  constructor(public payload: any) {
  }
}

export class DrugSearchFetchComplete implements Action {
  readonly type = DrugSearchActionTypes.DrugSearchFetchComplete;

  constructor(public payload: any) {
  }
}

export class DrugSearchFetchError implements Action {
  readonly type = DrugSearchActionTypes.DrugSearchFetchError;
  constructor(public payload: string) {
  }
}

export type DrugSearchActions = DrugSearchFetch | DrugSearchFetchComplete | DrugSearchFetchError;
