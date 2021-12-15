/// <reference types="cypress-xpath"/>
import CreateORRetailandthreasoldPageObject from '../../../support/ObjectRepository/Orders/CreateORRetailandthreasoldPageObject'
import CreateCustomerTestpageObject from '../../../support/ObjectRepository/Orders/CreateCustomerTestpageObject'


describe('XGLT-6672_CreateAdcopy', () => {
    const rt = new CreateORRetailandthreasoldPageObject();
const ocm=new CreateCustomerTestpageObject();
    var create_OrderID;

    before(function () {
        cy.fixture('missionControl.json').then(function (data) {
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
                cy.log('Sucess !!');
            })

        })
    })
    it('XGLT-6674	Create Order', () => {
        cy.fixture('missionControl.json').then(function (data) {
            this.data = data

            cy.contains('Linear™', { timeout: 10000 })
            //(Verification) landed on dashboed page
            cy.url().should('contain', '/MissionControl');
            cy.log('Successfully landed on dashboard');
            cy.screenshot();

            //Click on the Main Menu Orders 
            ocm.locator_Click_on_Main_Menu_Orders().click({ log: false });
            cy.log('Clicked on the Main Menu Orders Sucessfully')

            //Click on Sub Menu- Orders
            ocm.locator_Click_on_create_Order().click({ log: false })
            cy.log('Cliked on Order sub menu')
            cy.wait(2000)

            //(Verification) Verify that reached Order page
            cy.url().should('contain', 'Orders')
            cy.log('Successfully landed on Order page');

            //Click on the + side to Add a Order
            ocm.locator_Click_On_Plus_Sign_to_Create_new_Order().click({ log: false })
            cy.xpath("//div[@id='newOrderView.dataGridView']").should('be.visible')
            cy.log('Order create window is appeared')

            //Select the name of the customer from dropdowm
            cy.get('div[name="customer"] input').click({ force: true })
            cy.wait(2000)
            cy.xpath("//div[@id='newOrder_customerName_dropDown']//div/span").eq(1).click({ force: true })
            cy.log('Selected Customer')

            //Select Company Entity
            cy.xpath("//div[@name='companyEntity']/div[@class='iconContainer']").click({ force: true })
            cy.wait(1000)
            cy.xpath("//div[@class='dropDown']/div[@class='ng-binding ng-scope']").eq(1).click({ force: true })
            cy.log('Cmpany Entity is selected')

            //Select Sales person
            rt.locator_click_on_drop_down().click({ force: true })
            rt.locator_Select_Sales_Person_from_Drop_down().click({ force: true })
            cy.log('Sales Person is selected')

            // Select Revenue Type
            rt.locator_click_on_revenue_type().click({ force: true })
            rt.locator_select_revenue_type().click({ force: true })
            //cy.xpath("//div[@name='revenueType']//span").eq(1).click({ force: true })
            cy.log('Revenue type is selected')

            //Click on Create button
            cy.contains(' Create ')
            ocm.locator_Orders_click_on_Save().should('be.enabled').click()
            ocm.locator_Invoice_Generations_options().click()
            cy.wait(5000)

            //(Verification) Verify the Order profile page is reached or not
            cy.url().should('contain', 'Profile')
            cy.log('Successfully reached Order Profile page!')


            //Get the Created Order Id
            cy.xpath("//div[@class='crumb ng-scope last']/div/span").then((e1) => {
                var e2 = e1.text().split(':')
                var e3 = e2[1].trim()
                create_OrderID = Number(e3)
                cy.log('Created OrderId =' + create_OrderID)

                //Again Click on Main Menu Order
                ocm.locator_Click_on_Main_Menu_Orders().click({ log: false });
                cy.log('Clicked on the Main Menu Orders Sucessfully')

                //Select Sub menu Order
                ocm.locator_Click_on_create_Order().click({ log: false })
                cy.log('Cliked on Order sub menu')
                cy.wait(2000)

                //Click on the filter 
                rt.locator_Order_filter().click({ force: true })
                cy.log('Clicked on the Filter button')
                cy.wait(3000)

                //Enter the created OrderID in the filter
                rt.locator_Filter_Editbox().click({ force: true }).type(create_OrderID)
                cy.log('Enter the created OrderID')
                cy.wait(2000)

                //Click on the Search Button
                rt.locator_Filter_Search().click({ force: true })
                cy.log('Clicked on the Search button')
                cy.wait(8000)

                //(Verification): Verify that created OrderId is present in the row or not
                cy.get("div.slick-viewport div div div").then((ee) => {
                    if (ee.text().includes(create_OrderID)) {
                        cy.log('Order ID from the row: ' + ee.text())
                        cy.log("Success! Created OrderID is visible in the Order row ")
                    }
                    else {
                        assert.fail('Row is not created properly!, check it once')
                    }
                })
            })
        })
    })
})

