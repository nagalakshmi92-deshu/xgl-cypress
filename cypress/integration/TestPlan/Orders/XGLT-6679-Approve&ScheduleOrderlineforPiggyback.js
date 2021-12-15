/// <reference types="Cypress-xpath" />

import CreateCustomerTestpageObject from '../../../support/ObjectRepository/Orders/CreateCustomerTestpageObject'
import MissionControlPageObject from '../../../support/ObjectRepository/MissionControl/MissionControlPageObject'
import CreateORRetailandthreasoldPageObject from '../../../support/ObjectRepository/Orders/CreateORRetailandthreasoldPageObject'

describe('Verification of OrderCopyMangement', () => {
    const ocm = new CreateCustomerTestpageObject();
    const mso = new MissionControlPageObject();
    const rt = new CreateORRetailandthreasoldPageObject();
    var schedule_start_Date;
    var schedule_end_Date;
    var orderline_start_Date;
    var orderline_end_Date;



    //Use the cy.fixture() method to pull data from fixture file
    before(function () {

    })

    beforeEach(() => {
        cy.fixture('missionControl.json').then(function (data) {
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

    it('XGLT-6677 Approve Orderline', () => {
        cy.fixture('Order.json').then(function (data) {
            this.data = data;
            //Step 1: (Verification) landed on dashboed page
            cy.url().should('contain', '/MissionControl');
            cy.log('Successfully landed on dashboard');
            cy.screenshot();

            // Step 2: Click over 'Order ' menu Item 
            cy.contains('Ad Copy Handling')
            ocm.locator_Verify_Menu_Items().click()
            cy.log('Clicked on order menu item ');
            ocm.locator_Verify_Menu_Items().click()

            // Step 5 : Click on the Main Menu Orders 
            ocm.locator_Click_on_Main_Menu_Orders().click({ log: false });
            cy.log('Clicked on the Main Menu Orders Sucessfully')

            // step 6 : Click over  Customer sub menu Item 
            ocm.locator_Click_onSubMenu_Customer().click()
            cy.log('Clicked on the Customer Sucessfully')
            cy.screenshot();

            cy.log(Date.now())

            // Step 7: Check for Customers Keyword is present in the webpage
            cy.contains('Customers')
            cy.contains('Show External ID only');
            cy.url().should('include', '/Customers')
            cy.log('landed on Customers page ');
            cy.screenshot();

            // Step 8: Select description dropdown and select perticular customer 
            cy.xpath('//div[@select-type="searchSelect"]//div[@class="iconContainer"]/i[@class="fa fa-angle-down"]').click()
            cy.xpath('//div[@class="dropDown"]/child::div[contains(.,"")]').each(($el, index, $list) => {
                if ($el.text().includes('Customer Name')) {
                    $el.click();
                    cy.wait(2000)
                }
                else {
                    cy.log('Not selected')
                }
            })
            //Input data
            cy.xpath("//b/preceding-sibling::input[@ng-model='tempModel.value']")
                .invoke('show').clear()
                .click({ log: false })
                .type('Anand1')

            //Step 9: Click on Search button
            cy.xpath("//input[@ng-model='tempModel.value']/following-sibling::b")
                .click()
            cy.log('Clicked on search button')
            cy.wait(6000)

            // Step 10 : Click on the Customer ID
            rt.locator_click_on_CustomerID().click()
            cy.log('Clicked on customer ID successfully')
            cy.screenshot()

            // Step 11 : Click on Ad copy Group
            rt.locator_Click_onSubMenu_Adcopy_Group().should('be.visible').click({ force: true })
            cy.log('Clicked on Ad copy Group successfully')

            // Check for Ad copy Group in the webpage
            cy.contains('Ad Copy Groups')
            cy.url().should('include', '/RotationGroups')
            cy.log('landed on  Ad copy Group page ');
            cy.screenshot();


            //-------------- Select Piggyback ----------------------//
            // Step 8: Click on the + sign to which takes to  Ad copy Group screen
            ocm.locator_Click_On_Plus_Sign_to_Create_new_Adcopy_Group().should('be.visible').click({ log: false });
            cy.contains('New Ad Copy Group')
            cy.log('Clicked on + sign Sucessfully to  Ad copy Group')

            // Step 9: Add all the details in ADCopy Group
            cy.contains('Description')
            cy.contains('Required Fields')
            ocm.locator_enter_Title().click().clear().invoke('val', '').type(this.data.AdCopyGroup.Description3)
            cy.log('Entered description is ' + this.data.AdCopyGroup.Description3);

            // Step 13 : Clicking on adcopy group type drop down   
            cy.get('i[class="fa fa-angle-down"]').click()
            cy.log('Clicked on adcopy group type drop down')

            // Step 14 : Selecting adcopy group type-Piggyback from the drop down   
            cy.xpath('//div[@class="dropDown"]/child::div[@ng-click="optionSelected(option)" and contains(.,"Piggyback")]').click()
            // Step 5 : Save add all the details in ADCopy Group
            cy.log('Selected adcopy group type-Piggyback from the drop down ')
            cy.wait(10000)



            cy
                .xpath('//input[@id="rotationGroupsEntity.adCopyGroupId"]', { log: false })
                .invoke('text')  // for input or textarea, .invoke('val')
                .then(text => {
                    const someText = text;
                    cy.log(someText);
                });


            // Step 11 : Save add all the details in ADCopy Group 
            cy.wait(2000)
            ocm.locator_save_Adcopy_Group().click({ log: false })
            cy.log('Clicked on Save button')




            //Step 12 :(Verification) Record saved in Ad Copy group 
            // Click over 'Order ' menu Item 
            cy.contains('Ad Copy Handling')


            // Step 15 : Click on Customer ID label
            cy.get('div[id="breadCrumbs.crumb1"]').should('be.visible').click()
            cy.log('Clicked on  Customer ID successfully')


            //(Search - By Description)
            //Select description dropdown 
            cy.xpath('//div[@select-type="searchSelect"]//div[@class="iconContainer"]/i[@class="fa fa-angle-down"]').click()
            cy.xpath('//div[@class="dropDown"]/child::div[contains(.,"")]').each(($el, index, $list) => {
                if ($el.text().includes('Description')) {
                    $el.click();
                    cy.wait(2000)
                }
                else {
                    cy.log('Not selected')
                }
            })

            //Input data
            cy.xpath("//b/preceding-sibling::input[@ng-model='tempModel.value']")
                .invoke('show').clear()
                .click({ log: false })
                .type(this.data.AdCopyGroup.Description4)
            cy.log('Entered the AdCopy ID description is =' + this.data.AdCopyGroup.Description4)


            //Step 16 : Click on Search button
            cy.xpath("//input[@ng-model='tempModel.value']/following-sibling::b")
                .click()
            cy.log('Clicked on search button')
            cy.wait(5000)

            // cy.VerifyRecordPresentInTable(this.data.AdCopyGroup.Description4)
            //cy.log('Record present in list ');
            cy.screenshot();
            cy.wait(9000)

            // Step 15 : Click on Customer ID label
            //cy.get('div[id="breadCrumbs.crumb1"]').should('be.visible').click()
            //cy.log('Clicked on  Customer ID successfully')

            // Step 16: Click on the Orders for the Side Menu
            rt.locators_Click_on_Orders_from_Side_Menu().click()
            cy.log('Orders Clicked');
            cy.wait(1000)
            cy.screenshot()

            // Step 17 : Click on the + side to Add a Order
            rt.locator_SideMenu_Order_Click_on_Plus().click()
            cy.log('Created new Order Page');
            cy.screenshot()

            // Step 18: click on sales drop down and select it
            rt.locator_click_on_drop_down().click({ log: false })
            cy.wait(5000)
            rt.locator_Select_Sales_Person_from_Drop_down().click({ force: true })
            cy.log('Clicked on sales drop down and select it')

            // Step 19 : Click on revenue type and select it 
            rt.locator_click_on_revenue_type().click({ log: false })
            rt.locator_select_revenue_type().click({ log: false })
            cy.log('Clicked on revenue type and selected it')

            // Step 20  : Click on drop down for Company and selecting it 
            rt.locator_click_on_drop_down_Company().click()
            rt.locator_Select_Company_from_Drop_down().click({ force: true })
            cy.log('Click on drop down for Company and selecting it')


            // Step 21 : Click on Save 
            cy.contains(' Create ')
            rt.locator_Orders_click_on_Save().click({ force: true })
            cy.log('Ordersaved Sucessfully');
            cy.screenshot()
            cy.wait(5000)

            // Step 22 : Click on OrderLine from Side Menu
            rt.locator_Click_on_Orderline().click({ force: true })
            cy.log('Clicked on the Ordeline from side menu ');
            cy.screenshot()

            // Step 25 : Click om Plus sign to create new orderline
            rt.locator_Click_On_Plus_Sign_to_Create_new_Orderline().should('be.visible').click({ force: true })
            cy.log('Created New Ordeline Page');
            cy.screenshot()

            // Step 26: (Verify) New Ordline Page
            cy.contains('New Order Line')

            // Step 27 : Click on Network Drop Down and Select 'ACCN/ACC Network from dropdown
            cy.contains('New Order Line')
            rt.locator_Click_on_Network_drop_Down().should('be.visible').click({ force: true })
            cy.wait(2000)
            rt.locator_Select_Network_drop_Down().should('be.be.visible').click({ force: true })
            cy.log('Clicked on Network Drop Down and Selected ACCN/ACC Network from dropdown')

            // Step 27 : Click on dropdown and Select retail
            rt.locator_Click_on_Retail_drop_Down().click({ force: true })
            rt.locator_Select_Retail_drop_Down().click({ force: true })
            cy.log('Clicked on dropdown and Select retail')


            // Step 28 : Select Perday radio button
            rt.locator_Select_PerDay().click()
            cy.log('Select Perday radio button ')
            cy.screenshot()

            // Step 29 :  Put 1 Quantity on Monday
            rt.locator_1_Monday().type('1')
            cy.log('Selected Put 1 Quantity on Monda')
            cy.wait(10000)


            // Step 30 : Click ADcopy group and select it
            rt.locator_Click_ADCopyGroup().click({ force: true })
            rt.locator_Select_ADCopyGroup().click({ force: true })
            cy.log('Clicked ADcopy group and select it')

            //Step 23 : Get the dates from Start and End calendars
            cy.xpath("//div[@id='orderlineProfile.startDate']/div").click()
            cy.wait(2000)
            cy.xpath("//div[@class='datetimepicker-days ng-scope']//tr/td[contains(@class,'active')]").then((ee) => {
                orderline_start_Date = Number(ee.text())
                cy.log('Orderline start date :' + orderline_start_Date)
                cy.xpath("//div[@class='datetimepicker-days ng-scope']//tr/td[contains(@class,'active')]").click({ force: true })
                cy.wait(3000)
            })

            cy.xpath("//div[@id='orderlineProfile.endDate']/div").click()
            cy.wait(2000)
            cy.xpath("//div[@class='datetimepicker-days ng-scope']//tr/td[contains(@class,'active')]").then((ee) => {
                orderline_end_Date = Number(ee.text())
                cy.log('Orderline end date :' + orderline_end_Date)
                cy.xpath("//div[@class='datetimepicker-days ng-scope']//tr/td[contains(@class,'active')]").click({ force: true })
                cy.wait(3000)
            })
            // Step 31 : Save Orderline
            rt.locator_save_Orderline().click({ force: true })
            cy.log('OrderLine Saved');
            cy.wait(10000)

            // Step 32 :(Approved record )
            rt.locator_Approve_Button().should('be.visible').click();
            cy.log('Successfully clicked on Approve button')

            rt.locator_Approve_Status().should('be.visible')
            cy.log('Record is approved successfully')

            //Step 33 : Click on the Schedular Status in the bottom
            cy.xpath("//div[@class='footerControlBlock schedule']/div[@class='openClose ng-scope']").click({ force: true })
            cy.wait(3000)
            cy.log('Clicked on the Schedular')

            //Step 34 : 
            cy.xpath("//div[@class='grid-canvas']/div").each((ee, index, list) => {
                var c1 = ee.find('div').eq(1).text()
                cy.log('c1'+c1)
                var c2 = c1.split('/')
                cy.log('c2'+c2)
                schedule_start_Date = Number(c2[1])
                cy.log('*schedule_start_Date*'+schedule_start_Date)

                var d1 = ee.find('div').eq(2).text()
                cy.log('d1'+d1)
                var d2 = d1.split('/')
                cy.log('d2'+d2)
                schedule_end_Date = Number(d2[1])
                cy.log('*schedule_end_Date*'+schedule_end_Date)

                if ((schedule_start_Date == orderline_start_Date) && (schedule_end_Date == orderline_end_Date)) {
                    cy.log('reached: ' + ee.find('div').eq(8).text())
                    assert.notEqual(ee.find('div').eq(8).text(), 'Stopped', 'EDS is not enabled')
                }
                else {
                    cy.log('Check Carefully! Something went wrong')
                }
            })
        })
    })
})