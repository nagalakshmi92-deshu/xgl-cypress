/// <reference types="Cypress-xpath" />



import CreateCustomerTestpageObject from '../../../support/ObjectRepository/Orders/CreateCustomerTestpageObject'
import MissionControlPageObject from '../../../support/ObjectRepository/MissionControl/MissionControlPageObject'

describe('Verification of OrderCopyMangement', () => {
    const ocm = new CreateCustomerTestpageObject();
    const mso = new MissionControlPageObject();

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

    it('XGLT-6666 Create Customer Test', () => {
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

            //Step 12:Click on Settings
            ocm.locator_Click_on_Settings_In_Customer().click()
            cy.log('successfully clicked on  Settings tab')
            cy.contains('Revenue Type')
            cy.screenshot()

            //Step 13 :Click on Edit button 
            ocm.locator_Click_on_Edit_in_Customer_Settings().click()
            cy.log('successfully clicked on Edit button ')

            //Step 14 :Click on Revenue type dropdwon
            ocm.locator_Click_on_Revenue_type_dropdwon().click()
            cy.log('successfully clicked on Revenue type dropdwon ')

            // Step 15 :Select Revenue type dropdwon ( SSelect any 4th record )
            ocm.locator_select_Revenue_type_from_the_dropdown().click()
            cy.log('successfully selected record from Revenue type dropdwon ')

            //Step 16 :Select Invoice Generation Options - Per Month (One unique Invoice per order per month)
            ocm.Locator_Select_Invoice_Generation_Options_Per_Month().click()
            cy.log('successfully selected redio option as One unique Invoice per order per month ')
            cy.screenshot()

            //Step 17 :Click on save
            ocm.locator_Click_on_save().click()
            cy.log('successfully clicked on save button ')
            cy.screenshot()


            //Step 18 :(Verification) of record saved in table list 
            // Click over 'Order ' menu Item 
            cy.contains('Ad Copy Handling')
            ocm.locator_Verify_Menu_Items().click()
            cy.log('Clicked on order menu item ');
            ocm.locator_Verify_Menu_Items().click()

            // Click on the Main Menu Orders 
            ocm.locator_Click_on_Main_Menu_Orders().click({ log: false });
            cy.log('Clicked on the Main Menu Orders Sucessfully')

            // Click over  Customer sub menu Item 
            ocm.locator_Click_onSubMenu_Customer().click()
            cy.log('Clicked on the Customer Sucessfully')
            cy.screenshot();

            // Check for Customers Keyword is present in the webpage
            cy.contains('Customers')
            cy.contains('Show External ID only');
            cy.url().should('include', '/Customers')
            cy.log('landed on Customers page ');
            cy.screenshot();


            //Step 19 :(Verification in Table list)
            ocm.locator_InputSerchCustomerName().type(this.data.AdCopyGroup.Customer_Name)
            cy.log('landed on Customers table list and Input  ' + this.data.AdCopyGroup.Customer_Name);
            ocm.locator_InputSerchCustomerNameMagnifyIcon().click({ force: true })
            cy.log('Clicked on magnify icon')
            cy.wait(2000)
            cy.VerifyRecordPresentInTable(this.data.AdCopyGroup.Customer_Name)
            cy.log('Record present in list ');
            cy.screenshot();




        })

    })





})