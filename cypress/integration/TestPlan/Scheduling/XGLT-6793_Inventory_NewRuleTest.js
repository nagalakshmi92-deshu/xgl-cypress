/// <reference types="Cypress-xpath" />

import MissionControlPageObject from '../../../support/ObjectRepository/MissionControl/MissionControlPageObject'
import Inventory_NewRuleTestPO from '../../../support/ObjectRepository/Scheduling/Inventory_NewRuleTestPageObject'
import MassRevertOrderlinesTest_PageObject from '../../../support/ObjectRepository/Orders/MassRevertOrderlinesTest_PageObject'

describe('Verification of Inventry/Program Management', () => {

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

    it('XGLT-6793 - Inventory New Rule Test', () => {
        cy.fixture('Configurations.json').then(function (data) {
            this.data = data;
            //Step 1: (Verification) landed on dashboed page
            cy.url().should('contain', '/MissionControl');
            cy.log('Successfully landed on dashboard');
            cy.screenshot();

            // Step 2: Navigate to Scheduling
            ipo.locator_SubMenu_Scheduling().click()
            cy.log('Clicked on Scheduling menu item ');


            // Step 3 : Click over Inventory sub menu Item 
            ipo.locator_SubMenu_Inventory().should('be.visible').click()
            cy.url().should('contain', '/InventoryAllocationRules');
            cy.log('Successfully landed on Orderlines page');
            cy.screenshot();

            //Step 4 : Click on plus icon 
            ipo.locator_PlusIcon().scrollIntoView().should('be.visible').trigger('mouseover').click()
            cy.log('successfully clicked over plus icon ')
            cy.contains('New Inventory Allocation Rule')
            ipo.locator_label_NewInventoryAllocationRule().then((el) => {
                expect(el.text()).equals('New Inventory Allocation Rule')
            })
            cy.log('successfully landed on New Inventory Allocation Rule')
            cy.screenshot()

            //Step 5 : Input data Inventory Type 
            ipo.locator_InventoryType().should('be.visible').trigger('mouseover').click()
            cy.log('successfully clicked over Inventory Type ')
            cy.wait(5000)
            cy.Select_InventoryType(this.data.XGLT_6793.InventoryType)
            cy.screenshot()
            cy.log('successfully clicked over Inventory Type and added inventory type is  =' + this.data.XGLT_6793.InventoryType)

            // Step 6 :Input data priority 
            ipo.locator_InputPriority().should('be.visible').clear().type(this.data.XGLT_6793.priority)
            cy.log('successfully added priority is  =' + this.data.XGLT_6793.priority)

            // Step 7: Select Network 
            ipo.locator_InputNetwork().should('be.visible').trigger('mouseover').click({ force: true })
            cy.log('successfully clicked over Network input ')
            cy.Select_Network(this.data.XGLT_6793.Network_name)
            cy.log('Selected Network name is = ' + this.data.XGLT_6793.Network_name);
            cy.screenshot()

            // Step 8 : Add Allocation Schedules
            ipo.locator_buttonAdd().scrollIntoView().click({ force: true })
            cy.contains('Add Schedule')
            ipo.locator_buttonSaveOnAddSchedular().scrollIntoView().click({ force: true })
            cy.log(' Added Allocation Schedules')

            //Step  9: Click on Save button       
            cy.scrollTo('top')
            ipo.locator_buttonSave().scrollIntoView().click({ force: true });
            cy.log('Click on Save button ')

            //Step 10 :(Retrive Inventory Allocation Rule ID from page)
            cy.xpath('//div[@class="innerCrumb ng-isolate-scope"]/span[@class="ng-scope" and contains(.,":")]').invoke('text').then((e1) => {
                var e2 = e1.split(':')
                var e3 = e2[1].trim()
                this.inventoryAllocationRule_id = Number(e3)
                cy.log('Recently Inventory Allocation Rule ID ' + this.inventoryAllocationRule_id)
            })
            cy.pause()
            
            //Step 11 : Click over bread crumb 
            ipo.locator_breadCrumbsInventoryAllocationRules().should('be.visible').trigger('mouseover').click()
            cy.log('Successfully clicked over  bread crumb ')
            cy.contains('Inventory Allocation Rules')


            //Step 12: Apply Advance filter option
            // Select Advance filter options 
            cy.scrollTo('right')
            cy.scrollTo('right')
            cy.wait(5000)
            ipo.locator_AdvanceFilterArrow().scrollIntoView().should('be.visible').trigger('mouseover').click()
            cy.log('successfully clicked over Advance filter option arrow ')
            cy.screenshot()

            //Select Advance filter options (ID)
            ipo.locator_InputID().should('be.visible').trigger('mouseover').click()
            cy.wait(5000)
            //ipo.locator_lastId().scrollTo("bottom").click({ force: true })
            //ipo.locator_lastId().focus().wait(1000).contains(''+this.inventoryAllocationRule_id+'').click()
            //ipo.locator_InputID().should('be.visible').trigger('mouseover').clear().type(this.inventoryAllocationRule_id)
            cy.log('recently created record selected ')

            cy.log('successfully clicked over ID ')
            cy.wait(5000)
            cy.screenshot()
            cy.pause()

            //Search Id in list
            //cy.Select_ValueFromDropDown(this.inventoryAllocationRule_id)
            cy.pause()
            //Clicked over Search button 
            ipo.locator_SearchButtonOnAdvanceFilter().should('be.visible').click()
            cy.log('Clicked on Search button');
            cy.wait(20000)

            // Step : (Verification) record i table list
            cy.xpath('//div[@class="grid-canvas"]/child::div/div[2]').then((el)=>{
                if(e1.text().includes('306398148'))
                {
                    e1.click()
                    cy.log('record is present and clicked on it ')
                }
                else{
                    cy.log('Record not vavialable on screen ')
                }
            })

        })

    })


})