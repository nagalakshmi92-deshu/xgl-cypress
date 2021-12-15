/// <reference types="cypress" />


import MissionControlPageObject from '../../../support/ObjectRepository/MissionControl/MissionControlPageObject'
import FinancePageObject from '../../../support/ObjectRepository/MissionControl/FinancePageObject'

describe('Verification of Mission control dashboard', () => {
    const mso = new MissionControlPageObject();
    const fpo = new FinancePageObject();
    //const expectv4 = require('chai').expect


    //Use the cy.fixture() method to pull data from fixture file
    before(function () {

    })

    beforeEach(() => {
        cy.fixture('missionControl.json').then(function (data) {
            this.data = data;

            cy.visit(this.data.Environment.baseURL).then(() => {
                cy.log('Entering Username')
                mso.locator_Login_Username().type(this.data.Environment.Username, { sensitive: true });
                cy.log('Entering  Password')
                mso.locator_Login_Password().type(this.data.Environment.Password, { sensitive: true });
                cy.log('Click on Login Button')
                mso.locator_Login_LoginButton().click({ log: false });
                cy.log('Sucess !!');
            })
        })
    })



    it('XGLT-6687 - Finance ', () => {
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
            mso.locator_Finance_records().click()
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
            cy.contains('Finance');
            cy.log('Clicked on save button successfully.')


            //Step 7: (Verify) Open Count 
            cy.wait(10000);
            fpo.locator_OpenCount().should('be.visible').invoke('text').then(($e1) => {
                this.OpenCount = $e1
                cy.log(' Open count is ' + this.OpenCount)
            })

            //Click over Open
            fpo.locator_Open_label().should('be.visible').trigger('mouseover').click();
            cy.log('Clicked on Open successfully! ')
            cy.contains('Total Billing Records')

            // verification of records count for Open
            cy.wait(10000);
            fpo.locator_Total_Billing_Records_labelCount().invoke('text').then(($e1) => {
                expect($e1.trim()).equal(this.OpenCount)
                this.openTBCount = $e1
                cy.log(' Open count is ' + this.openTBCount + 'is verified!')
            })
            cy.go(-1)



            //Step 8: (Verify) Prepared
            cy.wait(5000);
            fpo.locator_PreparedCount().should('be.visible').invoke('text').then(($e1) => {
                this.preparedCount = $e1
                cy.log(' Prepared build count is ' + this.preparedCount)
            })

            //Click over Prepared
            fpo.locator_Prepared_label().should('be.visible').trigger('mouseover').click();
            cy.log('Clicked on Prepared successfully! ')
            cy.contains('Total Billing Records')

            // verification of records count for Prepared
            cy.wait(10000)
            fpo.locator_Total_Billing_RecordsPrepared_labelCount().should('be.visible').invoke('text').then(($e1) => {
                expect($e1.trim()).equal(this.preparedCount)
                this.prepared_BCount = $e1
                cy.log(' Prepared build count is ' + this.prepared_BCount + 'is verified!')
            })
            cy.go(-1)


            //Step 9: (Verify) Submitted
            cy.wait(5000)
            fpo.locator_SubmittedCount().should('be.visible').invoke('text').then(($e1) => {
                this.submittedCount = $e1
                cy.log(' Submitted build count is ' + this.submittedCount)
            })

            //Click over Submitted
            fpo.locator_Submitted_label().should('be.visible').trigger('mouseover').click();
            cy.log('Clicked on Prepared successfully! ')
            cy.contains('Total Billing Records')

            // verification of records count for Prepared
            cy.wait(10000)
            fpo.locator_Total_Billing_RecordsSumitted_labelCount().should('be.visible').invoke('text').then(($e1) => {
                expect($e1.trim()).equal(this.preparedCount)
                this.prepared_BCount = $e1
                cy.log(' Prepared build count is ' + this.prepared_BCount + 'is verified!')
            })
            cy.go(-1)

            //Step 10 : Click on Monthly Billing Cycle redio button 
            cy.xpath('//div[@ng-repeat="item in buttonsArr"]', { log: false }).contains('Monthly Billing Cycle').click()
            cy.wait(5000)
            cy.screenshot()
            cy.log('successfully clicked on Custom dates redio buttons')

            //Step 11: (Verify) Open Count 
            cy.wait(10000);
            fpo.locator_OpenCount().should('be.visible').invoke('text').then(($e1) => {
                this.OpenCount = $e1
                cy.log(' Open count is ' + this.OpenCount)
            })

            //Click over Open
            fpo.locator_Open_label().should('be.visible').trigger('mouseover').click();
            cy.log('Clicked on Open successfully! ')
            cy.contains('Total Billing Records')

            // verification of records count for Open
            cy.wait(10000);
            fpo.locator_Total_Billing_Records_labelCount().invoke('text').then(($e1) => {
                expect($e1.trim()).equal(this.OpenCount)
                this.openTBCount = $e1
                cy.log(' Open count is ' + this.openTBCount + 'is verified!')
            })
            cy.go(-1)



            //Step 12: (Verify) Prepared
            cy.wait(5000);
            fpo.locator_PreparedCount().should('be.visible').invoke('text').then(($e1) => {
                this.preparedCount = $e1
                cy.log(' Prepared build count is ' + this.preparedCount)
            })

            //Click over Prepared
            fpo.locator_Prepared_label().should('be.visible').trigger('mouseover').click();
            cy.log('Clicked on Prepared successfully! ')
            cy.contains('Total Billing Records')

            // verification of records count for Prepared
            cy.wait(10000)
            fpo.locator_Total_Billing_RecordsPrepared_labelCount().should('be.visible').invoke('text').then(($e1) => {
                expect($e1.trim()).equal(this.preparedCount)
                this.prepared_BCount = $e1
                cy.log(' Prepared build count is ' + this.prepared_BCount + 'is verified!')
            })
            cy.go(-1)


            //Step 13: (Verify) Submitted
            cy.wait(5000)
            fpo.locator_SubmittedCount().should('be.visible').invoke('text').then(($e1) => {
                this.submittedCount = $e1
                cy.log(' Submitted build count is ' + this.submittedCount)
            })

            //Click over Submitted
            fpo.locator_Submitted_label().should('be.visible').trigger('mouseover').click();
            cy.log('Clicked on Prepared successfully! ')
            cy.contains('Total Billing Records')

            // verification of records count for Prepared
            cy.wait(10000)
            fpo.locator_Total_Billing_RecordsSumitted_labelCount().should('be.visible').invoke('text').then(($e1) => {
                expect($e1.trim()).equal(this.preparedCount)
                this.prepared_BCount = $e1
                cy.log(' Prepared build count is ' + this.prepared_BCount + 'is verified!')
            })
            cy.go(-1)


            //Step 14 : Click on End of Flight Billing Cycle redio button 
            cy.xpath('//div[@ng-repeat="item in buttonsArr"]', { log: false }).contains('End of Flight Billing Cycle').click()
            cy.wait(5000)
            cy.screenshot()
            cy.log('successfully clicked onEnd of Flight Billing Cycleredio buttons')

            //Step 15: (Verify) Open Count 
            cy.wait(10000);
            fpo.locator_OpenCount().should('be.visible').invoke('text').then(($e1) => {
                this.OpenCount = $e1
                cy.log(' Open count is ' + this.OpenCount)
            })

            //Click over Open
            fpo.locator_Open_label().should('be.visible').trigger('mouseover').click();
            cy.log('Clicked on Open successfully! ')
            cy.contains('Total Billing Records')

            // verification of records count for Open
            cy.wait(10000);
            fpo.locator_Total_Billing_Records_labelCount().invoke('text').then(($e1) => {
                expect($e1.trim()).equal(this.OpenCount)
                this.openTBCount = $e1
                cy.log(' Open count is ' + this.openTBCount + 'is verified!')
            })
            cy.go(-1)



            //Step 16: (Verify) Prepared
            cy.wait(5000);
            fpo.locator_PreparedCount().should('be.visible').invoke('text').then(($e1) => {
                this.preparedCount = $e1
                cy.log(' Prepared build count is ' + this.preparedCount)
            })

            //Click over Prepared
            fpo.locator_Prepared_label().should('be.visible').trigger('mouseover').click();
            cy.log('Clicked on Prepared successfully! ')
            cy.contains('Total Billing Records')

            // verification of records count for Prepared
            cy.wait(10000)
            fpo.locator_Total_Billing_RecordsPrepared_labelCount().should('be.visible').invoke('text').then(($e1) => {
                expect($e1.trim()).equal(this.preparedCount)
                this.prepared_BCount = $e1
                cy.log(' Prepared build count is ' + this.prepared_BCount + 'is verified!')
            })
            cy.go(-1)


            //Step 17: (Verify) Submitted
            cy.wait(5000)
            fpo.locator_SubmittedCount().should('be.visible').invoke('text').then(($e1) => {
                this.submittedCount = $e1
                cy.log(' Submitted build count is ' + this.submittedCount)
            })

            //Click over Submitted
            fpo.locator_Submitted_label().should('be.visible').trigger('mouseover').click();
            cy.log('Clicked on Prepared successfully! ')
            cy.contains('Total Billing Records')

            // verification of records count for Prepared
            cy.wait(10000)
            fpo.locator_Total_Billing_RecordsSumitted_labelCount().should('be.visible').invoke('text').then(($e1) => {
                expect($e1.trim()).equal(this.preparedCount)
                this.prepared_BCount = $e1
                cy.log(' Prepared build count is ' + this.prepared_BCount + 'is verified!')
            })
            cy.go(-1)




            //Step 18 : Click on Calendar Billing Cycle redio button 
            cy.xpath('//div[@ng-repeat="item in buttonsArr"]', { log: false }).contains('Calendar Billing Cycle').click()
            cy.wait(5000)
            cy.screenshot()
            cy.log('successfully clicked on Calendar Billing Cycle redio buttons')


            //Step 19: (Verify) Open Count 
            cy.wait(10000);
            fpo.locator_OpenCount().should('be.visible').invoke('text').then(($e1) => {
                this.OpenCount = $e1
                cy.log(' Open count is ' + this.OpenCount)
            })

            //Click over Open
            fpo.locator_Open_label().should('be.visible').trigger('mouseover').click();
            cy.log('Clicked on Open successfully! ')
            cy.contains('Total Billing Records')

            // verification of records count for Open
            cy.wait(10000);
            fpo.locator_Total_Billing_Records_labelCount().invoke('text').then(($e1) => {
                expect($e1.trim()).equal(this.OpenCount)
                this.openTBCount = $e1
                cy.log(' Open count is ' + this.openTBCount + 'is verified!')
            })
            cy.go(-1)



            //Step 20: (Verify) Prepared
            cy.wait(5000);
            fpo.locator_PreparedCount().should('be.visible').invoke('text').then(($e1) => {
                this.preparedCount = $e1
                cy.log(' Prepared build count is ' + this.preparedCount)
            })

            //Click over Prepared
            fpo.locator_Prepared_label().should('be.visible').trigger('mouseover').click();
            cy.log('Clicked on Prepared successfully! ')
            cy.contains('Total Billing Records')

            // verification of records count for Prepared
            cy.wait(10000)
            fpo.locator_Total_Billing_RecordsPrepared_labelCount().should('be.visible').invoke('text').then(($e1) => {
                expect($e1.trim()).equal(this.preparedCount)
                this.prepared_BCount = $e1
                cy.log(' Prepared build count is ' + this.prepared_BCount + 'is verified!')
            })
            cy.go(-1)


            //Step 21: (Verify) Submitted
            cy.wait(5000)
            fpo.locator_SubmittedCount().should('be.visible').invoke('text').then(($e1) => {
                this.submittedCount = $e1
                cy.log(' Submitted build count is ' + this.submittedCount)
            })

            //Click over Submitted
            fpo.locator_Submitted_label().should('be.visible').trigger('mouseover').click();
            cy.log('Clicked on Prepared successfully! ')
            cy.contains('Total Billing Records')

            // verification of records count for Prepared
            cy.wait(10000)
            fpo.locator_Total_Billing_RecordsSumitted_labelCount().should('be.visible').invoke('text').then(($e1) => {
                expect($e1.trim()).equal(this.preparedCount)
                this.prepared_BCount = $e1
                cy.log(' Prepared build count is ' + this.prepared_BCount + 'is verified!')
            })
            cy.go(-1)


            //Step 22 : Click on Shared Billing Id redio button 
            cy.xpath('//div[@ng-repeat="item in buttonsArr"]', { log: false }).contains('Shared Billing Id').click()
            cy.wait(5000)
            cy.screenshot()
            cy.log('successfully clicked on Shared Billing Id redio buttons')


            //Step 23: (Verify) Open Count 
            cy.wait(10000);
            fpo.locator_OpenCount().should('be.visible').invoke('text').then(($e1) => {
                this.OpenCount = $e1
                cy.log(' Open count is ' + this.OpenCount)
            })

            //Click over Open
            fpo.locator_Open_label().should('be.visible').trigger('mouseover').click();
            cy.log('Clicked on Open successfully! ')
            cy.contains('Total Billing Records')

            // verification of records count for Open
            cy.wait(10000);
            fpo.locator_Total_Billing_Records_labelCount().invoke('text').then(($e1) => {
                expect($e1.trim()).equal(this.OpenCount)
                this.openTBCount = $e1
                cy.log(' Open count is ' + this.openTBCount + 'is verified!')
            })
            cy.go(-1)



            //Step 24: (Verify) Prepared
            cy.wait(5000);
            fpo.locator_PreparedCount().should('be.visible').invoke('text').then(($e1) => {
                this.preparedCount = $e1
                cy.log(' Prepared build count is ' + this.preparedCount)
            })

            //Click over Prepared
            fpo.locator_Prepared_label().should('be.visible').trigger('mouseover').click();
            cy.log('Clicked on Prepared successfully! ')
            cy.contains('Total Billing Records')

            // verification of records count for Prepared
            cy.wait(10000)
            fpo.locator_Total_Billing_RecordsPrepared_labelCount().should('be.visible').invoke('text').then(($e1) => {
                expect($e1.trim()).equal(this.preparedCount)
                this.prepared_BCount = $e1
                cy.log(' Prepared build count is ' + this.prepared_BCount + 'is verified!')
            })
            cy.go(-1)


            //Step 25: (Verify) Submitted
            cy.wait(5000)
            fpo.locator_SubmittedCount().should('be.visible').invoke('text').then(($e1) => {
                this.submittedCount = $e1
                cy.log(' Submitted build count is ' + this.submittedCount)
            })

            //Click over Submitted
            fpo.locator_Submitted_label().should('be.visible').trigger('mouseover').click();
            cy.log('Clicked on Prepared successfully! ')
            cy.contains('Total Billing Records')

            // verification of records count for Prepared
            cy.wait(10000)
            fpo.locator_Total_Billing_RecordsSumitted_labelCount().should('be.visible').invoke('text').then(($e1) => {
                expect($e1.trim()).equal(this.preparedCount)
                this.prepared_BCount = $e1
                cy.log(' Prepared build count is ' + this.prepared_BCount + 'is verified!')
            })
            cy.go(-1)


            //Step 26 : Click on No Agency redio button 
            cy.xpath('//div[@ng-repeat="item in buttonsArr"]', { log: false }).contains('No Agency').click()
            cy.wait(5000)
            cy.screenshot()
            cy.log('successfully clicked onNo Agency redio buttons')


            //Step 27: (Verify) Open Count 
            cy.wait(10000);
            fpo.locator_OpenCount().should('be.visible').invoke('text').then(($e1) => {
                this.OpenCount = $e1
                cy.log(' Open count is ' + this.OpenCount)
            })

            //Click over Open
            fpo.locator_Open_label().should('be.visible').trigger('mouseover').click();
            cy.log('Clicked on Open successfully! ')
            cy.contains('Total Billing Records')

            // verification of records count for Open
            cy.wait(10000);
            fpo.locator_Total_Billing_Records_labelCount().invoke('text').then(($e1) => {
                expect($e1.trim()).equal(this.OpenCount)
                this.openTBCount = $e1
                cy.log(' Open count is ' + this.openTBCount + 'is verified!')
            })
            cy.go(-1)



            //Step 28: (Verify) Prepared
            cy.wait(5000);
            fpo.locator_PreparedCount().should('be.visible').invoke('text').then(($e1) => {
                this.preparedCount = $e1
                cy.log(' Prepared build count is ' + this.preparedCount)
            })

            //Click over Prepared
            fpo.locator_Prepared_label().should('be.visible').trigger('mouseover').click();
            cy.log('Clicked on Prepared successfully! ')
            cy.contains('Total Billing Records')

            // verification of records count for Prepared
            cy.wait(10000)
            fpo.locator_Total_Billing_RecordsPrepared_labelCount().should('be.visible').invoke('text').then(($e1) => {
                expect($e1.trim()).equal(this.preparedCount)
                this.prepared_BCount = $e1
                cy.log(' Prepared build count is ' + this.prepared_BCount + 'is verified!')
            })
            cy.go(-1)


            //Step 29: (Verify) Submitted
            cy.wait(5000)
            fpo.locator_SubmittedCount().should('be.visible').invoke('text').then(($e1) => {
                this.submittedCount = $e1
                cy.log(' Submitted build count is ' + this.submittedCount)
            })

            //Click over Submitted
            fpo.locator_Submitted_label().should('be.visible').trigger('mouseover').click();
            cy.log('Clicked on Prepared successfully! ')
            cy.contains('Total Billing Records')

            // verification of records count for Prepared
            cy.wait(10000)
            fpo.locator_Total_Billing_RecordsSumitted_labelCount().should('be.visible').invoke('text').then(($e1) => {
                expect($e1.trim()).equal(this.preparedCount)
                this.prepared_BCount = $e1
                cy.log(' Prepared build count is ' + this.prepared_BCount + 'is verified!')
            })
            cy.go(-1)
            cy.screenshot();







            //Step 11: Click on Setting Icon and make reset
            cy.wait(2000)
            mso.locator_SettingIcon().scrollIntoView()
            mso.locator_SettingIcon().should('be.visible').click({ force: true });
            cy.log('Clicked on Settings icon');
            mso.locator_MissionControlWidgetSettings().should('be.visible').then(($el) => {
                expect($el.text()).equals('Mission Control Widget Settings');
            })
            cy.log('Mission Control Widget Settings popup visible on screen')
            cy.screenshot();

            // Click on Save button
            mso.locator_button_reset().should('be.visible').click({ force: true });
            cy.contains('Ad Copy Handling');
            cy.log('Clicked on reset button successfully.')
        })

    })
})

