

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

    //3 Parse the response 
  // Common response body parser
  private async parseBody(response: any) {

    const contentType = response.headers()['content-type'];

    if (contentType?.includes('application/json')) {
      return await response.json();
    }
        return await response.text();
  }

//CRUD methods
  async get(
    endpoint: string,
    apiHeaders?: Record<string, string>
  ): Promise<{ status: number; body: any }> {

    const response = await this.request.get(
      `${this.baseURL}${endpoint}`,
      {
        headers: apiHeaders
      }
    );
    const body = await this.parseBody(response);
  console.log('In helper file GET',body, response.status()
  );
      return {
      status: response.status(),
      body 
    };
  }

  async post(
    endpoint: string,
    userdata: object,
    apiHeaders?: Record<string, string>
  ) {

    const response = await this.request.post(
      `${this.baseURL}${endpoint}`,
      {
        headers: apiHeaders,
        data: userdata
      }
    );
     const body = await this.parseBody(response);
   console.log('In helper file POST', body, response.status() );

    return {
      status: response.status(),
      body 
    };
  }

  async put(
    endpoint: string,
    userdata: object,
    apiHeaders?: Record<string, string>
  ) {

    const response = await this.request.put(
      `${this.baseURL}${endpoint}`,
      {
        headers: apiHeaders,
        data: userdata
      }
    );

    const body = await this.parseBody(response);

    return {
      status: response.status(),
      body
    };
  }

  async delete(
    endpoint: string,
    apiHeaders?: Record<string, string>
  ) {

    const response = await this.request.delete(
      `${this.baseURL}${endpoint}`,
      {
        headers: apiHeaders
      }
    );
  console.log('In helper file DELTE', response.status());
    const body = await this.parseBody(response);

    return {
      status: response.status(),
      body
      };
  }
}
    
   