import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable} from 'rxjs/Observable';
import {Action} from '@ngrx/store';
import {catchError, map, mapTo, switchMap} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';
import 'rxjs/add/observable/fromPromise';
import {fromPromise} from 'rxjs/observable/fromPromise';
import {CaremarkDataService} from '../../service/caremark-data.service';
import {DrugSearchActionTypes, DrugSearchFetch, DrugSearchFetchComplete, DrugSearchFetchError} from './drug-search.actions';

@Injectable()
export class DrugSearchEffects {

  constructor(private actions$: Actions,
              private caremarkDataService: CaremarkDataService) {
  }

  @Effect()
  drugSearchFetch$: Observable<Action> = this.actions$.pipe(
    ofType<DrugSearchFetch>(DrugSearchActionTypes.DrugSearchFetch),
    switchMap((action) => {
      return fromPromise(this.caremarkDataService.getDrugByName(action.payload)).pipe(
        map((response) => {
          return new DrugSearchFetchComplete(response);
        }),
        catchError((err) => {
          return of(new DrugSearchFetchError(err));
        }));
    }));
}


