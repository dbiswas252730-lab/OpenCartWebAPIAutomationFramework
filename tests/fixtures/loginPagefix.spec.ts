

import {test , expect } from '../../src/fixtures/pagefixtures';
import * as allure from "allure-js-commons";
import {meta,log} from 'reporting-labs';
import { BasePage } from '../../src/pages/BasePage';
import { CsvHelper } from '../../src/utils/CsvHelper';
import { JsonHelper } from '../../src/utils/JsonHelper';


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

//DD_1 : read CSV data directly from CSV file and loop the test method row wise.
let testData = CsvHelper.readCsv('src/testdata/logindata.csv');
 console.log("Test Data:", testData);
 console.log("Test Data length:", testData.length);
for(let row of testData ){
   
test(`Login to app with invalid credentials using CSV file test -${row.username}-${row.password}`, async({loginPage,homePage}) => {
    await loginPage.doLogin(row.username , row.password);
    expect(await loginPage.isInvalidLoginErrorDisplayed()).toBeTruthy();
      
});
}//forloop


//DD_3 : read JSON data directly from JSON file and loop the test method row wise.let testData = CsvHelper.readCsv('src/testdata/logindata.csv');
   let testJSONData = JsonHelper.readJson('src/testdata/logindata.json');
    console.log("Test Data:", testJSONData);
    console.log("Test Data length:", testJSONData.length);
for(let row of testJSONData ){
   
test(`Login to app with invalid credentials using JSON file test -${row.username}-${row.password}`, async({loginPage,homePage}) => {
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
