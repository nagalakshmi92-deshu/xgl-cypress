/// <reference types="Cypress-xpath" />

import Create_InventoryTypesTestPageObject from '../../../support/ObjectRepository/Configuration/Create_InventoryTypesTestPageObject'
import MissionControlPageObject from '../../../support/ObjectRepository/MissionControl/MissionControlPageObject'
import 'cypress-file-upload';
describe('Verification of XGLT-6824_Inventory_Conversion_Rule_Test ', () => {
    const inp = new Create_InventoryTypesTestPageObject();
    const mso = new MissionControlPageObject();

    //Use the cy.fixture() method to pull data from fixture file
    before(function () {
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

    it('XGLT-6666 Create Customer Test', () => {
        cy.fixture('Configurations.json').then(function (data) {
            this.data = data;

            //(Verification) landed on dashboed page
            cy.url().should('contain', '/MissionControl');
            cy.log('Successfully landed on dashboard');
            cy.screenshot();

            //Step 1: Click on the Configuration from main menu
            inp.locator_SubMenu_Configuration()
                .should('be.visible')
                .click({ force: true })
            cy.log('Clicked on the Configuration from main menu')

            //Step 2: Click on the Schedule settings
            inp.locator_SubMenu_Scheduling()
                .should('be.visible')
                .click({ force: true })
            cy.log('Clicked on the Schedule settings')

            
        })
    })
})
