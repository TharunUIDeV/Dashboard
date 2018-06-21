import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable} from 'rxjs/Observable';
import {Action} from '@ngrx/store';
import {catchError, map, mapTo, switchMap} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';
import 'rxjs/add/observable/fromPromise';
import {fromPromise} from 'rxjs/observable/fromPromise';
import {RefillsCountActionTypes, RefillsCountFetch, RefillsCountFetchComplete, RefillsCountFetchError} from './refills-count.actions';
import {CaremarkDataService} from '../../service/caremark-data.service';

@Injectable()
export class RefillsCountEffects {

  constructor(private actions$: Actions,
              private caremarkDataService: CaremarkDataService) {
  }

  @Effect()
  refillsCountFetch$: Observable<Action> = this.actions$.pipe(
    ofType<RefillsCountFetch>(RefillsCountActionTypes.RefillsCountFetch),
    switchMap((value, index) => {
      return fromPromise(this.caremarkDataService.getRefillsCount()).pipe(
        map((response) => {
          return new RefillsCountFetchComplete(response);
        }),
        catchError((err) => {
          return of(new RefillsCountFetchError(err));
        }));
    }));
}


