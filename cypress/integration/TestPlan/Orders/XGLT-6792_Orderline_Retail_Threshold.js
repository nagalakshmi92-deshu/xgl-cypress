/// <reference types="Cypress-xpath" />


import CreateORRetailandthreasoldPageObject from '../../../support/ObjectRepository/Orders/CreateORRetailandthreasoldPageObject'
import CreateCustomerTestpageObject from '../../../support/ObjectRepository/Orders/CreateCustomerTestpageObject'

describe('Verification of XGLT-6792', () => {
    const rt = new CreateORRetailandthreasoldPageObject();
    const ocm = new CreateCustomerTestpageObject()

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
    it('XGLT-6792	Create Orderline for Retail and threasold', () => {

        cy.fixture('missionControl.json').then(function (data) {
            this.data = data;

            //(Verification) landed on dashboed page    
            cy.url().should('contain', '/MissionControl');
            cy.log('Successfully landed on dashboard');
            cy.screenshot();


            // Click on the Main Menu Orders 
            rt.locator_Click_on_Main_Menu_Orders().click({ log: false });
            cy.log('Clicked on the Main Menu Orders Sucessfully')

            //Click on Customer
            rt.locator_Click_onSubMenu_Customer().click({ log: false })
            //cy.wait(2000)
            cy.log('Clicked on the Customer ')

            //(Verification) Verify that Customer page is visible or not
            cy.url().should('contain', 'Customers')
            cy.log('Successfully reached Customer page')

            //Select customer from dropdown
            cy.customer_Name();
            cy.log('Selected customer name option from dropdown ')

            //Enter the customer name
            rt.locator_Enter_the_Customer_name().type(this.data.XGLT6789.CustName)
            cy.log('Entered customer name')


            //Click on Search button
            cy.xpath("//input[@ng-model='tempModel.value']/following-sibling::b")
                .click({ log: false })
            cy.log('Clicked on search button')
            cy.screenshot()

            //Click on the Customer ID
            rt.locator_click_on_CustomerID().eq(0).click({ force: true })
            cy.log('Clicked on the CustomerID')
           
            //Click on the Orders for the Side Menu
            rt.locators_Click_on_Orders_from_Side_Menu().click({ log: false })
            cy.log('Orders Clicked');
            //cy.wait(1000)

            //Click on the + side to Add a Order
            rt.locator_SideMenu_Order_Click_on_Plus().click({ log: false })
            cy.log('Created new Order Page');
            cy.screenshot()

            //click on SalesPerson drop down
            rt.locator_click_on_drop_down().click({ log: false })
            rt.locator_Select_Sales_Person_from_Drop_down().click({ force: true })
            cy.log('Selected salesPerson from dropdown')

            //Select revenue type from dropdown
            rt.locator_click_on_revenue_type().click({ log: false })
            rt.locator_select_revenue_type().click({ log: false })
            cy.log('Selected Revenue type from dropdown')

            //Select the Company from dropdown
            rt.locator_click_on_drop_down_Company().click({ log: false })
            rt.locator_Select_Company_from_Drop_down().click({ force: true })
            cy.log('Selected Company from dropdown')
            cy.screenshot()

            //Click on Create button
            cy.contains(' Create ')
            rt.locator_Orders_click_on_Save().click({ force: true })
            cy.log('Clicked On the Create button');

            //Click on the Allow Billing mode Checkbox
            cy.Allow_Billing()
            cy.log('Checked on the Allow Billing Mode Checkbox')
            cy.wait(5000)

            //Click on OrderLine from Side Menu
            rt.locator_Click_on_Orderline().click({ force: true })
            cy.log('Clicked on the Ordeline');


            //Click on Plus sign (+) to create new orderline
            rt.locator_Click_On_Plus_Sign_to_Create_new_Orderline().scrollIntoView().click({ force: true })
            cy.log('Created New Ordeline Page');

            //(Verification) Check we reached new Ordline Page 
            cy.contains('New Order Line')
            cy.log('Successfully reached OrderLine page')
            cy.screenshot()

            /*------------------Retail for 13/03/2021------------------------------------------------*/

            //Select date from Start Calendar 13th march
            rt.locator_StartDate().scrollIntoView().click({ force: true })
            cy.Select_Month('March')
            cy.Select_Day('March','13')
            cy.log('Selected 13th March from start date in the calendar')
            

            //select end date from calendar
            rt.locator_EndDate().click({ force: true })
            cy.Select_Day('March','13')
            cy.log('Selected 13th March from End date in the calendar')

            //Click on Network radio button
            rt.locator_Click_On_Network_Radiobutton().click({ force: true })
            cy.log("Clicked on Network radio button")

            //Select Network Drop Down
            rt.locator_Click_on_Network_drop_Down().click({ force: true })
            rt.locator_Select_Network_drop_Down().click({ force: true })
            cy.log('Selected Network from Dropdown')

            //Select retail from dropdpwn
            rt.locator_Click_on_Retail_drop_Down().click({ force: true })
            rt.locator_Select_Retail_drop_Down().eq(0).click({ force: true })
            cy.log('Selected Retail from dropdown')
            cy.wait(5000)

            //Enter rating in the textbox
            rt.locator_Rating().type('1')
            cy.log('Entered rating ')

            //Enter Total Rate
            rt.locator_TotalRate().type('10')
            cy.log('Entered Total Rate ')

            //Enter Priority
            rt.locator_Priority().type('99')
            cy.log('Entered Priority')

            //Select ADcopy group
            rt.locator_Click_ADCopyGroup().click({ force: true })
            rt.locator_Select_ADCopyGroup().click({ force: true })
            cy.log('Selected Adcopy group from dropdown')

            //Select Entire range quantity
            rt.locator_Select_EntireRangeQuantity().click({ force: true })
            cy.log('Selected entire range quantity')
            cy.wait(2000)
            
            //Enter the Quantity 
           rt.locator_Enter_Quantity() .clear().type('5')
            cy.log('Entered Quantity 5')
            cy.wait(5000)
            cy.screenshot()

            //Cick on Save button
            rt.locator_save_Orderline().click({ force: true })
            cy.log('Clicked On Save Button')
            cy.wait(5000)
            cy.screenshot()

            //Click on Approve button
           rt.locator_Click_on_Appprove_Orderline().click({ force: true })
            cy.log("Cliked on Approve button ")
            cy.wait(10000)
            cy.screenshot()

            //click on current state on side menu
            cy.xpath("//div[@id='CustomerOrderlineEntity.CurrentState']/div/p[text()='Current State']").scrollIntoView().click({ force: true })
            cy.log('clicked on the current state button on side menu')
            cy.wait(10000)

            //(Verification) Verify the created Orderline is in day light saving dates
            cy.xpath("//div[@class='slick-header-columns']/div").each((ee,index,list)=>{
                if(ee.text().includes('Date/Time'))
                {const index1=index+1
                    cy.get("div.grid-canvas div div:nth-child("+index1+")").each((ee, index, list) => {
                        var e1 = ee.text().trim().split('')
                        cy.log(e1)
                        var e2 = e1[1].split(':')
                        const index1=index+1
                        if (!(e2[0] == 2)) {
                            cy.log(index1 + ' Dates time are day light saving dates')
                        }
                        else {
                            cy.log(index1 + ' Dates time are not day light saving dates')
                            assert.fail()
                        }
                    })
                }
            })

            /*----------------------------------Treshold-----13/03/2021--------------------------------------------------------------*/
            //Go to Orderlines Page
            rt.locator_Click_on_OrderLine_top().click({ force: true })
            cy.log('Click on the OrderLine at the top')
            cy.screenshot()

            //(Verification) Verify that we are in Orderline page
            cy.url().should('contain', 'Orderlines')
            cy.log('Successfully reached OrderLine page')

            //Click on Plus sign (+) to create new orderline
            rt.locator_Click_On_Plus_Sign_to_Create_new_Orderline().scrollIntoView().click({ force: true })
            cy.log('Created New Ordeline Page');

            //(Verification) Check we reached new Ordline Page 
            cy.contains('New Order Line')
            cy.log('Successfully reached OrderLine page')
            cy.screenshot()

            //Select Threshold Radio button
            rt.locator_Click_on_Threshold_Radiobutton().click()
            cy.log('Checked  Radio button')

            //Select date from Start Calendar 13th march
            rt.locator_StartDate().scrollIntoView().click({ force: true })
            cy.Select_Month('March')
            cy.Select_Day('March','13')
            cy.log('Selected 13th March from start date in the calendar')
            

            //select end date from calendar
            rt.locator_EndDate().click({ force: true })
            cy.Select_Day('March','13')
            cy.log('Selected 13th March from End date in the calendar')

            //Click on Network radio button
            rt.locator_Click_On_Network_Radiobutton().click({ force: true })
            cy.log("Clicked on Network radio button")

            //Select Network Drop Down
            rt.locator_Click_on_Network_drop_Down().click({ force: true })
            rt.locator_Select_Network_drop_Down().click({ force: true })
            cy.log('Selected Network from Dropdown')

            //Select Hard Region from dropdown
            rt.locator_Click_HardRegion_dropdown().click({ force: true })
            rt.locator_Select__HardRegion_dropdown().eq(0).click({ force: true })
            cy.log('Selected Region')
            cy.wait(5000)

            //Select Entire range quantity
            rt.locator_Select_EntireRangeQuantity().click({ force: true })
            cy.log('Selected entire range quantity')
            cy.wait(2000)
            
            //Enter the Quantity 
           rt.locator_Enter_Quantity() .clear().type('5')
            cy.log('Entered Quantity 5')
            cy.wait(5000)
            cy.screenshot()

            //Select ADcopy group
            rt.locator_Click_ADCopyGroup().click({ force: true })
            rt.locator_Select_ADCopyGroup().click({ force: true })
            cy.log('Selected Adcopy group from dropdown')

            //Enter rating in the textbox
            rt.locator_Rating().type('10')
            cy.log('Entered rating ')

            //Cick on Save button
            rt.locator_save_Orderline().click({ force: true })
            cy.log('Clicked On Save Button')
            cy.wait(5000)
            cy.screenshot()

            //Click on Approve button
            rt.locator_Click_on_Appprove_Orderline().click({ force: true })
            cy.log("Cliked on Approve button ")
            cy.wait(9000)
            cy.screenshot()

            //click on current state on side menu
            rt.locator_Click_On_CurrentState_SideMenu().scrollIntoView().click({ force: true })
            cy.log('clicked on the current state button on side menu')
            cy.wait(10000)


            //(Verification) Verify the created Orderline is in day light saving dates
            cy.xpath("//div[@class='slick-header-columns']/div").each((ee,index,list)=>{
                if(ee.text().includes('Date/Time'))
                { const index1=index+1
                    cy.get("div.grid-canvas div div:nth-child("+index1+")").each((ee, index, list) => {
                        var e1 = ee.text().trim().split(' ')
                        const index1=index+1
                        var e2 = e1[1].split(':')
                        if (!(e2[0] == 2)) {
                            cy.log(index1 + ' Dates time are day light saving dates')
                        }
                        else {
                            cy.log(index1 + ' Dates time are not day light saving dates')
                            assert.fail()
                        }
                    })
                }
            })
            
        })
    })
})

