
import {test , expect } from '@playwright/test';
import { request } from 'node:http';

let OAUTH_CONFIG = {
    tokenURL: 'https://accounts.spotify.com/api/token',
    clientId : process.env.OAUTH_CLIENT_ID !,
    clientSecret : process.env.OAUTH_CLIENT_SECRET !,
    grantType: process.env.GRANT_TYPE! ,
}

let accessToken : string;

//there is no JSON data as header if its use data Buts its form 
test.beforeEach('POST- generate the access token' , async({request}) => {
    // 1. Combine clientId and clientSecret into a Base64 string for Basic Auth
    let response =  await request.post(OAUTH_CONFIG.tokenURL ,{
        form:{
               grant_type :OAUTH_CONFIG.grantType,
               client_id : OAUTH_CONFIG.clientId,
               client_secret : OAUTH_CONFIG.clientSecret
        }//form
     });
    expect(response.status()).toBe(200);
    let jsonResponse = await response.json();
    console.log('Token API response : ' , jsonResponse);
    accessToken = jsonResponse.access_token;
    console.log("AccessToken  -> ",accessToken);
})

test('get ALbumns data test' , async({request}) =>{
    //https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy
    let endpointURL= 'v1/albums/4aawyAB9vmqN3uQ7FjRGTy';
    let albumResponse =await request.get(`${process.env.SPOTIFY_BASE_URL}${endpointURL}`,{
    headers:{
             Authorization:`Bearer ${accessToken}`
            }
    });//albumResponse        
    expect( albumResponse.status()).toBe(200) ;
    let albumData = await albumResponse.json();
    console.log("Fetched Album name :: " ,albumData.name);
    console.log("Fetched Album artist:: " ,albumData.artists);
    console.log("ALbum tracks  and Total track :" ,albumData.tracks ,albumData.total_tracks);
    console.log("Album spotify :" , albumData.external_urls.spotify);
    console.log(" total images :" ,albumData.images ,  albumData.images.length);
         
})

test('Get the chapters test' , async({request}) =>{
    //url
    let endpoint = 'v1/chapters/0D5wENdkdwbqlrHoaJ9g29';
    let chapterResponse = await request.get(`${process.env.SPOTIFY_BASE_URL}${endpoint}`,{
        headers:{
                 Authorization:`Bearer ${accessToken}`
        },
        params:{
                market:'US',
        },
        });
     expect(chapterResponse.status()).toBe(200) ; 

    let chaptersData = await chapterResponse.json();
    console.log("chaptersData  ::: " ,chaptersData);
    console.log(" chapter_number ::" , chaptersData.chapter_number) ;
    console.log("restriction :: " , chaptersData.restrictions.reason);

})