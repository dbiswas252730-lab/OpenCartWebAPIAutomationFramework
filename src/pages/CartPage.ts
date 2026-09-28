import { Locator } from "@playwright/test";

export class CartPage{

          x: number = 10;
          
              private readonly logoutLink : Locator;
        
              //action
    async isLogoutLinkExist(): Promise<boolean>{
         return await this.logoutLink.isVisible();
    }
   
   }
}