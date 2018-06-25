import {Component, ElementRef, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {iFramerResizer} from 'iframe-resizer';



@Component({
  selector: 'fast-widgets',
  templateUrl: './fast-widgets.component.html',
  styleUrls: ['./fast-widgets.component.css'],
  providers: []
})
export class FastWidgetsComponent implements OnInit {
  @ViewChild('myId') myId: ElementRef;
  htmlBody: any;

  constructor() {}


  ngOnInit() {
    this.showWidget();

  }


  showWidget() {

    const iframe = document.createElement('iframe');
    iframe.setAttribute('src', 'https://sit2fast.caremark.com/ClaimsHistory/V1.0/#/' +
      '?apiKey=769c71df-fd85-4645-92e0-b8003a8a4ef3&apiSecret=764588f5-551e-4894-b401-13ad2d61c1cf&' +
      'tokenid=CF0F8711B18039FDB6DA8CDD465D3C2C&fenv=demo');
    iframe.setAttribute('id', 'iframe_' + 'ORDER_STATUS');
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
