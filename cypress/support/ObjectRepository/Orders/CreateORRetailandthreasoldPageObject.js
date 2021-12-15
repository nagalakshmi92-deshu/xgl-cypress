class CreateORRetailandthreasoldPageObject {


    locator_Click_onSubMenu_Adcopy_Group() {

        return cy.get('div[id="CustomerEntity.RotationGroups"]')

    }


    locator_Click_on_Main_Menu_Orders() {
        return cy.get('div[id="header.menuOrders"]', { log: false })

    }

    locator_Click_onSubMenu_Customer() {

        return cy.get('div[id="header.subMenuCustomers"]', { log: false })

    }
    //-----------------------------create order--------------------------
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
    //by nk
    locator_Order_filter() {
        return cy.xpath('//div[@class="inputIcon"]//div[contains(.,"Advanced Filters")]/following-sibling::div/child::i')
    }
    locator_Filter_Editbox() {
        return cy.xpath("//div[@class='inputIcon']/div[@class='icon']//div[@class='cloud addFiltersWapper']//div[@class='selectSearchAdvancedFilter ng-isolate-scope']//input")
    }
    locator_Filter_Search() {
        return cy.xpath("//div[@class='inputIcon']/div[@class='icon']//div[@class='cloud addFiltersWapper']/div[@class='buttonsArea']/button[text()='Search']")
    }
    //--------------------------------------create customer-----------------------------
    locator_Click_on_the_Customer_Name_DropDown() {
        return cy.get('div[select-type="searchSelect"] [class="iconContainer"]')
    }

    locator_type_the_Customer_name() {
        return cy.get('div[id="customersGrid.selectSearch"] div input')
    }
    //by nk
    locator_Enter_the_Customer_name() {
        return cy.xpath("//b/preceding-sibling::input[@ng-model='tempModel.value']")
            .invoke('show').clear()
            .click({ log: false })
    }

    locator_Click_on_the_Search_of_Customer_name() {
        return cy.xpath('//div[@id="customersGrid.selectSearch"]//b[@class="loupe"]')

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

    // --------  ---- Orderline -----

    //Click on drop down for Company
    locator_click_on_drop_down_Company() {
        return cy.get('div[id="newOrder.companyEntity_dropDown"] div i')
    }

    locator_Select_Company_from_Drop_down() {
        return cy.get('div[id="newOrder.companyEntity_dropDown"] div:nth-child(5)')

    }

    locator_Click_on_Orderline() {
        return cy.get('div[id="CustomerOrderEntity.Orderlines"]')
    }

    locator_Click_On_Plus_Sign_to_Create_new_Orderline() {
        return cy.get('i[class="add"]')
    }
    // by nk
    locator_Click_On_Network_Radiobutton() {
        return cy.xpath("//div[text()='Network']")
    }
    locator_Click_on_Threshold_Radiobutton() {
        return cy.xpath("//div[@class='radioButtons ng-isolate-scope']/div[text()='Threshold']")
    }

    locator_Click_on_Network_drop_Down() {
        return cy.xpath("//div[@id='location_network_dropdown']//div[@class='iconContainer']")
    }

    locator_Select_Network_drop_Down() {
        return cy.xpath("//div[@id='location_network_dropdown']//div[@class='dropDown']/div[contains(text(),'AEN')]")
    }
    // by nk
    locator_Click_on_Retail_drop_Down() {
        return cy.xpath("//div[@name='regionRetail']//div[@class='iconContainer']")
    }

    locator_Select_Retail_drop_Down() {
        return cy.xpath("//div[@name='regionRetail']//div[@class='dropDown']/div")
    }
    locator_Click_HardRegion_dropdown() {
        return cy.xpath("//div[@id='location_hardRegion_dropdown']/div[@class='iconContainer']")
    }
    locator_Select__HardRegion_dropdown() {
        return cy.xpath("//div[@id='location_hardRegion_dropdown']//div[@class='dropDown']/div")
    }
    locator_Select_PerDay() {
        return cy.get('div[id="quantity_quantityTypeOptions"] div:nth-child(1)')
    }

    locator_Click_On_EntireRange_RadioButton() {
        return cy.xpath("//div[text()='Per Week']")
    }
    locator_Enter_EntireWeek_Quantity() {
        return cy.xpath("//div[@id='quantity_spotsWeek']/input")
    }
    // by nk
    locator_Priority() {
        return cy.xpath("//input[@id='scheduling_priority_textbox']")
    }
    locator_Rating() {
        return cy.xpath("//input[@id='scheduling_rating_textbox']").clear().click()
    }

    locator_TotalRate() {
        return cy.xpath("//td[@id='locationGridRns_totalRate_label']/input").clear().click()
    }
    locator_Click_onSubMenu_Adcopy_Group() {
        return cy.get('div[id="CustomerEntity.RotationGroups"]')
    }
    locator_Select_PerDay() {
        return cy.get('div[id="quantity_quantityTypeOptions"] div:nth-child(1)')
    }

    locator_Click_ADCopyGroup() {
        return cy.get('div[ng-model="orderline.rotation.id"] input')
    }
    locator_Select_ADCopyGroup() {
        return cy.get('span[title="R002 | abc"]')

    }

    locator_1_Monday() {
        return cy.get('input[id="quantity_mon_textbox"]')
    }
    //by nk
    locator_7_Sunday() {
        return cy.xpath("//table//td/input[@id='quantity_sun_textbox']")
    }

    locator_save_Orderline() {
        return cy.get('button[id="orderline.cancelSave.save"]')
    }
    locator_Click_on_the_Created_OrderLine() {
        return cy.get('div[class="ui-widget-content slick-row even active"]')
    }

    locator_go_to_Orderline_Page() {
        cy.get('div[id="breadCrumbs.crumb2"] span[class="ng-scope"]')
    }
    locator_Click_on_Appprove_Orderline() {
        return cy.get('div[id="orderlinesGrid.approve"] i')
    }


    locator_to_check_is_it_Approved_Orderline() {
        return cy.xpath('//div[text()="Order Line 1: Approved"]')
    }

    locator_Is_Network_Radiobutton_selected() {
        return cy.get('div[id="location_radiobuttons"] div:nth-child(1)')
    }

    locator_Approve_Button() {
        return cy.xpath('//div[@class="inline-block"]/child::button[contains(.,"Approve")]')
    }

    locator_Approve_Status() {
        return cy.xpath('//div[@class="label ng-binding" and contains(.,"Order Line 1: Approved")]')
    }
    //   ---- Orderline -----

    //Click on drop down for Company
    locator_click_on_drop_down_Company() {
        return cy.get('div[id="newOrder.companyEntity_dropDown"] div i')
    }

    locator_Select_Company_from_Drop_down() {
        return cy.get('div[id="newOrder.companyEntity_dropDown"] div:nth-child(5)')

    }

    locator_Click_on_Orderline() {
        return cy.get('div[id="CustomerOrderEntity.Orderlines"]')
    }

    locator_Click_On_Plus_Sign_to_Create_new_Orderline() {
        return cy.get('i[class="add"]')
    }

    locator_Click_on_Retail_drop_Down() {
        return cy.get('div[id="location_regRet_dropdown"] div i')
    }

    locator_Select_Retail_drop_Down() {
        return cy.get('div[class="dropDown"] div:nth-child(15)')
    }

    locator_Click_onSubMenu_Adcopy_Group() {
        return cy.get('div[id="CustomerEntity.RotationGroups"]')
    }
    locator_Select_PerDay() {
        return cy.get('div[id="quantity_quantityTypeOptions"] div:nth-child(1)')
    }

    locator_Click_ADCopyGroup() {
        return cy.get('div[ng-model="orderline.rotation.id"] input')
    }
    locator_Select_ADCopyGroup() {
        return cy.xpath("//div[@name='adCopyGroup']/div//span").eq(0)

    }

    locator_1_Monday() {
        return cy.get('input[id="quantity_mon_textbox"]')
    }

    locator_save_Orderline() {
        return cy.get('button[id="orderline.cancelSave.save"]')
    }
    locator_Click_on_the_Created_OrderLine() {
        return cy.get('div[class="ui-widget-content slick-row even active"]')
    }

    locator_go_to_Orderline_Page() {
        cy.get('div[id="breadCrumbs.crumb2"] span[class="ng-scope"]')
    }
    locator_Click_on_Appprove_Orderline() {
        return cy.xpath("//button[text()='Approve']")
    }

    //by nk
    locator_StartDate() {
        return cy.xpath("//div[@id='orderlineProfile.startDate']/div")
    }
    locator_EndDate() {
        return cy.xpath("//div[@id='orderlineProfile.endDate']/div")
    }
    locator_ActiveDay() {
        return cy.xpath("//div[@class='datetimepicker-days ng-scope']//tr/td[contains(@class,'active')]")
    }

    locator_to_check_is_it_Approved_Orderline() {
        return cy.xpath('//div[text()="Order Line 1: Approved"]')
    }

    locator_Is_Network_Radiobutton_selected() {
        return cy.get('div[id="location_radiobuttons"] div:nth-child(1)')
    }

    locator_Click_on_OrderLine_top() {
        return cy.get('div[id="breadCrumbs.crumb2"] span[class="ng-scope"]')
    }

    locator_Click_On_CurrentState_SideMenu() {
        return cy.xpath("//div[@id='CustomerOrderlineEntity.CurrentState']/div/p[text()='Current State']")
    }

    locator_Select_EntireRangeQuantity() {
        return cy.xpath("//div[@id='quantity_quantityTypeOptions']/div[text()='Entire Range']")
    }
    locator_Enter_Quantity() {
        return cy.xpath("//div[@id='quantity_spotsLine']/input[@name='quantityTypeLine']")
    }
    locator_CurrentState() {
        return cy.xpath("//div[@id='CustomerOrderlineEntity.CurrentState']/div/p[text()='Current State']")
    }
locator_Click_Schedular_Flyout() {
    return cy.xpath("//div[@class='footerControlBlock schedule']/div[@class='openClose ng-scope']")
}


}
export default CreateORRetailandthreasoldPageObject;