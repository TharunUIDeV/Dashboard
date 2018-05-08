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
    this.param.apiSecret = this.configService.apiSecret;
    this.param.tokenId = this.configService.token;

    console.error('TODO: Delete Hardcoded params');
    this.param.env = 'SIT1';
    this.param.apiKey = '769c71df-fd85-4645-92e0-b8003a8a4ef3';
    this.param.apiSecret = '764588f5-551e-4894-b401-13ad2d61c1cf';
    this.param.tokenId = '031F0EB4D7E831C6B9722ABFABAC500E';
    console.log(JSON.stringify(this.param));
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
              private configService: ConfigService) {
  }
}
