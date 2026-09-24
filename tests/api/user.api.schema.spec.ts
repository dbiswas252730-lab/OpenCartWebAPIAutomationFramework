
//schema :type of response data
//ajv :node lib for the schema validation
//npm install ajv

import {test , expect } from '../../src/fixtures/apifixtures';
import Ajv from 'ajv';
import fs from 'fs';

//1 get the token
const TOKEN = process.env.API_TOKEN!;


let AUTH_HEADER ={
    Authorization:`Bearer ${TOKEN}`
}

//setup the AJV library
let ajv = new Ajv();

//define JSON schema
// let userSchema =  { 
//   "type": "object",
//   "properties": {
//     "id": {
//       "type": "number" 
//        //"type": "string"   checking the negative scenario of schma
//     },
//     "name": {
//       "type": "string"
//     },
//     "email": {
//       "type": "string"
//     },
//     "gender": {
//       "type": "string"
//     },
//     "status": {
//       "type": "string"
//     }
//   },
//   "required": [
//     "id",
//     "name",
//     "email",
//     "gender",
//     "status"  // comment omit tatus check does it fail -No
//     //"city" //adding extra city- will fail 
//   ]
// }

//Get all the user list and v   alidate that schema
let userArraySchema = {
    type: "array",
    //items:userSchema
    items:JSON.parse(fs.readFileSync('./src/schema/userschema.json','utf-8'))

}

test('get a user -test the schema' , async({apiHelper})=>{
//user JS Object
      let userData  = {
          "name" : "Ollie Automation Test User",
          "status" : "active",
          "gender" : "male",
          "email" : `Ollieautomation_${Date.now()}@gmail.com`
      };
       let response =  await apiHelper.post('/public/v2/users',userData ,AUTH_HEADER );
         expect (response.status).toBe(201);
         let userId =  response.body.id;
         console.log("created userId " ,userId);

    //Get a user 
       let getUserResponse = await apiHelper.get(`/public/v2/users/${userId}` , AUTH_HEADER);
       expect(getUserResponse.status).toBe(200);
    
    //Verify the response schema   
    //let validate = ajv.compile (userSchema); //schemaValidate fun expression
    let validate = ajv.compile(JSON.parse(fs.readFileSync('./src/schema/userschema.json','utf-8')));
    let isSchemaValidate =validate(getUserResponse.body);
    if(!isSchemaValidate) {
        console.log("SCHEMA ERROR ::" , validate.errors);
    }

    expect(isSchemaValidate).toBeTruthy();

})

test('get all user array  -test the schema' , async({apiHelper})=>{
     
    //Get a user 
       let getUsersResponse = await apiHelper.get(`/public/v2/users/` , AUTH_HEADER);
       expect(getUsersResponse.status).toBe(200);
    
    //Verify the response schema   
    let validate = ajv.compile (userArraySchema); //schemaValidate fun expression
    let isSchemaValidate =validate(getUsersResponse.body);
    if(!isSchemaValidate) {
        console.log("SCHEMA ERROR ::" , validate.errors);
    }
    expect(isSchemaValidate).toBeTruthy();
})