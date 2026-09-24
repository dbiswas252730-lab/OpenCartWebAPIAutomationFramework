import {test , expect} from '@playwright/test';
import {LoginPage} from '../../src/pages/LoginPage';
import {HomePage} from '../../src/pages/HomePage';

let loginPage : LoginPage;
let homePage : HomePage;

test.beforeEach(async({page})=>{

    loginPage = new LoginPage(page);
    await  loginPage.goToLoginPage();
    await loginPage.doLogin('Ollie@yahoo.com.au' , "Ollie123");  
    homePage = new HomePage(page);
})

test('home page title test' , async({}) => {
     let pageTitle = await homePage.getHomePageTitle();
     console.log(" Home Page Title :: " ,pageTitle);
     expect (pageTitle).toBe("My Account");
});

test('logout link exist or not test', async({}) =>{
     expect(await homePage.isLogoutLinkExist()).toBeTruthy();
});

test('home page headers exist test', async({}) =>{
       let allHeaders: string[] = await homePage.getHomePageHeaders();
       console.log("Home pages Headers :: ",allHeaders);
       expect.soft(allHeaders).toHaveLength(4);
       expect.soft(allHeaders).toEqual(['My Account','My Orders','My Affiliate Account','Newsletter']);
});