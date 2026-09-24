import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";


export class ProductInfoPage extends BasePage{

   //1. private locators
   private readonly productHeader : Locator;
   private readonly productImages :Locator;
   private readonly productMetaData :Locator;
   private readonly productPricingData :Locator;
   private productInfoMap : Map<string , string | number>;
   private readonly qty :Locator;
   private readonly btnAddToCart :Locator;
   private readonly sucessMesg :Locator;
   private readonly sucessMesg_cart :Locator;


    //2 Initalize -constructor of the page class : init the locators
     constructor (page : Page) {
      super(page);
      this.productHeader = page.getByRole('heading' ,{level:1});
      this.productImages = page.locator('div ul.thumbnails li img');
      this.productMetaData = page.locator('div#content ul.list-unstyled:nth-of-type(1) li');
      this.productPricingData = page.locator('div#content ul.list-unstyled:nth-of-type(2) li');
      this.productInfoMap = new Map<string, string|number>();
      this.qty = page.getByRole('textbox', { name: 'Qty' });
      this.btnAddToCart =page.getByRole('button', { name: 'Add to Cart' });
      this.sucessMesg = page.locator('div .alert-success');
     this.sucessMesg_cart =page.getByRole('link', { name: 'shopping cart' }).last();
     //.table-responsive tbody  td:nth-of-type(2)


      
     }

   //3 actions
    async getProductHeader():Promise<string>{
        console.log(" Product header in  getProductHeader()" , await this.productHeader.innerText());
         return await this.productHeader.innerText();
    }

    async getProductImagesCount():Promise<number>{
        await this.productImages.first().waitFor({state:"visible"});
        console.log("Total Product Images :  " ,await this.productImages.count()) ;
        return await this.productImages.count();
    }

    async getProductInfo():Promise<Map<string,string|number>>{
        this.productInfoMap.set('productheader' , await this.getProductHeader() );
        this.productInfoMap.set('productimagescount' , await this.getProductImagesCount());
        await this.getPoductMetaData();
        await this.getPoductPricingData();
        return this.productInfoMap ; 
    }

// Brand: Apple
// Product Code: Product 18
// Reward Points: 800
// Availability: Out Of Stock
    private async getPoductMetaData():Promise<void>{
       let metaData =  await this.productMetaData.allInnerTexts();
       for(let data of metaData){
        let meta = data.split(":");
        let metaKey = meta[0].trim();
        let metaValue = meta[1].trim();
        this.productInfoMap.set(metaKey ,metaValue );
       }//for
    }

// $2,000.00
// Ex Tax: $2,000.00
   private async getPoductPricingData():Promise<void>{
       let priceData =  await this.productPricingData.allInnerTexts();
       let productPrice = priceData[0].trim();
       let extTaxPrice = priceData[1].split(":")[1].trim();
       this.productInfoMap.set('productprice' , productPrice );
       this.productInfoMap.set('extTaxPrice' , extTaxPrice );
    }

    async addToCart():Promise<string>{
        let qty = await this.qty.getAttribute('value');
        console.log( "qty :: " , qty);
        await this.btnAddToCart.click();
        let message = await this.sucessMesg.innerText();
        await this.sucessMesg_cart.click();
        return message;
    }

     

}