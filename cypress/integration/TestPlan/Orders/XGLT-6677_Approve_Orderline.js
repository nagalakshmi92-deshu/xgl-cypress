/// <reference types="Cypress-xpath" />



import CreateCustomerTestpageObject from '../../../support/ObjectRepository/Orders/CreateCustomerTestpageObject'
import MissionControlPageObject from '../../../support/ObjectRepository/MissionControl/MissionControlPageObject'
import CreateORRetailandthreasoldPageObject from '../../../support/ObjectRepository/Orders/CreateORRetailandthreasoldPageObject'

describe('Verification of OrderCopyMangement', () => {
    const ocm = new CreateCustomerTestpageObject();
    const mso = new MissionControlPageObject();
    const rt = new CreateORRetailandthreasoldPageObject();

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

            // Step 7: Check for Customers Keyword is present in the webpage
            cy.contains('Customers')
            cy.contains('Show External ID only');
            cy.url().should('include', '/Customers')
            cy.log('landed on Customers page ');
            cy.screenshot();

            // Step 8: Click on the + sign to which takes to add new customer screen
            ocm.locator_Click_On_Plus_Sign_to_Create_new_Customer().should('be.visible').click({ log: false });
            cy.contains('Customer Name')
            cy.log('Clicked on + sign Sucessfully to add new Customer')

            //Step 9 : Type value in the  customer name text field
            cy.wait(5000)
            ocm.Locator_input_CustomerName().click().clear().invoke('val', '').type(this.data.AdCopyGroup.Customer_Name);
            cy.log('Entered customer name is =' + this.data.Customer_Name)

            //Step 10 : select Commodity
            cy.contains('Commodity').scrollIntoView()
            ocm.locator_Select_Community().click()
            ocm.locator_select_dropdown().click()
            cy.screenshot()

            //Step 11 :Click Save
            ocm.locator_save().scrollIntoView().should('be.visible').click()
            cy.log('successfully clicked on save')
            cy.contains('Last Modified:')



            

            // Step 11 : Click on Ad copy Group
            rt.locator_Click_onSubMenu_Adcopy_Group().should('be.visible').click({ force: true })
            cy.log('Clicked on Ad copy Group successfully')

            // Step 12 : Click on + sign to Create and Ad copy Group
            cy.contains('Ad Copy Groups')
            cy.get('button[id="rotationGroupsGrid.add"]').click()
            cy.log('Clicked on  + sign  successfully')

            // Step 13: add all the details in ADCopy Group
            cy.contains('Description')
            cy.xpath('//input[@id="rotationGroupsEntity.title"]').click().clear().invoke('val', '').type('test123456678hhhh')
            cy.get('div[name="customer"]').find('span.ng-binding').eq(2).click({ force: true })
            cy.wait(10000)
            cy.screenshot()

            // Step 14 :Save add all the details in ADCopy Group 
            cy.get('button[id="cancelSave.save"]').click()
            cy.log('Clicked on save button successfully')

            // Step 15 : Click on Customer ID label
            cy.get('div[id="breadCrumbs.crumb1"]').should('be.visible').click()
            cy.log('Clicked on  Customer ID successfully')

            // Step 16: Click on the Orders for the Side Menu
            rt.locators_Click_on_Orders_from_Side_Menu().click()
            cy.log('Orders Clicked');
            cy.wait(1000)
            cy.screenshot()

            // Step 17 : Click on the + side to Add a Order
            rt.locator_SideMenu_Order_Click_on_Plus().click()
            cy.log('Created new Order Page');
            cy.screenshot()

            // Step 18: click on drop down
            rt.locator_click_on_drop_down().click({ log: false })
            cy.wait(5000)
            cy.log('clicked on drop down');

            // Step 19 : Select the sales person
            rt.locator_Select_Sales_Person_from_Drop_down().click({ force: true })
            cy.log('select person from dropdown ');

            // Step 20: Click on revenue type dropdown 
            rt.locator_click_on_revenue_type().click({ log: false })
            cy.log('clicked on  revenue type drop down');

            // Step 21 : select revenue type
            rt.locator_select_revenue_type().click({ log: false })
            cy.log('clicked on  revenue type drop down');

            // Step 22 : Click on drop down for Company
            rt.locator_click_on_drop_down_Company().click()

            // Select the Company - ( Company selecting it in the last as --)
            rt.locator_Select_Company_from_Drop_down().click({ force: true })
            cy.log('clicked on company drop down');

            // Step 23 : Click on Save
            cy.contains(' Create ')
            // Click on Save 
            rt.locator_Orders_click_on_Save().click({ force: true })
            cy.log('Order saved Sucessfully');
            cy.wait(5000)

            // Step 24: Click on OrderLine from Side Menu
            rt.locator_Click_on_Orderline().click({ force: true })
            cy.log('Clicked on the Ordeline from side menu ');
            cy.screenshot()

            // Step 25 : Click om Plus sign to create new orderline
            rt.locator_Click_On_Plus_Sign_to_Create_new_Orderline().should('be.visible').click({ force: true })
            cy.log('Created New Ordeline Page');
            cy.screenshot()

            // Step 26: (Verify) New Ordline Page
            cy.contains('New Order Line')

            //Click on Network Drop Down
            rt.locator_Click_on_Network_drop_Down().should('be.visible').click({ force: true })
            cy.log('Clicked on Network drop down');

            //Select 'ACCN/ACC Network from dropdown
            rt.locator_Select_Network_drop_Down().should('be.be.visible').click({ force: true })
            cy.log('Clicked on ACCN/ACC Network  drop down');

            //Click ADcopy group
            rt.locator_Click_ADCopyGroup().click({ force: true })
            cy.log('Clicked on ADcopy Network  drop down');

            // Select ADcopy group
            rt.locator_Select_ADCopyGroup().click({ force: true })
            cy.log('Clicked on ADcopy Network  drop down');

            //Click on dropdown and Select retail
            rt.locator_Click_on_Retail_drop_Down().click({ force: true })
            cy.log('Clicked retail drop down');

            //Selet dropdown and Select retail
            rt.locator_Select_Retail_drop_Down().click({ force: true })
            cy.wait(10000)
            cy.screenshot()

            // Step 27 : Select Perday radio button
            rt.locator_Select_PerDay().click()
            cy.log('Select Perday radio button ')
            cy.screenshot()

            // Step 28 :  Put 1 Quantity on Monday
            rt.locator_1_Monday().type('1')
            cy.log('Selected Put 1 Quantity on Monda')
            cy.wait(10000)

            // Step 29 : Save Orderline
            rt.locator_save_Orderline().click({ force: true })
            cy.log('OrderLine Saved');
            cy.wait(10000)

            // Step 30 :(Approved record )
            rt.locator_Approve_Button().should('be.visible').click();
            cy.log('Successfully clicked on Approve button')

            rt.locator_Approve_Status().should('be.visible')
            cy.log('Record is approved successfully')


        })

    })





})