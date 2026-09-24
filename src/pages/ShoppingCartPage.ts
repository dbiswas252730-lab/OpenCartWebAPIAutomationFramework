import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";


export class ShoppingCartPage extends BasePage{

   //1. private locators
   private readonly warnning_message : Locator;
   private readonly cart_header : Locator;
   private readonly productsInCart_header :Locator;
   private readonly productsInCart_Value :Locator;
   private readonly shoppingCartMap :Map<string , string|number>; 
   

      //2. constructor  ..of the class to initalize the locators
      constructor(page:Page){
        super(page);
        this.warnning_message = page.locator('.alert.alert-danger.alert-dismissible');
        this.cart_header = page.getByRole('heading' , {name:'Shopping Cart  (0.00kg)',level:1 });
        this. productsInCart_header =page.locator('.table-responsive  thead tr td ');
        this.productsInCart_Value=  page.locator('.table-responsive tbody tr td');
        this.shoppingCartMap = new Map<string, string|number>();
      }
      //action
      async getshoppingCartHeader():Promise<string[]> {
        console.log("Get Shopping Cart Header -> " ,await  this. productsInCart_header.allInnerTexts());
         return await  this. productsInCart_header.allInnerTexts();
      }
        async getShoppingCartProductsDetails():Promise<string[]> {
        let cellCount =await  this.productsInCart_Value.count();         
         let productslist :string[]  =[];
         let attribute1 =   await this.productsInCart_Value.locator('img'). nth(0).getAttribute('title');
         let attribute2 =  await this.productsInCart_Value.nth(1).innerText();
         let attribute3 =  await this.productsInCart_Value.nth(2 ).innerText();
         //   
         let attribute4 = '1';
         let attribute5 =  await this.productsInCart_Value.nth(4 ).innerText();
         let attribute6 =  await this.productsInCart_Value.nth(5 ).innerText();
         console.log("attribute1 ::: " , attribute1);
         console.log("attribute2 ::: " , attribute2);
         console.log("attribute3  ::: " ,attribute3 ); 
         console.log("attribute4 ::: " , attribute4 ); 
         console.log("attribute5 ::: " , attribute5 ); 
         console.log("attribute6 ::: " , attribute6 ); 
         if(attribute1 != null) {
                                  productslist.push(
                                    attribute1.trim() ??'',  
                                    attribute2.trim(),
                                    attribute3.trim(),
                                    attribute4 ,
                                    attribute5.trim(),
                                    attribute6.trim()
                                )};
         
         console.log("product list array : " , productslist);   
         for(let i=0 ;i<cellCount ;i++){

         }

        
       // return await  this.productsInCart_Value.allInnerTexts();
       return productslist;
      }

      async getShoppingCartKeyValuePair():Promise<Record<string,string>>{
             const headers = await this.getshoppingCartHeader();

          const values = await this.getShoppingCartProductsDetails();

        const product: Record<string, string> = {};

      for (let i = 0; i < headers.length; i++) {
        product[headers[i]] = values[i];
      }

         return product;  

      }
     
     
} 