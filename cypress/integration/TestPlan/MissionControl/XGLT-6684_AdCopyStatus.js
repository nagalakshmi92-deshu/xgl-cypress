/// <reference types="cypress-xpath"/>
import MissionControlPageObject from '../../../support/ObjectRepository/MissionControl/MissionControlPageObject'

describe('XGLT-6684_AdCopyStatus', () => {
    const mso = new MissionControlPageObject();
    var next7d_text;
    var next7d_rows;
    var today_text;
    var today_rows;
    var tomorrow_text;
    var tomorrow_rows;
    var no_records = 'No Items to Display'

    before(function () {
        cy.fixture('missionControl.json').then(function (data) {
            this.data = data
            //LOGIN INTO APPLICATION
            cy.visit(this.data.Environment.baseURL).then(() => {
                cy.log('Entering Username')
                mso.locator_Login_Username().type(this.data.Environment.Username, { sensitive: true })
                cy.log('Entering  Password')
                mso.locator_Login_Password().type(this.data.Environment.Password, { sensitive: true })
                cy.log('Click on Login Button')
                mso.locator_Login_LoginButton().click({ log: false })
                cy.log('Sucess !!');
            })

        })
    })


    it('Verification of the ticket XGLT-6684_AdCopyStatus', () => {

        cy.wait(5000)
        //Step 1: (Verification) landed on dashboed page
        cy.url().should('contain', '/MissionControl');
        cy.log('Successfully landed on dashboard');
        cy.screenshot();

        //Step 2: Click on Setting Icon 
        mso.locator_SettingIcon().click();
        cy.log('Clicked on Settings icon');
        mso.locator_MissionControlWidgetSettings().then(($el) => {
            expect($el.text()).equals('Mission Control Widget Settings');
        })
        cy.log('Mission Control Widget Settings popup visible on screen')
        cy.screenshot();


        //Step 3: select 'ad copy status' in 3rd Quadrant
        mso.locator_SelectFirstArrow().click()
        mso.locator_ACS_records().click({ force: true })

        mso.locator_SelectSecondArrow().click()
        mso.locator_ACH_records().click({ force: true })

        mso.locator_SelectThirdArrow().click({ log: false })
        mso.locator_Finance_records().click({ force: true }, { log: false })
                    
         mso.locator_SelectForthArrow().click({ log: false })
         mso.locator_Reconciliation().click({ force: true }, { log: false })


        //Step 4: Click on save button
        cy.log('check whether save button is enabled or not')
        mso.locator_button_Save()
            .should('not.be.disabled')
            .click({ force: true })
        cy.log('Clicked on Save button')

        //Step 5: (Verification) To verify the Ad Copy Status quadrate is opened in dashboard
        cy.contains('Overview of Ad Copy that has not been received or encoded', { log: false })
        cy.log('Ad Copy Status quadrate is visible in the dashboard')

        // Test case:2(Verification) Verify that text in Not Received button and count of rows are equal in the case of Next 7 days

        //Step 6: Get the text from Not Received button 
        cy.get("div[radio-value='N']")
            .invoke('show')
            .click({ force: true }, { log: false })
        cy.log('clicked on Next 7 days radio button')
        cy.wait(5000)
        //cy.xpath('//h4[contains(.,"Not Received")]/following-sibling::div/child::div/following-sibling::div',{log:false})
        cy.xpath("//div[@class='ad-copy-status copyhandling ng-scope']//div[@class='ng-binding']", { log: false })
            .eq(0)
            .invoke('text').then((val) => {
                cy.log('text on the Not Recived radio button')
                next7d_text = val
                cy.log('text of next 7 days= ' + next7d_text)
            })

        //Step 7: Get no.of rows in the Ad copy page and compare them
        cy.xpath("//div[@class='ad-copy-status copyhandling ng-scope']//div[@class='btnBig arrow']", { log: false }).eq(0).click({ log: false })
        cy.log('Clicked on the arrow of Not Recieved button')
        cy.contains('Ad Copy')
        cy.log('Reached Ad copy page')
        cy.wait(5000)
        cy.get("div.slick-viewport div.grid-canvas").then(($body) => {
            if ($body.find(".ui-widget-content.slick-row").length > 0) {
                next7d_rows = $body.find(".ui-widget-content.slick-row").length
                cy.log('Count the no.of rows present in the Ad copy page')
                cy.log('No.of rows  =' + $body.find(".ui-widget-content.slick-row").length)

            }
            else {
                cy.log('Count the no.of rows present in the Ad copy page')
                next7d_rows = 0
                cy.log('No.of rows  =' + next7d_rows)
            }
        }).then(() => {
            if (Number(next7d_text) == Number(next7d_rows)) {
                cy.log('Both count are equal')
            }
            else {
                assert.equal(Number(next7d_text), Number(next7d_rows), 'Count not matched')
            }
        })



        // (Verification) Verify that text in Not Received button and count of rows are equal in the case of TODAY
        //Step 9 :(Verification) To verify the Ad Copy Status quadrate is opened in dashboard
        cy.go('back')
        cy.contains('Overview of Ad Copy that has not been received or encoded', { log: false })
        cy.log('Ad Copy Status quadrate is visible in the dashboard')

        //Step 10: Get the text from Not Received button for TODAY
        cy.get("div[radio-value='T']").invoke('show')
            .click({ force: true }, { log: false })
        cy.log('clicked on Today radio button')
        cy.wait(5000)
        cy.xpath("//div[@class='ad-copy-status copyhandling ng-scope']//div[@class='ng-binding']", { log: false })
            .eq(0)
            .invoke('text')
            .then((val) => {
                cy.log('text on the Not Recived radio button')
                today_text = val
                cy.log('Text of Today= ' + today_text)
            })

        //Step 11: Get no.of rows in the Ad copy page for TODAY
        cy.xpath("//div[@class='ad-copy-status copyhandling ng-scope']//div[@class='btnBig arrow']", { log: false }).eq(0).click({ log: false })
        cy.log('Clicked on the arrow of Not Recieved button')
        cy.contains('Ad Copy')
        cy.log('Reached Ad copy page')
        cy.wait(5000)
        cy.get("div.slick-viewport div.grid-canvas").then(($body) => {
            if ($body.find(".ui-widget-content.slick-row").length > 0) {
                today_rows = $body.find(".ui-widget-content.slick-row").length
                cy.log('Count the no.of rows present in the Ad copy page')
                cy.log('No.of rows for TODAY  =' + $body.find(".ui-widget-content.slick-row").length)

            }
            else {
                cy.log('Count the no.of rows present in the Ad copy page')
                today_rows = 0
                cy.log('No.of rows for TODAY  =' + today_rows)
            }

        }).then(() => {
            if (Number(today_rows) == Number(today_text)) {
                cy.log('Text on Not Recieved button amd no.of rows in Ad copy page are equal')
            }
            else {
                assert.equal(Number(today_rows), Number(today_text), 'Count not matched')
            }
        })


        // (Verification) Verify that text in Not Received button and count of rows are equal in the case of TOMORROW
        //Step 13 :(Verification) To verify the Ad Copy Status quadrate is opened in dashboard
        cy.go('back')
        cy.contains('Overview of Ad Copy that has not been received or encoded', { log: false })
        cy.log('Ad Copy Status quadrate is visible in the dashboard')

        //Step 14: Get the text from Not Received button for TOMORROW
        cy.get("div[radio-value='M']")
            .invoke('show').click({ force: true }, { log: false })
        cy.log('clicked on Tomorrow radio button')
        cy.wait(3000)
        cy.xpath("//div[@class='ad-copy-status copyhandling ng-scope']//div[@class='ng-binding']", { log: false })
            .eq(0).invoke('text')
            .then((val) => {
                cy.log('text on the Not Recived radio button')
                tomorrow_text = val
                cy.log('Text of Tomorrow= ' + tomorrow_text)
            })

        //Step 15: Get no.of rows in the Ad copy page for TOMORROW
        cy.xpath("//div[@class='ad-copy-status copyhandling ng-scope']//div[@class='btnBig arrow']", { log: false })
            .eq(0)
            .click({ log: false })
        cy.log('Clicked on the arrow of Not Recieved button')
        cy.contains('Ad Copy')
        cy.log('Reached Ad copy page')
        cy.wait(5000)
        cy.get("div.slick-viewport div.grid-canvas").then(($body) => {
            if ($body.find(".ui-widget-content.slick-row").length > 0) {
                tomorrow_rows = $body.find(".ui-widget-content.slick-row").length
                cy.log('Count the no.of rows present in the Ad copy page')
                cy.log('No.of rows for TOMORROW  =' + $body.find(".ui-widget-content.slick-row").length)

            }
            else {
                cy.log('Count the no.of rows present in the Ad copy page')
                tomorrow_rows = 0
                cy.log('No.of rows  =' + tomorrow_rows)
            }

        }).then(() => {
            if (Number(tomorrow_rows) == Number(tomorrow_text)) {
                cy.log('Text on Not Recieved button amd no.of rows in Ad copy page are equal')
            }
            else {
                assert.equal(Number(tomorrow_rows),Number(tomorrow_text),'Count not matched')
            }
        })

        // Click on Setting Icon and make reset
        cy.go(-1)
        cy.wait(2000)
        mso.locator_SettingIcon().scrollIntoView()
        mso.locator_SettingIcon().click({ force: true });
        cy.log('Clicked on Settings icon');
        mso.locator_MissionControlWidgetSettings().then(($el) => {
            expect($el.text()).equals('Mission Control Widget Settings');
        })
        cy.log('Mission Control Widget Settings popup visible on screen')
        cy.screenshot();

        // Click on Save button
        mso.locator_button_reset().click({ force: true });
        cy.contains('Ad Copy Handling');
        cy.log('Clicked on reset button successfully.')

    })

})
