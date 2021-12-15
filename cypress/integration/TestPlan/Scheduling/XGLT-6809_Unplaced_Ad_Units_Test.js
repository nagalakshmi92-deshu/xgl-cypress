/// <reference types="Cypress-xpath" />
/// <reference types="Cypress-iframe" />

import MissionControlPageObject from '../../../support/ObjectRepository/MissionControl/MissionControlPageObject'
import Inventory_NewRuleTestPO from '../../../support/ObjectRepository/Scheduling/Inventory_NewRuleTestPageObject'
import MassRevertOrderlinesTest_PageObject from '../../../support/ObjectRepository/Orders/MassRevertOrderlinesTest_PageObject'
import 'cypress-iframe'
describe('Verification of XGLT-6813', () => {

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
                cy.viewport(1300,900)
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

    it('XGLT-6813 Scheduling Editing test', () => {
        cy.fixture('Configurations.json').then(function (data) {
            this.data = data;
            //(Verification) landed on dashboed page
            cy.url().should('contain', '/MissionControl');
            cy.log('Successfully landed on dashboard');
            cy.screenshot();

            // Step 1: Navigate to Scheduling
            ipo.locator_SubMenu_Scheduling().click()
            cy.log('Clicked on Scheduling menu item ');

            // Click on Schedule Viewer sub menu
            cy.xpath("//div[@class='dropDown']/div[contains(text(),'Schedule Viewer')]").click({ force: true })
            cy.log('Clicked on Schedule Viewer sub menu')

            //====================unplace and rescedule========================================================

            //---------------------------Unplace----------------------------------------

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
                cy.iframe().xpath("//div[@class='schedules-container']/div[@id='breaks-and-schedules']/div[@id='rows']/div[@class='break-row']//div[@class='sv-ad-item-inner']").eq(1).rightclick({ force: true })
                cy.iframe().xpath("//div[@class='context-menu']//div[@class='context-menu-item unplace']").trigger("click")
                cy.log('Rght click on any job which is not LEFT and clicked on Unplace option')

                //Click on Unplace Ad Unit to button
                cy.xpath("//button[@id='cancelSaveOk.Unplace Ad Unit to']").trigger("click")
                cy.log('Clicked on Unplace Ad Unit to button')

                //(verifiction) Verify that job is unplaced
                cy.frameLoaded("[class='svIframe ng-scope']")
                cy.wait(5000)
                cy.iframe().xpath("//div[@class='unplaced-ad-unit-inner']").its('length').should('be.greaterThan', beforeCount)
                cy.log("Successfully! Unplace has done")
                cy.wait(5000)
            })

            //----------------------------Reschedule-----------------------------------------------------
            //Right click on Auto Reschdule option
            cy.frameLoaded("[class='svIframe ng-scope']")
            cy.wait(5000)
            cy.iframe().xpath("//div[@class='unplaced-ad-unit-inner']").its('length').then((beforeCount) => {
                cy.iframe().xpath("//div[@class='unplaced-ad-unit-inner']").eq(0).rightclick({ force: true })
                cy.iframe().xpath("//div[@class='context-menu']//div[text()='Auto Reschedule']").trigger("click")
                cy.log('Right clicked on Auto Reschdule option')
                cy.wait(3000)

                //(Verfication) Verify that Auto Reschdule 
                cy.iframe().xpath("//div[@class='unplaced-ad-unit-inner']").its('length').should('be.lessThan', beforeCount)
                cy.log("Successfully! Auto Reschedule has done")
                cy.wait(5000)
            })
        })
    })

})