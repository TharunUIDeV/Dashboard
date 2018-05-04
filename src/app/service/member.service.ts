import {Inject, Injectable} from '@angular/core';
import {ConfigService} from '../service/config.service';
import {caremarksdk} from '../types/caremarksdk';


@Injectable()
export class MemberService {

  private param: any = {};
  // private param: caremarksdk.CommonParam;

  private setAPIParams(): void {
    this.param.env = this.configService.env;
    this.param.apiKey = this.configService.apiKey;
    this.param.apiSecret =  this.configService.apiSecret;
    this.param.tokenId = this.configService.token;
  }

  public getMemberDetails() {

    return new Promise( (resolve, reject) => {
      if (!this.sdkInstance) {
        reject('SDK Not Initialized');
      }

      this.setAPIParams();
      this.sdkInstance.Member.getDetails(this.param, (result) => {
        if (result.Header.StatusCode === '0000') {
          resolve(result.Details);
        }
        reject(result.Header.StatusDescription);
      });

    });

  }

  constructor(@Inject('CAREMARKSDK_INSTANCE') private sdkInstance: any,
              private configService: ConfigService) {}
}
