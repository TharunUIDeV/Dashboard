import {Inject, Injectable} from '@angular/core';
import {MemberService} from '../service/member.service';
import {ConfigService} from '../service/config.service';
import {OrderStatusElement} from './order-status.widget.service';

@Injectable()
export class OrderStatusService {

  constructor(@Inject('CAREMARKSDK_INSTANCE') private sdkInstance: any,
              private configService: ConfigService,
              private memberService: MemberService) {
  }

  private param: any = {};


  // private param: caremarksdk.CommonParam;

  private setAPIParams(): void {
    this.param.env = this.configService.env;
    this.param.apiKey = this.configService.apiKey;
    this.param.apiSecret = this.configService.apiSecret;
    this.param.tokenId = this.configService.token;

    console.error('TODO: Delete Hardcoded Params');
    this.param.env = 'SIT1';
    this.param.apiKey = '769c71df-fd85-4645-92e0-b8003a8a4ef3';
    this.param.apiSecret = '764588f5-551e-4894-b401-13ad2d61c1cf';
    this.param.tokenId = '031F0EB4D7E831C6B9722ABFABAC500E';
    this.param.historyCount = 200;
    this.param.historyMetric = 'days';
    console.log(JSON.stringify(this.param));
  }

  public getHistory(): Promise<any> {

    return new Promise((resolve, reject) => {
      this.memberService.getMemberDetails()
        .then((memberInfo) => {
          this.setAPIParams();
          this.param.memberInfo = memberInfo;
        })
        .then(() => {
          this.sdkInstance.Order.getHistory(this.param, (result) => {
            if (result.Header.StatusCode === '0000') {
              return resolve(result.Details);
            }
            console.error(JSON.stringify(result.Header));
            return reject(result);
          });
        });
    });
  }
}
