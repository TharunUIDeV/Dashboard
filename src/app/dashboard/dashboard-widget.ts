import {InjectionToken} from '@angular/core';
import {Observable} from 'rxjs/Observable';

export class DashboardWidget {
  static metadata: any = {
    NAME: new InjectionToken<string>('name'),
    ROUTERLINK: new InjectionToken<string>('routerLink'),
    COLS: new InjectionToken<Observable<number>>('cols'),
    ROWS: new InjectionToken<Observable<number>>('rows'),
  };
  constructor(private _input: {
                name: {
                  key: InjectionToken<string>,
                  value: string
                },
                routerLink: {
                  key: InjectionToken<string>,
                  value: string
                },
                cols: {
                  key: InjectionToken<Observable<number>>,
                  value: Observable<number>
                },
                rows: {
                  key: InjectionToken<Observable<number>>,
                  value: Observable<number>
                },
              },
              private _widget: any) {
  }


  get input(): any {
    return this._input;
  }


  get widget(): any {
    return this._widget;
  }
}
