

import {test , expect } from '../../src/fixtures/pagefixtures';
import * as allure from "allure-js-commons";
import {meta,log, testData} from 'reporting-labs';
import { BasePage } from '../../src/pages/BasePage';


test.beforeEach(async ({loginPage})=> {
    
    await loginPage.goToLoginPage();
    
} )

//AAA
test('login page title test', async({loginPage}) => {
    meta({priority:'P2' , severity:'minor' , owner:'Deepti',story: 'US101' , epic: 'ep300', feature:'F30' , issue:'bug34'})
    // taking from Base class --let pageTitle = await loginPage.getLoginPageTitle();
    let pageTitle = await loginPage.getPageTitle();
    console.log(" login page tilte :" ,pageTitle);
    await log(" login page tilte :" ,pageTitle);
    expect(pageTitle).toBe('Account Login');  
   });

test('forgot pwd link exist or not  test', async({loginPage}) => {
    meta({priority:'P3' , severity:'critical' , owner:'Neelu',story: 'US103' , epic: 'ep303', feature:'F301' , issue:'bug33'})
    await log(" Forgot link  :" , await loginPage.isForgottenPwdLinkExist());  
    expect (await loginPage.isForgottenPwdLinkExist()).toBeTruthy();
});

test('user is able to login to app  test', async({loginPage,homePage}) => {
    //allure report decorations
     meta({priority:'P1' , severity:'blocker' , owner:'Ollie',story: 'US982' , epic: 'ep309', feature:'F309', issue:'bug323'})
    await testData({USERNAME: process.env.APP_USERNAME! ,PASSWORD: process.env.APP_PASSWORD! },'Login') ;
    await allure.suite("Login Tests");
    await allure.severity("critical");
    await allure.feature("Authentication");
    await allure.story("Valid Login");
    await allure.description("Verify user can login with valid credentials");
    //await loginPage.doLogin('Ollie@yahoo.com.au' , "Ollie123");
    console.log("USERNAME:", process.env.APP_USERNAME);
    console.log("PASSWORD:", process.env.APP_PASSWORD);
    await allure.step("Login with valid credentials",async() =>{  
        await loginPage.doLogin(process.env.APP_USERNAME! , process.env.APP_PASSWORD!);
    });
    await allure.step("Verify logout link is vissible",async() =>{  
        expect.soft(await homePage.isLogoutLinkExist()).toBeTruthy();
    });
  
  await allure.step("Verify Home Page Title",async() =>{  
        expect.soft(await homePage.getHomePageTitle()).toBe('My Account');
    });
    
    
});

test('click on registration page' , async({loginPage, regPage}) =>{
         await loginPage.clickRegisterLink(); 
         let regPageTitle =   await regPage.getRegPageTitle();
         expect(regPageTitle).toBe('Register Account');      
})

//common features test:
test('company logo exist on Login page' , async({basePage}) =>{
    expect(await basePage.isLogoVisisble()).toBeTruthy();
})
test('search box exist on Login page' , async({basePage}) =>{
    expect(await basePage.isSearchBoxVisisble()).toBeTruthy();
})
test('cart exist on Login page' , async({basePage}) =>{
    expect(await basePage.iscartButtonVisisble()).toBeTruthy();
})
test('footer exist on Login page' , async({basePage}) =>{
    expect(await basePage.getPageFooterCounts()).toBe(16);
})
