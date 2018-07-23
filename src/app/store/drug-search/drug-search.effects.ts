import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable} from 'rxjs/Observable';
import {Action} from '@ngrx/store';
import {catchError, map, mapTo, switchMap} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';
import 'rxjs/add/observable/fromPromise';
import {fromPromise} from 'rxjs/observable/fromPromise';
import {CaremarkDataService} from '../../service/caremark-data.service';
import {
  DrugSearchActionTypes,
  DrugSearchFetch,
  DrugSearchFetchComplete,
  DrugSearchFetchDefaultPharmacy, DrugSearchFetchDefaultPharmacyComplete, DrugSearchFetchDefaultPharmacyError,
  DrugSearchFetchError
} from './drug-search.actions';
import {VordelPbmService} from '../../service/vordel-pbm.service';

@Injectable()
export class DrugSearchEffects {

  constructor(private actions$: Actions,
              private vordelService: VordelPbmService) {
  }

  @Effect()
  drugSearchFetch$: Observable<Action> = this.actions$.pipe(
    ofType<DrugSearchFetch>(DrugSearchActionTypes.DrugSearchFetch),
    switchMap((action) => {
      return this.vordelService.getDrugByName(action.payload).pipe(
        map((response) => {
          return new DrugSearchFetchComplete(response);
        }),
        catchError((err) => {
          return of(new DrugSearchFetchError(err));
        }));
    }));

  @Effect()
  drugSearchFetchDefaultPharmacy$: Observable<Action> = this.actions$.pipe(
    ofType<DrugSearchFetchDefaultPharmacy>(DrugSearchActionTypes.DrugSearchFetchDefaultPharmacy),
    switchMap((action) => {
      return this.vordelService.getDefaultPharmacy().pipe(
        map((response) => {
          return new DrugSearchFetchDefaultPharmacyComplete(response);
        }),
        catchError((err) => {
          return of(new DrugSearchFetchDefaultPharmacyError(err));
        }));
    }));
}


