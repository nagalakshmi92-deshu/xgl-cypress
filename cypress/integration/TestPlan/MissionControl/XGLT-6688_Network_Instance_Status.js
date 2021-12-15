/// <reference types="cypress" />



import MissionControlPageObject from '../../../support/ObjectRepository/MissionControl/MissionControlPageObject'
describe('Verification of Mission control dashboard', () => {
    const mso = new MissionControlPageObject();
    //const expectv4 = require('chai').expect


    //Use the cy.fixture() method to pull data from fixture file
    before(function () {

    })

    beforeEach(() => {
        cy.fixture('missionControl.json').then(function (data) {
            this.data = data;

            cy.visit(this.data.Environment.baseURL).then(() => {
                cy.log('Entering Username')
                mso.locator_Login_Username().type(this.data.Environment.Username,{ sensitive: true });
                cy.log('Entering  Password')
                mso.locator_Login_Password().type(this.data.Environment.Password,{ sensitive: true });
                cy.log('Click on Login Button')
                mso.locator_Login_LoginButton().click({ log: false });
                cy.log('Sucess !!');
            })
        })
    })



    it('XGLT-6688_Network_Instance_Status', () => {
        cy.fixture('missionControl.json').then(function (data) {
            this.data = data;

            //Step 1: (Verification) landed on dashboed page
            cy.url().should('contain', '/MissionControl');
            cy.log('Successfully landed on dashboard');
            cy.screenshot();


            //Step 2: Click on Setting Icon 
            mso.locator_SettingIcon().scrollIntoView()
            mso.locator_SettingIcon().click({ force: true });
            cy.log('Clicked on Settings icon');
            mso.locator_MissionControlWidgetSettings().then(($el) => {
                expect($el.text()).equals('Mission Control Widget Settings');
            })
            cy.log('Mission Control Widget Settings popup visible on screen')
            cy.screenshot();

            //Step 3: Click on arrow icon (First Quardant)
            mso.locator_SelectFirstArrow().click();
            cy.log('Clicked on firstQuadrant arrow button');
            mso.locator_Network_Instance_Status_records().click()
            cy.log('Selected - First Quardant');


            // Step 4:(Verification) Select Second Quardant 
            mso.locator_SelectSecondArrow().click();
            cy.log('Clicked on  Second Quardant arrow button');
            mso.locator_ACH_records().click()
            cy.log('Selected - Second Quardant');

            // Step 5:(Verification) Select Third Quardant 
            mso.locator_SelectThirdArrow().click();
            cy.log('Clicked on  Third Quardant arrow button');
            mso.locator_ACS_records().click()
            cy.log('Selected - Third Quardant');

            // Step 6:(Verification) Select forth Quardant 
            mso.locator_SelectForthArrow().click();
            cy.log('Clicked on  forth Quardant arrow button');
            mso.locator_PA_records().click()
            cy.log('Selected - forth Quardant');

            //  Click on Save button
            mso.locator_button_Save().click({ force: true });
            cy.contains('Network Instance Status');
            cy.log('Clicked on save button successfully.')


            //Step 7: (Verify) Pending Allocation
            cy.wait(5000)
            mso.locator_Pending_AllocationCount().invoke('text').then(($e1) => {
                this.pendingAllocationLabelCount = $e1
                cy.log(' Pending Allocation count is ' + this.pendingAllocationLabelCount)
            })

            //Click over Pending Allocation
            mso.locator_Pending_Allocation_label().trigger('mouseover').click();
            cy.log('Clicked on Pending Allocation successfully! ')
            cy.contains('Pending Allocation')

            // verification of records count for Pending Allocation
            cy.wait(5000)
            mso.locator_Pending_Allocation_labelCount().invoke('text').then(($e1) => {
                expect($e1.trim()).equal(this.pendingAllocationLabelCount)
                this.pending_AllocationCount = $e1
                cy.log(' Pending Allocation count is ' + this.pending_AllocationCount + 'is verified!')
            })
            cy.go(-1)
            cy.wait(2000)


            //Step 8: (Verify) Pending Build
            cy.wait(5000)
            mso.locator_Pending_BuildCount().invoke('text').then(($e1) => {
                this.pendingBuildCount = $e1
                cy.log(' Pending build count is ' + this.pendingBuildCount)
            })

            //Click over Pending Build
            mso.locator_Pending_Build_label().trigger('mouseover').click();
            cy.log('Clicked on Pending Build successfully! ')
            cy.contains('Pending Allocation')

            // verification of records count for Pending build
            cy.wait(5000)
            mso.locator_Pending_Build_labelCount().invoke('text').then(($e1) => {
                expect($e1.trim()).equal(this.pendingBuildCount)
                this.pending_BCount = $e1
                cy.log(' Pending build count is ' + this.pending_BCount + 'is verified!')
            })
            cy.go(-1)
            cy.wait(5000)

            //Step 9: (Verify) Empty
            cy.wait(5000)
            mso.locator_EmptyCount().invoke('text').then(($e1) => {
                this.emptyCount = $e1
                cy.log(' Empty count is ' + this.emptyCount)
            })

            //Click over Empty
            mso.locator_Empty_label().trigger('mouseover').click();
            cy.log('Clicked on Empty successfully! ')
            cy.contains('Pending Allocation')

            // verification of records count for Empty
            cy.wait(5000)
            mso.locator_Empty_labelCount().invoke('text').then(($e1) => {
                expect($e1.trim()).equal(this.emptyCount)
                this.empty_BCount = $e1
                cy.log(' Empty count is ' + this.empty_BCount + 'is verified!')
            })
            cy.go(-1)


            //Step 11 : Click on Next week redio button 
            cy.xpath('//div[@ng-repeat="item in buttonsArr"]').contains('Next 4 Weeks').click()
            cy.wait(2000)

            //Step 12: (Verify) Pending Allocation
            cy.wait(5000)
            mso.locator_Pending_AllocationCount().invoke('text').then(($e1) => {
                this.pendingAllocationLabelCount = $e1
                cy.log(' Pending Allocation count is ' + this.pendingAllocationLabelCount)
            })

            //Click over Pending Allocation
            mso.locator_Pending_Allocation_label().trigger('mouseover').click();
            cy.log('Clicked on Pending Allocation successfully! ')
            cy.contains('Pending Allocation')

            // verification of records count for Pending Allocation
            cy.wait(5000)
            mso.locator_Pending_Allocation_labelCount().invoke('text').then(($e1) => {
                expect($e1.trim()).equal(this.pendingAllocationLabelCount)
                this.pending_AllocationCount = $e1
                cy.log(' Pending Allocation count is ' + this.pending_AllocationCount + 'is verified!')
            })
            cy.go(-1)
            cy.wait(2000)


            //Step 13: (Verify) Pending Build
            cy.wait(5000)
            mso.locator_Pending_BuildCount().invoke('text').then(($e1) => {
                this.pendingBuildCount = $e1
                cy.log(' Pending build count is ' + this.pendingBuildCount)
            })

            //Click over Pending Build
            mso.locator_Pending_Build_label().trigger('mouseover').click();
            cy.log('Clicked on Pending Build successfully! ')
            cy.contains('Pending Allocation')

            // verification of records count for Pending build
            cy.wait(5000)
            mso.locator_Pending_Build_labelCount().invoke('text').then(($e1) => {
                expect($e1.trim()).equal(this.pendingBuildCount)
                this.pending_BCount = $e1
                cy.log(' Pending build count is ' + this.pending_BCount + 'is verified!')
            })
            cy.go(-1)
            cy.wait(5000)

            //Step 14: (Verify) Empty
            cy.wait(5000)
            mso.locator_EmptyCount().invoke('text').then(($e1) => {
                this.emptyCount = $e1
                cy.log(' Empty count is ' + this.emptyCount)
            })

            //Click over Empty
            mso.locator_Empty_label().trigger('mouseover').click();
            cy.log('Clicked on Empty successfully! ')
            cy.contains('Pending Allocation')

            // verification of records count for Empty
            cy.wait(5000)
            mso.locator_Empty_labelCount().invoke('text').then(($e1) => {
                expect($e1.trim()).equal(this.emptyCount)
                this.empty_BCount = $e1
                cy.log(' Empty count is ' + this.empty_BCount + 'is verified!')
            })
            cy.go(-1)



            //Step 15 : Click on Custom Dates redio button 
            cy.xpath('//div[@ng-repeat="item in buttonsArr"]', { log: false }).contains('Custom Dates').click()
            cy.wait(2000)
            cy.log('successfully clicked on Custom dates redio buttons')

            const currentdate3 = new Date().getDate();

            mso.locator_Date_StartDate().contains(currentdate3).click()
            mso.locator_Date_ThruDate().contains(currentdate3).click()
            cy.wait(1000)
            mso.locator_SaveDateButton().click({force:true})
            cy.log('Successfully clicked on Save button ')
            cy.wait(2000)


            //Step 12: (Verify) Pending Allocation
            cy.wait(5000)
            mso.locator_Pending_AllocationCount().invoke('text').then(($e1) => {
                this.pendingAllocationLabelCount = $e1
                cy.log(' Pending Allocation count is ' + this.pendingAllocationLabelCount)
            })

            //Click over Pending Allocation
            mso.locator_Pending_Allocation_label().trigger('mouseover').click();
            cy.log('Clicked on Pending Allocation successfully! ')
            cy.contains('Pending Allocation')

            // verification of records count for Pending Allocation
            cy.wait(5000)
            mso.locator_Pending_Allocation_labelCount().invoke('text').then(($e1) => {
                expect($e1.trim()).equal(this.pendingAllocationLabelCount)
                this.pending_AllocationCount = $e1
                cy.log(' Pending Allocation count is ' + this.pending_AllocationCount + 'is verified!')
            })
            cy.go(-1)
            cy.wait(2000)


            //Step 13: (Verify) Pending Build
            cy.wait(5000)
            mso.locator_Pending_BuildCount().invoke('text').then(($e1) => {
                this.pendingBuildCount = $e1
                cy.log(' Pending build count is ' + this.pendingBuildCount)
            })

            //Click over Pending Build
            mso.locator_Pending_Build_label().trigger('mouseover').click();
            cy.log('Clicked on Pending Build successfully! ')
            cy.contains('Pending Allocation')

            // verification of records count for Pending build
            cy.wait(5000)
            mso.locator_Pending_Build_labelCount().invoke('text').then(($e1) => {
                expect($e1.trim()).equal(this.pendingBuildCount)
                this.pending_BCount = $e1
                cy.log(' Pending build count is ' + this.pending_BCount + 'is verified!')
            })
            cy.go(-1)
            cy.wait(5000)

            //Step 14: (Verify) Empty
            cy.wait(5000)
            mso.locator_EmptyCount().invoke('text').then(($e1) => {
                this.emptyCount = $e1
                cy.log(' Empty count is ' + this.emptyCount)
            })

            //Click over Empty
            mso.locator_Empty_label().trigger('mouseover').click();
            cy.log('Clicked on Empty successfully! ')
            cy.contains('Pending Allocation')

            // verification of records count for Empty
            cy.wait(5000)
            mso.locator_Empty_labelCount().invoke('text').then(($e1) => {
                expect($e1.trim()).equal(this.emptyCount)
                this.empty_BCount = $e1
                cy.log(' Empty count is ' + this.empty_BCount + 'is verified!')
            })
            cy.go(-1)

            //Step 11: Click on Setting Icon and make reset
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
})

