import {Component, OnInit} from '@angular/core';
import {TealiumUtagService} from '../service/utag.service';
import {ConfigService} from '../service/config.service';
import {OrderStatusService} from '../order-status/order-status.service';
import {OrderStatus} from '../order-status/order-status.interface';
import {ORDER_STATUS_TYPES} from '../order-status/order-status.constants';
import {EccrService} from '../service/eccr.service';
import {Observable} from 'rxjs/Observable';
import {initialRecentOrderState, RecentOrdersState} from '../store/recent-orders/recent-orders.reducer';
import {Store} from '@ngrx/store';
import {RecentOrdersFetch} from '../store/recent-orders/recent-orders.actions';
import {HOLD_ORDER_INTERACTION} from '../attention/attention.component';

export enum RECENT_ORDER_INTERACTION {
  TYPE = 3226,
  NAME = 'Hold View Order',
  RESULT_COMPLETED = 'Completed',
  RESULT_FAIL = 'Fail'
}

@Component({
  selector: 'app-order-status',
  templateUrl: './recent-orders.component.html',
  styleUrls: ['./recent-orders.component.scss']
})
export class RecentOrdersComponent implements OnInit {
  public RECENT_ORDERS_TEXT = 'Recent Orders';
  public ORDER_STATUS_HREF_TEXT = 'View all orders';
  public orderStatusWT: any;
  public ORDER_STATUS_HOLD_TEXT = 'On Hold';
  public loading = true;
  public recentOrders$: Observable<RecentOrdersState>;
  public recentOrders: RecentOrdersState = initialRecentOrderState;
  private rxCountForEccr;
  public counter = 0;

  constructor(private analytics: TealiumUtagService,
              private configSvc: ConfigService,
              private orderStatusService: OrderStatusService,
              private eccrService: EccrService,
              private store: Store<any>) {
    this.recentOrders$ = this.store.select('recentOrdersState');
  }

  public getRxCountFormatted(RxFills: number) {
    this.rxCountForEccr = RxFills;
    if (RxFills !== undefined) {
      return RxFills > 1 ? RxFills.toString() + ' ' + 'Rxs' : RxFills.toString() + ' ' + 'Rx';
    }
    return RxFills;
  }

  public getOrderNumberFormatted(order: OrderStatus) {
    if (this.isFastStartOrder(order)) {
      return 'not assigned';
    }
    return order.OrderNumber;
  }

  public isFastStartOrder(order) {
    if (order && order.OrderType.toUpperCase() === ORDER_STATUS_TYPES.FAST_ORDER) {
      return true;
    }
    return false;
  }

  ngOnInit(): void {
    this.store.dispatch(new RecentOrdersFetch());
    this.recentOrders$.subscribe((r) => {
      this.recentOrders = r;
      this.loading = r.loading;
    });
    this.store.dispatch(new RecentOrdersFetch());
  }

  orderClickTag() {
    this.orderStatusWT = this.analytics.link({
      key_activity: 'new dashboard view orders',
      link_name: 'Custom: New Dashboard view orders clicked'
    });
    this.eccrService.log(RECENT_ORDER_INTERACTION.TYPE, RECENT_ORDER_INTERACTION.RESULT_COMPLETED,
      this.generateAdditionalDataforEccr(), this.getTransactionDataForECCR());
    window.parent.location.href = this.configSvc.orderStatusUrl;
  }

  orderNumberClick(OrderNumber) {
    this.analytics.link({
      key_activity: 'new dashboard individual order',
      link_name: 'Custom: New Dashboard individual order clicked'
    });
    window.parent.location.href = this.configSvc.orderStatusUrl + '?scrollId=' + OrderNumber;
  }

  generateAdditionalDataforEccr() {
    const additionalData = [
      {key: 'FAST_STYLE', value: 'FASTINT'},
      {key: 'FAST_INDICATOR', value: 'YES'}
    ];
    return additionalData;

  }

  getTransactionDataForECCR() {
    let transactionData;
    if (this.recentOrders.OrdersCount > 0) {
      transactionData = {
        trans_interaction: {
          trans: this.loopTransData(),
        }
      };
    } else {
      transactionData = '';
    }
    return transactionData;
  }

  loopTransData() {
    const transData = [];
    if (this.recentOrders.OrdersCount > 0) {
      this.recentOrders.Orders.forEach((order) => {
        const transSeq = this.increment();
        const trans = {
          'trans_seq_no': transSeq,
          'ref_source_key_id': 'QL',
          'ref_key_id': 'ORDER_NUM',
          'ref_key': order.OrderNumber,
          TRNXS_DTL: {
            '@transactionSeq': transSeq,
            TRNX_ITEM: [
              {
                '@sequence': '0',
                '@name': 'NUMBER_OF_RX',
                '@value': this.rxCountForEccr,
              },
              {
                '@sequence': '1',
                '@name': 'STATUS',
                '@value': order.OrderStatus,
              }
            ]
          },
        };
        if (transData.length <= 2) {
          transData.push(trans);
        }
      });
    }
    return transData;
  }

  increment() {
    return this.counter += 1;
  }
}
