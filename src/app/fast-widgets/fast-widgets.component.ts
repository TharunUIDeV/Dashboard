import {Component, ElementRef, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {iFramerResizer} from 'iframe-resizer';
import {ConfigService} from '../service/config.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

export enum FastWidgetTypes {
  FAST_CDC_V4 = 'FAST_CDC_V4',
  FAST_ORDER_STATUS = 'FAST_ORDER_STATUS',
  FAST_CLAIMS_HISTORY = 'FAST_CLAIMS_HISTORY',
  FAST_REFILL_FROM_ACCOUNT = 'FAST_REFILL_FROM_ACCOUNT',
}

const keys = {
  FAST_CDC_V4: {
    url: `FASTCheckDrugCosts/v4/#/?`
   // url: `FASTCheckDrugCosts/v4/index.html#/?`
  },
  FAST_ORDER_STATUS: {
    url: `orderstatus/v1/#/?`
  },
  FAST_CLAIMS_HISTORY: {
    url: `ClaimsHistory/V1.0/#/?`
  },
  FAST_REFILL_FROM_ACCOUNT: {
    url: `refillfromaccount/1.0/#/?`
  },
};

@Component({
  selector: 'app-fast-widgets',
  templateUrl: './fast-widgets.component.html',
  styleUrls: ['./fast-widgets.component.css'],
  providers: []
})
export class FastWidgetsComponent implements OnInit {
  @ViewChild('myId') myId: ElementRef;
  htmlBody: any;
  public url: SafeResourceUrl;

  constructor(private configServie: ConfigService,
              private route: ActivatedRoute,
              private sanitizer: DomSanitizer,
              private router: Router) {
    this.route.url.subscribe(urlSegments => {
      const requestedUrl =  urlSegments.join('');
      console.log(requestedUrl);
      // Angular by default sanitises a URL, we need to bypass that so the full URL is rendered
      // NOTE: Need to look into security considerations of this
      this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.getFastConfig(requestedUrl));
      console.log(this.url);
    });

    this.listenForFallbackRoutingEvents();
  }

  ngOnInit() {
   //  this.showWidget();

  }

  getFastConfig(screen: string) {
    const key = keys[screen];
    // console.log(this.configServie.fastBaseUrl);
    // return `${this.configServie.fastBaseUrl}${key.url}&fenv=demo&faststyle=caremark`;
    // return `${this.configServie.fastBaseUrl}${key.url}&apiKey=${this.configServie.apiKey}&apiSecret=${this.configServie.apiSecret}&tokenid=${this.configServie.token}&fenv=demo&env=demo`;
    return `${this.configServie.fastBaseUrl}${key.url}&apiKey=${this.configServie.apiKey}&apiSecret=${this.configServie.apiSecret}&tokenid=${this.configServie.token}&fenv=${this.configServie.env.toLowerCase()}&env=${this.configServie.env.toLowerCase()}`;
  }

  /*
  If the iframed-in app can't resolve a URL itself it will post a message to the parent
  iframe (this app). Listen to those messages and attempt to navigate to that URL.
  */
  listenForFallbackRoutingEvents() {
    // Create IE + others compatible event handler
    const eventMethod = window.addEventListener ? 'addEventListener' : 'attachEvent';
    const eventer = window[eventMethod];
    const messageEvent = eventMethod === 'attachEvent' ? 'onmessage' : 'message';


    eventer(messageEvent, (e) => {
      if (e.data.navigateTo) {
        console.log('parent received message!:  ', e.data);
        const url = e.data.navigateTo;
        console.log(url);
        this.router.navigateByUrl(url);
      }
    }, false);
  }

}
