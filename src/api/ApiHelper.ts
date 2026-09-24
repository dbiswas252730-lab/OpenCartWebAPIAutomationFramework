

import { APIRequestContext } from "@playwright/test";

export class ApiHelper {

     //1 - declare variables
    private readonly request : APIRequestContext;
    private readonly baseURL : string;

    //2-Initalize
    constructor(request:APIRequestContext , baseURL:string ){
        this.request = request;
        this.baseURL = baseURL;
    }
    
    //3-methods apiHeaders is optional paramtere 

    //1-Get
    async get( endpoint:string , apiHeaders?: Record<string,string>):Promise<{status:number , body:any}>{
          let response = await  this.request.get(`${this.baseURL}${endpoint}` , {
              headers:apiHeaders
           });
         // console.log('In helper file GET' , await response.json() , response.status());
        return {
                status :response.status(),
                body : await response.json()
        }            
        }

     //2-POST
     async post( endpoint:string , userdata:object, apiHeaders?: Record<string,string>){
          let response = await  this.request.post(`${this.baseURL}${endpoint}` , {
              //headers:apiHeaders,
              data:userdata
           }) ; 
           let responseBody = await response.json();
           //console.log('In helper file POST' , await response.json() , response.status()); 
          console.log('In helper file POST' , responseBody  , response.status());     
        return {
                status :response.status(),
                body :responseBody
                //body : await response.json()
        } 
               
        }    

    //3-PUT
     async put(endpoint:string , userdata:object ,apiHeaders?: Record<string,string>){
          let response = await  this.request.put(`${this.baseURL}${endpoint}` , {
              headers:apiHeaders,
              data:userdata
           })  ;
        console.log('In helper file PUT' , await response.json() , response.status()); 
        return {
                status :response.status(),
                body : await response.json()
        } 
           
        }  
        
     //4-DELETE
     async delete(endpoint:string , apiHeaders?: Record<string,string>){
          let response = await  this.request.delete(`${this.baseURL}${endpoint}` , {
            headers:apiHeaders,
                  })  ;
        console.log('In helper file DELTE' ,  response.status());
        return {
                status :response.status(),
            
        }            
        }    
}