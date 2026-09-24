import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class SearchResultsPage extends BasePage{


    //1 private locators

    private readonly searchResult : Locator;
    private readonly searchFooterResultmessage : Locator;
     
    
    //2. constructor  ..of the class to initalize the locators
      constructor(page:Page){
        super(page);
        this.searchResult =page.locator('div.product-layout');
        this.searchFooterResultmessage = page.locator('.text-right');
      }
      //3.page action
      async getProductSearchResultsCount():Promise<number>{
           return await this.searchResult.count();
      }

      async selectProduct(productName:string):Promise<void>{
        console.log("product name: " ,productName);
        await this.page.getByRole('link', { name: productName , exact:true}).first().click();
      }

      async getSearchFooterMessage():Promise<number>{
        console.log("footer message : " ,this.searchFooterResultmessage.innerText());
        let footermessage = await this.searchFooterResultmessage.innerText();
        //Showing 1 to 2 of 2 (1 Pages)
        let numberAfterTo = Number (footermessage.split(" to ")[1].split(" ")[0]);
        return numberAfterTo;
      
      }

}