/// <reference types="Cypress-xpath" />


import CreateORRetailandthreasoldPageObject from '../../../support/ObjectRepository/Orders/CreateORRetailandthreasoldPageObject'
import CreateCustomerTestpageObject from '../../../support/ObjectRepository/Orders/CreateCustomerTestpageObject'


describe('Verification of XGLT-6696', () => {
    const rt = new CreateORRetailandthreasoldPageObject();
    const ocm = new CreateCustomerTestpageObject()

    var priority_before;
    var priority_after;
    //Use the cy.fixture() method to pull data from fixture file

    before(() => {
        cy.fixture('missionControl.json').then(function (data) {
            this.data = data;
            cy.visit(this.data.Environment.baseURL).then(() => {
                cy.log('Entering Username')
                ocm.locator_Login_Username().type(this.data.Environment.Username, { sensitive: true });
                cy.log('Entering  Password')
                ocm.locator_Login_Password().type(this.data.Environment.Password, { log: false });
                cy.log('Click on Login Button')
                ocm.locator_Login_LoginButton().click({ log: false });
                cy.log('Sucess !!');
            })
        })

    })
    it('XGLT-6696	Create Orderline Retail and threasold', () => {

        cy.fixture('missionControl.json').then(function (data) {
            this.data = data;

            // Click on the Main Menu Orders 
            rt.locator_Click_on_Main_Menu_Orders().click({ log: false });
            cy.log('Clicked on the Main Menu Orders Sucessfully')

            //Click on Customer in sub-menu
            rt.locator_Click_onSubMenu_Customer().click()
            // cy.wait(2000)
            cy.log('Clicked on the Customer ')

            //(Verification) Verify that Customer page is visible or not
            cy.url().should('contain', 'Customers')
            cy.log('Successfully reached Customer page')

            //Select customer from dropdown
            cy.customer_Name()

            //Enter the customer name into the editbox
           rt.locator_Enter_the_Customer_name().clear().type(this.data.XGLT6696.CustName)

            //Click on Search button
            cy.xpath("//input[@ng-model='tempModel.value']/following-sibling::b")
                .click({ force: true })
            cy.log('Clicked on search button')
            cy.screenshot()

            //Click on the Customer ID
            rt.locator_click_on_CustomerID().eq(0).click({ force: true })
            cy.log('Clicked on the CustomerID')
            // cy.wait(3000)

            //Click on Orders in side menu
            cy.xpath("//div[@class='option']/p[text()='Orders']").trigger('mouseover').click({ force: true })
            cy.log('Clicked on Orders in side menu')
            cy.wait(5000)

            // Click on the order in the Orders page
            cy.xpath("//div[@class='grid-canvas']/div/div").eq(0).click({ force: true })
            cy.log('Clicked on Order Id in the orders page')

            //Click on the NO option in the alert
            //cy.xpath("//button[text()='No']").click({ force: true })
            cy.log('Clicked on the NO option in the alert')
            cy.wait(10000)

            //Click on Orderlines button in sub menu
            cy.xpath("//div[@class='option']/p[text()='Order Lines']").trigger('mouseover').click({ force: true })
            cy.log('Clicked on OrderLines in side menu')

            //Get the priority of the Orderlines
            cy.xpath("//div[@class='slick-header-columns']//span").each((ee, index, list) => {
                if (ee.text().includes('Priority'))
                {
                    const index1 = index-1;
                    cy.get("div[class='grid-canvas'] div div").eq(index1).then((ee) => {
                    priority_before = ee.text().trim()
                    cy.log('priority_before= ' + priority_before)
                })
                }        
            })

            //Click on SelectAll button to select all the checkboxes
            cy.xpath("//div[@class='slick-header-columns']//div[@class='checkBoxSelection']").trigger('mouseover').click({ force: true })
            cy.log('Clicked checkbox on header to select all orderlines')
            cy.scrollTo('top')

            //Click on Modify Selected button
            cy.xpath("//div[@id='orderLinesGrid.massEdit']/i[contains(text(),'Modify Selected')]").scrollIntoView().trigger('mouseover').click({ force: true })
            cy.log('Clicked on Modify Selected button')

            //Click on Edit button of priority
            cy.xpath("//div[@ng-if='d.btn.priority']/i[@class='edit']").click()
            cy.log('Entered priority value into priority textbox')

            //Enter priority value into the textbox
            cy.xpath("//input[@id='scheduling_priority_textbox']").click().clear().type(this.data.XGLT6696.priority)
            cy.log('Entered priority value into the textbox')

            //Click on Modify button
            cy.xpath("//button[text()='Modify']").trigger('mouseover').click({ force: true })
            cy.log('Clicked on Modify button')

            //Click on yes button
            cy.xpath("//button[text()='Yes']").trigger('mouseover').click({ force: true })
            cy.log('Clicked on Yes button')

            //Click on OK button
            cy.xpath("//button[text()='Ok']").trigger('mouseover').click({ force: true })
            cy.log('Clicked on Ok button')
            cy.wait(9000)

            //(Verification) Get the priority of the Orderlines and Verify that priority is changed after modification
            cy.xpath("//div[@class='slick-header-columns']//span").each((ee, index, list) => {
                if (ee.text().includes('Priority')) 
                {
                    const index1 = index -1;
                    cy.get("div[class='grid-canvas'] div div").eq(index1).then((ee) => {
                        priority_after = ee.text().trim()
                        cy.log('priority_after= ' + priority_after)
                        assert.notEqual(priority_before, priority_after, 'Successfully!  Modification done')
                        if (Number(priority_after) == Number(priority_before)) {
                            cy.log('FAIL')
                        }
                        else {
                            cy.log('success')
                        }
                    })
                }
            })
        })
    })

})