import {Injectable} from '@angular/core';
import {OrderStatusService} from './order-status.service';

export interface OrderStatusElement {
  OrderNumber: string;
  OrderedFor: string;
  RxFills: string;
  StatusDescription: string;
}


@Injectable()
export class OrderStatusWidgetService {
  private widgetData: OrderStatusElement[] = [];
  constructor(private orderStatusService: OrderStatusService) {
  }

  getWidgetData() {
    return new Promise((resolve) => {
      this.orderStatusService.getHistory()
        .then((historyStatus: any) => {
          for (const history of historyStatus.Results) {
            this.widgetData.push({
              OrderNumber: history.OrderNumber,
              OrderedFor: history.OrderDate,
              RxFills: history.PrescriptionList !== undefined ? history.PrescriptionList[0].RxFillList.length : 'No Rx',
              StatusDescription: history.PrescriptionList !== undefined ? history.PrescriptionList[0].StatusDescription : 'Unknown'
            });
          }
          resolve(this.widgetData);
        })
        .catch((error) => console.error(error));
    });
  }


}
