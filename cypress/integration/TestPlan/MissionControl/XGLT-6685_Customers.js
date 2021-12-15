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
                mso.locator_Login_Username().type(this.data.Environment.Username, { sensitive: true });
                cy.log('Entering  Password')
                mso.locator_Login_Password().type(this.data.Environment.Password, { sensitive: true });
                cy.log('Click on Login Button')
                mso.locator_Login_LoginButton().click({ log: false });
                cy.log('Sucess !!');
            })
        })
    })



    it('XGLT-6685 Customers', () => {
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
            mso.locator_Customer_records().click()
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
            cy.contains('Programming/Allocation Jobs');
            cy.log('Clicked on save button successfully.')


            //Step 7: (Verify) Active with Revenue 
            cy.wait(2000)
            mso.locator_ActivewithRevenueCount().invoke('text').then(($e1) => {
                this.activeWithRevenueCount = $e1
                cy.log(' Active with Revenue count is ' + this.activeWithRevenueCount)
            })

            //Click over Active with Revenue
            mso.locator_ActivewithRevenue_label().trigger('mouseover').click();
            cy.log('Clicked on Active with Revenue successfully! ')
            cy.contains('Customers')

            // verification of records count for Active with Revenue
            cy.wait(10000)
            if (mso.locator_gridRecords().its('length').then((c1) => {
                this.activeRevenueCountFromTable = c1
                cy.log('Number of Active with Revenue records are = ' + this.activeRevenueCountFromTable);
                if (Number(this.activeRevenueCountFromTable) <= Number(this.activeWithRevenueCount)) {
                    cy.log('Getting records count matched' + this.activeRevenueCountFromTable)
                }
                else {
                    cy.log('sorry !  Active with Revenue count are not matched!!')
                    assert.notEqual(Number(this.activeRevenueCountFromTable), Number(this.activeWithRevenueCount), 'counts not matched')
                }
            }))
            if (mso.locator_NoItemToDisplay_label().contains('No Items to Display') || mso.locator_gridRecords().its('length').should('be.empty')) {
                mso.locator_NoItemToDisplay_label().then(($e2) => {
                    expect($e2.text()).equals('No Items to Display')
                    cy.log('No records are present')
                })

            }
                //Step 8: (Verify) Inactive
                cy.go(-1)
            cy.wait(2000)
            mso.locator_InactiveCount().invoke('text').then(($e1) => {
                this.inactiveCount = $e1
                cy.log(' inActive with count is ' + this.inactiveCount)
            })

            //Click over Inactive
            mso.locator_Inactive_label().trigger('mouseover').click();
            cy.log('Clicked on inActive successfully! ')
            cy.contains('Customers')

            // verification of records count for inactive
            //cy.LoaderDisappear()
            cy.wait(10000)
            if (mso.locator_gridRecords().its('length').then((c1) => {
                this.inactiveCountFromTable = c1
                cy.log('Number of inactive records are = ' + this.inactiveCountFromTable);
                if (Number(this.inactiveCountFromTable) <= Number(this.inactiveCount)) {
                    cy.log('Getting records count matched ' + this.inactiveCountFromTable)
                }
                else {
                    cy.log('sorry !  inActive count are not matched!!')
                    assert.notEqual(Number(this.inactiveCountFromTable), Number(this.inactiveCount), 'counts not matched')
                }

            }))
            if (mso.locator_NoItemToDisplay_label().contains('No Items to Display') || mso.locator_gridRecords().its('length').should('be.empty')) {
                mso.locator_NoItemToDisplay_label().then(($e2) => {
                    expect($e2.text()).equals('No Items to Display')
                    cy.log('No records are present')
                })

            }
                //Step 9: (Verify) Credit Hold
                cy.go(-1)
            cy.wait(2000)
            mso.locator_CreditHoldCount().invoke('text').then(($e1) => {
                this.creditHoldCount = $e1
                cy.log(' Credit Hold count is ' + this.creditHoldCount)
            })

            //Click over Credit hold
            mso.locator_CreditHold_label().trigger('mouseover').click();
            cy.log('Clicked on Credit hold successfully! ')
            cy.contains('Customers')

            // verification of records count forCredit hold
            cy.wait(10000)
            if (mso.locator_gridRecords().its('length').then((c1) => {
                this.creditHoldCountFromTable = c1
                cy.log('Number of Credit hold records are = ' + this.creditHoldCountFromTable);
                if (Number(this.creditHoldCountFromTable) <= Number(this.creditHoldCount)) {
                    cy.log('Getting records count matched ' + this.creditHoldCountFromTable)
                }
                else {
                    cy.log('sorry !  Credit hold  are not matched!!')
                    assert.notEqual(Number(this.creditHoldCountFromTable), Number(this.creditHoldCount), 'counts not matched')
                }
            }))
            if (mso.locator_NoItemToDisplay_label().contains('No Items to Display') || mso.locator_gridRecords().its('length').should('be.empty')) {
                mso.locator_NoItemToDisplay_label().then(($e2) => {
                    expect($e2.text()).equals('No Items to Display')
                    cy.log('No records are present')
                })

            }

                //Step 10: (Verify) Active without Revenue
                cy.go(-1)
            cy.wait(2000)
            mso.locator_ActiveWithoutRevenueCount().invoke('text').then(($e1) => {
                this.activewithoutRevenueCount = $e1
                cy.log(' Active without Revenue count is ' + this.activewithoutRevenueCount)
                this.activeWC = parseInt((this.activewithoutRevenueCount.replace(',', '')))
            })

            //Click over Active without Revenue
            mso.locator_ActiveWithoutRevenue_label().trigger('mouseover').click();
            cy.log('Clicked on Active without Revenue successfully! ')
            cy.contains('Customers');

            // verification of records count for Active without Revenue
            cy.wait(10000)
            if (mso.locator_gridRecords().its('length').then((c1) => {
                this.activewithoutRevenueCountFromTable = c1
                cy.log('Number of Active without Revenue records are = ' + this.activewithoutRevenueCountFromTable);
                if (Number(this.activewithoutRevenueCountFromTable) <= Number(this.activeWC)) {
                    cy.log('Getting records count matched' + this.activeWC)
                }
                else {
                    cy.log('sorry !  Active without Revenue count are not matched!!')
                    assert.notEqual(Number(this.activewithoutRevenueCountFromTable), Number(this.activewithoutRevenueCount), 'counts not matched');

                }
            }))
                if (mso.locator_NoItemToDisplay_label().contains('No Items to Display') || mso.locator_gridRecords().its('length').should('be.empty')) {
                    mso.locator_NoItemToDisplay_label().then(($e2) => {
                        expect($e2.text()).equals('No Items to Display')
                        cy.log('No records are present')
                    })

                }
            //Step 11: Click on Setting Icon and make reset
            cy.go(-1);
            cy.wait(2000);
            mso.locator_SettingIcon().scrollIntoView();
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
