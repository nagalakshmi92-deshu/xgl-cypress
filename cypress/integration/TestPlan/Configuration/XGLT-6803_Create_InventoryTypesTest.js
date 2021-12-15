/// <reference types="Cypress-xpath" />




import MissionControlPageObject from '../../../support/ObjectRepository/MissionControl/MissionControlPageObject'
import Create_InventoryTypesTestPageObject from '../../../support/ObjectRepository/Configuration/Create_InventoryTypesTestPageObject'

describe('Verification of Inventry/Program Management', () => {

    const mso = new MissionControlPageObject();
    const itt = new Create_InventoryTypesTestPageObject()
    //Use the cy.fixture() method to pull data from fixture file
    // program to generate random strings
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    function generateString(length) {
        let result = ' ';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        return result;
    }
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

    it('XGLT-6803 - Create Inventory Types Test', () => {
        cy.fixture('Configurations.json').then(function (data) {
            this.data = data;
            //Step 1: (Verification) landed on dashboed page
            cy.url().should('contain', '/MissionControl');
            cy.log('Successfully landed on dashboard');
            cy.screenshot();


            // Step 2: Navigate to Configurations
            cy.contains('Ad Copy Handling')
            itt.locator_SubMenu_Configuration().click()
            cy.log('Clicked on Configurations menu item ');

            // Step 3 : Click over Inventory Settings sub menu Item 
            itt.locator_SubMenu_InventorySettings().should('be.visible').click()
            cy.url().should('contain', '/InventorySettings/InventoryTypes');
            cy.log('Successfully landed on Inventory Settings page');
            cy.contains('Inventory Settings')
            cy.screenshot();

            //Step 4 : Click on plus icon 
            itt.locator_PlusIcon().scrollIntoView().should('be.visible').trigger('mouseover').click()
            cy.log('successfully clicked over plus icon ')
            cy.contains('New Inventory Type')
            cy.log('successfully landed on New Inventory Type')
            cy.screenshot()

            //Step 5 : Input data New Inventory Type
            this.number = Math.floor((Math.random() * 1000) + 1);
            itt.locator_inputInventoryType().type(this.number)
            cy.log('successfully entered Inventory Type ')
            cy.wait(5000)

            // Input  Apply to Region and select region 
            itt.locator_applyToregionArrow().scrollIntoView().click({ force: true })
            cy.log('Successfully clicked on Applyto region arrow button ')
            cy.wait(2000)
            itt.locator_applyToregionRecord().scrollIntoView().click();
            cy.log('Successfully selected record on Applyto region  ')

            //Input description 
            this.description = 'IN_Type';
            cy.log('successfully entered description ' + this.description)

            itt.locator_inputDescription().type(this.description)
            cy.log('successfully entered number ' + this.number)

            // Select color
            itt.locator_displayColorArrow().scrollIntoView().click({ force: true })
            itt.locator_dragColorPoint().trigger('dragstart').click()
            itt.locator_dragColorChooseButton().scrollIntoView().should('be.visible').click()
            cy.log('color selected ')

            //Step  9: Click on Save button       
            cy.scrollTo('top')
            itt.locator_buttonSave().scrollIntoView().click({ force: true });
            cy.log('Click on Save button ')

            //Step 11 : Click over bread crumb 
            itt.locator_breadCrumb().should('be.visible').trigger('mouseover').click()
            cy.log('Successfully clicked over  bread crumb ')
            cy.contains('Inventory Settings')
            cy.screenshot()

            // Step 11 : Input description 
            itt.locator_inputDescription().scrollIntoView().clear().type(this.description)
            itt.locator_inputDescriptionmagnifyIcon().scrollIntoView().click({ force: true })
            cy.log('Entered description is = ' + this.description)
            cy.screenshot()

            //Step 12 : (Verification) Inventory description present in list 
            cy.xpath('//div[@class="grid-canvas"]/child::div/div[2]', { timeout: 120000 }).then((el) => {
                if (e1.text().includes(this.description)) {
                    e1.click()
                    cy.log('record is present and clicked on it ')
                }
                else {
                    cy.log('Record not vavialable on screen ')
                }
            })
            //Step 13 : (Verification) Inventory ID present in list 
            cy.xpath('//div[@class="grid-canvas"]/child::div/div[1]', { timeout: 120000 }).then((el) => {
                if (e1.text().includes(this.number)) {
                    e1.click()
                    cy.log('record is present and clicked on it ')
                }
                else {
                    cy.log('Record not vavialable on screen ')
                }
            })
        })
    })


})