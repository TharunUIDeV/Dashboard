import {Inject, Injectable} from '@angular/core';
import {ConfigService} from '../service/config.service';
import {MemberService} from '../service/member.service';
import {caremarksdk} from '../types/caremarksdk';


@Injectable()
export class RefillService {

  private param: any = {};

  private setAPIParams(): void {
    this.param.env = this.configService.env;
    this.param.apiKey = this.configService.apiKey;
    this.param.apiSecret = this.configService.apiSecret;
    this.param.tokenId = this.configService.token;
  }

  public getRefills() {

    return new Promise((resolve, reject) => {
      this.memberService.getMemberDetails()
        .then((memberInfo) => {
          this.setAPIParams();
          this.param.memberInfo = memberInfo;
          return;
        })
        .then(() => {
          this.sdkInstance.Drug.getRefills(this.param, (result) => {
            if (result.Header.StatusCode === '0000') {
              return resolve(result.Details);
            }
            console.error(JSON.stringify(result.Header));
            return reject(result.Header);
          });
        });
    });

  }

  constructor(@Inject('CAREMARKSDK_INSTANCE') private sdkInstance: any,
              private configService: ConfigService,
              private memberService: MemberService) { }
}
