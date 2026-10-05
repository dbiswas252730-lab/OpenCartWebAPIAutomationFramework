
import {test, expect} from  '@playwright/test';

//web app -> intercept the network call and log them
//**/ * -> wildcard pattern for the url
test('@smoke intercept and log request' , async ({page}) =>{
   
    //added routing listner
    await page.route("**/*" , async(route)  =>{
        console.log(route.request().method() ,  route.request().url());
        await  route.continue(); //url1 -capture url2 -capture 
    });
  //navigate to web app
  await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=common/home');

})

//intercept with mocking
//mocking fake data/response

test('smoke mock search data sql ' , async ({page}) =>{
  //fake products
  let fakeProducts = [{name: 'Fake Macbook Pro' , Price: '$5999'},
                       {name: 'Fake iphone 800' , Price:'$67899'}
  ];
//https://naveenautomationlabs.com/opencart/index.php?route=common/home
 await page.route('**/index.php?route=product/search&search=macbook' ,async(route)=>{
          await route.fulfill({
                              status:200,
                               headers: {
                                          'content-type': 'application/json'
                                        },
                                body:JSON.stringify(fakeProducts)
          });
 });
    await page.goto('https://abc.com/index.php?route=product/search&search=macbook');
   // await page.pause();
}) ;   

test('intercepts & log request another' , async ({page}) =>{
   
    //added routing listner
      // Intercept every network request
    await page.route("**/*" , async(route)  =>{
        console.log(route.request().method() ,  route.request().url());
         // Allow the request to continue to the real server
         // 1. Log + allow real request
        await  route.continue(); //url1 -capture url2 -capture 
        // 2. Replace response with fake data
             /* await route.fulfill({
                status: 200,
                body: 'Fake response'
              });*/
          // 3. Block request
            // await route.abort();
    });
  //navigate to web app
  await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=common/home');

});

//intercept with mocking
//mocking fake data/response

test('mock search result fake HTML ' , async ({page}) =>{

//https://naveenautomationlabs.com/opencart/index.php?route=common/home
 await page.route('**/index.php?route=product/search&search=macbook' ,async(route)=>{
          await route.fulfill({
                              status:200,
                               headers: {
                                          'content-type': 'text/html'
                                        },
                                body:`
                                <html>
                                <body>
                                <h1>Search Results</h1>
                                <div class="product-layout">
                                <h4><a href="#">Fake Mac Products</a></h4>
                                <p class="price">$599</p>
                                </div>
                                  <div class="product-layout">
                                <h4><a href="#">Fake iPhone</a></h4>
                                <p class="price">$999</p>
                                </div>
                                </body>
                                </html>`
                                
          });
 });
  //Navigate to the URL that matches the route
    await page.goto('https://abc.com/index.php?route=product/search&search=macbook');
    //assert on fake HTML
    const heading = await page.textContent('h1');
    expect(heading).toBe('Search Results');
    const products = await page.locator('.product-layout h4').allTextContents();
    expect(products).toEqual(['Fake Mac Products' ,'Fake iPhone' ]);
    const price = await page.locator('.price').allTextContents();
    expect(price).toEqual(['$599' ,'$999' ]);
    //await page.pause();
}) ;   

test('negative test - search API returns 401 Unauthorized', async ({ page }) => {

  await page.route(
    '**/index.php?route=product/search&search=macbook',
    async (route) => {

      await route.fulfill({
        status: 401,

        headers: {
          'content-type': 'text/html'
        },

        body: `
          <html>
            <body>
              <h1>Unauthorized</h1>
              <p>You are not authorized to perform this search.</p>
            </body>
          </html>
        `
      });
    }
  );

  // Navigate to URL that matches the route
  await page.goto(
    'https://abc.com/index.php?route=product/search&search=macbook'
  );

  // Verify error page
  const heading = await page.locator('h1').textContent();
  expect(heading).toBe('Unauthorized');
  const errorMessage = await page.locator('p').textContent();
  expect(errorMessage).toBe(
    'You are not authorized to perform this search.'
  );
  //await page.pause();
});
test('negative test - search API returns HTTP 501 — Not Implemented', async ({ page }) => {

  await page.route(
    '**/index.php?route=product/search&search=macbook',
    async (route) => {

      await route.fulfill({
        status: 501,
        headers: {
          'content-type': 'text/html'
        },
        body: `
          <html>
            <body>
              <h1>Not Implemented</h1>
              <p>Search service is not implemented.</p>
            </body>
          </html>
        `
      });
    }
  );

  await page.goto(
    'https://abc.com/index.php?route=product/search&search=macbook'
  );

  // Verify 501 error response is displayed
  await expect(page.locator('h1'))
    .toHaveText('Not Implemented'); 

  await expect(page.locator('p'))
    .toHaveText('Search service is not implemented.');
});