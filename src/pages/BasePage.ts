import { Locator, Page } from "@playwright/test";


export class BasePage {
  
     protected readonly page : Page;
     //common locators across all pages
     protected readonly logo:Locator;
     protected readonly searchBox: Locator;
     protected readonly searchIcon: Locator;
     protected readonly footerLink: Locator;
     protected readonly currency: Locator;
     protected readonly cartButton: Locator;

     constructor (page: Page) {
        this.page = page;
        this.logo = page.getByRole('img', { name: 'naveenopencart' });
        this.searchBox =page.getByRole('textbox', { name: 'Search' });
        this.searchIcon = page.locator('div#search button');
        this.footerLink  = page.locator('footer a');
        this.currency = page.locator('#form-currency');
        //this.cartButton = page.locator('div#cart button');
        this.cartButton =  page.locator('.container > .row > .col-sm-3 > #cart > button');
     }
     //App common features/actions: footer logo Search
     async isLogoVisisble():Promise<boolean> {
      await this.logo.waitFor({ state: 'visible' });
      return this.logo.isVisible();
     }
     async isSearchBoxVisisble():Promise<boolean> {
       await this.searchBox.waitFor({ state: 'visible' });
      return this.searchBox.isVisible();
     }
     async isSearchIconVisisble():Promise<boolean> {
      await this.searchIcon.waitFor({ state: 'visible' });
      return this.searchIcon.isVisible();
     }
     async isCurrencyVisisble():Promise<boolean> {
      await this.currency.waitFor({ state: 'visible' });
      return this.currency.isVisible();
     }
     async iscartButtonVisisble():Promise<boolean> {
      await this.cartButton.waitFor({ state: 'visible' });
      return this.cartButton.isVisible();
     }
     async getPageFooterCounts():Promise<number>{
      return await this.footerLink.count();

     }
     async getFooterLinks():Promise<string[]>{
       return await this.footerLink.allInnerTexts();
     }

     //page level generic methods:
     async getPageTitle():Promise<string>{
       return await this.page.title();
     }
       getPageCurrentURL(): string{
       return  this.page.url();
     }
     async waitForPageLoad() {
        await this.page.waitForLoadState('load');
     }

     async takeScreenShot(pagename:string) {
         return  await this.page.screenshot({
              fullPage: true,
              path:'reports/screenshots/${name}.png'
          })

     }
}