/// <reference types="Cypress-xpath" />


import CreateORRetailandthreasoldPageObject from '../../../support/ObjectRepository/Orders/CreateORRetailandthreasoldPageObject'
import CreateCustomerTestpageObject from '../../../support/ObjectRepository/Orders/CreateCustomerTestpageObject'
import MissionControlPageObject from '../../../support/ObjectRepository/MissionControl/MissionControlPageObject'


describe('Verification of OrderCopyMangement', () => {
    const ocm = new CreateCustomerTestpageObject();
    const mso = new MissionControlPageObject();
    const rt = new CreateORRetailandthreasoldPageObject();

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

            //Enter adcopy Length
            ocm.locator_enter_length().eq(0).clear().type(30)
            cy.log('Entered the length')


            //Check on Encoded
            ocm.locator_Click_on_encoded().click({ log: false })
            cy.log('Checked on Encoded checkbox')

            //Check on Received
            ocm.locator_Click_on_received().click({ log: false })
            cy.log('Checked on not received checkbox ')

            //Save ADcopy
            ocm.locator_click_on_save().click({ log: false })
            cy.log('Clicked on the save button ')
            cy.wait(5000)

            //-------------------------------ad copy group-----------------------------------
            //Click on top of the customer to go the menu
            cy.xpath("//div[@class='hiddenCrumbs btnSmall dark ng-scope']").scrollIntoView().click({ force: true })
            cy.wait(5000)
            cy.xpath("//div[@class='crumb ng-scope']//div[@class='hiddenCrumbs btnSmall dark ng-scope']//div[@class='crumb ng-scope lastHidden']").scrollIntoView().trigger("click")

            //cy.xpath("//div[@id='CustomerEntity.RotationGroups']").scrollIntoView().click({force:true})

            // Step 10 : Click on the Adcopygroup Submenu from Side
            cy.wait(9000)
            cy.xpath("//div[@id='CustomerEntity.RotationGroups']").click({ force: true })
            cy.log('Click on the Adcopy Submenu from Side')

            // Step 11 : Click on + sign to Create and Ad copy Group
            cy.contains('Ad Copy Groups')
            cy.get('button[id="rotationGroupsGrid.add"]').click()
            cy.log(' Click on + sign to Create and Ad copy Group')

            // Step 12 : add all the details in ADCopy Group
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
            rt.locator_7_Sunday().clear().type('5')
            cy.log('Selected Sunday quantity as 5')
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

            //----------------------ad copy and add it in same group
            //go back to adcopy
            cy.xpath("//div[@id='breadCrumbs.crumb1']").scrollIntoView().click({ force: true })
cy.xpath("//button[text()='No']").trigger('click')
            cy.wait(5000)

     
            //Click on the Adcopy button on the Slide menu
            cy.xpath("//div[@id='CustomerEntity.AdCopy']").scrollIntoView().click({ log: false });
            cy.log('Clicked on the Adcopy button on the Slide menu')

            
            //(Verification) Verify that we reached adCopy page 
            cy.url().should('contain', 'AdCopy')
            cy.log('Successfully landed on AdCopy page')

            //Click on + sign to Create and Ad copy
            cy.xpath("//button[@id='customerAdCopyGrid.add']").click({ log: false })
            cy.log('Clicked on the + button, to create new adCopy')
            var Customer_Name2 = this.data.AdCopyGroup.Customer_Name + '2';
            //Select the customer name
            ocm.locator_input_the_name().type(Customer_Name2)
            cy.log('Entered Customer name')

            //Enter adcopy Length
            ocm.locator_enter_length().eq(0).clear().type(30)
            cy.log('Entered the length')


            //Check on Encoded
            ocm.locator_Click_on_encoded().click({ log: false })
            cy.log('Checked on Encoded checkbox')

            //Check on Received
            ocm.locator_Click_on_received().click({ log: false })
            cy.log('Checked on not received checkbox ')

            //Save ADcopy
            ocm.locator_click_on_save().click({ log: false })
            cy.log('Clicked on the save button ')
            cy.wait(5000)
            //--------------------------------ad copy group--------------------


            //Click on top of the customer to go the menu
            cy.xpath("//div[@class='hiddenCrumbs btnSmall dark ng-scope']").scrollIntoView().click({ force: true })
            cy.wait(5000)
            cy.xpath("//div[@class='crumb ng-scope']//div[@class='hiddenCrumbs btnSmall dark ng-scope']//div[@class='crumb ng-scope lastHidden']").scrollIntoView().trigger("click")



            // Step 10 : Click on the Adcopygroup Submenu from Side
            cy.wait(9000)
            cy.xpath("//div[@id='CustomerEntity.RotationGroups']").click({ force: true })
            cy.log('Click on the Adcopy Submenu from Side')


            //click on the ad copy group which is present already
            cy.xpath("//div[@class='grid-canvas']/div/div[3]").eq(0).click({ force: true })


            //Click on plus button
            cy.xpath("//button[@id='rotationGroupsEntity.addNew']/i").scrollIntoView().click()

            cy.xpath("//div[@name='rotationId']/input").click()
            cy.xpath("//div[@class='auto-complete-list-drop-down ng-isolate-scope']/div/span").eq(1).click()
            cy.xpath("//button[text()='OK']").click()

            cy.wait(6000)





            //----------mission control page---------------------ad copy update -----------------page

            cy.xpath("//div[@id='header.missionControl']/div").click({ force: true })

            //Step 1: (Verification) landed on dashboed page
            cy.url()
                .should('contain', '/MissionControl');
            cy.log('Successfully landed on dashboard');
            cy.screenshot();

            //Step 2: Click on Setting Icon and verify that settings icon is opened

            mso.locator_SettingIcon()
                .scrollIntoView()
                .should('be.visible', { timeout: 5000 }, { log: false })
                .click();
            cy.log('Clicked on Settings icon');
            mso.locator_MissionControlWidgetSettings()
                .then(($el) => {
                    expect($el.text()).equals('Mission Control Widget Settings');
                })
            cy.log('Mission Control Widget Settings popup visible on screen')
            cy.screenshot();


            //Step 3: select 'Ad copy Handling' in 1st  Quadrant


            mso.locator_SelectFirstArrow().click({ log: false })
            mso.locator_ACH_records().click({ force: true }, { log: false })

            mso.locator_SelectSecondArrow().click({ log: false })
            mso.locator_DataGovernance_records().click({ force: true }, { log: false })

            mso.locator_SelectThirdArrow().click({ log: false })
            mso.locator_Finance_records().click({ force: true }, { log: false })

            mso.locator_SelectForthArrow().click({ log: false })
            mso.locator_Reconciliation().click({ force: true }, { log: false })


            //Step 4: Click on save button
            cy.log('check whether save button is enabled or not and then click on it')
            mso.locator_button_Save()
                .should('not.be.disabled', { log: false })
                .click({ force: true }, { log: false })
            cy.log('Clicked on Save button')
            cy.wait(5000)

            cy.xpath("//h4[text()='Ad Copy Pending Update']/parent::div[@class='inlineBlock butt2']/div[@class='btnBig arrow']")
                .should('be.visible')
                .click({ log: false })
            cy.url()
                .should('contain', 'CopyHandling/CopyHandling/CopyUpdate')
            cy.wait(5000)

            //filter
            
            cy.xpath("//div[@id='customersGrid.advanced']//div[@class='icon']").invoke('show').scrollIntoView().trigger('click')
            cy.xpath("//b[@class='lamp']").eq(0).click({force:true})
            cy.xpath("(//input[contains(@class,'defaultTextInput ')])[2]")
              .click()
              .type(this.data.AdCopyGroup.Customer_Name,{force: true})
            cy.xpath("//button[text()='Search']").scrollIntoView().click({ force: true }, { log: false })

cy.wait(10000)
            cy.xpath("//button[@id='copyUpdate.runCopyUpdate']").scrollIntoView().click({ force: true }, { log: false })
            for (let i = 0; i < 10; i++) {
                cy.xpath("//div[@class='grid-canvas']").then((ee) => {
                    if (ee.find("div").length > 0) {
                        cy.wait(5000)
                        cy.xpath("//button[@class='refresh']").trigger('click')
                    }
                    else { return false }
                })
            }
            // Step 5 : Click on the Main Menu Orders 
            ocm.locator_Click_on_Main_Menu_Orders().click({ log: false });
            cy.log('Clicked on the Main Menu Orders Sucessfully')

            // step 6 : Click over  Customer sub menu Item 
            ocm.locator_Click_onSubMenu_Customer().click()
            cy.log('Clicked on the Customer Sucessfully')
            cy.screenshot();

            //customer id
            cy.xpath("//div[@id='customersGrid.selectSearch']//div[@class='iconContainer']").trigger('click')
            cy.xpath("//div[@id='customersGrid.selectSearch']//div[@class='dropDown']/div[contains(text(),'Customer ID')]").trigger('click')
            cy.xpath("//div[@id='customersGrid.selectSearch']//input").click().type(customer_Id)
            cy.xpath("//div[@id='customersGrid.selectSearch']//b[@class='loupe']").click({ force: true }, { log: false })
            cy.xpath("//div[@class='grid-canvas']//div[3]").eq(0).click()

            //click on oreder
            cy.xpath("//div[@id='CustomerEntity.Orders']").scrollIntoView().click()
            cy.xpath("//div[@class='grid-canvas']//div[1]").eq(0).click()

            //click on side button orderline
            cy.xpath("//div[@id='CustomerOrderEntity.Orderlines']").scrollIntoView().click({ force: true })
            cy.xpath("//div[@class='grid-canvas']/div/div[3]").click({ force: true })

            //click on current state on side menu
            rt.locator_CurrentState().scrollIntoView().click({ force: true })
            cy.log('clicked on the current state button on side menu')
            cy.wait(10000)

            //(Verification) Verify the adcopy

            cy.xpath("//div[@class='slick-header-columns']/div").each((ee, index, list) => {
                if (ee.text().includes('Ad Copy')) {
                    cy.xpath("//div[@class='grid-canvas']//div[12]").each((ee, index, list) => {
                        if (ee.text().includes(this.Customer_Name2)) {
                            if (ee.text().includes(this.data.AdCopyGroup.Customer_Name)) {
                                assert.isTrue('Successfully! adcopy is updated')
                            }
                            else {
                                cy.log('error')
                            }
                        }
                    })
                }
            })



        })

    })

})