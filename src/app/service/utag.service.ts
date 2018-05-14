import {Injectable} from '@angular/core';
import {BrowserService} from "./browser.service";
import {ConfigService} from "./config.service";

@Injectable()
export class TealiumUtagService {
  private static deviceType;
  private static platform;
  private static environment;
  script_src: string = '';

  // Typically set "noview" flag (no first page automatic view event) to true for Single Page Apps (SPAs)
  constructor(private browserService: BrowserService, private configSvc: ConfigService) {
    TealiumUtagService.deviceType = this.browserService.deviceType;
    TealiumUtagService.platform = (TealiumUtagService.deviceType == 'DESKTOP') ? "dweb" : (TealiumUtagService.deviceType.indexOf('MOBILE') != -1) ? "mweb" : (TealiumUtagService.deviceType.indexOf('TAB') != -1) ? "tweb" : "dweb";
    (<any>window).utag_cfg_ovrd = {noview: true};
    (<any>window).utag_data = {};
    TealiumUtagService.environment = this.configSvc.env;
  }

  private static getEST(): string {
    let utc = new Date().getTime() + (new Date().getTimezoneOffset() * 60000);
    let tempDate = new Date();
    let jan = new Date(tempDate.getFullYear(), 0, 1);
    let jul = new Date(tempDate.getFullYear(), 6, 1);

    if (Math.min(jan.getTimezoneOffset(), jul.getTimezoneOffset()) == tempDate.getTimezoneOffset())
      return new Date(utc + (3600000 * -4)).toLocaleString() + ' EST';
    else
      return new Date(utc + (3600000 * -5)).toLocaleString() + ' EST';
  }

  private static getPreviousPageName(): string {
    if ((<any>window).utag && (<any>window).utag.data && (<any>window).utag.data.Page_Name){
      return 'pbm' + '|' + this.platform  + '|' + (<any>window).utag.data.Page_Name;
    }  else {
      console.log(`Hard coding now for testing purposes`);
      return 'pbm' + '|' + this.platform  + '|' + 'CVSCaremark Home Unauthenticated Home';
    }
  }

  private static getPreviouspageURL(): string {
    if ((<any>window).utag && (<any>window).utag.data && (<any>window).utag.data.page_url){
      return (<any>window).utag.data.page_url;
    } else {
      return "";
    }
  }

  private static _getBasicTraffic(): any {
    const pageCategory = 'Dashboard';
    const commonUrl = 'pbm';
    const basicViewTags = {
      domain: window.document.domain,
      adobe_platform: this.platform,
      common_url: 'pbm',
      sub_section1: commonUrl + '|' + this.platform + '|' + pageCategory,
      sub_section2: commonUrl + '|' + this.platform + '|' + pageCategory,
      sub_section3: commonUrl + '|' + this.platform + '|' + pageCategory,
      sub_section4: commonUrl + '|' + this.platform + '|' + pageCategory,
      adobe_page_name: commonUrl + '|' + this.platform + '|' + pageCategory + ' Home',
      previous_adobe_page_name: this.getPreviousPageName(),
      page_url: window.location.host + window.location.pathname,
      previous_page_url: this.getPreviouspageURL(),
      responsive_design: this.platform,
      authentication_state: 'Rx Registered',
      state_logged_in: 'true',
      environment: TealiumUtagService.environment,
      time_stamp: this.getEST(),
      document_title: document.title,
      query_string: null,
      state_city_ipaddress: null,
      Error_Messages: null,
      member_id: 'SHOULD COME FROM PORTAL',
      unencypted_email_id: 'SHOULD COME FROM PORTAL',
    };
    return basicViewTags;
  }

  private static _getUtagData(): any {
    const utagData =   {
      environment : TealiumUtagService.environment,
      site_name : 'caremark',
      platform: this.platform,
      // Client_Id: SHOULD COME FROM PORTAL,
      PBM_Client_Name: 'caremark'
    };
    return utagData;
  }
  // Generic script loader with callback
  getScript(src: string, callback: Function) {
    let d = document;
    let o = {
      callback: callback || function () {
      }
    };
    let s, t;

    if (typeof src == "undefined") {
      return;
    }

    s = d.createElement("script");
    s.language = "javascript";
    s.type = "text/javascript";
    s.async = 1;
    s.charset = "utf-8";
    s.src = src;
    if (typeof o.callback == "function") {
      if (d.addEventListener) {
        s.addEventListener("load", function () {
          o.callback()
        }, false);
      } else {
        // old IE support
        s.onreadystatechange = function () {
          if (this.readyState == "complete" || this.readyState == "loaded") {
            this.onreadystatechange = null;
            o.callback()
          }
        };
      }
    }
    t = d.getElementsByTagName("script")[0];
    t.parentNode.insertBefore(s, t);
  }

  // Config settings used to build the path to the utag.js file
  setConfig(config: { account: string, profile: string, environment: string }) {
    if (config.environment === 'demo') {
      return;
    }
    if (config.account !== undefined && config.profile !== undefined && config.environment !== undefined) {
      this.script_src = 'https://tags.tiqcdn.com/utag/' + config.account + '/' + config.profile + '/' + config.environment + '/utag.js';
    }
  }

  // Data layer is optional set of key/value pairs
  track(tealium_event: string, data?: any) {
    if (this.script_src === '') {
      console.log("Tealium config not set.");
      return;
    }

    console.log(`Tagging Event: ${JSON.stringify(tealium_event)}`);
    console.log(data);

    if ((<any>window).utag === undefined) {
      this.getScript(this.script_src, function () {
        (<any>window).utag.track(tealium_event, data);
      });
    } else {
      (<any>window).utag.track(tealium_event, data);
    }
  }

  view(data?: any) {
    const viewData = Object.assign({}, TealiumUtagService._getUtagData(), TealiumUtagService._getBasicTraffic(), data);
    this.track("view", viewData);
  }

  link(data?: any) {
    const linkData = Object.assign({}, TealiumUtagService._getUtagData(), data);
    this.track("link", linkData);
  }
}
