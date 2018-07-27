import {Component, Input, Output, EventEmitter, TemplateRef, OnInit} from '@angular/core';

import {toString} from '../util/util';

/**
 * Context for the typeahead result template in case you want to override the default one
 */
export interface ResultTemplateContext {
  /**
   * Your typeahead result data model
   */
  result: any;

  /**
   * Search term from the input used to get current result
   */
  term: string;

  errorMessage: string;
}

@Component({
  selector: 'ngb-typeahead-window',
  exportAs: 'ngbTypeaheadWindow',
  host: { 'class': 'dropdown-menu show', 'role': 'listbox', '[id]': 'id'},
  template: `
    <ng-template #rt let-result="result" let-term="term" let-formatter="formatter">
      <ngb-highlight [result]="formatter(result)" [term]="term"></ngb-highlight>
    </ng-template>
    <ng-template ngFor [ngForOf]="results" let-result let-idx="index">
      <button type="button"  style="font-weight: bold; width: 100%; white-space: initial; line-height: 1.5em" class="dropdown-item" role="option"
        [id]="id + '-' + idx"
        [class.active]="idx === activeIdx"
        (mouseenter)="markActive(idx)"
        (click)="select(result)">
          <ng-template [ngTemplateOutlet]="resultTemplate || rt"
          [ngTemplateOutletContext]="{result: result, term: term, errorMessage: errorMessage, formatter: formatter}"></ng-template>
      </button>
    </ng-template>`,
    styleUrls: ['typeahead-window.css'], 
   
})
export class NgbTypeaheadWindow implements OnInit {
  activeIdx = 0;

  /**
   *  The id for the typeahead widnow. The id should be unique and the same
   *  as the associated typeahead's id.
   */
  @Input() id: string;

  /**
   * Flag indicating if the first row should be active initially
   */
  @Input() focusFirst = true;

  /**
   * Typeahead match results to be displayed
   */
  @Input() results;

  /**
   * Typeahead match results to be displayed
   */
  @Input() errorMessage: string;

  /**
   * Search term used to get current results
   */
  @Input() term: string;

  /**
   * A function used to format a given result before display. This function should return a formatted string without any
   * HTML markup
   */
  @Input() formatter = toString;

  /**
   * A template to override a matching result default display
   */
  @Input() resultTemplate: TemplateRef<ResultTemplateContext>;

  /**
   * Event raised when user selects a particular result row
   */
  @Output('select') selectEvent = new EventEmitter();

  @Output('activeChange') activeChangeEvent = new EventEmitter();

  hasActive() { return this.activeIdx > -1 && this.activeIdx < this.results.length; }

  getActive() { return this.results[this.activeIdx]; }

  markActive(activeIdx: number) {
    if (!this.errorMessage) {
      this.activeIdx = activeIdx;
      this._activeChanged();
    }
  }

  next() {
    if (this.activeIdx === this.results.length - 1) {
      this.activeIdx = this.focusFirst ? (this.activeIdx + 1) % this.results.length : -1;
    } else {
      this.activeIdx++;
    }
    this._activeChanged();
  }

  prev() {
    if (this.activeIdx < 0) {
      this.activeIdx = this.results.length - 1;
    } else if (this.activeIdx === 0) {
      this.activeIdx = this.focusFirst ? this.results.length - 1 : -1;
    } else {
      this.activeIdx--;
    }
    this._activeChanged();
  }

  resetActive() {
    if (!this.errorMessage) {
      this.activeIdx = this.focusFirst ? 0 : -1;
      this._activeChanged();
    } else {
      this.activeIdx = -1;
    }
  }

  select(item) {
    if (!this.errorMessage) {
      this.selectEvent.emit(item);
    }
  }

  ngOnInit() {
    this.resetActive();
  }

  handleError() {
  }

  private _activeChanged() {
    this.activeChangeEvent.emit(this.activeIdx >= 0 ? this.id + '-' + this.activeIdx : undefined);
  }
}
