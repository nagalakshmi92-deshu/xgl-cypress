/// <reference types="Cypress-xpath" />


import CreateORRetailandthreasoldPageObject from '../../../support/ObjectRepository/Orders/CreateORRetailandthreasoldPageObject'
import CreateCustomerTestpageObject from '../../../support/ObjectRepository/Orders/CreateCustomerTestpageObject'
import MissionControlPageObject from '../../../support/ObjectRepository/MissionControl/MissionControlPageObject'


describe('Verification of OrderCopyMangement', () => {
    const ocm = new CreateCustomerTestpageObject();
    const mso = new MissionControlPageObject();
    const rt = new CreateORRetailandthreasoldPageObject();
    var quantity = 5;
    var coun ;
    var customer_Id;

    //Use the cy.fixture() method to pull data from fixture file
    before(function () {

    })

    beforeEach(() => {
        cy.fixture('Configurations.json').then(function (data) {
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
        cy.fixture('Configurations.json').then(function (data) {
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

            //Get the customer id
            cy.xpath("//div[@class='crumb ng-scope last']//span").then((ee) => {
                cy.log(ee.text())
                var e1 = ee.text().split(':')
                var e2 = e1[1].trim().split(' ')
                customer_Id = e2[0].trim()
                cy.log('customer id=' + customer_Id)
            })

            //------------------------------------------------------adcopy-----------------------------------------------------------------------------------

            //Click on the Adcopy button on the Slide menu
            cy.xpath("//div[@id='CustomerEntity.AdCopy']").scrollIntoView().click({ log: false });
            cy.log('Clicked on the Adcopy button on the Slide menu')

            //(Verification) Verify that we reached adCopy page 
            cy.url().should('contain', 'AdCopy')
            cy.log('Successfully landed on AdCopy page')

            //Click on + sign to Create and Ad copy
            cy.xpath("//button[@id='customerAdCopyGrid.add']").click({ log: false })
            cy.log('Clicked on the + button, to create new adCopy')

            //Select the customer name
            ocm.locator_input_the_name().type(this.data.AdCopyGroup.Customer_Name)
            cy.log('Entered Customer name')

            //Save ADcopy
            ocm.locator_click_on_save().click({ log: false })
            cy.log('Clicked on the save button ')
            cy.wait(5000)

            //-------------------------------ad copy group-----------------------------------
            //Click on top of the customer to go the menu
            cy.xpath("//div[@class='hiddenCrumbs btnSmall dark ng-scope']").scrollIntoView().click({ force: true })
            cy.wait(3000)
            cy.xpath("//div[@class='crumb ng-scope']//div[@class='hiddenCrumbs btnSmall dark ng-scope']//div[@class='crumb ng-scope lastHidden']").scrollIntoView().trigger("click")

            //cy.xpath("//div[@id='CustomerEntity.RotationGroups']").scrollIntoView().click({force:true})

            // Click on the Adcopygroup Submenu from Side
            cy.wait(3000)
            cy.xpath("//div[@id='CustomerEntity.RotationGroups']").click({ force: true })
            cy.log('Click on the Adcopy Submenu from Side')

            // Click on + sign to Create and Ad copy Group
            cy.contains('Ad Copy Groups')
            cy.get('button[id="rotationGroupsGrid.add"]').click()
            cy.log(' Click on + sign to Create and Ad copy Group')

            // add all the details in ADCopy Group
            cy.contains('Description')
            cy.xpath('//input[@id="rotationGroupsEntity.title"]').click().clear().invoke('val', '').type('Test all the things')

            cy.log('add all the details in ADCopy Group')
            cy.screenshot()

            // Step 13 : Clicking on adcopy group type drop down
            // cy.get('i[class="fa fa-angle-down"]').click()
            cy.log('Clicked on adcopy group type drop down')

            //Click on plus button
            cy.xpath("//button[@id='rotationGroupsEntity.addNew']/i").scrollIntoView().click()

            cy.xpath("//div[@name='rotationId']/input").click()
            cy.xpath("//div[@class='auto-complete-list-drop-down ng-isolate-scope']/div/span").eq(0).click()
            cy.xpath("//button[text()='OK']").click()

            // Step 15 : Save add all the details in ADCopy Group
            cy.xpath('//button[@id="cancelSave.save"]').click()
            cy.log('Saveed all the details in ADCopy Group ')
            cy.screenshot()

            cy.wait(6000)
            //----------------------------------------------create order-------------------------------
            cy.xpath("//div[@ng-repeat='crumb in _breadcrumbs'][2]").click()
            cy.wait(3000)
            cy.xpath("//div[@id='CustomerEntity.Orders']").scrollIntoView().click()
            cy.wait(3000)

            cy.xpath("//button[@id='customerOrdersGrid.add']").scrollIntoView().click()



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
            //ocm.locator_Invoice_Generations_options().click()
            cy.wait(5000)

            cy.xpath("//button[@id='order.cancelSave.save']").scrollIntoView().click({ force: true })
            cy.wait(5000)
            //----------------------------------------orederline--------------------------------------

            cy.xpath("//div[@id='CustomerOrderEntity.Orderlines']//p[text()='Order Lines']").scrollIntoView().click({ force: true })


            //cy.xpath("//div[@id='orderLinesGrid.add']").scrollIntoView().click({ force: true })
            //(Verification) Check we reached new Ordline Page 
            // cy.contains('New Order Line')
            cy.log('Successfully reached OrderLine page')
            cy.screenshot()
            //click on plus button
            cy.xpath("//div[@id='orderLinesGrid.add']/i[@class='add']").scrollIntoView().trigger('mouseover').click({ force: true })
            //Select date from Start Calendar 13th march
            rt.locator_StartDate().scrollIntoView().click({ force: true })
            cy.Select_Month('March')
            cy.Select_Day('March', '13')
            cy.log('Selected 13th March from start date in the calendar')

            //select end date from calendar
            rt.locator_EndDate().click({ force: true })
            cy.Select_Day('March', '13')
            cy.log('Selected 13th March from End date in the calendar')

            //Click on Network radio button
            rt.locator_Click_On_Network_Radiobutton().click({ force: true })
            cy.log("Clicked on Network radio button")

            //Select Network Drop Down
            rt.locator_Click_on_Network_drop_Down().click({ force: true })
            cy.wait(3000)
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

            //Select Perday radio button
            rt.locator_Select_PerDay().click()
            cy.log('Selected PerDay radio button')

            //Enter Quantity on Sunday
            rt.locator_7_Sunday().clear().type(quantity)
            cy.log('Selected Sunday quantity as ' + quantity)
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
            rt.locator_CurrentState().scrollIntoView().click({ force: true })
            cy.log('clicked on the current state button on side menu')
            cy.wait(10000)

            //(Verification) Verify that Missing adcoy is displayed under adcopy name

            cy.xpath("//div[@class='grid-canvas']/div/div[12]").each((ee, index, list) => {
                if (ee.text().includes('Missing Copy')) {
                    coun=index+1
                }
                else {
                    cy.log('Missing copy is not present in the colum')
                }   
                if (coun == quantity) {
                    cy.log('Count is matching and Mssing adcopy is visible')
                }
                  
            })

            
        })
    })
})