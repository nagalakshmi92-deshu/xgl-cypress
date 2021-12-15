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

            //===========================add copy==========================================
            //-------------------add copy-------------------------------------------
            //Get the count of the unplaced jobs before unplace another
            cy.frameLoaded("[class='svIframe ng-scope']")
            cy.wait(5000)
            cy.iframe().xpath("//div[@class='unplaced-ad-unit-inner']").its('length').then((beforeCount) => {

                //Rght click on any job which is not LEFT and click on Copy option
                cy.iframe().xpath("//div[@class='schedules-container']/div[@id='breaks-and-schedules']/div[@id='rows']/div[@class='break-row']//div[@class='sv-ad-item-inner']").eq(1).rightclick({ force: true })
                cy.iframe().xpath("//div[@class='context-menu']//div[text()='Copy']").trigger("click")
                cy.log('Rght click on any job which is not LEFT and clicked on Copy option')

                //(verifiction) Verify that job is unplaced
                cy.frameLoaded("[class='svIframe ng-scope']")
                cy.wait(5000)
                cy.iframe().xpath("//div[@class='unplaced-ad-unit-inner']").its('length').should('be.greaterThan', beforeCount)
                cy.log("Successfully! Unplace has done")
                cy.wait(5000)
            })

            //---------------------cut -----------------------------------------
            //Right click on Cut option
            cy.frameLoaded("[class='svIframe ng-scope']")
            cy.wait(5000)
            cy.iframe().xpath("//div[@class='unplaced-ad-unit-inner']").its('length').then((beforeCount) => {
                cy.iframe().xpath("//div[@class='unplaced-ad-unit-inner']").eq(1).rightclick({ force: true })
                cy.iframe().xpath("//div[@class='context-menu']//div[text()='Cut']").trigger("click")
                cy.log('Right clicked on Cut option')
                cy.wait(5000)
                
                //(Verfication) Verify that Cut option  
                cy.iframe().xpath("//div[@class='unplaced-ad-unit-inner']").its('length').should('be.lessThan', beforeCount)
                cy.log("Successfully! Auto Reschedule has done")
                cy.wait(5000)
            })

            //===========================add exceptions to spots and Clear Exception================================================
            //---------------------------------------------Add Exception----------------------------------------------------------
            cy.frameLoaded("[class='svIframe ng-scope']")
            cy.wait(5000)
            //Rght click on any job which is not LEFT and click on Add/Modify Exception option
            cy.iframe().xpath("//div[@class='schedules-container']/div[@id='breaks-and-schedules']/div[@id='rows']/div[@class='break-row']//div[@class='sv-ad-item-inner']").eq(1).rightclick({ force: true })
            cy.iframe().xpath("//div[@class='context-menu']//div[text()='Add/Modify Exception']").trigger("click")
            cy.log('Rght click on any job which is not LEFT and clicked on Add/Modify Exception option')

            //Select the exception
            cy.xpath("//div[@name='exception']/input").click({force:true})
            cy.xpath("//div[@class='auto-complete-list-drop-down ng-isolate-scope']//span").eq(0).click({force:true})
            cy.log('Select the exception from the dropdown')

            //Click on the button Assign Exception
            cy.xpath("//button[@id='cancelSaveOk.Assign Exception']").click({force:true})
            cy.log('Clicked on the button Assign Exception')

            //Get the text from pop to confirm and click on OK button
            cy.xpath("//div[@class='modal-content']//h2").then((ee)=>{
                if(ee.text().includes('Ad Unit item was processed'))
                {
                    cy.log('Successfully! Reached required page')
                }
                else
                {
                    cy.log('Something went wrong')
                }
            })
            cy.xpath("//button[@id='cancelSaveOk.OK']").click({force:true})
            cy.log('Successfully! Exception')

            //------------Clear Exception-----------------------------------------
            cy.frameLoaded("[class='svIframe ng-scope']")
            cy.wait(5000)
            //Rght click on any job which is not LEFT and click on Add/Modify Exception option
            cy.iframe().xpath("//div[@class='schedules-container']/div[@id='breaks-and-schedules']/div[@id='rows']/div[@class='break-row']//div[@class='sv-ad-item-inner']").eq(1).rightclick({ force: true })
            cy.iframe().xpath("//div[@class='context-menu']//div[text()='Add/Modify Exception']").trigger("click")
            cy.log('Rght click on any job which is not LEFT and clicked on Add/Modify Exception option')

            //Click on the Clear Exception button
            cy.xpath("//button[@id='cancelSaveOk.Clear Exception']").should('be.enabled').click({force:true})
            cy.log('Clicked on the Clear Exception button')
            cy.log('Successfully! Cleared the Exception')  
        })

    })
})
