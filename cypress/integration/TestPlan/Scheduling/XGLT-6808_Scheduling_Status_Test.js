/// <reference types="Cypress-xpath" />
/// <reference types="Cypress-iframe" />

import MissionControlPageObject from '../../../support/ObjectRepository/MissionControl/MissionControlPageObject'
import Inventory_NewRuleTestPO from '../../../support/ObjectRepository/Scheduling/Inventory_NewRuleTestPageObject'
import MassRevertOrderlinesTest_PageObject from '../../../support/ObjectRepository/Orders/MassRevertOrderlinesTest_PageObject'
import 'cypress-iframe'

describe('Verification of XGLT-6808', () => {

    const mso = new MissionControlPageObject();
    const ipo = new Inventory_NewRuleTestPO();
    const mro = new MassRevertOrderlinesTest_PageObject()

    //Use the cy.fixture() method to pull data from fixture file
    before(function () {

    })

    beforeEach(() => {
        cy.fixture('Configurations.json').then(function (data) {
            this.data = data;

            cy.visit(this.data.Environment.baseURL).then(() => {
                cy.log('Entering Username')
                mso.locator_Login_Username().type(this.data.Environment.Username);
                cy.log('Entering  Password')
                mso.locator_Login_Password().type(this.data.Environment.Password, { log: false });
                cy.log('Click on Login Button')
                mso.locator_Login_LoginButton().click({ log: false });
                cy.log('Sucess !!');
            })
        })

    })

    it('XGLT-6808 Scheduling status test', () => {
        cy.fixture('Configurations.json').then(function (data) {
            this.data = data;
            //(Verification) landed on dashboed page
            cy.url().should('contain', '/MissionControl');
            cy.log('Successfully landed on dashboard');
            cy.screenshot();

            // Step 1: Navigate to Scheduling
            ipo.locator_SubMenu_Scheduling().click()
            cy.log('Clicked on Scheduling menu item ');

            // Click on Scheduling Status sub menu
            cy.xpath("//div[@class='dropDown']/div[contains(text(),'Schedule Status')]").click({ force: true })
            cy.log('Clicked on Scheduling Status sub menu')

            //Step 2 : Click on date
            cy.xpath("//div[@class='inputIcon inputCalendar posRel']/div[@class='icon']").scrollIntoView().trigger("click");
            cy.xpath("//div[@class='calendarWrapper ng-isolate-scope']//button[text()='Save']").trigger("click");
            cy.log('selected the date and clicked on save button')

            //Ge the date of the first row
            cy.xpath("//div[@class='grid-canvas']/div/div[2]", { timeout: 120000 }).eq(0).then((ee) => {
                var date = ee.text().trim()
                cy.log('date =' + date)
            })

            //Click on the first row of the checkbox
            cy.xpath("//div[@class='grid-canvas']/div/div[1]").eq(0).click({ force: true })
            cy.log('Clicked on the first row of the checkbox')

            //Step 3 : Click on the lock shedule button 
            cy.xpath("//button[@id='scheduleStatusPage.lockSchedules']").click({ force: true })
            cy.log('Clicked on the lock shedule button')

            //(Verification) Verify that the selected date and row is locked or not
            cy.xpath("//div[@class='grid-canvas']/div/div[8]", { timeout: 1200000 }).eq(0).scrollIntoView().then(() => {
                for (let i = 0; i < 6; i++) {
                    cy.xpath("//div[@class='grid-canvas']/div/div[8]").eq(0).then((ff) => {
                        if (ff.text().includes('No')) {
                            cy.wait(6000)
                        }
                        else { return false }
                    })
                }
            })
            cy.xpath("//div[@class='grid-canvas']/div/div[8]").eq(0).contains('Yes', { timeout: 1200000 }).should('be.visible')
            cy.log('Selected date jobs are locked')

            //-------(Verification)Veify that the jobs are locked or not----------------------------
            //Step 4 : Navigate to Scheduling
            ipo.locator_SubMenu_Scheduling().click()
            cy.log('Clicked on Scheduling menu item ');

            //Step 5 :  Click on Schedule Viewer sub menu
            cy.xpath("//div[@class='dropDown']/div[contains(text(),'Schedule Viewer')]").click({ force: true })
            cy.log('Clicked on Schedule Viewer sub menu')
            cy.wait(10000)


            //working with iframes
            cy.frameLoaded("[class='svIframe ng-scope']")
            //cy.wait(10000)

            //Select the network 
            cy.iframe().xpath("//div[div[text()='Network']]//div[@class='ant-select-selection__rendered']").trigger("click")
            cy.iframe().xpath("//ul[@role='listbox']/li[contains(text(),'AEN')]").eq(0).trigger("click").click({ force: true })

            //Rght click on any job which is not LEFT and click on Unplace option
            cy.iframe().xpath("//div[@class='schedules-container']/div[@id='breaks-and-schedules']/div[@id='rows']/div[@class='break-row']//div[@class='sv-ad-item-inner']").eq(1).rightclick()
            cy.wait(3000)
            cy.iframe().xpath("//div[@class='context-menu']//div[@class='context-menu-item unplace']").trigger("click")
            cy.log('Clicked on Unplace option from right click')

            //Click on button 'Unplace Ad Unit to'
            cy.xpath("//button[@id='cancelSaveOk.Unplace Ad Unit to']").trigger("click")
            cy.log('clicked on the button Unplace Ad Unit to, after selecting the date')
            // cy.xpath("//button[@id='cancelSaveOk.Yes']").trigger("click")

            //new thing
            cy.xpath("//button[text()='Yes']").trigger("click")

            //(Verification) Verify the pop contain lock message or not
            cy.xpath("//div[@class='popupWindow ng-scope']//div[@class='popupWindowBody']").then((ee) => {
                if (ee.text().includes('Head/Net/Date schedule is locked.')) {
                    cy.log('succusfully! Job is locked, So it is unable to replcae it')
                }
                else {
                    cy.log('Something went wrong')
                }
            })

            //Click on OK button in the pop up
            cy.xpath("//button[@class='btnSmall light']").trigger("click")
            cy.log('Clicked on OK button in the pop up')

            //-------------------------------------------------------------------------------------------------------
            //----------------------------------un lock scenario------------------------------------------------------
            // Navigate to Scheduling
            ipo.locator_SubMenu_Scheduling().click()
            cy.log('Clicked on Scheduling menu item ');

            // Click on Scheduling Status sub menu
            cy.xpath("//div[@class='dropDown']/div[contains(text(),'Schedule Status')]").click({ force: true })
            cy.log('Clicked on Scheduling Status sub menu')

            //Check on the first row of the table to unlock 
            cy.xpath("//div[@class='grid-canvas']/div/div[1]").eq(0).click({ force: true })

            //Clik on the unlockSchedules button
            cy.xpath("//button[@id='scheduleStatusPage.unlockSchedules']").click({ force: true })
            cy.log('Cliked on the unlockSchedules button')

            //Wait for the job to unlock
            cy.xpath("//div[@class='grid-canvas']/div/div[8]", { timeout: 1200000 }).eq(0).scrollIntoView().then(() => {
                for (let i = 0; i < 6; i++) {
                    cy.xpath("//div[@class='grid-canvas']/div/div[8]").eq(0).then((ff) => {
                        if (ff.text().includes('Yes')) {
                            cy.wait(6000)
                        }
                        else { return false }
                    })
                }
            })

            //(Verification) Verify that row status became No
            cy.xpath("//div[@class='grid-canvas']/div/div[8]").eq(0).contains('No', { timeout: 1200000 }).should('be.visible')
            cy.log('Successfully! Job is unlocked')

            // Navigate to Scheduling
            ipo.locator_SubMenu_Scheduling().click()
            cy.log('Clicked on Scheduling menu item ');

            // Click on Schedule Viewer sub menu
            cy.xpath("//div[@class='dropDown']/div[contains(text(),'Schedule Viewer')]").click({ force: true })
            cy.log('Clicked on Schedule Viewer sub menu')

            //Working with iframe
            //to loded the total frame
            cy.frameLoaded("[class='svIframe ng-scope']")
            cy.wait(5000)

            //Select the network
            cy.iframe().xpath("//div[div[text()='Network']]//div[@class='ant-select-selection__rendered']").trigger("click")
            cy.iframe().xpath("//ul[@role='listbox']/li[contains(text(),'AEN')]").eq(0).trigger("click").click({ force: true })
            cy.log('Selected the network')

            //Get the count of the unplaced jobs before unplace another
            cy.frameLoaded("[class='svIframe ng-scope']")
            cy.wait(5000)
            cy.iframe().xpath("//div[@class='unplaced-ad-unit-inner']").its('length').then((beforeCount) => {

                //Rght click on any job which is not LEFT and click on Unplace option
                cy.iframe().xpath("//div[@class='schedules-container']/div[@id='breaks-and-schedules']/div[@id='rows']/div[@class='break-row']//div[@class='sv-ad-item-inner']").eq(1).rightclick()
                cy.iframe().xpath("//div[@class='context-menu']//div[@class='context-menu-item unplace']").trigger("click")
                cy.log('Rght click on any job which is not LEFT and clicked on Unplace option')

                //Click on Unplace Ad Unit to button
                cy.xpath("//button[@id='cancelSaveOk.Unplace Ad Unit to']").trigger("click")
                cy.log('Clicked on Unplace Ad Unit to button')

                //new thing
                cy.xpath("//button[text()='Yes']").trigger("click")

                //---------------verifiction----------------------
                cy.frameLoaded("[class='svIframe ng-scope']")
                cy.wait(5000)
                cy.iframe().xpath("//div[@class='unplaced-ad-unit-inner']").its('length').then((afterCount) => {
                    assert.notEqual(beforeCount, afterCount, 'Successfully! Job Unplaced')
                    //cy.get('.datatable').find('tr').its('length').should('eq', 4)
                    //cy.get('.datatable').find('tr').its('length').should('be.gte', 4)
                })
            })


        })
    })

})