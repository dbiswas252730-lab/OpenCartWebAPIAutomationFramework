import {test , expect } from '../../src/fixtures/pagefixtures';
import { HomePage } from '../../src/pages/HomePage';


test.beforeEach(async({loginPage})=>{    
    await  loginPage.goToLoginPage();
    //await loginPage.doLogin('Ollie@yahoo.com.au' , "Ollie123");  
    await loginPage.doLogin(process.env.APP_USERNAME! , process.env.APP_PASSWORD!);  
});

test('verify search result count test' , async({homePage ,searchResultsPage}) =>{
      await homePage.doSearch('macbook');
      let resultCount = await searchResultsPage.getProductSearchResultsCount();
      let serchfootercount = await  searchResultsPage.getSearchFooterMessage()
      console.log('resultCount :: ' , resultCount);
      console.log('serchfootercount :: '  ,serchfootercount);
     
      expect.soft (resultCount).toBe(3);
      expect.soft (resultCount).toBe(serchfootercount);
})

test('verify user is able to land on the product page', async({homePage ,searchResultsPage ,page})=>{
      await homePage.doSearch('macbook');
      await searchResultsPage.selectProduct('MacBook Pro');
      expect (await page.title()).toBe('MacBook Pro');
      await page.pause();
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