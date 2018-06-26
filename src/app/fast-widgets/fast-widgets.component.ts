import {Component, ElementRef, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {iFramerResizer} from 'iframe-resizer';
import {ConfigService} from '../service/config.service';

enum Widgets {
  CDC_V4 = "CDC_V4",
  ORDER_STATUS = "ORDER_STATUS",
  CLAIMS_HISTORY = "CLAIMS_HISTORY",
  REFILL_FROM_ACCOUNT = "REFILL_FROM_ACCOUNT",
  SAMPLE_WIDGET = "SAMPLE_WIDGET"
}

const keys = {
  CDC_V4: {
    url: `/FASTCheckDrugCosts/v4/#/?`
  },
  ORDER_STATUS: {
    url: `/orderstatus/v1/#/?`
  },
  CLAIMS_HISTORY: {
    url: `/ClaimsHistory/V1.0/#/?`
  },
  REFILL_FROM_ACCOUNT: {
    url: `/refillfromaccount/1.0/#/?`
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

  constructor(private configServie: ConfigService) {}


  ngOnInit() {
    this.showWidget();

  }

  getFastConfig(screen: Widgets) {
    const key = keys[screen];
    return `${this.configServie.apiBaseUrl}${key.url}&apiKey=${this.configServie.apiKey}&apiSecret=${this.configServie.apiSecret}&tokenid=${this.configServie.token}&fenv=${this.configServie.env.toLowerCase()}&env=${this.configServie.env.toLowerCase()}`;
  }

    showWidget() {
    const src = this.getFastConfig(Widgets.CDC_V4);
    const iframe = document.createElement('iframe');
    iframe.setAttribute('src', src);
    iframe.setAttribute('id', 'iframe_' + Widgets.CDC_V4);
    iframe.setAttribute('width', '100%');
    console.log(this.myId);

    const container = this.myId.nativeElement;
    /*
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }*/
    container.insertBefore(iframe, container.childNodes[0]);

    iframe.setAttribute('height', '1000px');

    //  return this.widgetService.getMicroWidget('');
  }

}
