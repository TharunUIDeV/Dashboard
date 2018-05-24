import { Pipe, PipeTransform } from '@angular/core';
import {MemberService} from '../service/member.service';

@Pipe({
  name: 'orderStatusFilter'
})
export class OrderStatusFilterPipe implements PipeTransform {

  constructor(private memberService: MemberService) {}

  transform(orders: any [], args?: any): any {
    if (!orders) {
      return orders;
    }
    return orders.filter((order) => {
      if (order.OrderType && order.OrderType.toUpperCase() === 'FastStart'.toUpperCase()) {
        order.OrderNumber = 'not assigned yet';
      }

     const memberIno: any = this.memberService.memberDetails;
      if (memberIno.family && memberIno.dependentList) {
        for (const dependent of memberIno.dependentList) {
          console.log(JSON.stringify(dependent));
        }
      }
      return order;
    });
  }

}
