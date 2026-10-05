import {test , expect } from '../../src/fixtures/pagefixtures';


test.beforeEach(async({loginPage})=>{    
    await  loginPage.goToLoginPage();
    //await loginPage.doLogin('Ollie@yahoo.com.au' , "Ollie123");  
    await loginPage.doLogin(process.env.APP_USERNAME! , process.env.APP_PASSWORD!);  
});

test('@smoke home page title test' , async({homePage}) => {
     let pageTitle = await homePage.getHomePageTitle();
     console.log(" Home Page Title :: " ,pageTitle);
     expect (pageTitle).toBe("My Account");
});

test('@smoke logout link exist or not test', async({homePage}) =>{
     expect(await homePage.isLogoutLinkExist()).toBeTruthy();
});

test('@regression home page headers exist test', async({homePage}) =>{
       let allHeaders: string[] = await homePage.getHomePageHeaders();
       console.log("Home pages Headers :: ",allHeaders);
       expect.soft(allHeaders).toHaveLength(4);
       expect.soft(allHeaders).toEqual(['My Account','My Orders','My Affiliate Account','Newsletter']);
});

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