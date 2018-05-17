import { Component, OnInit } from '@angular/core';
import {TealiumUtagService} from '../service/utag.service';
import {ConfigService} from '../service/config.service';
import {CaremarkDataService} from '../service/caremark-data.service';


interface AttentionWidgetOrderDetails {
  OrderNumber: string;
  OrderDate: string;
  OrderedFor: string;
  OrderStatus: string;
  DoctorFullName: string;
  DrugName: string;
  DrugDosage: string;
  DrugStrength: string;
}

@Component({
  selector: 'app-attention',
  templateUrl: './attention.component.html',
  styleUrls: ['./attention.component.css']
})
export class AttentionComponent implements OnInit {
  public AttentionWidgetOrders: AttentionWidgetOrderDetails[] = [];
  public ORDER_HOLD_STATUS_TEXT = 'On Hold';

  constructor(private analytics: TealiumUtagService,
              private configSvc: ConfigService,
              private caremarkDataService: CaremarkDataService) { }

  public getWidgetData() {
    this.caremarkDataService.getOrderStatus().then((historyStatus: any) => {
      for (const history of historyStatus.Results) {
        if (history.PrescriptionList) {
          for (const prescription of history.PrescriptionList) {
            if (prescription.Status.toUpperCase() ===  this.ORDER_HOLD_STATUS_TEXT.toUpperCase()) {
              console.log('In HOLD');
              this.AttentionWidgetOrders.push(
                {
                  OrderDate: history.OrderDate,
                  OrderedFor: history.OrderedFor,
                  DoctorFullName: prescription.DoctorFullName,
                  OrderNumber: history.OrderNumber,
                  DrugDosage: prescription.DrugDosage,
                  DrugName: prescription.DrugName,
                  DrugStrength: prescription.DrugStrength,
                  OrderStatus: prescription.OrderStatus
                });
            }
          }
        }
      }
    }).catch((error) => {
      console.error('Failed to get WidgetData in attention');
      console.error(JSON.stringify(error));
    });
  }

  ngOnInit(): void {
    this.getWidgetData();
  }

}
