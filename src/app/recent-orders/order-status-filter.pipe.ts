import { Pipe, PipeTransform } from '@angular/core';
import {MemberService} from '../service/member.service';
import * as moment from 'moment';

@Pipe({
  name: 'orderStatusFilter'
})
export class OrderStatusFilterPipe implements PipeTransform {


  constructor(private memberService: MemberService) {}

  // Return true for filter recommendation
  dateFilter(order, filterDays?) {
    if (order.OrderDate) {
      const now = moment(new Date());
      const end = moment(order.OrderDate);
      const duration = moment.duration(now.diff(end));
      const days = Math.ceil(duration.asDays());
      filterDays = filterDays  ? filterDays : 30;

      console.log(days);

      if (days > filterDays) {
        return true;
      }
    }
    return false;
  }

  transform(orders: any [], args?: any): any {
    if (!orders) {
      return orders;
    }

    return orders.filter((order) => {

      // filter out any orders more than 30 days
      /*
      if (this.dateFilter(order)) {
        return false;
      }*/
/*
     const memberIno: any = this.memberService.memberDetails;
      if (memberIno.family && memberIno.dependentList) {
        for (const dependent of memberIno.dependentList) {
          console.log(JSON.stringify(dependent));
        }
      }
      */
      return order;
    });
  }

}
