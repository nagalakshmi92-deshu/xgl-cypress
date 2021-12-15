/// <reference types="cypress-xpath"/>
import MissionControlPageObject from '../../../support/ObjectRepository/MissionControl/MissionControlPageObject'

describe('Verification of Ad copy status', () => {
    var missing_Ad_tom_text;
    var missing_Ad_tom_page;
    var missing_Ad_next7d_text;
    var missing_Ad_next7d_page;
    var adCopy_Pending_text;
    var adCopy_Pending_page;
    const mso = new MissionControlPageObject();
    before(function () {
        cy.fixture('missionControl.json').then(function (data) {
            this.data = data
            //LOGIN INTO APPLICATION
            cy.visit(this.data.Environment.baseURL).then(() => {
                cy.log('Entering Username')
                mso.locator_Login_Username().type(this.data.Environment.Username,{sensitive:true })
                cy.log('Entering  Password')
                mso.locator_Login_Password().type(this.data.Environment.Password,{sensitive:true })
                cy.log('Click on Login Button')
                mso.locator_Login_LoginButton().click({ log: false })
                cy.log('Sucess !!');
            })

        })
    })

    it('To verify the ad copy status details are visible', () => {

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
        mso.locator_Users().click({ force: true })
        cy.log('User is selected- 1st quadrate')

        mso.locator_SelectSecondArrow().click({ log: false })
        mso.locator_PA_records().click({ force: true }, { log: false })

        mso.locator_SelectThirdArrow().click({ log: false })
        mso.locator_Finance_records().click({ force: true }, { log: false })
                    
        mso.locator_SelectForthArrow().click({ log: false })
         mso.locator_SchedulingInformation().click({ force: true }, { log: false })


        //Step 4: Click on save button
        cy.log('check whether save button is enabled or not')
        mso.locator_button_Save()
            .should('not.be.disabled')
            .click({ force: true })
        cy.log('Clicked on Save button')

        //Test case:1
        //Step 5: (Verification) Validate Ad copy handling on Mission Control page
        cy.contains('Users').then(() => {
            if (cy.contains('Windows Active Directory')) {
                cy.log('Successfully! Users on Mission Control page is appear')
            }
            else {
                cy.log('Soory! something went wrong')
            }

        })

        // Click on Setting Icon and make reset
      
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