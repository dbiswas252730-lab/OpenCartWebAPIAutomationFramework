import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";


export class AccountPage extends BasePage{
 
       //1. private locators
       private readonly accountPageHeader :Locator;

       //2 Initalize -constructor of the page class : init the locators
         constructor (page : Page) {
           super(page);

           this.accountPageHeader = page.getByRole('heading', { name: 'Your Account Has Been Created!', level: 1 });
         }  
      //3. public page action(methods) /behaviour :Encapsulation
       
         async getaccountPageHeader():Promise<string> {
              return this.accountPageHeader.innerText();
             }
}