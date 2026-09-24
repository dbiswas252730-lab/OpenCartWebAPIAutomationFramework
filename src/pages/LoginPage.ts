import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";


export class LoginPage extends BasePage{

   //1. private locators
   private readonly emailId : Locator;
   private readonly password: Locator;
   private readonly  loginBtn : Locator;
   private readonly forgottenPasswordLink : Locator;
   private readonly loginErrorMessage :Locator;
   private readonly returningCustomerHeader : Locator;
   private readonly NewCustomer :Locator;
   private readonly registerlink :Locator;
   

   //2 Initalize -constructor of the page class : init the locators

   constructor (page : Page) {
      super(page);
      this.emailId  =  page.getByRole('textbox', { name: 'E-Mail Address' });
      this.password =  page.getByRole('textbox', { name: 'Password' });
      this.loginBtn =  page.getByRole('button', { name: 'Login' });
      this.forgottenPasswordLink = page.getByRole('link', { name: 'Forgotten Password' }).first();
      this.loginErrorMessage = page.locator('.alert.alert-danger.alert-dismissible');
      this.returningCustomerHeader =page.getByRole('heading', { name: 'Returning Customer', level: 2 });
      this.NewCustomer =page.getByRole('heading', { name: 'New Customer', level: 2 });
      this.registerlink = page.getByRole('link', { name: 'Register' });
   }

   //3. public page action(methods) /behaviour :Encapsulation
   async goToLoginPage() : Promise<void> {
        await this.page.goto('opencart/index.php?route=account/login');
   }
   //using Base class inherit method 
//    async getLoginPageTitle() : Promise<string> {
//          return await this.page.title();
//    }

   async isForgottenPwdLinkExist() : Promise<boolean> {
       return await this.forgottenPasswordLink.isVisible();
   }

   async doLogin(username :string , password: string) :Promise<void>{
    console.log(`users credentials : $(username) -  $(password)`);
    await  this.emailId.fill(username);
    await this.password.fill(password);
    await this.loginBtn.click();
   }

   async isInvalidLoginErrorDisplayed() :Promise <boolean>{
        return  await this.loginErrorMessage.isVisible();
   }
    
   async getReturnCustHeader():Promise<Locator > {
          return this.returningCustomerHeader;
   }

   async getNewCustHeader():Promise<Locator> {
       return this.NewCustomer;
   }

   async clickRegisterLink():Promise<void>{
        await this.registerlink.click();
   }
}