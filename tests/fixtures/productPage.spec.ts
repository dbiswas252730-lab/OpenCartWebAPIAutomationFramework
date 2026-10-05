import {test , expect } from '../../src/fixtures/pagefixtures';
import { HomePage } from '../../src/pages/HomePage';
import { ProductInfoPage } from '../../src/pages/ProductInfoPage';
import { SearchResultsPage } from '../../src/pages/SearchResultsPage';


test.beforeEach(async({loginPage})=>{  
          console.log("USERNAME:", process.env.APP_USERNAME);
             
    await  loginPage.goToLoginPage();
    //await loginPage.doLogin('Ollie@yahoo.com.au' , "Ollie123");  
    await loginPage.doLogin(process.env.APP_USERNAME! , process.env.APP_PASSWORD!);  
});

test('@smoke verify product header test' , async({homePage , searchResultsPage , productInfoPage,page}) =>{
    await homePage.doSearch('macbook');
    await searchResultsPage.selectProduct('MacBook Pro');
    expect(await productInfoPage.getProductHeader()).toBe('MacBook Pro');
    //await page.pause();
 });

 test('@regression verify product images count  test' , async({homePage , searchResultsPage , productInfoPage,page}) =>{
    await homePage.doSearch('macbook');
    await searchResultsPage.selectProduct('MacBook Pro');
    expect(await productInfoPage.getProductImagesCount()).toBe(4);
   // await page.pause();
 });

  test('@regression verify product info data  test' , async({homePage , searchResultsPage , productInfoPage,page}) =>{
    await homePage.doSearch('macbook');
    await searchResultsPage.selectProduct('MacBook Pro');
    let actualProductInfoMap = await productInfoPage.getProductInfo();
    console.log("Actual Product details :: " , actualProductInfoMap);

    expect.soft(actualProductInfoMap.get('productheader')).toBe('MacBook Pro');
    expect.soft(actualProductInfoMap.get('productimagescount')).toBe(4);

    expect.soft(actualProductInfoMap.get('Brand')).toBe('Apple');
    expect.soft(actualProductInfoMap.get('Product Code')).toBe('Product 18');
    expect.soft(actualProductInfoMap.get('Reward Points')).toBe('800');
    expect.soft(actualProductInfoMap.get('Availability')).toBe('Out Of Stock');

    expect.soft(actualProductInfoMap.get('productprice')).toBe('$2,000.00');
    expect.soft(actualProductInfoMap.get('extTaxPrice')).toBe('$2,000.00');

    //await page.pause();
 });

 test('@regression verify items added in cart test' , async({homePage , searchResultsPage ,productInfoPage,page}) =>{
      await homePage.doSearch('macbook');
       await searchResultsPage.selectProduct('MacBook Pro');
       let actualProductInfoMap = await productInfoPage.getProductInfo();
       console.log("Actual Product details :: " , actualProductInfoMap);

        let itemaddedMessage = await productInfoPage.addToCart();
        console.log('itemaddedMessage -> ' ,itemaddedMessage);
        expect (itemaddedMessage).toContain('Success');
        expect (await page.title()).toMatch('Shopping Cart');
 
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