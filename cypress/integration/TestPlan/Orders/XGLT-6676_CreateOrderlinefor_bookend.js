/// <reference types="Cypress-xpath" />


import CreateORRetailandthreasoldPageObject from '../../../support/ObjectRepository/Orders/CreateORRetailandthreasoldPageObject'
import MissionControlPageObject from '../../../support/ObjectRepository/MissionControl/MissionControlPageObject'

describe('Verification of XGLT-6676CreateOrderlineforAll4typesofGroup_bookend', () => {
    const rt = new CreateORRetailandthreasoldPageObject();
    const mso = new MissionControlPageObject();

    //Use the cy.fixture() method to pull data from fixture file
    before(function () {

    })

    beforeEach(() => {
        cy.fixture('missionControl').then(function (data) {
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
    it('XGLT-6676 - Create Order line for All 4typesof Group bookend', () => {

        cy.fixture('Order.json').then(function (data) {
            this.data = data;

            // Step 1 : Click on the Main Menu Orders 
            rt.locator_Click_on_Main_Menu_Orders().click({ log: false });
            cy.log('Clicked on the Main Menu Orders Sucessfully')
            cy.screenshot()

            // step 2 : Click on Customer
            rt.locator_Click_onSubMenu_Customer().click()
            cy.log('Clicked on the Customer Sucessfully')

            // Step 3 : Select description 
            cy.contains('Customers')
            cy.xpath('//div[@select-type="searchSelect"]//div[@class="iconContainer"]/i[@class="fa fa-angle-down"]').click()
            cy.xpath('//div[@class="dropDown"]/child::div[contains(.,"")]').each(($el, index, $list) => {
                if ($el.text().includes('Customer Name')) {
                    $el.click();
                    cy.wait(2000)
                }
                else {
                    cy.log('Not selected')
                }
            }) // Step 4 : Input customer Name
            cy.xpath("//b/preceding-sibling::input[@ng-model='tempModel.value']")
                .invoke('show').clear()
                .click({ log: false })
                .type('Anand1')

            //Step 5 : Click on Search button
            cy.xpath("//input[@ng-model='tempModel.value']/following-sibling::b")
                .click()
            cy.log('Clicked on search button')
            cy.wait(6000)
            cy.log('searched the Customer');

            // Step 6 : Click on the Customer ID
            rt.locator_click_on_CustomerID().click()
            cy.log('Click on the Customer ID ')

            // Step 10 : Click on the Adcopy Submenu from Side 
            cy.wait(9000)
            rt.locator_Click_onSubMenu_Adcopy_Group().click({ force: true })
            cy.log('Click on the Adcopy Submenu from Side')

            // Step 11 : Click on + sign to Create and Ad copy Group
            cy.contains('Ad Copy Groups')
            cy.get('button[id="rotationGroupsGrid.add"]').click()
            cy.log(' Click on + sign to Create and Ad copy Group')

            // Step 13 : Clicking on adcopy group type drop down
            cy.get('i[class="fa fa-angle-down"]').click()
            cy.log('Clicked on adcopy group type drop down')

                       // Step 14 : Selecting adcopy group type-Billboard from the drop down   
                       cy.xpath('//div[@class="dropDown"]/child::div[@ng-click="optionSelected(option)" and contains(.,"Bookend")]').click() 
                       //Save add all the details in ADCopy Group
                       cy.log('Selected adcopy group type-Bookend from the drop down ')
                       cy.wait(10000)
           


            // Step 12 : add all the details in ADCopy Group
            cy.contains('Description')
            cy.xpath('//input[@id="rotationGroupsEntity.title"]').click().clear().invoke('val', '').type('Test all the things')
            cy.get('div[name="customer"]').find('span.ng-binding').eq(2).click({ force: true })
            cy.log('add all the details in ADCopy Group')
            cy.screenshot()

 
            // Step 15 : Save add all the details in ADCopy Group 
            cy.get('button[id="cancelSave.save"]').click()
            cy.log('Saveed all the details in ADCopy Group ')
            cy.screenshot()

            cy.wait(9000)

            // Step 16 : Click on Customer ID Label
            cy.get('div[id="breadCrumbs.crumb1"]').click()
            cy.log(' Click on Customer ID Label ')

            // Step 17 : Click on the Orders for the Side Menu
            rt.locators_Click_on_Orders_from_Side_Menu().click()
            cy.log('Clicked on the Orders for the Side Menu');

            cy.wait(1000)

            // Step 18 : Click on the + side to Add a Order
            rt.locator_SideMenu_Order_Click_on_Plus().click()
            cy.log('Click on the + side to Add a Order');

            // Step 19: click on sales drop down and select it
            rt.locator_click_on_drop_down().click({ log: false })
            cy.wait(5000)
            rt.locator_Select_Sales_Person_from_Drop_down().click({ force: true })
            cy.log('Clicked on sales drop down and select it')

            // Step 20 : Click on revenue type and select it 
            rt.locator_click_on_revenue_type().click({ log: false })
            rt.locator_select_revenue_type().click({ log: false })
            cy.log('Clicked on revenue type and selected it')

            // Step 21  : Click on drop down for Company and selecting it 
            rt.locator_click_on_drop_down_Company().click()
            rt.locator_Select_Company_from_Drop_down().click({ force: true })
            cy.log('Click on drop down for Company and selecting it')

            // Step 22 : Click on Save 
            cy.contains(' Create ')
            rt.locator_Orders_click_on_Save().click({ force: true })
            cy.log('Ordersaved Sucessfully');
            cy.screenshot()

            cy.wait(5000)

            // Step 23 : Click on OrderLine from Side Menu
            rt.locator_Click_on_Orderline().click({ force: true })
            cy.log('Clicked on OrderLine from Side Menu');

            // Step 24 : Click om Plus sign to create new orderline
            rt.locator_Click_On_Plus_Sign_to_Create_new_Orderline().click({ force: true })
            cy.log('Created New Ordeline Page');
            cy.screenshot()

            // Step 25 : Click on Network Drop Down and Select 'ACCN/ACC Network from dropdown
            cy.contains('New Order Line')
            rt.locator_Click_on_Network_drop_Down().should('be.visible').click({ force: true })
            rt.locator_Select_Network_drop_Down().should('be.be.visible').click({ force: true })
            cy.log('Clicked on Network Drop Down and Selected ACCN/ACC Network from dropdown')

            // Step 26 : Click ADcopy group and select it
            rt.locator_Click_ADCopyGroup().click({ force: true })
            rt.locator_Select_ADCopyGroup().click({ force: true })
            cy.log('Clicked ADcopy group and select it')

            // Step : 27 Click on dropdown and Select retail
            rt.locator_Click_on_Retail_drop_Down().click({ force: true })
            rt.locator_Select_Retail_drop_Down().click({ force: true })
            cy.log('Clicked on dropdown and Select retail')

            // Step 28 : Select Perday radio button
            cy.wait(10000)
            rt.locator_Select_PerDay().click()
            cy.log('Selected perday radio button')

            // Step 29 :  Put 1 Quantity on Monday
            rt.locator_1_Monday().type('1')
            cy.log('Quantity entered as 1 on Monday')

            // Step 30 : Save Orderline
            cy.wait(10000)
            rt.locator_save_Orderline().click({ force: true })
            cy.log('OrderLine Saved');
            cy.screenshot()

            // Step 31 : get Orderline id
            cy.wait(10000)
            var Orderlineid;
            cy.get('div[id="breadCrumbs.crumb2"] span[class="ng-scope"]').then((e1) => {
                var e2 = e1.text().split(':')
                var e3 = e1.text().split(',')
                cy.log("Orderline Id is " + e3[0])
                Orderlineid = e3[0]

            })

            // Step 32 : Go to Orderlines Page 
            cy.get('div[id="breadCrumbs.crumb2"] span[class="ng-scope"]').click()
            cy.screenshot()
            cy.log(' Go to Orderlines Page ')

            // Step : 33 click on the orderline  created
            cy.get('div[class="ui-widget-content slick-row even"] div:nth-child(3)').click()
            cy.screenshot()

            // Step : 34 Get Orderline id of selected record
            var v_Orderlineid;
            cy.get('div[id="breadCrumbs.crumb2"] span[class="ng-scope"]').then((e1) => {
                var e2 = e1.text().split(':')
                var e3 = e1.text().split(',')
                cy.log(e3[0])
                v_Orderlineid = e3[0]
            })
            cy.log('Get Orderline id of selected record')

            // Step 35 : Verification both Ordeline Id match 
            if (v_Orderlineid == Orderlineid) { cy.log('Orderline is Sucessfully created and Verified') }
            else { cy.log("Verification failed") }
        })
    })

})