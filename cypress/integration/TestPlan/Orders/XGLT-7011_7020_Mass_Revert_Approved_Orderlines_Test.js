/// <reference types="Cypress-xpath" />



import CreateCustomerTestpageObject from '../../../support/ObjectRepository/Orders/CreateCustomerTestpageObject'
import MissionControlPageObject from '../../../support/ObjectRepository/MissionControl/MissionControlPageObject'
import CreateORRetailandthreasoldPageObject from '../../../support/ObjectRepository/Orders/CreateORRetailandthreasoldPageObject'
import MassRevertOrderlinesTest_PageObject from '../../../support/ObjectRepository/Orders/MassRevertOrderlinesTest_PageObject'
//import { isEqual } from 'cypress/types/lodash'

describe('Verification of Order Copy Mangement', () => {
    const ocm = new CreateCustomerTestpageObject();
    const mso = new MissionControlPageObject();
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

    it('XGLT-7011 MassRevert Orderlines Test', () => {
        cy.fixture('Configurations.json').then(function (data) {
            this.data = data;
            //Step 1: (Verification) landed on dashboed page
            cy.url().should('contain', '/MissionControl');
            cy.log('Successfully landed on dashboard');
            cy.screenshot();

            // Step 2: Click over 'Order ' menu Item 
            cy.contains('Ad Copy Handling')
            ocm.locator_Verify_Menu_Items().click()
            cy.log('Clicked on order menu item ');


            // Step 3 : Click over orderLines 
            mro.locator_SubMenu_OrderLine().should('be.visible').click()
            cy.url().should('contain', '/Orderlines');
            cy.log('Successfully landed on Orderlines page');
            cy.screenshot();

            //Step 4 : Click on date and select todays date 
            // cy.xpath('//div[contains(.,"Ordered")]/parent::div/div[@class="inputIcon inputCalendar posRel"]/child::div/i', { log: false }).click()
            // cy.wait(2000)
            // cy.log('successfully clicked on Custom dates redio buttons')

            // const currentdate3 = new Date().getDate();

            // mso.locator_Date_StartDate().contains(currentdate3).click()
            // mso.locator_Date_ThruDate().contains(currentdate3).click()
            // cy.wait(1000)
            // mro.locator_SaveButton().click({ force: true })
            // cy.log('Successfully clicked on Save button ')


            //Step 5 : Select Advance filter options 
            mro.locator_AdvanceFilterArrow().scrollIntoView().should('be.visible').trigger('mouseover').click()
            cy.log('successfully clicked over Advance filter option arrow ')
            cy.screenshot()

            //Step 6 : Select Advance filter options (Order line status)
            mro.locator_OrderLineStatusArrow().should('be.visible').trigger('mouseover').click()
            cy.log('successfully clicked over Order line status arrow ')
            cy.screenshot()

            // Step 7 : Click over Approved_Scheduled 
            mro.locator_SubMenu_Approved_Scheduled().should('be.visible').click()
            cy.log('Selected Approved_Scheduled option ');

            // Select customer name  from Free Form Search Box arrow
            mro.locator_Customer_nameArrow().should('be.visible').trigger('mouseover').click()
            cy.log('successfully clicked over Order line status arrow ')
            mro.locator_SubMenu_CustomerName().should('be.visible').click()
            cy.log('Selected Approved_Scheduled option ');
            mro.locator_Customer_nameInput().should('be.visible').type('Anand1')
            cy.log('Input value to customer name ');
            mro.locator_Customer_nameInputArrowIcon().click({ force: true })
            cy.log('clicked on arrow button ')

            //Step 8 : Clicked over Search button 
            mro.locator_SearchButtonOnAdvanceFilter().should('be.visible').click()
            cy.log('Clicked on Search button');
            cy.wait(10000)
            //(Verification)
            mro.locator_APRecords().should('be.visible')
            cy.log('Approved records present on screen ');

            //Step 9: (Verification) Click over select all button
            mro.locator_SelectDeselectAllButton().scrollIntoView().click({ force: true })
            cy.log('Click on select all button ')
            cy.wait(10000)

            // Step 10 : Click on revert button 
            //(verification) - All records are in AP mode 
            mro.locator_AP_PR_Records().then((e1) => {
                if (e1.hasClass('ngCellText statusIcon AP')) {
                    cy.log('The list contains AP records states')
                }
            })
            cy.xpath('//div[@name="filterForm"]/child::div[2]//button[@id="orderlinesGrid.revert"]', { timeout: 60000 }).scrollIntoView().then((e1) => {
                e1.click()
                cy.log('Click on revert button ')
                cy.wait(20000)
            })

            //Step 11 :(Verification) - PR 
            mro.locator_AP_PR_Records().then((e1) => {
                if (e1.hasClass('ngCellText statusIcon PR')) {
                    cy.log(' The all records converted to Approved to proposed records states')
                    //Conversion Logic 
                    // Select Advance filter options 
                    mro.locator_AdvanceFilterArrow().scrollIntoView().should('be.visible').trigger('mouseover').click()
                    cy.log('successfully clicked over Advance filter option arrow ')
                    cy.screenshot()

                    //Select Advance filter options (Order line status)
                    mro.locator_OrderLineStatusArrow().should('be.visible').trigger('mouseover').click()
                    cy.log('successfully clicked over Order line status arrow ')
                    cy.screenshot()

                    //Click over proposed
                    mro.locator_SubMenu_Proposed_Scheduled().should('be.visible').click()
                    cy.log('Selected Approved_Scheduled option ');

                    // Select customer name  from Free Form Search Box arrow
                    mro.locator_Customer_nameArrow().should('be.visible').trigger('mouseover').click()
                    cy.log('successfully clicked over Order line status arrow ')
                    mro.locator_SubMenu_CustomerName().should('be.visible').click()
                    cy.log('Selected Approved_Scheduled option ');
                    mro.locator_Customer_nameInput().should('be.visible').clear().type('Anand1')
                    cy.log('Input value to customer name ');
                    mro.locator_Customer_nameInputArrowIcon().click({ force: true })
                    cy.log('clicked on arrow button ')

                    //Clicked over Search button 
                    mro.locator_SearchButtonOnAdvanceFilter().should('be.visible').click()
                    cy.log('Clicked on Search button');
                    cy.wait(20000)

                    mro.locator_SelectDeselectAllButton().scrollIntoView().click({ force: true })
                    cy.log('Click on select all button ')
                    cy.wait(20000)

                    //Click on Approved button
                    mro.locator_ApproveButton().scrollIntoView().click()
                    cy.log('Click on Approved button successfully')
                    cy.wait(60000)

                    if (e1.hasClass('ngCellText statusIcon AP')) {
                        cy.log('All records converted to Approved ')
                    }
                    else if (e1.hasClass('ngCellText statusIcon PR')) {
                        cy.log('Some of records are not converted to AP states')
                    }
                    else {
                        cy.log('The list still contains proposed records and not converted into Approved states')
                        throw new Error("Test fails here ,The list still contains proposed records and not converted into Approved states !!")
                    }
                }
                else {
                    cy.log('The list still contains proposed records and not converted into Approved states')
                    throw new Error("Test fails here ,The list still contains Approved  records and not converted into proposed states !!")
                }
            })
           
            


        })
    })
})

