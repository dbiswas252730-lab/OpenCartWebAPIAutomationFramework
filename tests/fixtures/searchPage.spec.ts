import {test , expect } from '../../src/fixtures/pagefixtures';
import { HomePage } from '../../src/pages/HomePage';
import { CsvHelper } from '../../src/utils/CsvHelper';


test.beforeEach(async({loginPage})=>{    
    await  loginPage.goToLoginPage();
    //await loginPage.doLogin('Ollie@yahoo.com.au' , "Ollie123");  
    await loginPage.doLogin(process.env.APP_USERNAME! , process.env.APP_PASSWORD!);  
});

//data Provider
test.describe('CSV search test', ()=> {    
let productData =CsvHelper.readCsv('src/testdata/product.csv');
for (let row of productData ){
test(`verify search result count test - ${row.searchkey}   ${row.productname}` , async({homePage ,searchResultsPage}) =>{
      await homePage.doSearch(row.searchkey);
      let actualresultCount = await searchResultsPage.getProductSearchResultsCount();
     // let serchfootercount = await  searchResultsPage.getSearchFooterMessage()
      console.log('resultCount :: ' , actualresultCount);
      //console.log('serchfootercount :: '  ,serchfootercount);
     
      expect.soft (actualresultCount).toBe(Number(row.resultcount));
     //expect.soft (actualresultCount).toBe(serchfootercount);
     
})
}//for
})//describe

let productData =CsvHelper.readCsv('src/testdata/product.csv');
for(let [index , row] of productData.entries() ) {
test(`verify user is able to land on the product page ${index}  ${row.searchkey} , ${row.productname}` , async({homePage ,searchResultsPage ,page})=>{
      await homePage.doSearch(row.searchkey);
      await searchResultsPage.selectProduct(row.productname);
     expect (await page.title()).toBe(row.productname);
       await page.waitForTimeout(4000);
  })

}
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