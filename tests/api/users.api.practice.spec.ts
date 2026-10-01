
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
    
       // 1. Create a fresh user first
  const createData = {
    name: 'Ollie Update Test User',
    status: 'active',
    gender: 'female',
    email: `Ollie_update_${Date.now()}@gmail.com`
  };

  const createResponse = await request.post(
    'https://gorest.co.in/public/v2/users',
    {
      headers: AUTH_TOKEN,
      data: createData
    }
  );

  expect(createResponse.status()).toBe(201);

  const createdUser = await createResponse.json();
  const userId = createdUser.id;

  console.log('Created user id:', userId);

  // 2. Update newly created user
  const updateData = {
    name: 'Ollie Updated',
    status: 'inactive',
    gender: 'female',
    email: `Ollie_updated_${Date.now()}@gmail.com`
  };

  const response = await request.put(
    `https://gorest.co.in/public/v2/users/${userId}`,
    {
      headers: AUTH_TOKEN,
      data: updateData
    }
  );

  const jsonBody = await response.json();

  console.log('Updated user:', jsonBody);
  console.log('status:', response.status());

  expect(response.status()).toBe(200);
  expect(jsonBody.name).toBe('Ollie Updated');
  expect(jsonBody.status).toBe('inactive');
});

test('delete user DELETE api test' ,async({request}) =>{
    
     // 1. Create a user first
  const userData = {
    name: 'Ollie Delete Test User',
    status: 'active',
    gender: 'male',
    email: `Ollie_delete_${Date.now()}@gmail.com`
  };

  const createResponse = await request.post(
    'https://gorest.co.in/public/v2/users',
    {
      headers: AUTH_TOKEN,
      data: userData
    }
  );

  expect(createResponse.status()).toBe(201);

  const createdUser = await createResponse.json();
  const userId = createdUser.id;

  console.log('Created user id:', userId);

  // 2. Delete that user
  const response = await request.delete(
    `https://gorest.co.in/public/v2/users/${userId}`,
    {
      headers: AUTH_TOKEN
    }
  );

  console.log('Delete status:', response.status());

  expect(response.status()).toBe(204);

  // 3. Optional: verify it no longer exists
  const getResponse = await request.get(
    `https://gorest.co.in/public/v2/users/${userId}`,
    {
      headers: AUTH_TOKEN
    }
  );

  expect(getResponse.status()).toBe(404);

})

