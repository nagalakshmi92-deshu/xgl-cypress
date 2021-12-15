/// <reference types="cypress" />


import MissionControlPageObject from '../../../support/ObjectRepository/MissionControl/MissionControlPageObject'
import DataGovernancePageObject from '../../../support/ObjectRepository/MissionControl/DataGovernancePageObject'
describe('Verification of Mission control dashboard', () => {
    const mso = new MissionControlPageObject();
    const dpo = new DataGovernancePageObject();
   // const expectv4 = require('chai').expect


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
                mso.locator_Login_Password().type(this.data.Environment.Password,{ sensitive: true });
                cy.log('Click on Login Button')
                mso.locator_Login_LoginButton().click({ log: false });
                cy.log('Sucess !!');
            })
        })
    })


    it('XGLT-6686 - Data Governance', () => {
        cy.fixture('missionControl.json').then(function (data) {
            this.data = data;

            //Step 1: (Verification) landed on dashboed page
            cy.url().should('contain', '/MissionControl');
            cy.log('Successfully landed on dashboard');
            cy.screenshot();


            //Step 2: Click on Setting Icon 
            mso.locator_SettingIcon().should('be.visible').click();
            cy.log('Clicked on Settings icon');
            mso.locator_MissionControlWidgetSettings().then(($el) => {
                expect($el.text()).equals('Mission Control Widget Settings');
            })
            cy.log('Mission Control Widget Settings popup visible on screen')
            cy.screenshot();

            //Step 3: Click on arrow icon (First Quardant)
            mso.locator_SelectFirstArrow().click();
            cy.log('Clicked on firstQuadrant arrow button');
            mso.locator_DataGovernance_records().click()
            cy.log('Selected - First Quardant - Data Governance');


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

            // Step 7 : Click on Save button
            mso.locator_button_Save().click({ force: true });
            cy.contains('Insertion Changes');
            cy.log('Clicked on save button successfully.')

            //Step 8 :(Verification) dashboard updated 
            cy.contains('Insertion Changes');
            cy.log('Dashboard Updated successfully!')

            //Step 9: verify count Activation Headed
            cy.wait(2000)
            dpo.locator_HeadendCount().invoke('text').then(($e1) => {
                this.ActHC_count = $e1
                cy.log('Number of  count Activation records found on screen ', this.ActHC_count)
            })

            // Click over Activation  
            dpo.locator_Headend_label().should('be.visible').click()
            cy.contains('Utilities')
            cy.log('Clicked on Activation Headend successfully! ')

            // verification of records count for Activation headed
            cy.wait(5000)
            if (mso.locator_NoItemToDisplay_label().contains('No Items to Display') || mso.locator_gridRecords().its('length').should('be.empty')) {
                mso.locator_NoItemToDisplay_label().then(($e2) => {
                    expect($e2.text()).equals('No Items to Display')
                    cy.log('No records are present')
                })
            } else {
                mso.locator_gridRecords().its('length').then((c1) => {
                    this.activationHeadedCountFromTable = c1
                    cy.log('Number of Activation headed records are = ' + this.activationHeadedCountFromTable);
                    if (Number(this.activationHeadedCountFromTable) <= Number(this.ActHC_count)) {
                        cy.log('both are equal')
                    }
                    else { cy.log('sorry ! Activation headed  records count are not matched!!') }
                })

            }

            //Step 10: verify count Activation Network
            cy.go(-1)
            cy.wait(2000)
            dpo.locator_NetworkCount().invoke('text').then(($e1) => {
                this.ActNC_count = $e1
                cy.log('Number of count Activation Network records found on screen ', this.ActNC_count)
            })

            // Click over Activation Network
            dpo.locator_Network_label().should('be.visible').click()
            cy.contains('Utilities')
            cy.log('Clicked on Activation Network successfully! ')

            // verification of records count for Activation headed
            cy.wait(5000)
            if (mso.locator_NoItemToDisplay_label().contains('No Items to Display') || mso.locator_gridRecords().its('length').should('be.empty')) {
                mso.locator_NoItemToDisplay_label().then(($e2) => {
                    expect($e2.text()).equals('No Items to Display')
                    cy.log('No records are present')
                })
            } else {
                mso.locator_gridRecords().its('length').then((c1) => {
                    this.activationNetworkCountFromTable = c1
                    cy.log('Number of Activation network records are = ' + this.activationNetworkCountFromTable);
                    if (Number(this.activationNetworkCountFromTable) <= Number(this.ActNC_count)) {
                        cy.log('both are equal')
                    }
                    else { cy.log('sorry ! Activation network  records count are not matched!!') }
                })

            }


            //Step 11: verify count Deactivation Headed
            cy.go(-1)
            cy.wait(2000)
            dpo.locator_Dec_Headend_Count().invoke('text').then(($e1) => {
                this.DeacHC_count = $e1
                cy.log('Number of count Deactivation records found on screen ', this.DeacHC_count)
            })

            // Click over Deactivation headed
            dpo.locator_Dec_Headend_label().should('be.visible').click()
            cy.contains('Utilities')
            cy.log('Clicked on Deactivation Headend successfully! ')

            // verification of records count for Deactivation headed
            cy.wait(5000)
            if (mso.locator_NoItemToDisplay_label().contains('No Items to Display') || mso.locator_gridRecords().its('length').should('be.empty')) {
                mso.locator_NoItemToDisplay_label().then(($e2) => {
                    expect($e2.text()).equals('No Items to Display')
                    cy.log('No records are present')
                })
            } else {
                mso.locator_gridRecords().its('length').then((c1) => {
                    this.deactivationHeadedCountFromTable = c1
                    cy.log('Number of Deactivation headed records are = ' + this.deactivationHeadedCountFromTable);
                    if (Number(this.deactivationHeadedCountFromTable) <= Number(this.DeacHC_count)) {
                        cy.log('both are equal')
                    }
                    else { cy.log('sorry ! Deactivation headed  records count are not matched!!') }
                })

            }

            //Step 12: verify count Deactivation Network
            cy.go(-1)
            cy.wait(2000)
            dpo.locator_Dec_Network_Count().invoke('text').then(($e1) => {
                this.deacNC_count = $e1
                cy.log('Number of count Deactivation Network records found on screen ', this.deacNC_count)
            })

            // Click over Deactivation Network
            dpo.locator_Dec_Network_label().should('be.visible').click()
            cy.contains('Utilities')
            cy.log('Clicked on Deactivation Network successfully! ')

            // verification of records count for Deactivation Network
            cy.wait(5000)
            if (mso.locator_NoItemToDisplay_label().contains('No Items to Display') || mso.locator_gridRecords().its('length').should('be.empty')) {
                mso.locator_NoItemToDisplay_label().then(($e2) => {
                    expect($e2.text()).equals('No Items to Display')
                    cy.log('No records are present')
                })
            } else {
                mso.locator_gridRecords().its('length').then((c1) => {
                    this.deactivationNetworkCountFromTable = c1
                    cy.log('Number of Activation network records are = ' + this.deactivationNetworkCountFromTable);
                    if (Number(this.deactivationNetworkCountFromTable) <= Number(this.deacNC_count)) {
                        cy.log('both are equal')
                    }
                    else { cy.log('sorry ! Deactivation network  records count are not matched!!') }
                })

            }

            //-----------------------------****-----------------------//
            //Step 13: verify count Name/Code Changes Headed
            cy.go(-1)
            cy.wait(2000)
            dpo.locator_NC_Headend_Count().invoke('text').then(($e1) => {
                this.nC_count = $e1
                cy.log('Number of count  Name/Code Change records found on screen ', this.nC_count)
            })

            // Click over  count Name/Code headed
            dpo.locator_NC_Headend_label().should('be.visible').click()
            cy.contains('Utilities')
            cy.log('Clicked on  Name/Code Headend successfully! ')

            // verification of records count for  Name/Code  headed
            cy.wait(5000)
            if (mso.locator_NoItemToDisplay_label().contains('No Items to Display') || mso.locator_gridRecords().its('length').should('be.empty')) {
                mso.locator_NoItemToDisplay_label().then(($e2) => {
                    expect($e2.text()).equals('No Items to Display')
                    cy.log('No records are present')
                })
            } else {
                mso.locator_gridRecords().its('length').then((c1) => {
                    this.nCHeadedCountFromTable = c1
                    cy.log('Number of name/code headed records are = ' + this.nCHeadedCountFromTable);
                    if (Number(this.nCHeadedCountFromTable) <= Number(this.nC_count)) {
                        cy.log('both are equal')
                    }
                    else { cy.log('sorry ! Name/Code  headed  records count are not matched!!') }
                })

            }

            //Step 12: verify count  Name/Code  Network
            cy.go(-1)
            cy.wait(2000)
            dpo.locator_NC_Network_Count().invoke('text').then(($e1) => {
                this.ncNetwork_count = $e1
                cy.log('Number of count  Name/Code  Network records found on screen ', this.ncNetwork_count)
            })

            // Click over  Name/Code  Network
            dpo.locator_NC_Network_label().should('be.visible').click()
            cy.contains('Utilities')
            cy.log('Clicked on  Name/Code  Network successfully! ')

            // verification of records count for  Name/Code  Network
            cy.wait(5000)
            if (mso.locator_NoItemToDisplay_label().contains('No Items to Display') || mso.locator_gridRecords().its('length').should('be.empty')) {
                mso.locator_NoItemToDisplay_label().then(($e2) => {
                    expect($e2.text()).equals('No Items to Display')
                    cy.log('No records are present')
                })
            } else {
                mso.locator_gridRecords().its('length').then((c1) => {
                    this.nCNetworkCountFromTable = c1
                    cy.log('Number of name/code network records are = ' + this.nCNetworkCountFromTable);
                    if (Number(this.nCNetworkCountFromTable) <= Number(this.ncNetwork_count)) {
                        cy.log('both are equal')
                    }
                    else { cy.log('sorry !  Name/Code  network  records count are not matched!!') }
                })

            }

            // Step 13 :(Verify) for Past Month button
            cy.go(-1)
            cy.xpath('//div[@ng-repeat="item in buttonsArr"]', { log: false }).contains('Past Month').click()
            cy.wait(5000)
            cy.screenshot()
            cy.log('successfully clicked onNo Past Month buttons')

            //---------**
            //verify count Activation Headed
            cy.wait(2000)
            dpo.locator_HeadendCount().invoke('text').then(($e1) => {
                this.ActHC_count = $e1
                cy.log('Number of  count Activation records found on screen ', this.ActHC_count)
            })

            // Click over Activation  
            dpo.locator_Headend_label().should('be.visible').click()
            cy.contains('Utilities')
            cy.log('Clicked on Activation Headend successfully! ')

            // verification of records count for Activation headed
            cy.wait(5000)
            if (mso.locator_NoItemToDisplay_label().contains('No Items to Display') || mso.locator_gridRecords().its('length').should('be.empty')) {
                mso.locator_NoItemToDisplay_label().then(($e2) => {
                    expect($e2.text()).equals('No Items to Display')
                    cy.log('No records are present')
                })
            } else {
                mso.locator_gridRecords().its('length').then((c1) => {
                    this.activationHeadedCountFromTable = c1
                    cy.log('Number of Activation headed records are = ' + this.activationHeadedCountFromTable);
                    if (Number(this.activationHeadedCountFromTable) <= Number(this.ActHC_count)) {
                        cy.log('both are equal')
                    }
                    else { cy.log('sorry ! Activation headed  records count are not matched!!') }
                })

            }

            //Step 10: verify count Activation Network
            cy.go(-1)
            cy.wait(2000)
            cy.xpath('//div[@ng-repeat="item in buttonsArr"]', { log: false }).contains('Past Month').click()
            cy.wait(5000)
            dpo.locator_NetworkCount().invoke('text').then(($e1) => {
                this.ActNC_count = $e1
                cy.log('Number of count Activation Network records found on screen ', this.ActNC_count)
            })

            // Click over Activation Network
            dpo.locator_Network_label().should('be.visible').click()
            cy.contains('Utilities')
            cy.log('Clicked on Activation Network successfully! ')

            // verification of records count for Activation headed
            cy.wait(5000)
            if (mso.locator_NoItemToDisplay_label().contains('No Items to Display') || mso.locator_gridRecords().its('length').should('be.empty')) {
                mso.locator_NoItemToDisplay_label().then(($e2) => {
                    expect($e2.text()).equals('No Items to Display')
                    cy.log('No records are present')
                })
            } else {
                mso.locator_gridRecords().its('length').then((c1) => {
                    this.activationNetworkCountFromTable = c1
                    cy.log('Number of Activation network records are = ' + this.activationNetworkCountFromTable);
                    if (Number(this.activationNetworkCountFromTable) <= Number(this.ActNC_count)) {
                        cy.log('both are equal')
                    }
                    else { cy.log('sorry ! Activation network  records count are not matched!!') }
                })

            }


            //Step 11: verify count Deactivation Headed
            cy.go(-1)
            cy.wait(2000)
            cy.xpath('//div[@ng-repeat="item in buttonsArr"]', { log: false }).contains('Past Month').click()
            cy.wait(5000)
            dpo.locator_Dec_Headend_Count().invoke('text').then(($e1) => {
                this.DeacHC_count = $e1
                cy.log('Number of count Deactivation records found on screen ', this.DeacHC_count)
            })

            // Click over Deactivation headed
            dpo.locator_Dec_Headend_label().should('be.visible').click()
            cy.contains('Utilities')
            cy.log('Clicked on Deactivation Headend successfully! ')

            // verification of records count for Deactivation headed
            cy.wait(5000)
            if (mso.locator_NoItemToDisplay_label().contains('No Items to Display') || mso.locator_gridRecords().its('length').should('be.empty')) {
                mso.locator_NoItemToDisplay_label().then(($e2) => {
                    expect($e2.text()).equals('No Items to Display')
                    cy.log('No records are present')
                })
            } else {
                mso.locator_gridRecords().its('length').then((c1) => {
                    this.deactivationHeadedCountFromTable = c1
                    cy.log('Number of Deactivation headed records are = ' + this.deactivationHeadedCountFromTable);
                    if (Number(this.deactivationHeadedCountFromTable) <= Number(this.DeacHC_count)) {
                        cy.log('both are equal')
                    }
                    else { cy.log('sorry ! Deactivation headed  records count are not matched!!') }
                })

            }

            //Step 12: verify count Deactivation Network
            cy.go(-1)
            cy.wait(2000)
            cy.xpath('//div[@ng-repeat="item in buttonsArr"]', { log: false }).contains('Past Month').click()
            cy.wait(5000)
            dpo.locator_Dec_Network_Count().invoke('text').then(($e1) => {
                this.deacNC_count = $e1
                cy.log('Number of count Deactivation Network records found on screen ', this.deacNC_count)
            })

            // Click over Deactivation Network
            dpo.locator_Dec_Network_label().should('be.visible').click()
            cy.contains('Utilities')
            cy.log('Clicked on Deactivation Network successfully! ')

            // verification of records count for Deactivation Network
            cy.wait(5000)
            if (mso.locator_NoItemToDisplay_label().contains('No Items to Display') || mso.locator_gridRecords().its('length').should('be.empty')) {
                mso.locator_NoItemToDisplay_label().then(($e2) => {
                    expect($e2.text()).equals('No Items to Display')
                    cy.log('No records are present')
                })
            } else {
                mso.locator_gridRecords().its('length').then((c1) => {
                    this.deactivationNetworkCountFromTable = c1
                    cy.log('Number of Activation network records are = ' + this.deactivationNetworkCountFromTable);
                    if (Number(this.deactivationNetworkCountFromTable) <= Number(this.deacNC_count)) {
                        cy.log('both are equal')
                    }
                    else { cy.log('sorry ! Deactivation network  records count are not matched!!') }
                })

            }

            //-----------------------------****-----------------------//
            //Step 13: verify count Name/Code Changes Headed
            cy.go(-1)
            cy.wait(2000)
            cy.xpath('//div[@ng-repeat="item in buttonsArr"]', { log: false }).contains('Past Month').click()
            cy.wait(5000)
            dpo.locator_NC_Headend_Count().invoke('text').then(($e1) => {
                this.nC_count = $e1
                cy.log('Number of count  Name/Code Change records found on screen ', this.nC_count)
            })

            // Click over  count Name/Code headed
            dpo.locator_NC_Headend_label().should('be.visible').click()
            cy.contains('Utilities')
            cy.log('Clicked on  Name/Code Headend successfully! ')

            // verification of records count for  Name/Code  headed
            cy.wait(5000)
            if (mso.locator_NoItemToDisplay_label().contains('No Items to Display') || mso.locator_gridRecords().its('length').should('be.empty')) {
                mso.locator_NoItemToDisplay_label().then(($e2) => {
                    expect($e2.text()).equals('No Items to Display')
                    cy.log('No records are present')
                })
            } else {
                mso.locator_gridRecords().its('length').then((c1) => {
                    this.nCHeadedCountFromTable = c1
                    cy.log('Number of name/code headed records are = ' + this.nCHeadedCountFromTable);
                    if (Number(this.nCHeadedCountFromTable) <= Number(this.nC_count)) {
                        cy.log('both are equal')
                    }
                    else { cy.log('sorry ! Name/Code  headed  records count are not matched!!') }
                })

            }

            //Step 12: verify count  Name/Code  Network
            cy.go(-1)
            cy.wait(2000)
            cy.xpath('//div[@ng-repeat="item in buttonsArr"]', { log: false }).contains('Past Month').click()
            cy.wait(5000)
            dpo.locator_NC_Network_Count().invoke('text').then(($e1) => {
                this.ncNetwork_count = $e1
                cy.log('Number of count  Name/Code  Network records found on screen ', this.ncNetwork_count)
            })

            // Click over  Name/Code  Network
            dpo.locator_NC_Network_label().should('be.visible').click()
            cy.contains('Utilities')
            cy.log('Clicked on  Name/Code  Network successfully! ')

            // verification of records count for  Name/Code  Network
            cy.wait(5000)
            if (mso.locator_NoItemToDisplay_label().contains('No Items to Display') || mso.locator_gridRecords().its('length').should('be.empty')) {
                mso.locator_NoItemToDisplay_label().then(($e2) => {
                    expect($e2.text()).equals('No Items to Display')
                    cy.log('No records are present')
                })
            } else {
                mso.locator_gridRecords().its('length').then((c1) => {
                    this.nCNetworkCountFromTable = c1
                    cy.log('Number of name/code network records are = ' + this.nCNetworkCountFromTable);
                    if (Number(this.nCNetworkCountFromTable) <= Number(this.ncNetwork_count)) {
                        cy.log('both are equal')
                    }
                    else { cy.log('sorry !  Name/Code  network  records count are not matched!!') }
                })

            }
            //---------**
            // Step 14 :(Verify) for Past Year button
            cy.go(-1)
            cy.xpath('//div[@ng-repeat="item in buttonsArr"]', { log: false }).contains('Past Year').click()
            cy.wait(5000)
            cy.screenshot()
            cy.log('successfully clicked onNo Past Year buttons')
            //--------------------**
            //Step 9: verify count Activation Headed
            cy.wait(2000)
            dpo.locator_HeadendCount().invoke('text').then(($e1) => {
                this.ActHC_count = $e1
                cy.log('Number of  count Activation records found on screen ', this.ActHC_count)
            })

            // Click over Activation  
            dpo.locator_Headend_label().should('be.visible').click()
            cy.contains('Utilities')
            cy.log('Clicked on Activation Headend successfully! ')

            // verification of records count for Activation headed
            cy.wait(5000)
            if (mso.locator_NoItemToDisplay_label().contains('No Items to Display') || mso.locator_gridRecords().its('length').should('be.empty')) {
                mso.locator_NoItemToDisplay_label().then(($e2) => {
                    expect($e2.text()).equals('No Items to Display')
                    cy.log('No records are present')
                })
            } else {
                mso.locator_gridRecords().its('length').then((c1) => {
                    this.activationHeadedCountFromTable = c1
                    cy.log('Number of Activation headed records are = ' + this.activationHeadedCountFromTable);
                    if (Number(this.activationHeadedCountFromTable) <= Number(this.ActHC_count)) {
                        cy.log('both are equal')
                    }
                    else { cy.log('sorry ! Activation headed  records count are not matched!!') }
                })

            }

            //Step 10: verify count Activation Network
            cy.go(-1)
            cy.wait(2000)
            cy.xpath('//div[@ng-repeat="item in buttonsArr"]', { log: false }).contains('Past Year').click()
            cy.wait(5000)
            dpo.locator_NetworkCount().invoke('text').then(($e1) => {
                this.ActNC_count = $e1
                cy.log('Number of count Activation Network records found on screen ', this.ActNC_count)
            })

            // Click over Activation Network
            dpo.locator_Network_label().should('be.visible').click()
            cy.contains('Utilities')
            cy.log('Clicked on Activation Network successfully! ')

            // verification of records count for Activation headed
            cy.wait(5000)
            if (mso.locator_NoItemToDisplay_label().contains('No Items to Display') || mso.locator_gridRecords().its('length').should('be.empty')) {
                mso.locator_NoItemToDisplay_label().then(($e2) => {
                    expect($e2.text()).equals('No Items to Display')
                    cy.log('No records are present')
                })
            } else {
                mso.locator_gridRecords().its('length').then((c1) => {
                    this.activationNetworkCountFromTable = c1
                    cy.log('Number of Activation network records are = ' + this.activationNetworkCountFromTable);
                    if (Number(this.activationNetworkCountFromTable) <= Number(this.ActNC_count)) {
                        cy.log('both are equal')
                    }
                    else { cy.log('sorry ! Activation network  records count are not matched!!') }
                })

            }


            //Step 11: verify count Deactivation Headed
            cy.go(-1)
            cy.wait(2000)
            cy.xpath('//div[@ng-repeat="item in buttonsArr"]', { log: false }).contains('Past Year').click()
            cy.wait(5000)
            dpo.locator_Dec_Headend_Count().invoke('text').then(($e1) => {
                this.DeacHC_count = $e1
                cy.log('Number of count Deactivation records found on screen ', this.DeacHC_count)
            })

            // Click over Deactivation headed
            dpo.locator_Dec_Headend_label().should('be.visible').click()
            cy.contains('Utilities')
            cy.log('Clicked on Deactivation Headend successfully! ')

            // verification of records count for Deactivation headed
            cy.wait(5000)
            if (mso.locator_NoItemToDisplay_label().contains('No Items to Display') || mso.locator_gridRecords().its('length').should('be.empty')) {
                mso.locator_NoItemToDisplay_label().then(($e2) => {
                    expect($e2.text()).equals('No Items to Display')
                    cy.log('No records are present')
                })
            } else {
                mso.locator_gridRecords().its('length').then((c1) => {
                    this.deactivationHeadedCountFromTable = c1
                    cy.log('Number of Deactivation headed records are = ' + this.deactivationHeadedCountFromTable);
                    if (Number(this.deactivationHeadedCountFromTable) <= Number(this.DeacHC_count)) {
                        cy.log('both are equal')
                    }
                    else { cy.log('sorry ! Deactivation headed  records count are not matched!!') }
                })

            }

            //Step 12: verify count Deactivation Network
            cy.go(-1)
            cy.wait(2000)
            cy.xpath('//div[@ng-repeat="item in buttonsArr"]', { log: false }).contains('Past Year').click()
            cy.wait(5000)
            dpo.locator_Dec_Network_Count().invoke('text').then(($e1) => {
                this.deacNC_count = $e1
                cy.log('Number of count Deactivation Network records found on screen ', this.deacNC_count)
            })

            // Click over Deactivation Network
            dpo.locator_Dec_Network_label().should('be.visible').click()
            cy.contains('Utilities')
            cy.log('Clicked on Deactivation Network successfully! ')

            // verification of records count for Deactivation Network
            cy.wait(5000)
            if (mso.locator_NoItemToDisplay_label().contains('No Items to Display') || mso.locator_gridRecords().its('length').should('be.empty')) {
                mso.locator_NoItemToDisplay_label().then(($e2) => {
                    expect($e2.text()).equals('No Items to Display')
                    cy.log('No records are present')
                })
            } else {
                mso.locator_gridRecords().its('length').then((c1) => {
                    this.deactivationNetworkCountFromTable = c1
                    cy.log('Number of Activation network records are = ' + this.deactivationNetworkCountFromTable);
                    if (Number(this.deactivationNetworkCountFromTable) <= Number(this.deacNC_count)) {
                        cy.log('both are equal')
                    }
                    else { cy.log('sorry ! Deactivation network  records count are not matched!!') }
                })

            }

            //-----------------------------****-----------------------//
            //Step 13: verify count Name/Code Changes Headed
            cy.go(-1)
            cy.wait(2000)
            cy.xpath('//div[@ng-repeat="item in buttonsArr"]', { log: false }).contains('Past Year').click()
            cy.wait(5000)
            dpo.locator_NC_Headend_Count().invoke('text').then(($e1) => {
                this.nC_count = $e1
                cy.log('Number of count  Name/Code Change records found on screen ', this.nC_count)
            })

            // Click over  count Name/Code headed
            dpo.locator_NC_Headend_label().should('be.visible').click()
            cy.contains('Utilities')
            cy.log('Clicked on  Name/Code Headend successfully! ')

            // verification of records count for  Name/Code  headed
            cy.wait(5000)
            if (mso.locator_NoItemToDisplay_label().contains('No Items to Display') || mso.locator_gridRecords().its('length').should('be.empty')) {
                mso.locator_NoItemToDisplay_label().then(($e2) => {
                    expect($e2.text()).equals('No Items to Display')
                    cy.log('No records are present')
                })
            } else {
                mso.locator_gridRecords().its('length').then((c1) => {
                    this.nCHeadedCountFromTable = c1
                    cy.log('Number of name/code headed records are = ' + this.nCHeadedCountFromTable);
                    if (Number(this.nCHeadedCountFromTable) <= Number(this.nC_count)) {
                        cy.log('both are equal')
                    }
                    else { cy.log('sorry ! Name/Code  headed  records count are not matched!!') }
                })

            }

            //Step 12: verify count  Name/Code  Network
            cy.go(-1)
            cy.wait(2000)
            cy.xpath('//div[@ng-repeat="item in buttonsArr"]', { log: false }).contains('Past Year').click()
            cy.wait(5000)
            dpo.locator_NC_Network_Count().invoke('text').then(($e1) => {
                this.ncNetwork_count = $e1
                cy.log('Number of count  Name/Code  Network records found on screen ', this.ncNetwork_count)
            })

            // Click over  Name/Code  Network
            dpo.locator_NC_Network_label().should('be.visible').click()
            cy.contains('Utilities')
            cy.log('Clicked on  Name/Code  Network successfully! ')

            // verification of records count for  Name/Code  Network
            cy.wait(5000)
            if (mso.locator_NoItemToDisplay_label().contains('No Items to Display') || mso.locator_gridRecords().its('length').should('be.empty')) {
                mso.locator_NoItemToDisplay_label().then(($e2) => {
                    expect($e2.text()).equals('No Items to Display')
                    cy.log('No records are present')
                })
            } else {
                mso.locator_gridRecords().its('length').then((c1) => {
                    this.nCNetworkCountFromTable = c1
                    cy.log('Number of name/code network records are = ' + this.nCNetworkCountFromTable);
                    if (Number(this.nCNetworkCountFromTable) <= Number(this.ncNetwork_count)) {
                        cy.log('both are equal')
                    }
                    else { cy.log('sorry !  Name/Code  network  records count are not matched!!') }
                })

            }
            //---------------------**

            // Step 14 :(Verify) for Custom button
            cy.go(-1)
            cy.xpath('//div[@ng-repeat="item in buttonsArr"]', { log: false }).contains('Custom').click()
            cy.wait(5000)
            cy.screenshot()
            cy.log('successfully clicked onNo Past Year buttons')

            const currentdate3 = new Date().getDate();

            cy.xpath('//div[contains(@class,"inputCalendar")]/child::div/i').should('be.visible').click()
            cy.log('Clicked on calender icon ');
            mso.locator_Date_StartDate().contains(currentdate3).click()
            mso.locator_Date_ThruDate().contains(currentdate3).click()
            cy.wait(2000)
            mso.locator_SaveDateButton().click({force:true}) 
            cy.log('Successfully clicked on Save button ')
            cy.wait(2000)
            //---------------------------------------**
            //Verify count Activation Headed
            cy.wait(2000)
            dpo.locator_HeadendCount().invoke('text').then(($e1) => {
                this.ActHC_count = $e1
                cy.log('Number of  count Activation records found on screen ', this.ActHC_count)
            })

            // Click over Activation  
            dpo.locator_Headend_label().should('be.visible').click()
            cy.contains('Utilities')
            cy.log('Clicked on Activation Headend successfully! ')

            // verification of records count for Activation headed
            cy.wait(5000)
            if (mso.locator_NoItemToDisplay_label().contains('No Items to Display') || mso.locator_gridRecords().its('length').should('be.empty')) {
                mso.locator_NoItemToDisplay_label().then(($e2) => {
                    expect($e2.text()).equals('No Items to Display')
                    cy.log('No records are present')
                })
            } else {
                mso.locator_gridRecords().its('length').then((c1) => {
                    this.activationHeadedCountFromTable = c1
                    cy.log('Number of Activation headed records are = ' + this.activationHeadedCountFromTable);
                    if (Number(this.activationHeadedCountFromTable) <= Number(this.ActHC_count)) {
                        cy.log('both are equal')
                    }
                    else { cy.log('sorry ! Activation headed  records count are not matched!!') }
                })

            }

            //Step 10: verify count Activation Network
            cy.go(-1)
            cy.wait(2000)
            dpo.locator_NetworkCount().invoke('text').then(($e1) => {
                this.ActNC_count = $e1
                cy.log('Number of count Activation Network records found on screen ', this.ActNC_count)
            })

            // Click over Activation Network
            dpo.locator_Network_label().should('be.visible').click()
            cy.contains('Utilities')
            cy.log('Clicked on Activation Network successfully! ')

            // verification of records count for Activation headed
            cy.wait(5000)
            if (mso.locator_NoItemToDisplay_label().contains('No Items to Display') || mso.locator_gridRecords().its('length').should('be.empty')) {
                mso.locator_NoItemToDisplay_label().then(($e2) => {
                    expect($e2.text()).equals('No Items to Display')
                    cy.log('No records are present')
                })
            } else {
                mso.locator_gridRecords().its('length').then((c1) => {
                    this.activationNetworkCountFromTable = c1
                    cy.log('Number of Activation network records are = ' + this.activationNetworkCountFromTable);
                    if (Number(this.activationNetworkCountFromTable) <= Number(this.ActNC_count)) {
                        cy.log('both are equal')
                    }
                    else { cy.log('sorry ! Activation network  records count are not matched!!') }
                })

            }


            //Step 11: verify count Deactivation Headed
            cy.go(-1)
            cy.wait(2000)
            dpo.locator_Dec_Headend_Count().invoke('text').then(($e1) => {
                this.DeacHC_count = $e1
                cy.log('Number of count Deactivation records found on screen ', this.DeacHC_count)
            })

            // Click over Deactivation headed
            dpo.locator_Dec_Headend_label().should('be.visible').click()
            cy.contains('Utilities')
            cy.log('Clicked on Deactivation Headend successfully! ')

            // verification of records count for Deactivation headed
            cy.wait(5000)
            if (mso.locator_NoItemToDisplay_label().contains('No Items to Display') || mso.locator_gridRecords().its('length').should('be.empty')) {
                mso.locator_NoItemToDisplay_label().then(($e2) => {
                    expect($e2.text()).equals('No Items to Display')
                    cy.log('No records are present')
                })
            } else {
                mso.locator_gridRecords().its('length').then((c1) => {
                    this.deactivationHeadedCountFromTable = c1
                    cy.log('Number of Deactivation headed records are = ' + this.deactivationHeadedCountFromTable);
                    if (Number(this.deactivationHeadedCountFromTable) <= Number(this.DeacHC_count)) {
                        cy.log('both are equal')
                    }
                    else { cy.log('sorry ! Deactivation headed  records count are not matched!!') }
                })

            }

            //Step 12: verify count Deactivation Network
            cy.go(-1)
            cy.wait(2000)
            dpo.locator_Dec_Network_Count().invoke('text').then(($e1) => {
                this.deacNC_count = $e1
                cy.log('Number of count Deactivation Network records found on screen ', this.deacNC_count)
            })

            // Click over Deactivation Network
            dpo.locator_Dec_Network_label().should('be.visible').click()
            cy.contains('Utilities')
            cy.log('Clicked on Deactivation Network successfully! ')

            // verification of records count for Deactivation Network
            cy.wait(5000)
            if (mso.locator_NoItemToDisplay_label().contains('No Items to Display') || mso.locator_gridRecords().its('length').should('be.empty')) {
                mso.locator_NoItemToDisplay_label().then(($e2) => {
                    expect($e2.text()).equals('No Items to Display')
                    cy.log('No records are present')
                })
            } else {
                mso.locator_gridRecords().its('length').then((c1) => {
                    this.deactivationNetworkCountFromTable = c1
                    cy.log('Number of Activation network records are = ' + this.deactivationNetworkCountFromTable);
                    if (Number(this.deactivationNetworkCountFromTable) <= Number(this.deacNC_count)) {
                        cy.log('both are equal')
                    }
                    else { cy.log('sorry ! Deactivation network  records count are not matched!!') }
                })

            }

            //-----------------------------****-----------------------//
            //Step 13: verify count Name/Code Changes Headed
            cy.go(-1)
            cy.wait(2000)
            dpo.locator_NC_Headend_Count().invoke('text').then(($e1) => {
                this.nC_count = $e1
                cy.log('Number of count  Name/Code Change records found on screen ', this.nC_count)
            })

            // Click over  count Name/Code headed
            dpo.locator_NC_Headend_label().should('be.visible').click()
            cy.contains('Utilities')
            cy.log('Clicked on  Name/Code Headend successfully! ')

            // verification of records count for  Name/Code  headed
            cy.wait(5000)
            if (mso.locator_NoItemToDisplay_label().contains('No Items to Display') || mso.locator_gridRecords().its('length').should('be.empty')) {
                mso.locator_NoItemToDisplay_label().then(($e2) => {
                    expect($e2.text()).equals('No Items to Display')
                    cy.log('No records are present')
                })
            } else {
                mso.locator_gridRecords().its('length').then((c1) => {
                    this.nCHeadedCountFromTable = c1
                    cy.log('Number of name/code headed records are = ' + this.nCHeadedCountFromTable);
                    if (Number(this.nCHeadedCountFromTable) <= Number(this.nC_count)) {
                        cy.log('both are equal')
                    }
                    else { cy.log('sorry ! Name/Code  headed  records count are not matched!!') }
                })

            }

            //Step 12: verify count  Name/Code  Network
            cy.go(-1)
            cy.wait(2000)
            dpo.locator_NC_Network_Count().invoke('text').then(($e1) => {
                this.ncNetwork_count = $e1
                cy.log('Number of count  Name/Code  Network records found on screen ', this.ncNetwork_count)
            })

            // Click over  Name/Code  Network
            dpo.locator_NC_Network_label().should('be.visible').click()
            cy.contains('Utilities')
            cy.log('Clicked on  Name/Code  Network successfully! ')

            // verification of records count for  Name/Code  Network
            cy.wait(5000)
            if (mso.locator_NoItemToDisplay_label().contains('No Items to Display') || mso.locator_gridRecords().its('length').should('be.empty')) {
                mso.locator_NoItemToDisplay_label().then(($e2) => {
                    expect($e2.text()).equals('No Items to Display')
                    cy.log('No records are present')
                })
            } else {
                mso.locator_gridRecords().its('length').then((c1) => {
                    this.nCNetworkCountFromTable = c1
                    cy.log('Number of name/code network records are = ' + this.nCNetworkCountFromTable);
                    if (Number(this.nCNetworkCountFromTable) <= Number(this.ncNetwork_count)) {
                        cy.log('both are equal')
                    }
                    else { cy.log('sorry !  Name/Code  network  records count are not matched!!') }
                })

            }

            //----------------------------------------**


            //Step 15: Click on Setting Icon and make reset
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
            cy.screenshot();

        })
    })



})

