import {Component, ElementRef, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {iFramerResizer} from 'iframe-resizer';
import {ConfigService} from '../service/config.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

enum WidgetTypes {
  CDC_V4 = 'CDC_V4',
  ORDER_STATUS = 'ORDER_STATUS',
  CLAIMS_HISTORY = 'CLAIMS_HISTORY',
  REFILL_FROM_ACCOUNT = 'REFILL_FROM_ACCOUNT',
  SAMPLE_WIDGET = 'SAMPLE_WIDGET'
}

const keys = {
  CDC_V4: {
    url: `FASTCheckDrugCosts/v4/#/?`
  },
  ORDER_STATUS: {
    url: `orderstatus/v1/#/?`
  },
  CLAIMS_HISTORY: {
    url: `ClaimsHistory/V1.0/#/?`
  },
  REFILL_FROM_ACCOUNT: {
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
      this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.getFastConfig(WidgetTypes.CDC_V4));
      console.log(this.url);
    });

    this.listenForFallbackRoutingEvents();
  }

  ngOnInit() {
   //  this.showWidget();

  }

  getFastConfig(screen: WidgetTypes) {
    const key = keys[screen];
    return `${this.configServie.fastBaseUrl}${key.url}&apiKey=${this.configServie.apiKey}&apiSecret=${this.configServie.apiSecret}&tokenid=${this.configServie.token}&fenv=demo&env=demo`;
    // return `${this.configServie.fastBaseUrl}${key.url}&apiKey=${this.configServie.apiKey}&apiSecret=${this.configServie.apiSecret}&tokenid=${this.configServie.token}&fenv=${this.configServie.env.toLowerCase()}&env=${this.configServie.env.toLowerCase()}`;
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
