import {Action} from '@ngrx/store';

export enum RefillsCountActionTypes {
  RefillsCountFetch = '[RefillsCount] Fetch',
  RefillsCountFetchComplete = '[RefillsCount] Fetch Complete',
  RefillsCountFetchError = '[RefillsCount] Fetch Error',
}

export class RefillsCountFetch implements Action {
  readonly type = RefillsCountActionTypes.RefillsCountFetch;
}

export class RefillsCountFetchComplete implements Action {
  readonly type = RefillsCountActionTypes.RefillsCountFetchComplete;

  constructor(public payload: any) {
  }
}

export class RefillsCountFetchError implements Action {
  readonly type = RefillsCountActionTypes.RefillsCountFetchError;
  constructor(public payload: string) {
  }
}

export type RefillsCountActions = RefillsCountFetch | RefillsCountFetchComplete | RefillsCountFetchError;
