import {Injectable} from '@angular/core';
import * as bowser from 'bowser';

@Injectable()
export class BrowserService {
  public chrome: boolean;
  public msie: boolean;
  public safari: boolean;
  public firefox: boolean;

  constructor() {
    this.chrome = bowser.chrome;
    this.msie = bowser.msie || bowser.msedge;
    this.safari = bowser.safari;
    this.firefox = bowser.firefox;
    console.log(this.deviceType);
  }

  get which() {
    if (this.chrome) {
      return 'chrome';
    } else if (this.msie) {
      return 'msie';
    } else if (this.safari) {
      return 'safari';
    } else if (this.firefox) {
      return 'firefox';
    }
  }

  get deviceType() {
    let userAgent = '';
    // ANDROID
    if (/Android/i.test(navigator.userAgent)) {
      // ANDROID MOBILE
      if (/Mobile/i.test(navigator.userAgent)) {
        userAgent = 'AND_MOBILE';

        // ANDROID GLASS
      } else if (/Glass/i.test(navigator.userAgent)) {
        userAgent = 'AND_GLASS';

        // ANDROID TABLET
      } else {
        userAgent = 'AND_TABLET';
      }
      // iOS Mobile
    } else if (/iPhone|iPod/i.test(navigator.userAgent)) {
      userAgent = 'IOS_MOBILE';


      // iOS Tablet
    } else if (/iPad/i.test(navigator.userAgent)) {
      userAgent = 'IOS_TABLET';


      // Windows
    } else if (/IEMobile/i.test(navigator.userAgent)) {
      userAgent = 'WIN_MOBILE';

      // Other identified vendor
    } else if (/webOS|BlackBerry|Opera Mini/i.test(navigator.userAgent)) {
      userAgent = 'OTH_MOBILE';
    }
    else {
      userAgent = 'DESKTOP';
    }
    return userAgent;
  }

}
