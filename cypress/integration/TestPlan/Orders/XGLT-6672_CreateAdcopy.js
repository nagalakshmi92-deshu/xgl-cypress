/// <reference types="cypress-xpath"/>

import CreateCustomerTestpageObject from '../../../support/ObjectRepository/Orders/CreateCustomerTestpageObject'
describe('XGLT-6672_CreateAdcopy', () => {
    const ocm = new CreateCustomerTestpageObject()
    var create_adCopyID;
    var row_adCopyID;

    before(function () {
        cy.fixture('Configurations.json').then(function (data) {
            this.data = data
            //LOGIN INTO APPLICATION

            cy.visit(this.data.Environment.baseURL).then(() => {
                cy.viewport(1300, 660)
                // cy.login(this.data.Environment.Username,this.data.Environment.Password, {sensitive:true})
                cy.log('Entering Username')
                ocm.locator_Login_Username().type(this.data.Environment.Username, { sensitive: true })
                cy.log('Entering  Password')
                ocm.locator_Login_Password().type(this.data.Environment.Password, { sensitive: true })
                cy.log('Click on Login Button')
                ocm.locator_Login_LoginButton().click({ log: false })
                cy.log('Success !!');
            })

        })
    })
    it('Verification of the ticket XGLT-6684_AdCopyStatus', () => {
        cy.fixture('missionControl.json').then(function (data) {
            this.data = data

            cy.wait(5000)
            //(Verification) landed on dashboed page
            cy.url().should('contain', '/MissionControl');
            cy.log('Successfully landed on dashboard');
            cy.screenshot();

            //Click on the Main Menu Orders 
            ocm.locator_Click_on_Main_Menu_Orders()
                .should('be.visible')
                .click({ log: false });
            cy.log('Clicked on the Main Menu Orders Sucessfully')

            //Click on Ad copy
            ocm.locator_Click_onSubMenu_AdCopy()
                .should('be.visible')
                .click({ log: false })
            cy.log('Clicked on the adCopy ')

            //(Verification) Verify that we reached adCopy page 
            cy.url().should('contain', 'AdCopy')
            cy.log('Successfully landed on AdCopy page')

            //Click on + sign to Create and Ad copy
            ocm.locator_Click_On_Plus_Sign_to_Create_new_Adcopy().click({ log: false })
            cy.log('Clicked on the + button, to create new adCopy')

            //Select the customer name
            ocm.locator_input_the_name().type('delaplex')
            cy.log('Entered Customer name')

            //Enter adcopy Length
            ocm.locator_enter_length().type(30)
            cy.log('Entered the length')

            //Enter Customer name
            ocm.locator_type_Customer_name().click({ force: true })
            cy.log('Entered the Customer name')

            //Select the customer name from the dropdown
            ocm.locator_select_Customer_name().click({ force: true })
            cy.log('Selected the required customer from dropdown')

            //Check on Encoded
            ocm.locator_Click_on_encoded().click({ log: false })
            cy.log('Checked on Encoded checkbox')

            //Check on Received
            ocm.locator_Click_on_received().click({ log: false })
            cy.log('Checked on not received checkbox ')

            //Select commodity from dropdown
            cy.xpath("//div[@name='commodity']/input").click({ force: true })
            cy.wait(1000)
            cy.xpath("//div[@name='commodity']/div/div/span").eq(1).click({ force: true })
            cy.wait(3000)
            cy.screenshot();

            //Save ADcopy
            ocm.locator_click_on_save().click({ log: false })
            cy.log('Clicked on the save button ')
            cy.wait(5000)

            //Get the created AdCopy ID
            cy.xpath("//div[@class='breadcrumbs ng-isolate-scope']/div[@class='crumb ng-scope last']").then((ee) => {
                const e1 = ee.text();
                cy.log(e1)
                var e2 = e1.split(':')
                cy.log(e2)
                var e3 = e2[1].trim();
                cy.log(e3)
                this.create_adCopyID = e3
                cy.log('Customer ID= ' + this.create_adCopyID)
                cy.screenshot();

                //(Verification) Verify the Order profile page is reached or not
                cy.url().should('contain', 'profile')
                cy.log('Successfully reached Order Profile page!')

                //Click on the Main Menu Orders 
                ocm.locator_Click_on_Main_Menu_Orders()
                    .should('be.visible')
                    .click({ log: false });
                cy.log('Clicked on the Main Menu Orders Sucessfully')

                //Click on Ad copy in sub menu
                ocm.locator_Click_onSubMenu_AdCopy()
                    .should('be.visible')
                    .click({ log: false })
                cy.log('Clicked on the adCopy ')

                //(Verification) Verify that AdCopy page is visible or not
                cy.url().should('contain', 'AdCopy')
                cy.log('Successfully landed on AdCopy page')
                cy.wait(2000)

                //Enter the AdCopy ID and click on search button
                cy.xpath("//div[@id='adCopyGrid.selectSearch']//input[@ng-model='tempModel.value']")
                    .invoke('show').clear()
                    .click({ log: false })
                    .type(this.create_adCopyID)
                cy.log('Entered the AdCopy ID ')
                cy.wait(3000)

                //Click on Search button
                cy.xpath("//div[@id='adCopyGrid.selectSearch']//b[@class='loupe']")
                    .click()
                cy.log('Clicked on search button')
                cy.wait(5000)
                cy.screenshot();

                //(Verification) Verify the created AdCopy is visible on the top of the row
                //cy.xpath("//div[@class='slick-viewport']/div/div/div").eq(1).invoke('text')
                cy.get("div.slick-viewport div div.ui-widget-content.slick-row div:nth-child(2)").eq(0).then((e1) => {
                    row_adCopyID = e1.text().trim()
                    cy.log('AdCopyID :' + row_adCopyID)
                    if ((row_adCopyID) == (this.create_adCopyID)) {
                        cy.log('Success! Created AdCopy ID is visible in the row list')
                    }
                    else {
                        assert.equal((row_adCopyID), (this.create_adCopyID), 'AdCopyID is not created properly')
                    }
                })

            })
        })
    })
})