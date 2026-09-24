

import {test as baseTest} from '@playwright/test';
import { BasePage } from '../pages/BasePage';
import { LoginPage } from '../pages/LoginPage';
import { HomePage  } from '../pages/HomePage';
import { RegistrationPage } from '../pages/RegistrationPage';
import { AccountPage } from '../pages/AccountPage';
import {SearchResultsPage } from '../pages/SearchResultsPage'
import {ProductInfoPage } from '../pages/ProductInfoPage';
import {ShoppingCartPage} from  '../pages/ShoppingCartPage';


type pageFictures =  {
    basePage :BasePage,
    loginPage :LoginPage,
    homePage :HomePage,
    regPage: RegistrationPage,
    acctPage :AccountPage,
    searchResultsPage:SearchResultsPage,
    productInfoPage :ProductInfoPage,
    shoppingCartPage: ShoppingCartPage,
};

//extend the playwright test using the baseTest extend "inheritance"
export let test = baseTest.extend<pageFictures>({
    basePage : async({page} ,use) =>{
        let basePage = new BasePage(page);
        use(basePage);       
    },
     loginPage : async({page} ,use) =>{
        let loginPage = new LoginPage(page);
        use(loginPage);       
    },
     homePage : async({page} ,use) =>{
        let homePage = new HomePage(page);
        use(homePage);       
    },
     regPage : async({page} ,use) =>{
        let regPage = new RegistrationPage(page);
        use(regPage);       
    },
      acctPage : async({page} ,use) =>{
        let acctPage = new AccountPage(page);
        use(acctPage);       
    },
    searchResultsPage : async({page} ,use) =>{
        let searchResultsPage = new SearchResultsPage(page);
        use(searchResultsPage);
    },
    productInfoPage : async({page} , use) =>{
        let productInfoPage = new ProductInfoPage(page);
        use(productInfoPage);
    },
    shoppingCartPage :async({page} , use)  => {
        let shoppingCartPage = new ShoppingCartPage(page);
        use (shoppingCartPage);
    }

}); 

export {expect} from '@playwright/test';
