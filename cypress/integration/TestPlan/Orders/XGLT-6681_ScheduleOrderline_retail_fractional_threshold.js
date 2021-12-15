/// <reference types="cypress-xpath"/>
import CreateORRetailandthreasoldPageObject from '../../../support/ObjectRepository/Orders/CreateORRetailandthreasoldPageObject'
import CreateCustomerTestpageObject from '../../../support/ObjectRepository/Orders/CreateCustomerTestpageObject'


describe('XGLT-6681_ScheduleOrderline_retail_fractional_threshold', () => {
    const rt = new CreateORRetailandthreasoldPageObject();
    const ocm = new CreateCustomerTestpageObject()

    var create_adCopyID;
    var orderline_start_Date;
    var orderline_end_Date;
    var schedule_start_Date;
    var schedule_end_Date;
    var quantity = 5;

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

    it('Verification of the ticket XGLT-6681_Schedule_Orderline', () => {
        cy.fixture('missionControl.json').then(function (data) {
            this.data = data

            //(Verification) landed on dashboed page    
            cy.url().should('contain', '/MissionControl');
            cy.contains('Linear™', { timeout: 10000 })
            cy.log('Successfully landed on dashboard');
            cy.screenshot()

            // Click on the Main Menu Orders 
            rt.locator_Click_on_Main_Menu_Orders().click({ log: false });
            cy.log('Clicked on the Main Menu Orders Sucessfully')

            //Click on Customer
            rt.locator_Click_onSubMenu_Customer().click({ log: false })
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
            // cy.wait(3000)

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

            //Get the Created Order Id
            cy.xpath("//div[@class='crumb ng-scope last']/div/span").then((e1) => {
                var e2 = e1.text().split(':')
                var e3 = e2[1].trim()
                create_adCopyID = Number(e3)
                cy.log('Created OrderId =' + create_adCopyID)

                //(Verification) Verify Edit button is enabled or not
                cy.Allow_Billing()
                cy.wait(5000)

                //Click on OrderLine from Side Menu
                rt.locator_Click_on_Orderline().click({ force: true })
                cy.log('Clicked on the Ordeline');

                //(Verification) Verify that Orderline page is visible or not
                cy.url().should('contain', 'Orderlines')
                cy.log('SUccessfully! reached OrderLine page')

                rt.locator_Click_On_Plus_Sign_to_Create_new_Orderline().scrollIntoView().click({ force: true })
                cy.log('Created New Ordeline Page');

                //(Verification) Check we reached new Ordline Page 
                cy.contains('New Order Line')
                cy.log('Successfully reached OrderLine page')
                cy.screenshot()


                //Click on the Entire Week Range
                rt.locator_Click_On_EntireRange_RadioButton().click({ force: true })
                cy.log('Clicked on the Entire Week Range')

                //Enter the Orderline quantity
                rt.locator_Enter_EntireWeek_Quantity().clear().type(quantity)
                cy.log('Entered Quantity')

                //Select ADcopy group
                rt.locator_Click_ADCopyGroup().click({ force: true })
                rt.locator_Select_ADCopyGroup().click({ force: true })
                cy.log('Selected Adcopy group from dropdown')


                //Click on Network radio button
                rt.locator_Click_On_Network_Radiobutton().click({ force: true })
                cy.log("Clicked on Network radio button")


                //Select Network from Drop Down
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

                //Get the date from Start calendars
                rt.locator_StartDate().scrollIntoView().click({ force: true })
                cy.wait(2000)
                rt.locator_ActiveDay().then((ee) => {
                    orderline_start_Date = Number(ee.text())
                    cy.log('Orderline start date :' + orderline_start_Date)
                    rt.locator_ActiveDay().click({ force: true })
                    cy.wait(3000)
                })

                //Get the date from End calendars
                rt.locator_EndDate().click({ force: true })
                cy.wait(2000)
                rt.locator_ActiveDay().then((ee) => {
                    orderline_end_Date = Number(ee.text())
                    cy.log('Orderline end date :' + orderline_end_Date)
                    rt.locator_ActiveDay().click({ force: true })
                    cy.wait(3000)
                })

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

            })

            //Go to Orderlines Page
            rt.locator_Click_on_OrderLine_top().click({ force: true })
            cy.log('Click on the OrderLine at the top')
            cy.screenshot()

            //(Verification) Verify that we are in Orderline page
            cy.url().should('contain', 'Orderlines')
            cy.log('Successfully reached OrderLine page')

            /*----------------------------Fractional-----------------------------------------------*/
            //Click on Plus sign (+) to create new orderline
            rt.locator_Click_On_Plus_Sign_to_Create_new_Orderline().scrollIntoView().click({ force: true })
            cy.log('Created New Ordeline Page');


            //Click on the Fractional Radio button
            cy.xpath("//div[@class='radioButtons ng-isolate-scope']/div[text()='Fractional']").click()
            cy.log('Checked Retail Radio button')
            cy.wait(2000)

            //Enter rating in the textbox
            rt.locator_Rating().type('1')
            cy.log('Entered rating ')

            //Enter Total Rate
            rt.locator_TotalRate().type('10')
            cy.log('Entered Total Rate ')

            //Enter Priority
            rt.locator_Priority().type('99')
            cy.log('Entered Priority')

            //Click on the Entire Week Range
            rt.locator_Click_On_EntireRange_RadioButton().click({ force: true })
            cy.log('Clicked on the Entire Week Range')

            //Enter the Orderline quantity
            rt.locator_Enter_EntireWeek_Quantity().clear().type(quantity)
            cy.log('Entered Quantity')


            //Click on Network radio button
            rt.locator_Click_On_Network_Radiobutton().click({ force: true })
            cy.log("Clicked on Network radio button")


            //Select Network from Drop Down
            rt.locator_Click_on_Network_drop_Down().click({ force: true })
            rt.locator_Select_Network_drop_Down().click({ force: true })
            cy.log('Selected Network from Dropdown')

            //Select Hard Region from dropdown
            rt.locator_Click_HardRegion_dropdown().click({ force: true })
            rt.locator_Select__HardRegion_dropdown().eq(0).click({ force: true })
            cy.log('Selected Region')
            cy.wait(5000)


            //Select ADcopy group
            rt.locator_Click_ADCopyGroup().click({ force: true })
            rt.locator_Select_ADCopyGroup().click({ force: true })
            cy.log('Selected Adcopy group from dropdown')

            //Enter rating in the textbox
            rt.locator_Rating().type('10')
            cy.log('Entered rating ')

            //Get the date from Start calendars
            rt.locator_StartDate().scrollIntoView().click({ force: true })
            cy.wait(2000)
            rt.locator_ActiveDay().then((ee) => {
                orderline_start_Date = Number(ee.text())
                cy.log('Orderline start date :' + orderline_start_Date)
                rt.locator_ActiveDay().click({ force: true })
                cy.wait(3000)
            })

            //Get the date from End calendars
            rt.locator_EndDate().click({ force: true })
            cy.wait(2000)
            rt.locator_ActiveDay().then((ee) => {
                orderline_end_Date = Number(ee.text())
                cy.log('Orderline end date :' + orderline_end_Date)
                rt.locator_ActiveDay().click({ force: true })
                cy.wait(3000)
            })

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
            rt.locator_CurrentState().scrollIntoView().click({ force: true })
            cy.log('clicked on the current state button on side menu')
            cy.wait(10000)

            //(Verification) Verify the orderlines are created
            cy.get("div.slick-viewport div.grid-canvas", { timeout: 20000 }).then(($body) => {
                if ($body.find(".ui-widget-content.slick-row", { timeout: 20000 }).length == quantity)
                    cy.log('Orderlines are created properly')
                else {
                    cy.log('Something went wrong')
                    assert.fail('Orderlines are not created properly')
                }
            })

            
            /*-----------------------------Threshold------------------------------------------------*/

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

            //Enter rating in the textbox
            rt.locator_Rating().type('1')
            cy.log('Entered rating ')

            //Enter Total Rate
            rt.locator_TotalRate().type('10')
            cy.log('Entered Total Rate ')

            //Enter Priority
            rt.locator_Priority().type('99')
            cy.log('Entered Priority')

            //Click on the Entire Week Range
            rt.locator_Click_On_EntireRange_RadioButton().click({ force: true })
            cy.log('Clicked on the Entire Week Range')

            //Enter the Orderline quantity
            rt.locator_Enter_EntireWeek_Quantity().clear().type(quantity)
            cy.log('Entered Quantity')


            //Click on Network radio button
            rt.locator_Click_On_Network_Radiobutton().click({ force: true })
            cy.log("Clicked on Network radio button")


            //Select Network from Drop Down
            rt.locator_Click_on_Network_drop_Down().click({ force: true })
            rt.locator_Select_Network_drop_Down().click({ force: true })
            cy.log('Selected Network from Dropdown')

            //Select Hard Region from dropdown
            rt.locator_Click_HardRegion_dropdown().click({ force: true })
            rt.locator_Select__HardRegion_dropdown().eq(0).click({ force: true })
            cy.log('Selected Region')
            cy.wait(5000)


            //Select ADcopy group
            rt.locator_Click_ADCopyGroup().click({ force: true })
            rt.locator_Select_ADCopyGroup().click({ force: true })
            cy.log('Selected Adcopy group from dropdown')

            //Enter rating in the textbox
            rt.locator_Rating().type('10')
            cy.log('Entered rating ')

            //Get the date from Start calendars
            rt.locator_StartDate().scrollIntoView().click({ force: true })
            cy.wait(2000)
            rt.locator_ActiveDay().then((ee) => {
                orderline_start_Date = Number(ee.text())
                cy.log('Orderline start date :' + orderline_start_Date)
                rt.locator_ActiveDay().click({ force: true })
                cy.wait(3000)
            })

            //Get the date from End calendars
            rt.locator_EndDate().click({ force: true })
            cy.wait(2000)
            rt.locator_ActiveDay().then((ee) => {
                orderline_end_Date = Number(ee.text())
                cy.log('Orderline end date :' + orderline_end_Date)
                rt.locator_ActiveDay().click({ force: true })
                cy.wait(3000)
            })

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
            rt.locator_CurrentState().scrollIntoView().click({ force: true })
            cy.log('clicked on the current state button on side menu')
            cy.wait(10000)

            //(Verification) Verify the orderlines are created
            cy.get("div.slick-viewport div.grid-canvas", { timeout: 20000 }).then(($body) => {
                if ($body.find(".ui-widget-content.slick-row", { timeout: 20000 }).length == quantity)
                    cy.log('Orderlines are created properly')
                else {
                    cy.log('Something went wrong')
                    assert.fail('Orderlines are not created properly')
                }
            })

            //Click on the Schedular Status in the bottom
            rt.locator_Click_Schedular_Flyout().click({ force: true })
            cy.wait(3000)
            cy.log('Clicked on the Schedular')

            //(Verification) Verify the dates present in the schedular flyout
            cy.xpath("//div[@class='grid-canvas']/div").each((ee, index, list) => {
                var c1 = ee.find('div').eq(1).text()
                var c2 = c1.split('/')
                schedule_start_Date = Number(c2[1])

                var d1 = ee.find('div').eq(2).text()
                var d2 = d1.split('/')
                schedule_end_Date = Number(d2[1])

                if ((schedule_start_Date == orderline_start_Date) && (schedule_end_Date == orderline_end_Date)) {
                    cy.log('schedule_start_Date: ' + schedule_start_Date)
                    cy.log('schedule_end_Date: ' + schedule_end_Date)
                    cy.log('state of the schedular : ' + ee.find('div').eq(3).text())
                    assert.notEqual(ee.find('div').eq(3).text(), 'Stopped', 'EDS is not enabled')
                }

                //Click on the Schedular Status in the bottom
                cy.xpath("//div[@class='openClose ng-scope']").click({ force: true })
                cy.wait(3000)
                cy.log('Clicked on the Schedular')

            })

        })
    })
})
