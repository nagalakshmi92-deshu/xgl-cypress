


class MissionControlPageObject {


    locator_Login_Username() {
        return cy.xpath('//div[contains(.,"Username :")]/parent::td/following-sibling::td/child::input[@id="login.login"]', { log: false })

    }

    locator_Login_Password() {
        return cy.xpath('//div[contains(.,"Password :")]/parent::td/following-sibling::td/child::input[@id="login.password"]', { log: false })
    }


    locator_Login_LoginButton() {
        return cy.xpath('//button[contains(.,"Login")]', { log: false })
    }


    locator_SettingIcon() {
        return cy.xpath('//div[@title="Configure view options"]/child::button/child::i', { log: false })
    }

    locator_SelectFirstArrow() {
        return cy.xpath('//div[@id="missionLayout.firstQuadrant"]//div[@class="iconContainer"]', { log: false })
    }
    locator_SelectSecondArrow() {
        return cy.xpath('//div[@id="missionLayout.secondQuadrant"]//div[@class="iconContainer"]', { log: false })
    }
    locator_SelectThirdArrow() {
        return cy.xpath('//div[@id="missionLayout.thirdQuadrant"]//div[@class="iconContainer"]', { log: false })
    }
    locator_SelectForthArrow() {
        return cy.xpath('//div[@id="missionLayout.fourthQuadrant"]//div[@class="iconContainer"]', { log: false })
    }
    locator_PA_records() {
        return cy.xpath('//div[@class="dropDown"]/div[9]', { log: false })
    }
    locator_PA_bar() {
        return cy.xpath('//bar-chart-drtv[@settings="local.barChartBuildInventory"]//div[@class="bar-chart form-container form-container-auto"]/descendant::div[@class="row"]/child::div[@id="bar-value-0"]', { log: false })
    }
    locator_ACH_records() {
        return cy.xpath('//div[@class="dropDown"]/div[2]', { log: false })
    }
    locator_ACS_records() {
        return cy.xpath('//div[@class="dropDown"]/div[3]', { log: false })
    }
    locator_Customer_records() {
        return cy.xpath('//div[@class="dropDown"]/div[4]', { log: false })
    }
    locator_DataGovernance_records() {
        return cy.xpath('//div[@class="dropDown"]/div[5]', { log: false })
    }
    locator_OrderLineOverview_records() {
        return cy.xpath('//div[@class="dropDown"]/div[8]', { log: false })
    }
    locator_Network_Instance_Status_records() {
        return cy.xpath('//div[@class="dropDown"]/div[7]', { log: false })
    }
    locator_Finance_records() {
        return cy.xpath('//div[@class="dropDown"]/div[6]', { log: false })
    }
    locator_Reconciliation()
    {
        return cy.xpath('//div[@class="dropDown"]/div[10]',{log:false})
    }
    locator_SchedulingInformation()
    {
        return cy.xpath('//div[@class="dropDown"]/div[11]',{log:false})
    }
    locator_ACH_records()
    {
        return cy.xpath('//div[@class="dropDown"]/div[2]',{log:false})
    }
    locator_AddCopyStatus_records()
    {
        return cy.xpath('//div[@class="dropDown"]/div[3]',{log:false})
    }
    locator_ACS_records() {
        return cy.xpath('//div[@class="dropDown"]/div[3]', { log: false })
    }
    locator_Users()
    {
        return cy.xpath('//div[@class="dropDown"]/div[12]',{log:false})
    }

    locator_MissionControlWidgetSettings() {
        return cy.xpath('//div[@class="modal-content"]/child::div/child::span', { log: false })
    }

    locator_button_Save() {
        return cy.xpath('//div[@class="modal-footer ng-scope"]/child::button[contains(.,"Save")]', { log: false })
    }
    locator_button_reset() {
        return cy.xpath('//div[@class="modal-footer ng-scope"]/child::button[contains(.,"Reset")]', { log: false })
    }


    //Pending Approval
    locator_pending_approval_labelCount() {
        return cy.xpath('//div[@class="row pending-approval"]//div[@class="btnBig arrow"]/child::div/following-sibling::div', { log: false })
    }

    locator_pending_approval_label() {
        return cy.xpath('//div[@class="row pending-approval"]//div[@class="btnBig arrow"]/child::div/following-sibling::div/following-sibling::span', { log: false })
    }

    locator_pending_approval_list() {
        return cy.xpath('//div[@class="grid-canvas"]/child::div', { log: false })
    }
    locator_NoItemToDisplay_label() {
        return cy.xpath('//h1[contains(.,"No Items to Display")]', { log: false })
    }

    //Approved as of today field
    locator_approved_labelCount() {
        return cy.xpath('//h4[contains(.,"Approved")]/following-sibling::div/child::div/following-sibling::div', { log: false })
    }

    locator_approved_label() {
        return cy.xpath('//h4[contains(.,"Approved")]/following-sibling::div', { log: false })
    }

    locator_approvedCountfromTop() {
        return cy.xpath('//div[@class="crumb ng-scope last"]/child::div/child::span', { log: false })
    }

    //Scheduled as of today 
    locator_Scheduled_labelCount() {
        return cy.xpath('//h4[contains(.,"Scheduled")]/following-sibling::div/child::div/following-sibling::div', { log: false })
    }

    locator_Scheduled_label() {
        return cy.xpath('//h4[contains(.,"Scheduled")]/following-sibling::div', { log: false })
    }

    locator_ScheduledCountfromTop() {
        return cy.xpath('//div[@class="crumb ng-scope last"]/child::div/child::span', { log: false })
    }

    //Suspended  as of today 
    locator_Suspended_labelCount() {
        return cy.xpath('//h4[contains(.,"Suspended")]/following-sibling::div/child::div/following-sibling::div', { log: false })
    }

    locator_Suspended_label() {
        return cy.xpath('//h4[contains(.,"Suspended")]/following-sibling::div', { log: false })
    }

    locator_SuspendedCountfromTop() {
        return cy.xpath('//div[@class="crumb ng-scope last"]/child::div/child::span', { log: false })
    }


    //XGLT-6690 - Programming and Allocation
    locator_closeIcon() {
        return cy.xpath('//div[@class="modal-content"]/child::div/child::i', { log: false })
    }

    locator_gridRecords() {
        return cy.xpath('//div[@class="grid-canvas"]/child::div', { log: false })
    }
    //BuildInventory
    locator_BuildInventoryCount() {
        return cy.xpath('//bar-chart-drtv[@settings="local.barChartBuildInventory"]//div[@class="bar-chart form-container form-container-auto"]//div[@id="bar-value-0"]', { log: false })
    }

    locator_BuildInventory_label() {
        return cy.xpath('//bar-chart-drtv[@loading-icon="loadingIconObjBuildInventory"]/parent::div/parent::div', { log: false })
    }

    // Allocate Inventory
    locator_AllocateInventoryCount() {
        return cy.xpath('//bar-chart-drtv[@settings="local.barChartAllocateInventory"]//div[@class="bar-chart form-container form-container-auto"]//div[@id="bar-value-0"]', { log: false })
    }

    locator_AllocateInventory_label() {
        return cy.xpath('//bar-chart-drtv[@loading-icon="loadingIconObjAllocateInventory"]/parent::div/parent::div', { log: false })
    }

    // Network Programming Import 
    locator_NetworkProgrammingCount() {
        return cy.xpath('//bar-chart-drtv[@settings="local.barChartNpImport"]//div[@class="bar-chart form-container form-container-auto"]//div[@id="bar-value-0"]', { log: false })
    }

    locator_NetworkProgramming_label() {
        return cy.xpath('//bar-chart-drtv[@loading-icon="loadingIconObjNpImport"]/parent::div/parent::div', { log: false })
    }


    // SFO Import 
    locator_SFOImportCount() {
        return cy.xpath('//bar-chart-drtv[@settings="local.barChartSfoImport"]//div[@class="bar-chart form-container form-container-auto"]//div[@id="bar-value-0"]', { log: false })
    }

    locator_SFOImport_label() {
        return cy.xpath('//bar-chart-drtv[@loading-icon="loadingIconObjSfoImport"]/parent::div/parent::div', { log: false })
    }


    //XGLT-6685_Customers
    // Active with Revenue
    locator_ActivewithRevenueCount() {
        return cy.xpath('//h4[contains(.,"Active with Revenue")]/following-sibling::div/child::div/following-sibling::div', { log: false })
    }

    locator_ActivewithRevenue_label() {
        return cy.xpath('//h4[contains(.,"Active with Revenue")]/following-sibling::div', { log: false })
    }
    //Inactive
    locator_InactiveCount() {
        return cy.xpath('//h4[contains(.,"Inactive")]/following-sibling::div/child::div/following-sibling::div', { log: false })
    }

    locator_Inactive_label() {
        return cy.xpath('//h4[contains(.,"Inactive")]/following-sibling::div', { log: false })
    }

    //Credit Hold
    locator_CreditHoldCount() {
        return cy.xpath('//h4[contains(.,"Credit Hold")]/following-sibling::div/child::div/following-sibling::div', { log: false })
    }

    locator_CreditHold_label() {
        return cy.xpath('//h4[contains(.,"Credit Hold")]/following-sibling::div', { log: false })
    }
    //Active without Revenue
    locator_ActiveWithoutRevenueCount() {
        return cy.xpath('//h4[contains(.,"Active without Revenue")]/following-sibling::div/child::div/following-sibling::div', { log: false })
    }

    locator_ActiveWithoutRevenue_label() {
        return cy.xpath('//h4[contains(.,"Active without Revenue")]/following-sibling::div', { log: false })
    }

    // XGLT-6688_Network_Instance_Status
    locator_Pending_AllocationCount() {
        return cy.xpath('//h4[contains(.,"Pending Allocation")]/following-sibling::div/child::div/following-sibling::div', { log: false })
    }

    locator_Pending_Allocation_label() {
        return cy.xpath('//h4[contains(.,"Pending Allocation")]/following-sibling::div', { log: false })
    }
    locator_Pending_Allocation_labelCount() {
        return cy.xpath('//h1[contains(.,"Pending Allocation")]/following-sibling::h1', { log: false })
    }
    //Pending Build 
    locator_Pending_BuildCount() {
        return cy.xpath('//h4[contains(.,"Pending Build")]/following-sibling::div/child::div/following-sibling::div', { log: false })
    }

    locator_Pending_Build_label() {
        return cy.xpath('//h4[contains(.,"Pending Build")]/following-sibling::div', { log: false })
    }
    locator_Pending_Build_labelCount() {
        return cy.xpath('//h1[contains(.,"Pending Build")]/following-sibling::h1', { log: false })
    }
    //Empty
    locator_EmptyCount() {
        return cy.xpath('//h4[contains(.,"Empty")]/following-sibling::div/child::div/following-sibling::div', { log: false })
    }

    locator_Empty_label() {
        return cy.xpath('//h4[contains(.,"Empty")]/following-sibling::div', { log: false })
    }
    locator_Empty_labelCount() {
        return cy.xpath('//h1[contains(.,"Empty")]/following-sibling::h1', { log: false })
    }
    //Date calender 
    locator_Date_StartDate() {
        return cy.xpath('//table//tbody/child::tr/td/p[contains(.,"Start Date")]/following-sibling::div/descendant::table[@class="table-condensed"]/tbody/tr/td', { log: false })
    }
    locator_Date_ThruDate() {
        return cy.xpath('//table//tbody/child::tr/td/p[contains(.,"Thru Date")]/following-sibling::div/descendant::table[@class="table-condensed"]/tbody/tr/td', { log: false })
    }
    locator_SaveDateButton() {
        return cy.xpath('//div[@class="buttonsArea"]/child::button[contains(.,"Save")]', { log: false })
    }
}

export default MissionControlPageObject;