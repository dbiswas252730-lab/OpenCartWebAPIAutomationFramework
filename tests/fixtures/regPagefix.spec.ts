import {test , expect } from '../../src/fixtures/pagefixtures';
//import { AccountPage } from '../../src/pages/AccountPage';
import {meta,log} from 'reporting-labs';
import { BasePage } from '../../src/pages/BasePage';
import { CsvHelper } from '../../src/utils/CsvHelper';


test.beforeEach(async ({loginPage})=> {
    
    await loginPage.goToLoginPage();
    await loginPage.clickRegisterLink();
    
} )

test('@smoke reg page title test ', async({loginPage ,regPage }) => {

        await loginPage.clickRegisterLink(); 
         let regPageTitle =   await regPage.getRegPageTitle();
         expect(regPageTitle).toBe('Register Account');     

     })
 test('@smoke fill new registration data test' , async({regPage,acctPage  }) => {
            const email = `nb${Date.now()}@yahoo.com`;
            await regPage.doNewRegistration('Nilank12','Biswas',email , '123456' ,
             'pwd1234' ,'pwd1234' ,false,true);
            expect.soft( await acctPage.getaccountPageHeader()).toBe('Your Account Has Been Created!');
      
 })    
 
 //DD_1 : read CSV data directly from CSV file and loop the test method row wise.
 let testData = CsvHelper.readCsv('src/testdata/regdata.csv');
  console.log("Test Data:", testData);
     console.log("Test Data length:", testData.length);
 for(let row of testData ){
 test(`@regression fill new registration form using CSV  data test ${row.firstname}` , async({regPage,acctPage  }) => {
            await regPage.doNewRegistration(row.firstname, row.lastname , row.Email,
                   row.Telephone,row.Password,row.PasswordConfirm, row.subscribe,
                   row.Policy                      
            );
            expect.soft( await acctPage.getaccountPageHeader()).toBe('Your Account Has Been Created!');
      
 }) 
}