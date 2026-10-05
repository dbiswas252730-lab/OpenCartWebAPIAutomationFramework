import {test , expect } from '../../src/fixtures/apifixtures';
import { ApiHelper } from '../../src/api/ApiHelper';


const TOKEN = process.env.API_TOKEN!;
let userId: number;

let AUTH_HEADER ={
    Authorization:`Bearer ${TOKEN}`
}
//create a Object
type User = {
    id: number;
    name: string;
    status: 'active' | 'inactive';
    gender: 'male' | 'female';
    email: string;
};

//helper - create a generic function --create a user(POST CALL)

async function createUser(apiHelper:ApiHelper):Promise<User>{
    let userData  = {
          "name" : "Mille Parallel  Test User",
          "status" : "active",
          "gender" : "female",
          "email" : `Milleautomation_${Date.now()}@gmail.com`
      };
        let response =  await apiHelper.post('/public/v2/users',userData ,AUTH_HEADER );
        expect(response.status).toBe(201);
        return response.body;

}//function

//Test1 - Create a user test + verify:AAA
//POST -> userid -> Get / USERID -> verify

test('@regression create a user test' , async({apiHelper}) =>{
     //call create User function
     let userResponse = await createUser(apiHelper);
  
     //get a User
     let getResponse = await apiHelper.get(`/public/v2/users/${userResponse.id}`,AUTH_HEADER);
     expect(getResponse.status).toBe(200);
     expect(getResponse.body.name).toBe('Mille Parallel  Test User');

})

//Test2 - Update a user test + verify:AAA
//POST -> userid -> Get/ USERID -> PUT/ userid  -> GET/userid  -> verify
test('@regression update  a user test' , async({apiHelper}) =>{

     //1- Create a user ->call create User function
     let userResponse = await createUser(apiHelper);
  
     //2- get a User
     let getResponse = await apiHelper.get(`/public/v2/users/${userResponse.id}`,AUTH_HEADER);
     expect(getResponse.status).toBe(200);
     expect(getResponse.body.name).toBe('Mille Parallel  Test User');

     //3-update a user
     let userUpdatedData = {
             "name" : "Mille Parallel  Test User_Updated",
             "status" : "inactive",
     }
    let updatedResponse =  await apiHelper.put(`/public/v2/users/${userResponse.id}`,userUpdatedData ,AUTH_HEADER );
      expect(updatedResponse.status).toBe(200);
      expect.soft(updatedResponse.body.name).toBe(userUpdatedData.name);
      expect.soft(updatedResponse.body.status).toBe(userUpdatedData.status);
     
     //4- get a User
      getResponse = await apiHelper.get(`/public/v2/users/${userResponse.id}`,AUTH_HEADER);
     expect(getResponse.status).toBe(200);
     expect(getResponse.body.name).toBe(userUpdatedData.name);
     expect(getResponse.body.status).toBe(userUpdatedData.status);

})//Test2


//Test3 - delete a user test + verify:AAA
//POST -> userid -> Get/ USERID -> DELETE/ userid (204)  -> GET/userid (404)  -> verify
test('@regression delete  a user test' , async({apiHelper}) =>{

     //1- Create a user ->call create User function
     let userResponse = await createUser(apiHelper);
  
     //2- get a User
     let getResponse = await apiHelper.get(`/public/v2/users/${userResponse.id}`,AUTH_HEADER);
     expect(getResponse.status).toBe(200);
     expect(getResponse.body.name).toBe('Mille Parallel  Test User');

     //3-delete a user
     let updatedResponse =  await apiHelper.delete(`/public/v2/users/${userResponse.id}` ,AUTH_HEADER );
      expect(updatedResponse.status).toBe(204);
         
     //4- get a User
      getResponse = await apiHelper.get(`/public/v2/users/${userResponse.id}`,AUTH_HEADER);
     expect(getResponse.status).toBe(404);
     expect(getResponse.body.message).toBe('Resource not found');


})//Test3

