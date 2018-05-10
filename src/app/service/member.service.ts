import {Inject, Injectable} from '@angular/core';
import {ConfigService} from '../service/config.service';
import {caremarksdk} from '../types/caremarksdk';


@Injectable()
export class MemberService {

  private param: any = {};
  private setAPIParams(): void {
    this.param.env = this.configService.env;
    this.param.apiKey = this.configService.apiKey;
    this.param.apiSecret = this.configService.apiSecret;
    this.param.tokenId = this.configService.token;
  }

  public getMemberDetails() {

    return new Promise((resolve, reject) => {
      if (!this.sdkInstance) {
        const error = {error: 'SDK Not Initialized'};
        console.error(JSON.stringify(error));
        return reject(error);
      }

      this.setAPIParams();
      this.sdkInstance.Member.getDetails(this.param, (result) => {
        if (result.Header.StatusCode === '0000') {
          return resolve(result.Details);
        }
        console.error(JSON.stringify(result.Header));
        return reject(result.Header);
      });

    });

  }

  constructor(@Inject('CAREMARKSDK_INSTANCE') private sdkInstance: any,
              private configService: ConfigService) { }
}
