import {test , expect } from '../../src/fixtures/pagefixtures';
//import { AccountPage } from '../../src/pages/AccountPage';


test.beforeEach(async ({loginPage})=> {
    
    await loginPage.goToLoginPage();
    await loginPage.clickRegisterLink();
    
} )

test('reg page title test ', async({loginPage ,regPage }) => {

        await loginPage.clickRegisterLink(); 
         let regPageTitle =   await regPage.getRegPageTitle();
         expect(regPageTitle).toBe('Register Account');     

     })
 test('fill new registration data test' , async({regPage,acctPage  }) => {
            await regPage.doNewRegistration('Nilank12','Biswas','nb123@yahoo.com' , '123456' ,
             'pwd1234' ,'pwd1234' ,false,true);
            expect.soft( await acctPage.getaccountPageHeader()).toBe('Your Account Has Been Created!');
      
 })    