/// <reference types="Cypress-xpath" />


import CreateORRetailandthreasoldPageObject from '../../../support/ObjectRepository/Orders/CreateORRetailandthreasoldPageObject'
import CreateCustomerTestpageObject from '../../../support/ObjectRepository/Orders/CreateCustomerTestpageObject'


describe('Verification of XGLT-6943', () => {
    const rt = new CreateORRetailandthreasoldPageObject();
    const ocm = new CreateCustomerTestpageObject()
    var availMG_amount_before_drop;
    var total_amount_before_drop;
    var total_amount_after_drop;
    var availMG_amount_after_drop;
    var availMG_amount_before_undrop;
    var total_amount_before_undrop;
    var total_amount_after_undrop;
    var availMG_amount_after_undrop;

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
    it('XGLT-6943 Drop Ad Units ', () => {

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

            // Click on the order in the Orders page
            cy.xpath("//div[@class='grid-canvas']/div/div").eq(0).click({ force: true })
            cy.log('Clicked on Order Id in the orders page')

            //Click on the NO option in the alert
           // cy.xpath("//button[text()='No']").click({ force: true })
            cy.log('Clicked on the NO option in the alert')


            //Click on Orderlines button in sub menu
            cy.xpath("//div[@class='option']/p[text()='Order Lines']").trigger('mouseover').click({ force: true })
            cy.log('Clicked on OrderLines in side menu')

            //Click on One of the Orderline
            cy.get("div[class='grid-canvas'] div div:nth-child(3)").eq(0).click({ force: true })
            cy.log('Clicked on One of the Orderline')
            cy.wait(5000)

            //Click on Current State button in the side menu
            cy.xpath("//div[@id='CustomerOrderlineEntity.CurrentState']//p[text()='Current State']").scrollIntoView().click({ force: true })
            cy.log('Clicked on Current State button in the side menu')
            cy.wait(9000)

            //Filter
            cy.xpath("//div[div[text()='Advanced Filters']]/div").eq(0).click({ force: true })
            cy.wait(3000)
            cy.xpath("//div[span[text()='Uniform Region']]").click({ force: true })
            cy.xpath("//button[text()='Search']").click({ force: true })
            cy.wait(9000)

            //Get the Total Amount in the current state page before Drop
            cy.xpath("//div[@class='summary']/div[2]/h3").then((ee) => {
                total_amount_before_drop = ee.text().trim()
                cy.log('Get the Total Amount before Drop: ' + total_amount_before_drop)
            })

            //Get the  AvailMG Amt in the current state page before Drop
            cy.xpath("//div[@class='summary']/div[5]/h3").then((ee) => {
                availMG_amount_before_drop = ee.text().trim()
                cy.log('Get the AvailMG Amount before Drop: ' + availMG_amount_before_drop)
            })

            //Click on the checkbox to select all
            cy.xpath("//div[@class='slick-header-columns']//div[@class='checkBoxSelection']/i").click({ force: true })
            cy.log('Clicked on the All selected checkbox')

            //Click on Drop button
            cy.xpath("//div[@class='filters']//button[contains(text(),'Drop')]").click({ force: true })
            cy.log('Clicked on Drop button')

            //Select an Exception from dropdown
            cy.xpath("//div[@name='exception']/input[@placeholder='Select an Exception']",{timeout:500000}).click()
            cy.xpath("//div[@class='addExceptionOverlayView ng-scope']//span").eq(0).click({ force: true })
            cy.log('Selected an Exception from dropdown')

            //Click on DROP button
            cy.xpath("//div[@class='modal-footer ng-scope']//button[contains(text(),'Drop')]").click({ force: true })
            cy.log('Clicked on DROP button')

            //Click on OK button
            cy.xpath("//button[contains(text(),'OK')]").click({ force: true })
            cy.log('Clicked on OK button')
            cy.wait(9000)

            //Get the Total Amount in the current state page after Drop
            cy.xpath("//div[@class='summary']/div[2]/h3").then((ee) => {
                total_amount_after_drop = ee.text().trim()
                cy.log('Get the Total Amount after Drop: ' + total_amount_after_drop)
            })

            //Get the  AvailMG Amt in the current state page after Drop
            cy.xpath("//div[@class='summary']/div[5]/h3").then((ee) => {
                availMG_amount_after_drop = ee.text().trim()
                cy.log('Get the AvailMG Amount after Drop: ' + availMG_amount_after_drop)


                //(Verification) Verify the data before and after
                if (!(availMG_amount_before_drop == availMG_amount_after_drop) && !(total_amount_before_drop == total_amount_after_drop)) {
                    cy.log("Successfully! Drop worked")
                }
                else {
                    cy.log("oh! something went wrong")
                }
            })
/*-----------------------------------------undrop-------------------------------------------------------------------- */

 //Get the Total Amount in the current state page before unDrop
            cy.xpath("//div[@class='summary']/div[2]/h3").then((ee) => {
                total_amount_before_undrop = ee.text().trim()
                cy.log('Get the Total Amount before unDrop: ' + total_amount_before_undrop)
            })

            //Get the  AvailMG Amt in the current state page before unDrop
            cy.xpath("//div[@class='summary']/div[5]/h3").then((ee) => {
                availMG_amount_before_undrop = ee.text().trim()
                cy.log('Get the AvailMG Amount before unDrop: ' + availMG_amount_before_undrop)
            })

            //Click on the checkbox to select all
            cy.xpath("//div[@class='slick-header-columns']//div[@class='checkBoxSelection']/i").click({ force: true })
            cy.log('Clicked on the All selected checkbox')

            //Click on UnDrop button
            cy.xpath("//div[@class='filters']//button[contains(text(),'Undrop')]").click({ force: true })
            cy.log('Clicked on UnDrop button')

           //Click on OK button
           cy.xpath("//button[contains(text(),'OK')]").click({ force: true })
           cy.log('Clicked on OK button')
           cy.wait(9000)

           //Get the Total Amount in the current state page after Drop
           cy.xpath("//div[@class='summary']/div[2]/h3").then((ee) => {
               total_amount_after_undrop = ee.text().trim()
               cy.log('Get the Total Amount after unDrop: ' + total_amount_after_undrop)
           })

           //Get the  AvailMG Amt in the current state page after Drop
           cy.xpath("//div[@class='summary']/div[5]/h3").then((ee) => {
               availMG_amount_after_undrop = ee.text().trim()
               cy.log('Get the AvailMG Amount after unDrop: ' + availMG_amount_after_undrop)


               //(Verification) Verify the data before and after
               if (!(availMG_amount_before_undrop == availMG_amount_after_undrop) && !(total_amount_before_undrop == total_amount_after_undrop)) {
                   cy.log("Successfully! unDrop worked")
               }
               else {
                   cy.log("oh! something went wrong")
               }
           })
        })
    })
})
//issue failed at no button scenario
