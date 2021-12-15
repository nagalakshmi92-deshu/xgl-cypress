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
                mso.locator_Login_Password().type(this.data.Environment.Password, { sensitive: true });
                cy.log('Click on Login Button')
                mso.locator_Login_LoginButton().click({ log: false });
                cy.log('Sucess !!');
            })
        })
    })


    it('XGLT-6689 -Order Line Overview', () => {
        cy.fixture('missionControl.json').then(function (data) {
            this.data = data;

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

            //Step 3: Click on arrow icon (First Quardant)
            mso.locator_SelectFirstArrow().click();
            cy.log('Clicked on firstQuadrant arrow button');
            mso.locator_OrderLineOverview_records().click()
            cy.log('Selected - First Quardant -Order Line Overview');


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
            cy.contains('Order Lines Overview');
            cy.log('Clicked on save button successfully.')

            //Step 8 :(Verification) dashboard updated 
            cy.contains('Order Lines Overview');
            cy.log('Dashboard Updated successfully!')

            //-------------*Start Today*--------------------//
            //Step 9: verify count over bar pending-approval 
            cy.wait(2000)
            mso.locator_pending_approval_labelCount().invoke('text').then(($e1) => {
                this.text_count = $e1
                cy.log('Number of pending-approval records found on screen ', this.text_count)
            })

            // Click over pending-approval  
            mso.locator_pending_approval_label().contains('Pending Approval').click()
            cy.log('Clicked on  pending-approval successfully! ')


            // verification of records count for pending-approval
            if (mso.locator_NoItemToDisplay_label().contains('No Items to Display') || mso.locator_gridRecords().its('length').should('be.empty')) {
                mso.locator_NoItemToDisplay_label().then(($e2) => {
                    expect($e2.text()).equals('No Items to Display')
                    cy.log('No records are present')
                })
            } else {
                mso.locator_gridRecords().its('length').then((c1) => {
                    this.pendingApprovalCountFromTable = c1
                    cy.log('Number of pending-approval records are = ' + this.pendingApprovalCountFromTable);
                    if (Number(this.pendingApprovalCountFromTable) == Number(this.text_count)) {
                        cy.log('both are equal')
                    }
                    else { cy.log('sorry ! Approved records count are not matched!!') }
                })


            }

            //Step 10:(Verify) Approved as of today field 
            cy.go(-1);
            cy.wait(2000)
            cy.contains('Order Lines Overview')
            cy.log(' Verifying approved as of today field ')
            mso.locator_approved_labelCount().invoke('text').then(($e1) => {
                this.Approved_count = $e1
                cy.log('Number of Approved records found on screen ' + this.Approved_count)
            })

            //Click over Approved  
            mso.locator_approved_label().click()
            cy.log('Clicked on  Approved successfully! ')
            cy.screenshot();
            cy.contains('Order Lines - ')
            mso.locator_approvedCountfromTop().should('be.visible').invoke('text').then((info) => {
                var text_info = info;
                cy.log('Records are verified successfully!' + text_info)

            })
            // verification of records count 
            if (mso.locator_NoItemToDisplay_label().contains('No Items to Display') || mso.locator_gridRecords().its('length').should('be.empty')) {
                cy.contains('No Items to Display')
                mso.locator_NoItemToDisplay_label().then(($e2) => {
                    expect($e2.text()).equals('No Items to Display')
                    cy.log('No records are present')
                })
            } else {
                mso.locator_gridRecords().its('length').its('length').then((c1) => {
                    this.ApprovedCountFromTable = c1
                    cy.log('Number of approved records are = ' + this.ApprovedCountFromTable);


                    if (Number(this.ApprovedCountFromTable) == Number(this.Approved_count)) {
                        cy.log('both are equal')
                    }
                    else { cy.log('sorry ! Approved records count are not matched!!') }


                })
            }
            cy.log('Records counts are matched for Approved ')

            //Step 11 : (Verification) Scheduled as of today 
            cy.go(-1);
            cy.contains('Order Lines Overview')
            cy.log(' Verifying Scheduled as of today field ')
            mso.locator_Scheduled_labelCount().invoke('text').then(($e1) => {
                this.Scheduled_count = $e1
                cy.log('Number of Approved records found on screen ', this.Scheduled_count)
            })
            //Click over Scheduled 
            cy.xpath('//h4[contains(.,"Scheduled")]/following-sibling::div').click()
            cy.log('Clicked on Scheduled successfully! ')
            cy.screenshot();
            cy.contains('Order Lines - ')
            mso.locator_ScheduledCountfromTop().should('be.visible').invoke('text').then((info) => {
                var text_info = info;
                cy.log('Scheduled records are verified successfully!', text_info)

            })
            // verification of records count 
            if (mso.locator_NoItemToDisplay_label().contains('No Items to Display') || mso.locator_gridRecords().its('length').should('be.empty')) {

                mso.locator_NoItemToDisplay_label().then(($e2) => {
                    expect($e2.text()).equals('No Items to Display')
                    cy.log('No records are present')
                })
            } else {
                mso.locator_gridRecords().its('length').its('length').then((c1) => {
                    this.ScheduledCountFromTable = c1
                    cy.log('Number of records are = ' + this.ScheduledCountFromTable);


                    if (Number(this.ScheduledCountFromTable) == Number(this.Scheduled_count)) {
                        cy.log('both are equal')
                    }
                    else { cy.log('sorry ! Scheduled records count are not matched!!') }
                })


            }
            cy.log('Records counts are matched for Scheduled ')
            cy.screenshot();


            //Step 12 : (Verification) Suspended as of today
            cy.go(-1);
            cy.contains('Order Lines Overview')
            cy.log(' Verifying Suspended as of today field ')
            mso.locator_Suspended_labelCount().invoke('text').then(($e1) => {
                this.Suspended_count = $e1
                cy.log('Number of Suspended found on screen ', this.Suspended_count)
            })
            //Click over Suspended
            mso.locator_Suspended_label().click()
            cy.log('Clicked on Suspended successfully! ')
            cy.screenshot();
            cy.contains('Order Lines - ')
            mso.locator_SuspendedCountfromTop().should('be.visible').invoke('text').then((info) => {
                var text_info = info;
                cy.log(' Suspended records are verified successfully , current record count is = ', text_info)

            })
            // verification of records count 
            if (mso.locator_NoItemToDisplay_label().contains('No Items to Display') || mso.locator_gridRecords().its('length').should('be.empty')) {
                mso.locator_NoItemToDisplay_label().then(($e2) => {
                    expect($e2.text()).equals('No Items to Display')
                    cy.log('No records are present')
                })
            } else {
                mso.locator_gridRecords().its('length').then((c1) => {
                    this.suspendedCountFromTable = c1
                    cy.log('Number of records are = ' + this.suspendedCountFromTable);


                    if (Number(this.suspendedCountFromTable) == Number(this.Suspended_count)) {
                        cy.log('both are equal')
                    }
                    else { cy.log('sorry ! Suspended records count are not matched!!') }


                })
            }


            //-------------------*Next 7 days*----------------------------//
            //Step 9: verify count over bar pending-approval 
            cy.go(-1);
            cy.wait(2000)
            cy.xpath('//div[@ng-repeat="item in buttonsArr"]', { log: false }).contains('Next 7 days').click()
            cy.wait(5000)
            mso.locator_pending_approval_labelCount().invoke('text').then(($e1) => {
                this.text_count = $e1
                cy.log('Number of pending-approval records found on screen for next 7 days', this.text_count)
            })

            // Click over pending-approval  
            mso.locator_pending_approval_label().contains('Pending Approval').click()
            cy.log('Clicked on  pending-approval successfully! ')


            // verification of records count for pending-approval
            if (mso.locator_NoItemToDisplay_label().contains('No Items to Display') || mso.locator_gridRecords().its('length').should('be.empty')) {
                mso.locator_NoItemToDisplay_label().then(($e2) => {
                    expect($e2.text()).equals('No Items to Display')
                    cy.log('No records are present')
                })
            } else {
                mso.locator_gridRecords().its('length').then((c1) => {
                    this.pendingApprovalCountFromTable = c1
                    cy.log('Number of pending-approval records are = ' + this.pendingApprovalCountFromTable);
                    if (Number(this.pendingApprovalCountFromTable) == Number(this.text_count)) {
                        cy.log('both are equal')
                    }
                    else { cy.log('sorry ! Approved records count are not matched!!') }
                })


            }

            //Step 10:(Verify) Approved as of today field 
            cy.go(-1);
            cy.wait(2000)
            cy.xpath('//div[@ng-repeat="item in buttonsArr"]', { log: false }).contains('Next 7 days').click()
            cy.wait(5000)
            cy.contains('Order Lines Overview')
            cy.log(' Verifying approved as of today field ')
            mso.locator_approved_labelCount().invoke('text').then(($e1) => {
                this.Approved_count = $e1
                cy.log('Number of Approved records found on screen ' + this.Approved_count)
            })

            //Click over Approved  
            mso.locator_approved_label().click()
            cy.log('Clicked on  Approved successfully! ')
            cy.screenshot();
            cy.contains('Order Lines - ')
            mso.locator_approvedCountfromTop().should('be.visible').invoke('text').then((info) => {
                var text_info = info;
                cy.log('Records are verified successfully!' + text_info)

            })
            // verification of records count 
            if (mso.locator_NoItemToDisplay_label().contains('No Items to Display') || mso.locator_gridRecords().its('length').should('be.empty')) {
                cy.contains('No Items to Display')
                mso.locator_NoItemToDisplay_label().then(($e2) => {
                    expect($e2.text()).equals('No Items to Display')
                    cy.log('No records are present')
                })
            } else {
                mso.locator_gridRecords().its('length').its('length').then((c1) => {
                    this.ApprovedCountFromTable = c1
                    cy.log('Number of approved records are = ' + this.ApprovedCountFromTable);


                    if (Number(this.ApprovedCountFromTable) == Number(this.Approved_count)) {
                        cy.log('both are equal')
                    }
                    else { cy.log('sorry ! Approved records count are not matched!!') }


                })
            }
            cy.log('Records counts are matched for Approved ')

            //Step 11 : (Verification) Scheduled as of today 
            cy.go(-1);
            cy.xpath('//div[@ng-repeat="item in buttonsArr"]', { log: false }).contains('Next 7 days').click()
            cy.wait(5000)
            cy.contains('Order Lines Overview')
            cy.log(' Verifying Scheduled as of today field ')
            mso.locator_Scheduled_labelCount().invoke('text').then(($e1) => {
                this.Scheduled_count = $e1
                cy.log('Number of Approved records found on screen ', this.Scheduled_count)
            })
            //Click over Scheduled 
            cy.xpath('//h4[contains(.,"Scheduled")]/following-sibling::div').click()
            cy.log('Clicked on Scheduled successfully! ')
            cy.screenshot();
            cy.contains('Order Lines - ')
            mso.locator_ScheduledCountfromTop().should('be.visible').invoke('text').then((info) => {
                var text_info = info;
                cy.log('Scheduled records are verified successfully!', text_info)

            })
            // verification of records count 
            if (mso.locator_NoItemToDisplay_label().contains('No Items to Display') || mso.locator_gridRecords().its('length').should('be.empty')) {

                mso.locator_NoItemToDisplay_label().then(($e2) => {
                    expect($e2.text()).equals('No Items to Display')
                    cy.log('No records are present')
                })
            } else {
                mso.locator_gridRecords().its('length').its('length').then((c1) => {
                    this.ScheduledCountFromTable = c1
                    cy.log('Number of records are = ' + this.ScheduledCountFromTable);


                    if (Number(this.ScheduledCountFromTable) == Number(this.Scheduled_count)) {
                        cy.log('both are equal')
                    }
                    else { cy.log('sorry ! Scheduled records count are not matched!!') }
                })


            }
            cy.log('Records counts are matched for Scheduled ')
            cy.screenshot();


            //Step 12 : (Verification) Suspended as of today
            cy.go(-1);
            cy.contains('Order Lines Overview')
            cy.xpath('//div[@ng-repeat="item in buttonsArr"]', { log: false }).contains('Next 7 days').click()
            cy.wait(5000)
            cy.log(' Verifying Suspended as of today field ')
            mso.locator_Suspended_labelCount().invoke('text').then(($e1) => {
                this.Suspended_count = $e1
                cy.log('Number of Suspended found on screen ', this.Suspended_count)
            })
            //Click over Suspended
            mso.locator_Suspended_label().click()
            cy.log('Clicked on Suspended successfully! ')
            cy.screenshot();
            cy.contains('Order Lines - ')
            mso.locator_SuspendedCountfromTop().should('be.visible').invoke('text').then((info) => {
                var text_info = info;
                cy.log(' Suspended records are verified successfully , current record count is = ', text_info)

            })
            // verification of records count 
            cy.wait(7000)
            if (mso.locator_NoItemToDisplay_label().contains('No Items to Display') || mso.locator_gridRecords().its('length').should('be.empty')) {
                mso.locator_NoItemToDisplay_label().then(($e2) => {
                    expect($e2.text()).equals('No Items to Display')
                    cy.log('No records are present')
                })
            } else {
                mso.locator_gridRecords().its('length').then((c1) => {
                    this.suspendedCountFromTable = c1
                    cy.log('Number of records are = ' + this.suspendedCountFromTable);


                    if (Number(this.suspendedCountFromTable) == Number(this.Suspended_count)) {
                        cy.log('both are equal')
                    }
                    else { cy.log('sorry ! Suspended records count are not matched!!') }


                })
            }


            //---------------------------*End Of Neext 7 days-------------------------//

            //---------------------------Start All -----------------------------------//
            //Step 9: verify count over bar pending-approval 
            cy.go(-1);
            cy.wait(2000)
            cy.xpath('//div[@ng-repeat="item in buttonsArr"]', { log: false }).contains('All').click()
            cy.wait(5000)
            mso.locator_pending_approval_labelCount().invoke('text').then(($e1) => {
                this.text_count = $e1
                cy.log('Number of pending-approval records found on screen for ALL', this.text_count)
            })

            // Click over pending-approval  
            mso.locator_pending_approval_label().contains('Pending Approval').click()
            cy.log('Clicked on  pending-approval successfully! ')


            // verification of records count for pending-approval
            cy.wait(7000)
            if (mso.locator_NoItemToDisplay_label().contains('No Items to Display') || mso.locator_gridRecords().its('length').should('be.empty')) {
                mso.locator_NoItemToDisplay_label().then(($e2) => {
                    expect($e2.text()).equals('No Items to Display')
                    cy.log('No records are present')
                })
            } else {
                mso.locator_gridRecords().its('length').then((c1) => {
                    this.pendingApprovalCountFromTable = c1
                    cy.log('Number of pending-approval records are = ' + this.pendingApprovalCountFromTable);
                    if (Number(this.pendingApprovalCountFromTable) == Number(this.text_count)) {
                        cy.log('both are equal')
                    }
                    else { cy.log('sorry ! Approved records count are not matched!!') }
                })


            }

            //Step 10:(Verify) Approved as of today field 
            cy.go(-1);
            cy.wait(2000)
            cy.xpath('//div[@ng-repeat="item in buttonsArr"]', { log: false }).contains('All').click()
            cy.wait(5000)
            cy.contains('Order Lines Overview')
            cy.log(' Verifying approved as of today field ')
            mso.locator_approved_labelCount().invoke('text').then(($e1) => {
                this.Approved_count = $e1
                cy.log('Number of Approved records found on screen ' + this.Approved_count)
            })

            //Click over Approved  
            mso.locator_approved_label().click()
            cy.log('Clicked on  Approved successfully! ')
            cy.screenshot();
            cy.contains('Order Lines - ')
            mso.locator_approvedCountfromTop().should('be.visible').invoke('text').then((info) => {
                var text_info = info;
                cy.log('Records are verified successfully!' + text_info)

            })
            // verification of records count 
            cy.wait(7000)
            if (mso.locator_NoItemToDisplay_label().contains('No Items to Display') || mso.locator_gridRecords().its('length').should('be.empty')) {
                cy.contains('No Items to Display')
                mso.locator_NoItemToDisplay_label().then(($e2) => {
                    expect($e2.text()).equals('No Items to Display')
                    cy.log('No records are present')
                })
            } else {
                mso.locator_gridRecords().its('length').its('length').then((c1) => {
                    this.ApprovedCountFromTable = c1
                    cy.log('Number of approved records are = ' + this.ApprovedCountFromTable);


                    if (Number(this.ApprovedCountFromTable) == Number(this.Approved_count)) {
                        cy.log('both are equal')
                    }
                    else { cy.log('sorry ! Approved records count are not matched!!') }


                })
            }
            cy.log('Records counts are matched for Approved ')

            //Step 11 : (Verification) Scheduled as of today 
            cy.go(-1);
            cy.xpath('//div[@ng-repeat="item in buttonsArr"]', { log: false }).contains('All').click()
            cy.wait(5000)
            cy.contains('Order Lines Overview')
            cy.log(' Verifying Scheduled as of today field ')
            mso.locator_Scheduled_labelCount().invoke('text').then(($e1) => {
                this.Scheduled_count = $e1
                cy.log('Number of Approved records found on screen ', this.Scheduled_count)
            })
            //Click over Scheduled 
            cy.xpath('//h4[contains(.,"Scheduled")]/following-sibling::div').click()
            cy.log('Clicked on Scheduled successfully! ')
            cy.screenshot();
            cy.contains('Order Lines - ')
            mso.locator_ScheduledCountfromTop().should('be.visible').invoke('text').then((info) => {
                var text_info = info;
                cy.log('Scheduled records are verified successfully!', text_info)

            })
            // verification of records count 
            cy.wait(7000)
            if (mso.locator_NoItemToDisplay_label().contains('No Items to Display') || mso.locator_gridRecords().its('length').should('be.empty')) {

                mso.locator_NoItemToDisplay_label().then(($e2) => {
                    expect($e2.text()).equals('No Items to Display')
                    cy.log('No records are present')
                })
            } else {
                mso.locator_gridRecords().its('length').its('length').then((c1) => {
                    this.ScheduledCountFromTable = c1
                    cy.log('Number of records are = ' + this.ScheduledCountFromTable);


                    if (Number(this.ScheduledCountFromTable) == Number(this.Scheduled_count)) {
                        cy.log('both are equal')
                    }
                    else { cy.log('sorry ! Scheduled records count are not matched!!') }
                })


            }
            cy.log('Records counts are matched for Scheduled ')
            cy.screenshot();


            //Step 12 : (Verification) Suspended as of today
            cy.go(-1);
            cy.contains('Order Lines Overview')
            cy.xpath('//div[@ng-repeat="item in buttonsArr"]', { log: false }).contains('All').click()
            cy.wait(5000)
            cy.log(' Verifying Suspended as of today field ')
            mso.locator_Suspended_labelCount().invoke('text').then(($e1) => {
                this.Suspended_count = $e1
                cy.log('Number of Suspended found on screen ', this.Suspended_count)
            })
            //Click over Suspended
            mso.locator_Suspended_label().click()
            cy.log('Clicked on Suspended successfully! ')
            cy.screenshot();
            cy.contains('Order Lines - ')
            mso.locator_SuspendedCountfromTop().should('be.visible').invoke('text').then((info) => {
                var text_info = info;
                cy.log(' Suspended records are verified successfully , current record count is = ', text_info)

            })
            // verification of records count 
            cy.wait(7000)
            if (mso.locator_NoItemToDisplay_label().contains('No Items to Display') || mso.locator_gridRecords().its('length').should('be.empty')) {
                mso.locator_NoItemToDisplay_label().then(($e2) => {
                    expect($e2.text()).equals('No Items to Display')
                    cy.log('No records are present')
                })
            } else {
                mso.locator_gridRecords().its('length').then((c1) => {
                    this.suspendedCountFromTable = c1
                    cy.log('Number of records are = ' + this.suspendedCountFromTable);


                    if (Number(this.suspendedCountFromTable) == Number(this.Suspended_count)) {
                        cy.log('both are equal')
                    }
                    else { cy.log('sorry ! Suspended records count are not matched!!') }


                })
            }

            //---------------------------End All -----------------------------------//
            //Step 13: Click on Setting Icon and make reset
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

