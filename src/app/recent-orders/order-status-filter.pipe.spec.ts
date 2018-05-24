import { OrderStatusFilterPipe } from './order-status-filter.pipe';

describe('OrderStatusFilterPipe', () => {
  it('create an instance', () => {
    const pipe = new OrderStatusFilterPipe();
    expect(pipe).toBeTruthy();
  });
});
