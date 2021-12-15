/// <reference types="cypress-xpath"/>
import MissionControlPageObject from '../../../support/ObjectRepository/MissionControl/MissionControlPageObject'

describe('Verification of Ad copy status', () => {
    var unplaced_ad_units_next1;
    var unplaced_ad_units_next2;
    var unplaced_ad_units_next3;
    var unplaced_ad_units_next4;
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

        cy.contains('Linear™', { timeout: 5000 })
        //Step 1: (Verification) landed on dashboed page
        cy.url().should('contain', '/MissionControl');
        cy.log('Successfully landed on dashboard');
        cy.screenshot();

        //Step 2: Click on Setting Icon 
        // mso.locator_SettingIcon().scrollIntoView({timeout:5000}).click();
        cy.wait(5000)
        cy.xpath("//div[@title='Configure view options']/button/i[@class='fa fa-cog']").scrollIntoView().click({ force: true })
        cy.log('Clicked on Settings icon');

        cy.log('Mission Control Widget Settings popup visible on screen')
        cy.screenshot();


        //Step 3: select 'ad copy status' in 1st Quadrant
        mso.locator_SelectFirstArrow().click()
        mso.locator_SchedulingInformation().click()
        cy.log('Scheduling Information is selected from setting widget')
        mso.locator_SelectSecondArrow().click({ log: false })
        mso.locator_DataGovernance_records().click({ force: true }, { log: false })

        mso.locator_SelectThirdArrow().click({ log: false })
        mso.locator_Finance_records().click({ force: true }, { log: false })
                    
        mso.locator_SelectForthArrow().click({ log: false })
         mso.locator_ACS_records().click({ force: true }, { log: false })


        //Step 4: Click on save button
        cy.log('check whether save button is enabled or not')
        mso.locator_button_Save()
            .should('not.be.disabled')
            .click({ force: true })
        cy.log('Clicked on Save button')

        //Test case:1 (Verification)Verify that Scheduling information section should appear on Mission Control page
        cy.xpath("//h2[text()='Scheduling Information']").should('contain', 'Scheduling Information')
        cy.log('Schedule Information is visible in the mission control page')

        //Test Case:2 (Verification)Verify the schedule information
        cy.xpath("//span[text()='Total Event List']").should('be.visible')
        cy.log('Total Event List is visible on the page')
        cy.xpath("//span[text()='Event Lists Created']").should('be.visible')
        cy.log('Event Lists Created is visible on the page')
        cy.xpath("//span[text()='Locked Schedules']").should('be.visible')
        cy.log('Locked Schedules is visible on the page')

        //Test case:3 (Verification) Verify to click on respective buttons of tomorrow and next 3 days
        //Step : tomorrow
        //Test case:4 (Verification) Verify to click on respective buttons displayed under Unplaced Ad units of tomorrow and next 3 days

        cy.wait(8000)
        cy.xpath("//div[@class='lineChart arrow btnBig ng-binding']").eq(0).invoke('text').then((e1) => {
             unplaced_ad_units_next1 = e1
            cy.log('unplaced_ad_units_next1=' + unplaced_ad_units_next1)
        })
        cy.xpath("//div[@class='lineChart arrow btnBig ng-binding']").eq(0).click()
        cy.url().should('contain', 'UnplaceAdUnitsViewer')
        cy.wait(10000)
        cy.xpath("//span[@class='total-units ng-binding']").should('be.visible').invoke('text').then((ee) => {
            cy.log('Unplaced ad units in page=' + ee)
            assert.equal(Number(ee), (Number(unplaced_ad_units_next1)))
        })



        cy.go('back')
        cy.wait(8000)
        cy.xpath("//div[@class='lineChart arrow btnBig ng-binding']").eq(1).invoke('text').then((e1) => {
            unplaced_ad_units_next2 = e1
            cy.log('unplaced_ad_units_next2=' + unplaced_ad_units_next2)
        })
        cy.xpath("//div[@class='lineChart arrow btnBig ng-binding']").eq(1).click()
        cy.url().should('contain', 'UnplaceAdUnitsViewer')
        cy.wait(10000)
        cy.xpath("//span[@class='total-units ng-binding']").should('be.visible').invoke('text').then((e1) => {
            cy.log('unplaced_ad_units_page=' + e1)
            assert.equal(Number(e1), (Number(unplaced_ad_units_next2)))
        })

        cy.go('back')
        cy.wait(8000)
        cy.xpath("//div[@class='lineChart arrow btnBig ng-binding']").eq(2).invoke('text').then((e1) => {
            unplaced_ad_units_next3 = e1
            cy.log('unplaced_ad_units_next3=' + unplaced_ad_units_next3)
        })
        cy.xpath("//div[@class='lineChart arrow btnBig ng-binding']").eq(2).click()
        cy.url().should('contain', 'UnplaceAdUnitsViewer')
        cy.wait(10000)
        cy.xpath("//span[@class='total-units ng-binding']").should('be.visible').invoke('text').then((e1) => {
            cy.log('unplaced_ad_units_page' + e1)
            assert.equal(Number(e1), (Number(unplaced_ad_units_next3)))
        })
        cy.go('back')
        cy.wait(8000)
        cy.xpath("//div[@class='lineChart arrow btnBig ng-binding']").eq(3).invoke('text').then((e1) => {
            unplaced_ad_units_next4 = e1
            cy.log('unplaced_ad_units_next3=' + unplaced_ad_units_next4)
        })
        cy.xpath("//div[@class='lineChart arrow btnBig ng-binding']").eq(3).click()
        cy.url().should('contain', 'UnplaceAdUnitsViewer')
        cy.wait(10000)
        cy.xpath("//span[@class='total-units ng-binding']").should('be.visible').invoke('text').then((e1) => {
            cy.log('unplaced_ad_units_page=' + e1)
            assert.equal(Number(e1), (Number(unplaced_ad_units_next4)))
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