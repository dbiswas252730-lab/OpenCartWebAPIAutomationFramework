

import process from 'node:process';
import {test , expect } from '../../src/fixtures/apifixtures';
import { ApiHelper } from '../../src/api/ApiHelper';

const TOKEN = process.env.API_TOKEN!;
let userId: number;

let AUTH_HEADER ={
    Authorization:`Bearer ${TOKEN}`
}

test.describe.serial('running e2e go rest crud apis test',() => {

    //GET Test:
    test('GET API -get all users' , async({apiHelper}) =>{
        let response = await apiHelper.get('/public/v2/users',AUTH_HEADER);
        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
        
    })

    //POST Test
    test('POST API -create a new user ' , async ({apiHelper}) =>{
          //User JS Object - to convert in JSON (serialization) 
      let userData  = {
          "name" : "Ollie Automation Test User",
          "status" : "active",
          "gender" : "male",
          "email" : `Ollieautomation_${Date.now()}@gmail.com`
      };
        let response =  await apiHelper.post('/public/v2/users',userData ,AUTH_HEADER );
        expect (response.status).toBe(201);
         userId =   response.body.id;
         console.log("created userId " ,userId);
    })

    //PUT Test Idempotency
    test('PUT API -update  user ' , async ({apiHelper}) =>{
          //User JS Object - to convert in JSON (serialization) 
      let userData  = {
          "name" : "Ollie Automation Test User",
          "status" : "inactive",
        
      };
        let response =  await apiHelper.put(`/public/v2/users/${userId}`, userData ,AUTH_HEADER);
        console.log("updated status :" , response.body.status);
        expect (response.status).toBe(200);
        expect (response.body.name).toBe(userData.name);
        expect(response.body.status).toBe(userData.status);
    })
    
       //DELETE Test
    test('DELETE API -delete  user ' , async ({apiHelper}) =>{
        let response =  await apiHelper.delete(`/public/v2/users/${userId}` ,AUTH_HEADER);
        expect (response.status).toBe(204);
    })

    
    //GET Test:
    test('GET API -get specific  users' , async({apiHelper}) =>{
        let response = await apiHelper.get(`/public/v2/users/${userId}`,AUTH_HEADER);
        expect(response.status).toBe(404);
        
        
    })

})//serialisation