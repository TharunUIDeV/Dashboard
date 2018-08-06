export abstract class AbstractDashboardWidget {
  constructor(private _name: string,
              private _routerLink: string,
              private _col: number,
              private _row: number) {
  }

  get name(): string {
    return this._name;
  }

  get routerLink(): string {
    return this._routerLink;
  }
  get col(): number {
    return this._col;
  }

  get row(): number {
    return this._row;
  }
}
