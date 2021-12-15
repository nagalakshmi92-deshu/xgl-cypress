/// <reference types="Cypress-xpath" />



import CreateCustomerTestpageObject from '../../../support/ObjectRepository/Orders/CreateCustomerTestpageObject'
import MissionControlPageObject from '../../../support/ObjectRepository/MissionControl/MissionControlPageObject'

describe('Verification of Reports Run SQl commands (Smoke)', () => {
    const ocm = new CreateCustomerTestpageObject();
    const mso = new MissionControlPageObject();
    const getIframeBody = () => {
        // get the iframe > document > body
        // and retry until the body element is not empty
        return cy
            .xpath('//iframe[@class="runReportIframe ng-scope"]', { timeout: 10000 })
            .its('0.contentDocument.body').should('not.be.empty')
            // wraps "body" DOM element to allow
            // chaining more Cypress commands, like ".find(...)"
            // https://on.cypress.io/wrap
            .then(cy.wrap)
    }
    //Use the cy.fixture() method to pull data from fixture file
    before(function () {

    })

    beforeEach(() => {
        cy.fixture('Configurations.json').then(function (data) {
            this.data = data;

            cy.visit(this.data.Environment.baseURL).then(() => {
                cy.log('Entering Username')
                mso.locator_Login_Username().type(this.data.Environment.Username);
                cy.log('Entering  Password')
                mso.locator_Login_Password().type(this.data.Environment.Password, { log: false });
                cy.log('Click on Login Button')
                mso.locator_Login_LoginButton().click({ log: false });
                cy.log('Sucess !!');
            })
        })

    })

    it('Run SQL commands report Test', () => {
        cy.fixture('Configurations.json').then(function (data) {
            this.data = data;
            //Step 1: (Verification) landed on dashboed page
            cy.url().should('contain', '/MissionControl');
            cy.log('Successfully landed on dashboard');
            cy.screenshot();

            // Step 2: Click over 'Report ' menu Item 
            cy.contains('Ad Copy Handling')
            cy.visit(this.data.Reports.runSqlCommandsReport)
            cy.url().should('contain', '/Reports')
            cy.wait(10000)

            // Step 3: (Verification) of record present in table list and clicked on record 
            getIframeBody().find('.xg-page-content').find('[href="#/job/run-sql-command/300069"]').click()
            cy.log('Clicked on Run SQL Command successfully')

            // Step 4: Click on submit 
            cy.wait(5000)
            cy.getIframeBody('//iframe[@class="runReportIframe ng-scope"]').find('.xg-page-header').find('.tabs.is-toggle').find('li:nth-of-type(5) > a > span:nth-of-type(2)').click().click({ force: true });
            cy.log('Clicked on submit button successfully')

            // Step 5: Taken job ID 
            cy.log(cy.getIframeBody('//iframe[@class="runReportIframe ng-scope"]').find('.xg-page-content').find('form#runReportForm div>div +p label a').then(($e1) => {
                this.content = $e1.text();
                cy.log(' Description =' + this.content)
            }))

            //(Explicit wait)
            cy.getIframeBody('//iframe[@class="runReportIframe ng-scope"]').find('.xg-page-content').find('div h1 + div', { timeout: 600000 }).should('be.visible')
            cy.log('Waiting for Visible')
            // Then Assert it goes away (negative assertion)
            cy.getIframeBody('//iframe[@class="runReportIframe ng-scope"]').find('.xg-page-content').find('div h1 + div', { timeout: 600000 }).should('not.exist')
            cy.log('Wait for dissappers')

            
            // Step 6 : clicked on Job Arrow 
            cy.xpath('//td[@class="footerSection"]/child::div/div[contains(.,"Jobs ")]/preceding-sibling::div').should('be.visible').click()
            cy.contains('Description')
            cy.log('clicked on Job arrow icon successfully ')
            cy.screenshot();

            // Step 7: Click on error  and Completed checkbox 
            cy.xpath('//div[@class="cloud form-container jobs-grid"]//span[contains(.,"Error")]').should('be.visible').click({ force: true })
            cy.log('clicked on error checkbox successfully ');
            //Completed 
            cy.xpath('//div[@class="cloud form-container jobs-grid"]//div[@class="row slick-upper-strip"]//span[contains(.,"Completed")]').should('be.visible').click({ force: true })
            cy.log('clicked on completed checkbox successfully ');

            //Step 8 : (Verification) Verify that Selected description / report name 
            cy.wait(10000)
            cy.VerifyRecordPresentInJobTable("Run SQL Command")
            
 
            //Step 9: (Verification) Verify that Selected dates are equal to Dates in Schedular status
            cy.xpath("//div[@class='grid-canvas']/div",{ timeout: 600000 }).each((ee, index, list) => {
                var c1 = ee.find('div').eq(1).text()

                // cy.log(schedule_end_Date) 
                if (c1 == "Run SQL Command") {
                    cy.log('Schedule record are present in JOB EDS')


                    var d1 = ee.find('div').eq(8).text()
                    cy.log(d1)


                    if (d1 == "RUNING") {
                        cy.log('Record is in running mode')

                    }
                    else if (d1 == "SCHDULING") {
                        cy.log('Record is in SCHDULING mode')

                    }
                    else if (d1 == "COMPLETED") {
                        cy.log('Record is in SCHDULING mode')

                    }
                    else {
                        cy.log('Record is not processed  - ERROR!!')
                        throw new Error("Test fails here , because record does not proccessed !!")

                    }
                    
                    cy.log('Successfully! record Scheduled')
                }
            })

    
            // Step 10 : Clicked on close icon
            cy.xpath('//div[@class="footerBlockTitle separatorH ng-binding" and contains(.,"Jobs ")]/preceding-sibling::div[@class="openClose ng-scope"]').should('be.visible').click()
            cy.log('Clicked on close icon successfully!')

            // moving back to the parent tab with the help of go() method
            cy.go(-1)

        })

    })

})



