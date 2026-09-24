import {test , expect} from '@playwright/test';
import {LoginPage} from '../../src/pages/LoginPage';
import { HomePage } from '../../src/pages/HomePage';


let loginPage :LoginPage;
let homePage :HomePage;

test.beforeEach(async ({page})=> {
    loginPage = new LoginPage(page);
    await loginPage.goToLoginPage();
    homePage = new HomePage(page);
} )

//AAA
test('login page title test', async({}) => {
    let pageTitle = await loginPage.getLoginPageTitle();
    console.log(" login page tilte :" ,pageTitle);
    expect(pageTitle).toBe('Account Login');  
});

test('forgot pwd link exist or not  test', async({}) => {
       expect (await loginPage.isForgottenPwdLinkExist()).toBeTruthy();
});

test('user is able to login to app  test', async({}) => {
    //await loginPage.doLogin('manish.wilson561@test.com' , 'Pwd123');  
    await loginPage.doLogin('Ollie@yahoo.com.au' , "Ollie123");
    expect.soft(await homePage.isLogoutLinkExist()).toBeTruthy();
    expect.soft(await homePage.getHomePageTitle()).toBe('My Account');
});

test(' Returning Customer Header exist  test', async({}) => {
        let customerHeader = await (await loginPage.getReturnCustHeader()).textContent();
       console.log("customerHeader :: " ,customerHeader);
       expect(customerHeader).toMatch('Returning Customer');
})

test(' Returning New Customer Header exist  test', async({}) => {
        let newCustomerHeader = await (await loginPage.getNewCustHeader()).textContent();
       console.log("New customerHeader :: " ,newCustomerHeader );
       expect(newCustomerHeader).toMatch('New Customer');
})

test(' click RegisterLink  test', async({}) => {
          await loginPage.clickRegisterLink();
          
         // expect(loginPage).toMatch('Register Account'); 

})

