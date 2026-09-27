import {test , expect } from '../../src/fixtures/pagefixtures';


test.beforeEach(async({loginPage})=>{    
    await  loginPage.goToLoginPage();
    //await loginPage.doLogin('Ollie@yahoo.com.au' , "Ollie123");  
    await loginPage.doLogin(process.env.APP_USERNAME! , process.env.APP_PASSWORD!);  
});

test('home page title test' , async({homePage}) => {
     let pageTitle = await homePage.getHomePageTitle();
     console.log(" Home Page Title :: " ,pageTitle);
     expect (pageTitle).toBe("My Account");
});

test('logout link exist or not test', async({homePage}) =>{
     expect(await homePage.isLogoutLinkExist()).toBeTruthy();
});

test('home page headers exist test', async({homePage}) =>{
       let allHeaders: string[] = await homePage.getHomePageHeaders();
       console.log("Home pages Headers :: ",allHeaders);
       expect.soft(allHeaders).toHaveLength(4);
       expect.soft(allHeaders).toEqual(['My Account','My Orders','My Affiliate Account','Newsletter']);
});

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