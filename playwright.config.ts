import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import reportingLabs from './reporting-labs.config';

//npm install dotenv
//ENV=qa npx playwright test
//for windows $env:ENV="stage"; npx playwright test
const ENV = process.env.ENV || "qa";
console.log("Running tests on Environment :", ENV);
dotenv.config({path: `config/.env.${ENV}`});


/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 2 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */

  reporter:process.env.CI
     ? [
           ['list'],
           ['html',{outputFolder: "reports/html-report" , open:"never"}],
           ['allure-playwright', {
            outputfolder:"allure-results",
            suiteTitle :true,
           }],
           ['reporting-labs' , reportingLabs]
       ] :
       [
           ['list'],
           ['html',{outputFolder: "reports/html-report" , open:"never"}],
           ['allure-playwright', {
            outputfolder:"allure-results",
            suiteTitle :true,
           }],
           ['reporting-labs' , reportingLabs]
       ] ,
  
  use: {  
        // baseURL: 'https://naveenautomationlabs.com/',
        baseURL : process.env.BASE_URL,
        //default value CI -true on Remote and L-false then !process.env.CI
         headless:!process.env.CI? false : true ,
         trace: 'on-first-retry',
         screenshot:'on',
         video:'on'
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

});
