import { CbfeTestPage } from './app.po';

describe('cbfe-test App', () => {
  let page: CbfeTestPage;

  beforeEach(() => {
    page = new CbfeTestPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Item List');
  });
});
