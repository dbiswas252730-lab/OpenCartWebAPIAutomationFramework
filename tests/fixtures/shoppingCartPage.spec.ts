import {test , expect } from '../../src/fixtures/pagefixtures';
import { HomePage } from '../../src/pages/HomePage';
import { ProductInfoPage } from '../../src/pages/ProductInfoPage';
import { SearchResultsPage } from '../../src/pages/SearchResultsPage';
import {ShoppingCartPage} from '../../src/pages/ShoppingCartPage';


test.beforeEach(async({loginPage})=>{    
    await  loginPage.goToLoginPage();
    await loginPage.doLogin(process.env.APP_USERNAME , process.env.APP_PASSWORD);  
});

    test('products added in the cart test' , async({homePage , searchResultsPage , productInfoPage,shoppingCartPage, page}) =>{
        await homePage.doSearch('macbook');
        await searchResultsPage.selectProduct('MacBook Pro');
        let actualProductInfoMap = await productInfoPage.getProductInfo();
        console.log("Actual Product details :: " , actualProductInfoMap);
        await productInfoPage.addToCart();
        let productvalcount = await shoppingCartPage.getShoppingCartProductsDetails();
        console.log("  productvalcount :",productvalcount);
        let shoppingCart = await shoppingCartPage.getShoppingCartKeyValuePair();
        console.log("Shopping Cart Details:");
        for (let [key, value] of Object.entries(shoppingCart)){
             console.log(`${key} : ${value}`);
         }
  });
