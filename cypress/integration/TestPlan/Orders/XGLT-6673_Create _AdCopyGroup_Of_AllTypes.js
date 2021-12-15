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

    it('XGLT-6673	Create Ad Copy Group of all Types ( Standard, Bookend, Billboard and Piggyback)', () => {
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

            // step 6 : Click over Ad copy Group 
            ocm.locator_Click_onSubMenu_Adcopy_Group().click()
            cy.log('Clicked on the Ad copy Group  Sucessfully')
            cy.screenshot();

            // Step 7: Check for Ad copy Group in the webpage
            cy.contains('Ad Copy Groups')
            cy.url().should('include', '/RotationGroups')
            cy.log('landed on  Ad copy Group page ');
            cy.screenshot();

            //-------------- Select Standard ----------------------//
            // Step 8: Click on the + sign to which takes to  Ad copy Group screen
            ocm.locator_Click_On_Plus_Sign_to_Create_new_Adcopy_Group().should('be.visible').click({ log: false });
            cy.contains('New Ad Copy Group')
            cy.log('Clicked on + sign Sucessfully to  Ad copy Group')

            // Step 9: Add all the details in ADCopy Group
            cy.contains('Description')
            cy.contains('Required Fields')
            ocm.locator_enter_Title().click().clear().invoke('val', '').type(this.data.AdCopyGroup.Description4)
            cy.log('Entered description is ' + this.data.AdCopyGroup.Description4);


            // Step 11 : Save add all the details in ADCopy Group 
           
            cy.wait(2000)
            ocm.locator_save_Adcopy_Group().click({ log: false })
            cy.log('Clicked on Save button')

            //Step 12 :(Verification) Record saved in Ad Copy group 
            // Click over 'Order ' menu Item 
            cy.contains('Ad Copy Handling')
            ocm.locator_Verify_Menu_Items().click()
            cy.log('Clicked on order menu item ');
            ocm.locator_Verify_Menu_Items().click()

            //Click on the Main Menu Orders 
            ocm.locator_Click_on_Main_Menu_Orders().click({ log: false });
            cy.log('Clicked on the Main Menu Orders Sucessfully')

            // Click over Ad copy Group 
            ocm.locator_Click_onSubMenu_Adcopy_Group().click()
            cy.log('Clicked on the Ad copy Group  Sucessfully')
            cy.screenshot();

            // Check for Ad copy Group in the webpage
            cy.contains('Ad Copy Groups')
            cy.url().should('include', '/RotationGroups')
            cy.log('landed on  Ad copy Group page ');
            cy.screenshot();

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

            cy.VerifyGroupType(this.data.AdCopyGroup.Description4)
            cy.log('Record present in list ');
            cy.screenshot();

            //-------------- Select Billboard ----------------------//
            // Step 1: Click on the + sign to which takes to  Ad copy Group screen
            ocm.locator_Click_On_Plus_Sign_to_Create_new_Adcopy_Group().should('be.visible').click({ log: false });
            cy.contains('New Ad Copy Group')
            cy.log('Clicked on + sign Sucessfully to  Ad copy Group')

            // Step 2: Add all the details in ADCopy Group
            cy.contains('Description')
            cy.contains('Required Fields')
            ocm.locator_enter_Title().click().clear().invoke('val', '').type(this.data.AdCopyGroup.Description1)
            cy.log('Entered description is ' + this.data.AdCopyGroup.Description1);

            //Step 3 : select customer ID name from list 
            cy.Select_Customer(this.data.AdCopyGroup.Customer_ID_Name)
            cy.log(' customer ID name from list ')
            cy.screenshot();

            //Step 4: Select type 
            //Clicking on adcopy group type drop down   
            cy.get('i[class="fa fa-angle-down"]').click()
            //Selecting adcopy group type-Billboard from the drop down   
            cy.xpath('//div[@class="dropDown"]/child::div[@ng-click="optionSelected(option)" and contains(.,"Billboard")]').click()

            // Step 5 : Save add all the details in ADCopy Group 
            ocm.locator_save_Adcopy_Group().click({ log: false })
            cy.log('Clicked on Save button')


            //Step 6 :(Verification) Record saved in Ad Copy group 
            // Click over 'Order ' menu Item 
            cy.contains('Ad Copy Handling')
            ocm.locator_Verify_Menu_Items().click()
            cy.log('Clicked on order menu item ');
            ocm.locator_Verify_Menu_Items().click()

            //Click on the Main Menu Orders 
            ocm.locator_Click_on_Main_Menu_Orders().click({ log: false });
            cy.log('Clicked on the Main Menu Orders Sucessfully')

            // Click over Ad copy Group 
            ocm.locator_Click_onSubMenu_Adcopy_Group().click()
            cy.log('Clicked on the Ad copy Group  Sucessfully')
            cy.screenshot();

            // Check for Ad copy Group in the webpage
            cy.contains('Ad Copy Groups')
            cy.url().should('include', '/RotationGroups')
            cy.log('landed on  Ad copy Group page ');
            cy.screenshot();

            //Step 7 :(Search - By Description)
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
                .type(this.data.AdCopyGroup.Description1)
            cy.log('Entered the AdCopy ID description is =' + this.data.AdCopyGroup.Description1)


            //Step 8: Click on Search button
            cy.xpath("//input[@ng-model='tempModel.value']/following-sibling::b")
                .click()
            cy.log('Clicked on search button')
            cy.wait(5000)

            cy.VerifyGroupType(this.data.AdCopyGroup.Description1)
            cy.log('Record present in list ');
            cy.screenshot();





            //----------------------Bookend----------------------------//
            // Step 1: Click on the + sign to which takes to  Ad copy Group screen
            ocm.locator_Click_On_Plus_Sign_to_Create_new_Adcopy_Group().should('be.visible').click({ log: false });
            cy.contains('New Ad Copy Group')
            cy.log('Clicked on + sign Sucessfully to  Ad copy Group')

            // Step 2: Add all the details in ADCopy Group
            cy.contains('Description')
            cy.contains('Required Fields')
            ocm.locator_enter_Title().click().clear().invoke('val', '').type(this.data.AdCopyGroup.Description2)
            cy.log('Entered description is ' + this.data.AdCopyGroup.Description2);

            //Step 3 : select customer ID name from list 
            cy.Select_Customer(this.data.AdCopyGroup.Customer_ID_Name)
            cy.log(' customer ID name from list ')
            cy.screenshot();

            //Step 4: Select type 
            //cy.Select_AddCopyGroupType(this.data.AdCopyGroup.Bookend)
            //Clicking on adcopy group type drop down   
            cy.get('i[class="fa fa-angle-down"]').click()
            //Selecting adcopy group type-Bookend from the drop down    
            cy.xpath('//div[@class="dropDown"]/child::div[@ng-click="optionSelected(option)" and contains(.,"Bookend")]').click()

            // Step 5 : Save add all the details in ADCopy Group 
            ocm.locator_save_Adcopy_Group().click({ log: false })
            cy.log('Clicked on Save button')


            //Step 6 :(Verification) Record saved in Ad Copy group 
            // Click over 'Order ' menu Item 
            cy.contains('Ad Copy Handling')
            ocm.locator_Verify_Menu_Items().click()
            cy.log('Clicked on order menu item ');
            ocm.locator_Verify_Menu_Items().click()

            //Click on the Main Menu Orders 
            ocm.locator_Click_on_Main_Menu_Orders().click({ log: false });
            cy.log('Clicked on the Main Menu Orders Sucessfully')

            // Click over Ad copy Group 
            ocm.locator_Click_onSubMenu_Adcopy_Group().click()
            cy.log('Clicked on the Ad copy Group  Sucessfully')
            cy.screenshot();

            // Check for Ad copy Group in the webpage
            cy.contains('Ad Copy Groups')
            cy.url().should('include', '/RotationGroups')
            cy.log('landed on  Ad copy Group page ');
            cy.screenshot();

            //Step 7 :(Search - By Description)
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
                .type(this.data.AdCopyGroup.Description2)
            cy.log('Entered the AdCopy ID description is =' + this.data.AdCopyGroup.Description2)


            //Step 8 : Click on Search button
            cy.xpath("//input[@ng-model='tempModel.value']/following-sibling::b")
                .click()
            cy.log('Clicked on search button')
            cy.wait(5000)

            cy.VerifyGroupType(this.data.AdCopyGroup.Description2)
            cy.log('Record present in list ');
            cy.screenshot();


            //---------------------------Piggyback-------------------//
            // Step 1: Click on the + sign to which takes to  Ad copy Group screen
            ocm.locator_Click_On_Plus_Sign_to_Create_new_Adcopy_Group().should('be.visible').click({ log: false });
            cy.contains('New Ad Copy Group')
            cy.log('Clicked on + sign Sucessfully to  Ad copy Group')

            // Step 2: Add all the details in ADCopy Group
            cy.contains('Description')
            cy.contains('Required Fields')
            ocm.locator_enter_Title().click().clear().invoke('val', '').type(this.data.AdCopyGroup.Description3)
            cy.log('Entered description is ' + this.data.AdCopyGroup.Description3);

            //Step 3 : select customer ID name from list 
            cy.Select_Customer(this.data.AdCopyGroup.Customer_ID_Name)
            cy.log(' customer ID name from list ')
            cy.screenshot();

            //Step 4: Select type 
            // cy.Select_AddCopyGroupType(this.data.AdCopyGroup.Piggyback)
            //Clicking on adcopy group type drop down   
            cy.get('i[class="fa fa-angle-down"]').click()
            //Selecting adcopy group type from the drop down  
            cy.xpath('//div[@class="dropDown"]/child::div[@ng-click="optionSelected(option)" and contains(.,"Piggyback")]').click()

            // Step 5 : Save add all the details in ADCopy Group 
            ocm.locator_save_Adcopy_Group().click({ log: false })
            cy.log('Clicked on Save button')


            //Step 6 :(Verification) Record saved in Ad Copy group 
            // Click over 'Order ' menu Item 
            cy.contains('Ad Copy Handling')
            ocm.locator_Verify_Menu_Items().click()
            cy.log('Clicked on order menu item ');
            ocm.locator_Verify_Menu_Items().click()

            //Click on the Main Menu Orders 
            ocm.locator_Click_on_Main_Menu_Orders().click({ log: false });
            cy.log('Clicked on the Main Menu Orders Sucessfully')

            // Click over Ad copy Group 
            ocm.locator_Click_onSubMenu_Adcopy_Group().click()
            cy.log('Clicked on the Ad copy Group  Sucessfully')
            cy.screenshot();

            // Check for Ad copy Group in the webpage
            cy.contains('Ad Copy Groups')
            cy.url().should('include', '/RotationGroups')
            cy.log('landed on  Ad copy Group page ');
            cy.screenshot();

            //Step 7 :(Search - By Description)
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
                .type(this.data.AdCopyGroup.Description3)
            cy.log('Entered the AdCopy ID description is =' + this.data.AdCopyGroup.Description3)


            //Step 8 : Click on Search button
            cy.xpath("//input[@ng-model='tempModel.value']/following-sibling::b")
                .click()
            cy.log('Clicked on search button')
            cy.wait(5000)

            cy.VerifyGroupType(this.data.AdCopyGroup.Description3)
            cy.log('Record present in list ');
            cy.screenshot();

        })

    })





})