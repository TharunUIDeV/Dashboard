import {Inject, Injectable} from '@angular/core';
import {MemberService} from '../service/member.service';
import {ConfigService} from '../service/config.service';

export interface OrderStatusWidgetElement {
  OrderNumber: string;
  OrderedFor: string;
  RxFills: string;
  StatusDescription: string;
}


@Injectable()
export class OrderStatusService {

  constructor(@Inject('CAREMARKSDK_INSTANCE') private sdkInstance: any,
              private configService: ConfigService,
              private memberService: MemberService) {}

  private param: any = {};
  private widgetData: OrderStatusWidgetElement[] =  [];
  private orderStatusData: any = {};

  private setAPIParams(): void {
    this.param.env = this.configService.env;
    this.param.apiKey = this.configService.apiKey;
    this.param.apiSecret = this.configService.apiSecret;
    this.param.tokenId = this.configService.token;
    this.param.historyCount = 366;
    this.param.historyMetric = 'days';
  }


  public getHistory(): Promise<any> {

    return new Promise((resolve, reject) => {
      this.memberService.getMemberDetails()
        .then((memberInfo) => {
          this.setAPIParams();
          this.param.memberInfo = memberInfo;
        })
        .then(() => {
          this.sdkInstance.Order.getOrderStatus(this.param, (result) => {
            if (result.Header.StatusCode === '0000') {
              return resolve(result.Details);
            }
            console.error(JSON.stringify(result.Header));
            return reject(result);
          });
        });
    });
  }


  public getWidgetData() {
    return this.getHistory().then((historyStatus: any) => {
        for (const history of historyStatus.Results) {
          this.widgetData.push({
            OrderNumber: history.OrderNumber,
            OrderedFor: history.OrderDate,
            RxFills: history.PrescriptionList !== undefined ? history.PrescriptionList[0].RxFillList.length : 'No Rx',
            StatusDescription: history.PrescriptionList !== undefined ? history.PrescriptionList[0].StatusDescription : 'Unknown'
          });
        }
        return (this.widgetData);
      })
      .catch((error) => {
          console.error('Failed to getWidgetData');
          throw new Error(error);
      });
}
}
