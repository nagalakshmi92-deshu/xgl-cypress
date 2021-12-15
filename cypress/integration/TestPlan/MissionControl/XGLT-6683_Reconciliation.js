/// <reference types="cypress-xpath"/>

import MissionControlPageObject from '../../../support/ObjectRepository/MissionControl/MissionControlPageObject'

describe('XGLT-6683_Reconciliation', () => {
    var unverified_text;
    var unverified_page;
    var droped_noMakeGood_text;
    var droped_noMakeGood_page;
    const mso = new MissionControlPageObject();

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
                cy.log('Success !!');
            })

        })
    })

    it('Verification of Reconciliation', () => {

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


        //Step 3: select 'Reconciliation' in 1st  Quadrant
        mso.locator_SelectFirstArrow().click()
        mso.locator_Reconciliation().click({ force: true })

        mso.locator_SelectSecondArrow().click({ log: false })
        mso.locator_DataGovernance_records().click({ force: true }, { log: false })

        mso.locator_SelectThirdArrow().click({ log: false })
        mso.locator_Finance_records().click({ force: true }, { log: false })
        
        mso.locator_SelectForthArrow().click({ log: false })
        mso.locator_PA_records().click({ force: true }, { log: false })

        
        


        //Step 4: Click on save button
        cy.log('check whether save button is enabled or not')
        mso.locator_button_Save()
            .should('not.be.disabled')
            .click({ force: true })
        cy.log('Clicked on Save button')

        //TEST CASE:1 Reconciliation section should appear on Mission Control page 
        //Step 5: (Verification) To verify the Reconciliation quadrate is opened in dashboard
        cy.contains('Reconciliation', { log: false })
        cy.log('Reconciliation quadrate is visible in the dashboard')
        cy.wait(6000)

        //TEST CASE:2 user should get navigated to Order Reconciliation page and observe that Unverified $ count should be equal  to unverified $ count on Reconciliation section on Mission Control page
        //Step 6:Get text on Unverifiedbutton
        cy.xpath("//div[@class='reconciliation']//div[@class='ng-binding']")
            .eq(0)
            .invoke('text')
            .then((e1) => {
                cy.log(e1)
                var e2 = e1.split('$')
               // unverified_text=e2[1]
                var e3=e2[1].split(',').join('')
                cy.log('unverified_text = '+ e3)
            })
        //Click on Unverified button
        cy.xpath("//div[@class='reconciliation']//div[@class='btnBig arrow butt1']")
          .click({ log: false })

          //(Verification) Check that Order Reconcilation page is arrived
        cy.contains('Order Reconciliation')
        cy.wait(10000)

        //Get text of unverified button text in Order Reconcilation page
        cy.xpath("//div[@id='reconciliation.unverified']")
          .invoke('text')
          .then((e1) => {
            var e2 = e1.split('$')
            var e3 = e2[1].split('.')
            var e4=e3[0].split(',').join('')
            cy.log('unverified_page ='+ e4)
        }).then(()=>{
            //Compare both counts
            if(unverified_page==unverified_text)
            {
                cy.log('Both the text executed succesfully')
            }
            else{
                assert.equal(unverified_page,unverified_text,'Count not matched')
               // expect(unverified_page).to.be.equal(unverified_text)
            }
        })



        //TEST CASE:4 user should get navigated to Order Reconciliation page and observe that Dropped - No Makegood $ count should be equal  to Dropped - No Makegood $ count on Reconciliation section on Mission Control page
        //(Verification) Verify that we arrived mission control page
        cy.go('back')
        cy.contains('Reconciliation', { log: false })
        cy.log('Reconciliation quadrate is visible in the dashboard')

        //Get the text on Dropped - No Makegood button
        cy.wait(5000)
        cy.xpath("//div[@class='reconciliation']//div[@class='ng-binding']")
            .eq(1)
            .invoke('text')
            .then((e1) => {
                var e2 = e1.split('$')
                var e3=e2[1].split(',').join('')
                cy.log('droped_noMakeGood_text = '+e3)
            })
        //Step 9: (Verification) Click on dropped No Make Good button and verify that Order Reconciliation page is reached
        cy.xpath("//div[@class='reconciliation']//div[@class='btnBig arrow butt2']")
            .click({ log: false })
            //(Verification) Verify that reached Reconciliation page
        cy.contains('Order Reconciliation')

        //Step 10:(Verification)Get the Text in dropped No Make Good in Order Reconciliation page and verify the count
        cy.wait(10000)
        cy.xpath("//div[@id='reconciliation.droppedNMGL']")
            .invoke('text')
            .then((e1) => {
                var e2 = e1.split('$')
                var e3 = e2[1].split('.')
                var e4=e3[0].split(',').join('')
                cy.log('droped_noMakeGood_page ='+ e4)
            }).then(()=>{
                if(droped_noMakeGood_page==droped_noMakeGood_text){
                cy.log('Both counts are equal')
                }
                else{
                    assert.equal(droped_noMakeGood_page,droped_noMakeGood_text,'Count not matched')
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
