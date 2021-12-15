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

    it('XGLT-6690 - Programming and Allocation', () => {

        cy.fixture('missionControl.json').then(function (data) {
            this.data = data;

            //Step 1: (Verification) landed on dashboed page
            cy.url().should('contain', '/MissionControl');
            cy.log('Successfully landed on dashboard');
            cy.screenshot();


            //Step 2: Click on Setting Icon 
            mso.locator_SettingIcon().scrollIntoView()
            mso.locator_SettingIcon().click();
            cy.log('Clicked on Settings icon');
            mso.locator_MissionControlWidgetSettings().then(($el) => {
                expect($el.text()).equals('Mission Control Widget Settings');
            })
            cy.log('Mission Control Widget Settings popup visible on screen')
            cy.screenshot();

            //Step 3: Click on arrow icon (First Quardant)
            mso.locator_SelectFirstArrow().click();
            cy.log('Clicked on firstQuadrant arrow button');
            mso.locator_PA_records().click()
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
            mso.locator_Customer_records().click()
            cy.log('Selected - forth Quardant');

            //  Click on Save button
            mso.locator_button_Save().click({ force: true });
            cy.contains('Programming/Allocation Jobs');
            cy.log('Clicked on save button successfully.')


            //Step 6: verify count over bar (Build Inventory )
            cy.wait(2000)
            mso.locator_BuildInventoryCount().invoke('text').then(($e1) => {
                this.text_countBI = $e1
                cy.log('Number of records found on screen ', this.text_countBI)

            })

            // Click over Build Inventory 
            mso.locator_BuildInventory_label().contains(' Build Inventory ').trigger('mouseover');
            cy.contains(' Build Inventory ').click();
            cy.log('Clicked on  Build Inventory successfully! ')
            cy.contains('Build Inventory Jobs')


            // verification of records count for Build Inventory
            
            if (mso.locator_NoItemToDisplay_label().contains('No Items to Display') || mso.locator_gridRecords().its('length').should('be.empty')) {
                mso.locator_NoItemToDisplay_label().then(($e2) => {
                    expect($e2.text()).equals('No Items to Display')
                    cy.log('No records are present')
                })

            } else {
                mso.locator_gridRecords().its('length').then((c1) => {
                    this.buildInventoryCountFromTable = c1
                    cy.log('Number of build Inventory records are = ' + this.buildInventoryCountFromTable);
                    if (Number(this.buildInventoryCountFromTable) <= Number(this.text_countBI)) {
                        cy.log('both are equal')
                    }
                    else { cy.log('sorry ! Build Inventory records count are not matched!!') }
                })


            }

            //Clicked on 'x' icon 
            mso.locator_closeIcon().click()
            cy.contains('Programming/Allocation Jobs')

            //Step 7: verify count over bar ( Allocate Inventory  )
            cy.wait(2000)
            mso.locator_AllocateInventoryCount().invoke('text').then(($e1) => {
                this.text_countAI = $e1
                cy.log('Number of Allocate Inventory records found on screen ', this.text_countAI)

            })

            // Click over Allocate Inventory 
            mso.locator_AllocateInventory_label().contains(' Allocate Inventory ').trigger('mouseover');
            cy.contains(' Allocate Inventory ').click();
            cy.log('Clicked on Allocate Inventory successfully! ')
            cy.contains('Allocate Inventory Jobs')

            // verification of records count for Allocate Inventory Jobs
            if (mso.locator_NoItemToDisplay_label().contains('No Items to Display') || mso.locator_gridRecords().its('length').should('be.empty')) {
                mso.locator_NoItemToDisplay_label().then(($e2) => {
                    expect($e2.text()).equals('No Items to Display')
                    cy.log('No records are present')
                })
            } else {
                mso.locator_gridRecords().its('length').then((c1) => {
                    this.allocateInventoryJobsCountFromTable = c1
                    cy.log('Number of  Allocate Inventory Jobs records are = ' + this.allocateInventoryJobsCountFromTable);
                    if (Number(this.allocateInventoryJobsCountFromTable) <= Number(this.text_countAI)) {
                        cy.log('both are equal')
                    }
                    else { cy.log('sorry ! Allocate Inventory Jobs count are not matched!!') }
                })

            }

            //Clicked on 'x' icon 
            mso.locator_closeIcon().click()
            cy.contains('Programming/Allocation Jobs')

            //Step 8: verify count over bar (  Network Programming Import   )
            cy.wait(2000)
            mso.locator_NetworkProgrammingCount().invoke('text').then(($e1) => {
                this.text_countNPI = $e1
                cy.log('Number of  Network Programming Import records found on screen ', this.text_countNPI)

            })

            // Click over  Network Programming Import  
            mso.locator_NetworkProgramming_label().contains(' Network Programming Import ').trigger('mouseover');
            cy.contains(' Network Programming Import ').click();
            cy.log('Clicked on  Network Programming Import successfully! ')
            cy.contains('Network Programming Import Jobs')

            // verification of records count for Network Programming Import Jobs
            if (mso.locator_NoItemToDisplay_label().contains('No Items to Display') || mso.locator_gridRecords().its('length').should('be.empty')) {
                mso.locator_NoItemToDisplay_label().then(($e2) => {
                    expect($e2.text()).equals('No Items to Display')
                    cy.log('No records are present')
                })
            } else {
                mso.locator_gridRecords().its('length').then((c1) => {
                    this.networkProgrammingImportJobsCountFromTable = c1
                    cy.log('Number of Network Programming Import records are = ' + this.networkProgrammingImportJobsCountFromTable);

                    if (Number(this.networkProgrammingImportJobsCountFromTable) <= Number(this.text_countNPI)) {
                        cy.log('both are equal')
                    }
                    else { cy.log('sorry ! Network Programming Import Jobs count are not matched!!') }


                })
            }

            //Clicked on 'x' icon 
            mso.locator_closeIcon().click()
            cy.contains('Programming/Allocation Jobs')

            //Step 9: verify count over bar (   SFO Import   )
            cy.wait(2000)
            mso.locator_SFOImportCount().invoke('text').then(($e1) => {
                this.text_countSFI = $e1
                cy.log('Number of SFO Import records found on screen ', this.text_countSFI)

            })

            // Click over SFO Import  
            mso.locator_SFOImport_label().contains(' SFO Import ').trigger('mouseover');
            cy.contains(' SFO Import ').click();
            cy.log('Clicked on  SFO Import successfully! ')
            cy.contains('SFO Import Jobs')

            // verification of records count for  SFO Import Jobs
            if (mso.locator_NoItemToDisplay_label().contains('No Items to Display') || mso.locator_gridRecords().its('length').should('be.empty')) {
                mso.locator_NoItemToDisplay_label().then(($e2) => {
                    expect($e2.text()).equals('No Items to Display')
                    cy.log('No records are present')
                })
            } else {
                mso.locator_gridRecords().its('length').then((c1) => {
                    this.sFOImportJobsCountFromTable = c1
                    cy.log('Number of SFO Import records are = ' + this.sFOImportJobsCountFromTable);

                    if (Number(this.sFOImportJobsCountFromTable) <= Number(this.text_countSFI)) {
                        cy.log('both are equal')
                    }
                    else { cy.log('sorry ! SFO Import Jobs count are not matched!!') }


                })
            }

            //Clicked on 'x' icon 
            mso.locator_closeIcon().click()
            cy.contains('Programming/Allocation Jobs')

            //Step 10: Click on Setting Icon and make reset

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







