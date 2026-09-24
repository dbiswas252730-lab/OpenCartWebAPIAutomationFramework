import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class HomePage extends BasePage{

    //private locators

    private readonly logoutLink : Locator;
    private readonly headers : Locator;
    private readonly searchBox :Locator;
    private readonly searchIcon :Locator;

    //constructor  ..of the class to initalize the locators

    constructor(page :Page){
        super(page);
        this.logoutLink = page.getByRole('link', { name: 'Logout' });
        this.headers = page.getByRole('heading', {level:2} );
        this.searchBox = page.getByRole('textbox', { name: 'Search' });
        this.searchIcon = page.locator('#search button');

    }//cons

    //page actions:
   

     async getHomePageTitle() : Promise<string> {
         return await this.page.title();
   }


    async isLogoutLinkExist(): Promise<boolean>{
         return await this.logoutLink.isVisible();
    }

    async getHomePageHeaders():Promise<string[]> {
          return await this.headers.allInnerTexts();
    }
    async doSearch(searchkey :string) :Promise<void>{
        console.log("search key :: " ,searchkey);
        await this.searchBox.fill(searchkey);
        await this.searchIcon.click();
    }
    


}