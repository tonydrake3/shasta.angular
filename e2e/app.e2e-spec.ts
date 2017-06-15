import { EsubWebPage } from './app.po';

describe('esub-web App', () => {
  let page: EsubWebPage;

  beforeEach(() => {
    page = new EsubWebPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
