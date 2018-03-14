import { NewDashboardPage } from './app.po';

describe('new-dashboard App', function() {
  let page: NewDashboardPage;

  beforeEach(() => {
    page = new NewDashboardPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
