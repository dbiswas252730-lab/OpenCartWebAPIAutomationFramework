
import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class RegistrationPage extends BasePage{
   //1. private locators
   private readonly firstName :Locator;
   private readonly lastName :Locator;
   private readonly email :Locator;
   private readonly telephone :Locator;
   private readonly password :Locator;
   private readonly passwordConfirm :Locator;
   private readonly subscribe_No :Locator;
   private readonly subscribe_Yes :Locator;
   private readonly policy_Checkbox :Locator;
   private readonly btn_continue :Locator;

//2 Initalize -constructor of the page class : init the locators

  constructor(page:Page){
    super(page);
    this.firstName =page.getByRole('textbox', { name: '* First Name' });
    this.lastName =page.getByRole('textbox', { name: '* Last Name' });
    this.email = page.getByRole('textbox', { name: '* E-Mail' });
    this.telephone = page.getByRole('textbox', { name: '* Telephone' });
    this.password = page.getByRole('textbox', { name: '* Password', exact: true });
    this.passwordConfirm = page.getByRole('textbox', { name: '* Password Confirm' });
    this.subscribe_No =page.getByRole('radio', { name: 'No' });
    this.subscribe_Yes =page.getByRole('radio', { name: 'Yes' });
    this.policy_Checkbox = page.locator('[name="agree"]');
    this.btn_continue = page.getByRole('button', { name: 'Continue' });

    /**
     *     // Newsletter Locators (Using proper locator chaining)
    this.newsletterSection = page.locator('.form-group').filter({ hasText: 'Subscribe' });
    this.subscribeYes = this.newsletterSection.getByLabel('Yes');
    this.subscribeNo = this.newsletterSection.getByLabel('No');
    
    // Privacy policy checkbox & Continue button
    this.privacyPolicyCheckbox = page.locator('input[name="agree"]');
    this.continueButton = page.locator('input[value="Continue"]');
     */
 }

 //3. public page action(methods) /behaviour :Encapsulation
    async doNewRegistration (fName:string , lName:string, email:string ,tel:string ,
                             pwd:string , confirmpwd: string , subbtn:string, policychk:string ):Promise<void> 
    {
    console.log(`user registration data : $(fName) - $(lName)  - $(email) 
                $(tel) - $(pwd) - $(confirmpwd) - subbtn $(subbtn)- policychk $(policychk) `);
    await this.firstName.fill(fName);
    await this.lastName.fill(lName);
    const randomId = Math.random().toString(36).substring(2, 8);
    email = randomId+email;
    await this.email.fill(email);
    await this.telephone.fill(tel);
    await this.password.fill(pwd);
    await this.passwordConfirm.fill(confirmpwd);
    if (subbtn) {
      console.log("subbtn : Yes" ,subbtn);
        await this.subscribe_Yes.click();
    } else {
      console.log("subbtn : No" ,subbtn);
        await this.subscribe_No.click();
    }

    await this.policy_Checkbox.setChecked(policychk);
  
    await this.btn_continue.click();

   }


   async getRegPageTitle() : Promise<string> {
         return await this.page.title();
   }

  

}