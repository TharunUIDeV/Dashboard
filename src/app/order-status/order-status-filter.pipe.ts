import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderStatusFilter'
})
export class OrderStatusFilterPipe implements PipeTransform {

  transform(orders: any[], args?: any): any {
    if (!orders) {
      return orders;
    }
    return orders.filter((order) => order);
  }

}
