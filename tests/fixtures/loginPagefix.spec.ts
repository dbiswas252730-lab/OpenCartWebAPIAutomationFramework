

import {test , expect } from '../../src/fixtures/pagefixtures';
import * as allure from "allure-js-commons";
import { meta, log, testData as reportTestData } from 'reporting-labs';
import { BasePage } from '../../src/pages/BasePage';
import { CsvHelper } from '../../src/utils/CsvHelper';
import { JsonHelper } from '../../src/utils/JsonHelper';


test.beforeEach(async ({loginPage})=> {
          console.log("USERNAME:", process.env.APP_USERNAME);
                  
    await loginPage.goToLoginPage();
    
} )

//AAA
test('@smoke @regression login page title test', async({loginPage}) => {
    meta({priority:'P2' , severity:'minor' , owner:'Deepti',story: 'US101' , epic: 'ep300', feature:'F30' , issue:'bug34'})
    // taking from Base class --let pageTitle = await loginPage.getLoginPageTitle();
    let pageTitle = await loginPage.getPageTitle();
    console.log(" login page tilte :" ,pageTitle);
    await log(" login page tilte :" ,pageTitle);
    expect(pageTitle).toBe('Account Login');  
   });

test('@regression forgot pwd link exist or not  test', async({loginPage}) => {
    meta({priority:'P3' , severity:'critical' , owner:'Neelu',story: 'US103' , epic: 'ep303', feature:'F301' , issue:'bug33'})
    await log(" Forgot link  :" , await loginPage.isForgottenPwdLinkExist());  
    expect (await loginPage.isForgottenPwdLinkExist()).toBeTruthy();
});

test('@regression user is able to login to app with valid credentials', async ({ loginPage, homePage }) => {

    meta({ priority: 'P1', severity: 'blocker', owner: 'Manish', story: 'US102', epic: 'ep300', feature: 'F31', issue: 'bug35' });
   await reportTestData(
  {
    username: process.env.APP_USERNAME!,
    password: process.env.APP_PASSWORD!
  },
  'Login'
);

    await allure.suite("Login Tests");
    await allure.severity("critical");
    await allure.feature("Authentication");
    await allure.story("Valid Login");
    await allure.description("Verify user can login with valid credentials");

    await allure.step("Login with valid creds", async () => {
        await loginPage.doLogin(process.env.APP_USERNAME!, process.env.APP_PASSWORD!);
    });

    await allure.step("Verify logout link is visible", async () => {
        expect.soft(await homePage.isLogoutLinkExist()).toBeTruthy();
    });

    await allure.step("Verify logout home page title is visible", async () => {
        expect.soft(await homePage.getHomePageTitle()).toBe('My Account');
    });

});

//DD_1 : read CSV data directly from CSV file and loop the test method row wise.
let csvTestData = CsvHelper.readCsv('src/testdata/logindata.csv');
 console.log("CSV Test Data:", csvTestData);
console.log("CSV Test Data length:", csvTestData.length);
for(let row of csvTestData ){
   
test(`@regression Login to app with invalid credentials using CSV file test -${row.username}-${row.password}`, async({loginPage,homePage}) => {
    await loginPage.doLogin(row.username , row.password);
    expect(await loginPage.isInvalidLoginErrorDisplayed()).toBeTruthy();
      
});
}//forloop


//DD_3 : read JSON data directly from JSON file and loop the test method row wise.let testData = CsvHelper.readCsv('src/testdata/logindata.csv');
   let jsonTestData  = JsonHelper.readJson('src/testdata/logindata.json');
    console.log("Test Data:", jsonTestData );
    console.log("Test Data length:", jsonTestData .length);
for(let row of jsonTestData ){
   
test(`@regression Login to app with invalid credentials using JSON file test -${row.username}-${row.password}`, async({loginPage,homePage}) => {
    await loginPage.doLogin(row.username , row.password);
    expect(await loginPage.isInvalidLoginErrorDisplayed()).toBeTruthy();
      
});
}//forloop



test('click on registration page' , async({loginPage, regPage}) =>{
         await loginPage.clickRegisterLink(); 
         let regPageTitle =   await regPage.getRegPageTitle();
         expect(regPageTitle).toBe('Register Account');      
})


//common features test:
test('@smoke company logo exist on Login page' , async({basePage}) =>{
    expect(await basePage.isLogoVisisble()).toBeTruthy();
})
test('@smoke search box exist on Login page' , async({basePage}) =>{
    expect(await basePage.isSearchBoxVisisble()).toBeTruthy();
})
test('@smoke cart exist on Login page' , async({basePage}) =>{
    expect(await basePage.iscartButtonVisisble()).toBeTruthy();
})
test('@smoke footer exist on Login page' , async({basePage}) =>{
    expect(await basePage.getPageFooterCounts()).toBe(16);
})
