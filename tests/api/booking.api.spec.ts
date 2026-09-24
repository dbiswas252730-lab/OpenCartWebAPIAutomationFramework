import {test , expect } from '../../src/fixtures/apifixtures';
import { ApiHelper } from '../../src/api/ApiHelper';

let tokenID :string;

test.beforeEach('generate the token' , async({bookerApiHelper}) =>{
    let endpointURL= 'auth';

      let tokenReposnse =  await bookerApiHelper.post(`auth` ,{
        
             data: {username: process.env.BOOKER_USERNAME! , 
                    password: process.env.BOOKER_PASSWORD!
                 } ,
            headers: {
                  'Content-Type':'application/json'
            },
        });

       console.log('Username:', process.env.BOOKER_USERNAME!);
       console.log('Password exists:', process.env.BOOKER_PASSWORD!, process.env.BOOKER_PASSWORD?.length );
       console.log('Base URL:', process.env.BOOKER_BASE_URL);
       expect ( tokenReposnse.status).toBe(200);
       let tokenResponseBody = await tokenReposnse.body;
       console.log('tokemResponseBody  : ' ,tokenResponseBody);
       tokenID = tokenResponseBody.token;
       console.log('token id: ', tokenID);  

})//beforeeach

test('Get all the Booking ID test', async({bookerApiHelper}) =>{
    let endpointURL = 'booking';
      let reponseBookingID =  await bookerApiHelper.get(endpointURL);
      console.log('reponseBookingID : ' , reponseBookingID);
 
})