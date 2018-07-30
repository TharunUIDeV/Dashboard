import {Pipe, PipeTransform} from '@angular/core';

@Pipe({ name: 'psDecimalPipe', pure: false })
export class PlanSummaryNumberPipe implements PipeTransform {
  transform(remainingAmountDecimal: string) {
    if (remainingAmountDecimal && remainingAmountDecimal.length === 1) {
      return (remainingAmountDecimal + '0');
    } else {
      return remainingAmountDecimal;
    }
  }
}
