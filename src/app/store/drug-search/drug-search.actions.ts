import {Action} from '@ngrx/store';

export enum DrugSearchActionTypes {
  DrugSearchFetch = '[DrugSearch] Fetch',
  DrugSearchFetchComplete = '[DrugSearch] Fetch Complete',
  DrugSearchFetchError = '[DrugSearch] Fetch Error',
  DrugSearchFetchDefaultPharmacy = '[DrugSearch] Fetch DefaultPharmacy',
  DrugSearchFetchDefaultPharmacyComplete = '[DrugSearch] Fetch DefaultPharmacy Complete',
  DrugSearchFetchDefaultPharmacyError = '[DrugSearch] Fetch DefaultPharmacy Error',
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

export class DrugSearchFetchDefaultPharmacy implements Action {
  readonly type = DrugSearchActionTypes.DrugSearchFetchDefaultPharmacy;
  constructor() {
  }
}

export class DrugSearchFetchDefaultPharmacyComplete implements Action {
  readonly type = DrugSearchActionTypes.DrugSearchFetchDefaultPharmacyComplete;

  constructor(public payload: any) {
  }
}

export class DrugSearchFetchDefaultPharmacyError implements Action {
  readonly type = DrugSearchActionTypes.DrugSearchFetchDefaultPharmacyError;
  constructor(public payload: string) {
  }
}

export type DrugSearchActions = DrugSearchFetch | DrugSearchFetchComplete | DrugSearchFetchError |
  DrugSearchFetchDefaultPharmacy | DrugSearchFetchDefaultPharmacyComplete | DrugSearchFetchDefaultPharmacyError;
