
import{test , expect, request, APIResponse} from  '@playwright/test';

//Create Authorization token object (Header)
let AUTH_TOKEN = {
     Authorization :'Bearer e8850ae75739c4831aeef7195ec2e611b21a8a4f98561fb694f8e4e55ff5b919'

};

test('get all users GET api test' ,async({request}) =>{

    let response: APIResponse = await request.get('https://gorest.co.in/public/v2/users' , {
        headers : AUTH_TOKEN
    });

      let jsonbody_user = await response.json();

      console.log("Users list " ,jsonbody_user );
      console.log("response : " ,  response.status() , response.statusText());

      expect(response.status()).toBe(200);

})

test('create users POST api test' ,async({request}) =>{

      //User JS Object - to convert in JSON (serialization) 
      let userData  = {
          "name" : "Ollie Automation Test User",
          "status" : "active",
          "gender" : "male",
          "email" : `Ollieautomation_${Date.now()}@gmail.com`
      };

     let response:APIResponse = await request.post('https://gorest.co.in/public/v2/users' ,{
        headers : AUTH_TOKEN,
        data : userData,
     });

     let jsonBody = await response.json();
     console.log("Deatils User created  :" ,jsonBody );
     console.log("status :" , response.status()); //201
     console.log("status text :" , response.statusText()); //created
     expect (response.status()) .toBe(201);

})

test('update user PUT api test' ,async({request}) =>{
    
      //User JS Object - to convert in JSON (serialization) 
      let userData  = {
          "name" : "Ollie ",
          "status" : "inactive",
          "gender" : "female",
          "email" : "Ollieautomation@gmail.com"
      };

     let response:APIResponse = await request.put('https://gorest.co.in/public/v2/users/8625519' ,{
        headers : AUTH_TOKEN,
        data : userData,
     });

     let jsonBody = await response.json();
     console.log("Deatils User updated  :" ,jsonBody );
     console.log("status :" , response.status()); //200
     console.log("status text :" , response.statusText()); //ok
     expect (response.status()) .toBe(200);

})

test('delete user DELETE api test' ,async({request}) =>{
    
     let response:APIResponse = await request.delete('https://gorest.co.in/public/v2/users/8625519' ,{
        headers : AUTH_TOKEN,
       });

     console.log("status :" , response.status()); //204
     console.log("status text :" , response.statusText()); //No content
     expect (response.status()).toBe(204);

})

