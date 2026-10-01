import {test as baseTest} from '@playwright/test';
import { ApiHelper } from '../api/ApiHelper'; 


//define type of API fixtures
type ApiFixtures = {
     apiHelper : ApiHelper;
     bookerApiHelper: ApiHelper;
     
}

 export let test = baseTest.extend<ApiFixtures>({

      apiHelper:async({request} ,use)=> {
      let apiHelper = new ApiHelper(request , process.env.API_BASE_URL!);
      await use(apiHelper);

      },
        bookerApiHelper:async({request} ,use)=>{
        let bookerApiHelper = new ApiHelper(request , process.env.BOOKER_BASE_URL!);
        await use(bookerApiHelper);
       }
});

export {expect} from '@playwright/test';