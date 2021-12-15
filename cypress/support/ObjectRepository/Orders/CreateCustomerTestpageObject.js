class CreateCustomerTestpageObject {
    locator_Login_Username() {
        return cy.xpath('//div[contains(.,"Username :")]/parent::td/following-sibling::td/child::input[@id="login.login"]', { log: false })

    }

    locator_Login_Password() {
        return cy.xpath('//div[contains(.,"Password :")]/parent::td/following-sibling::td/child::input[@id="login.password"]', { log: false })
    }


    locator_Login_LoginButton() {
        return cy.xpath('//button[contains(.,"Login")]', { log: false })
    }


    locator_Verify_Menu_Items() {
        return cy.get('div[id="header.menuOrders"]', { log: false })

    }

    locator_Click_on_Main_Menu_Orders() {
        return cy.get('div[id="header.menuOrders"]', { log: false })

    }

    locator_Click_On_Plus_Sign_to_Create_new_Customer() {
        return cy.get('button[id="customersGrid.add"]', { log: false })

    }

    Locator_Type_value_in_the_text_Field() {
        return cy.xpath('//input[@id="customersProfile.company"]', { log: false })

    }
    Locator_input_CustomerName() {
        return cy.xpath('//input[@id="customersProfile.company" and @name="company"]', { log: false })

    }

    locator_Select_Community() {
        return cy.get('div[id="customersProfile.secondaryCommodityVid"] div i', { log: false })
    }

    locator_select_dropdown() {
        return cy.get('div[class="dropDown"] div:nth-child(3)', { log: false })

    }

    locator_save() {
        return cy.get('button[id="customer.cancelSave.save"]', { log: false })

    }

    locator_Click_onSubMenu_Customer() {

        return cy.get('div[id="header.subMenuCustomers"]', { log: false })

    }

    locator_Click_on_Settings_In_Customer() {
        return cy.xpath('//div[text()="Settings"]')
    }

    locator_Click_onSubMenu_AdCopy() {
        return cy.get('div[id="header.subMenuAdCopy"]')

    }

    locator_Click_On_Plus_Sign_to_Create_new_Adcopy() {
        return cy.get('button[id="adCopyGrid.add"]')

    }

    locator_Click_on_Edit_in_Customer_Settings() {
        return cy.get('button[class="btnSmall light"]')

    }

    locator_Click_on_Revenue_type_dropdwon() {
        return cy.get('div[id="customersProfileSettings.revenueTypeVid"] i')
    }

    locator_select_Revenue_type_from_the_dropdown() {
        return cy.get('div[class="dropDown"] div:nth-child(4)')
    }

    Locator_Select_Invoice_Generation_Options_Per_Month() {
        return cy.get('div[id="customersProfileSettings.invoicePerorder"] div:nth-child(3)')
    }

    locator_Click_on_save() {
        return cy.get('button[id="customer.cancelSave.save"]')
    }

    locator_input_the_name() {

        return cy.get('input[id="adCopyProfile.title"]')

    }

    locator_enter_length() {

        return cy.get('input[id="adCopyProfile.length"]')
    }

    locator_type_Customer_name() {
        return cy.get('div[name="customer"] input')
    }

    locator_select_Customer_name() {
        return cy.get('div[name="customer"]').find('span.ng-binding').eq(2)
    }

    locator_Click_on_encoded() {
        return cy.get('div[class="cell-8"] div')
    }

    locator_Click_on_received() {
        return cy.get('div[class="cell-8 text-right"] div')
    }

    locator_click_on_save() {
        return cy.get('button[id="cancelSave.save"]')

    }

    locator_Click_onSubMenu_Adcopy_Group() {
        return cy.get('div[id="header.subMenuRotationGroups"]')
    }

    locator_Click_On_Plus_Sign_to_Create_new_Adcopy_Group() {
        return cy.get('button[id="rotationGroupsGrid.add"]')
    }

    locator_enter_Title() {
        return cy.xpath('//input[@id="rotationGroupsEntity.title"]')

    }

    locator_Select_Customer() {
        return cy.get('div[name="customer"]').find('span.ng-binding').eq(2)
    }


    locator_save_Adcopy_Group() {
        return cy.get('button[id="cancelSave.save"]')

    }

    locator_Click_on_create_Order() {
        return cy.get('div[id="header.menuOrders"] div :nth-child(2)')
    }

    locator_name() {
        return cy.get('div[name="customer"] input')
    }

    locator_Order_select_Customer_name() {
        return cy.get('span[title="000001678    | JK TEST"]')
    }

    locator_click_on_drop_down() {
        return cy.get('div[id="newOrder.salesPerson_dropDown"] div [class="fa fa-angle-down"]')
    }

    locator_Select_Sales_Person_from_Drop_down() {
        return cy.get('div[class="dropDown"] div:nth-child(5)')
    }

    locator_click_on_revenue_type() {
        return cy.get('div[id="newOrder_revenueType_dropDown"] input')
    }

    locator_select_revenue_type() {
        return cy.get('div[class="auto-complete-list-drop-down ng-isolate-scope"] [ng-repeat="option in displayedOptions track by $index"]:nth-child(1)')
    }

    locator_Orders_click_on_Save() {
        return cy.get('button[id="newOrder.create"]')
    }

    locator_Click_On_Plus_Sign_to_Create_new_Order() {
        return cy.get('button[id="orderGrid.add"]')
    }

    locator_Click_on_the_Customer_Name_DropDown() {
        return cy.get('div[select-type="searchSelect"] [class="iconContainer"]')
    }

    locator_type_the_Customer_name() {
        return cy.get('div[id="customersGrid.selectSearch"] div input')
    }

    locator_Click_on_the_Search_of_Customer_name() {
        return cy.get('[class="loupe"]')
    }

    locator_click_on_CustomerID() {
        return cy.get('div[class="slick-viewport"] div:nth-child(3)')
    }

    locators_Click_on_Orders_from_Side_Menu() {
        return cy.get('div[id="CustomerEntity.Orders"]')
    }

    locator_SideMenu_Order_Click_on_Plus() {
        return cy.get('button[id="customerOrdersGrid.add"]')
    }

    locator_Invoice_Generations_options() {
        return cy.xpath('//span[text()="Requires ANACAB"]')
    }

    locator_InputSerchCustomerName() {
        return cy.xpath('//div[contains(.,"Customer Name")]/parent::div/following-sibling::input')
    }
    locator_InputSerchCustomerNameMagnifyIcon() {
        return cy.xpath('//div[contains(.,"Customer Name")]/parent::div/following-sibling::input/following-sibling::b')
    }
}
export default CreateCustomerTestpageObject;
