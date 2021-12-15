class CustomersPageObject
{
    //XGLT-6685_Customers
    // Active with Revenue
    locator_ActivewithRevenueCount()
    {
        return cy.xpath('//h4[contains(.,"Active with Revenue")]/following-sibling::div/child::div/following-sibling::div', { log: false })
    }
    
    locator_ActivewithRevenue_label()
    {
        return cy.xpath('//h4[contains(.,"Active with Revenue")]/following-sibling::div',{log:false})
    }
    //Inactive
    locator_InactiveCount()
    {
        return cy.xpath('//h4[contains(.,"Inactive")]/following-sibling::div/child::div/following-sibling::div', { log: false })
    }
    
    locator_Inactive_label()
    {
        return cy.xpath('//h4[contains(.,"Inactive")]/following-sibling::div',{log:false})
    }

    //Credit Hold
    locator_CreditHoldCount()
    {
        return cy.xpath('//h4[contains(.,"Credit Hold")]/following-sibling::div/child::div/following-sibling::div', { log: false })
    }
    
    locator_CreditHold_label()
    {
        return cy.xpath('//h4[contains(.,"Credit Hold")]/following-sibling::div',{log:false})
    }
    //Active without Revenue
    locator_ActiveWithoutRevenueCount()
    {
        return cy.xpath('//h4[contains(.,"Active without Revenue")]/following-sibling::div/child::div/following-sibling::div', { log: false })
    }
    
    locator_ActiveWithoutRevenue_label()
    {
        return cy.xpath('//h4[contains(.,"Active without Revenue")]/following-sibling::div',{log:false})
    }

    // XGLT-6688_Network_Instance_Status
    locator_Pending_AllocationCount()
    {
        return cy.xpath('//h4[contains(.,"Pending Allocation")]/following-sibling::div/child::div/following-sibling::div', { log: false })
    }
    
    locator_Pending_Allocation_label()
    {
        return cy.xpath('//h4[contains(.,"Pending Allocation")]/following-sibling::div',{log:false})
    }
    locator_Pending_Allocation_labelCount()
    {
        return cy.xpath('//h1[contains(.,"Pending Allocation")]/following-sibling::h1',{log:false})
    }
    //Pending Build 
    locator_Pending_BuildCount()
    {
        return cy.xpath('//h4[contains(.,"Pending Build")]/following-sibling::div/child::div/following-sibling::div', { log: false })
    }
    
    locator_Pending_Build_label()
    {
        return cy.xpath('//h4[contains(.,"Pending Build")]/following-sibling::div',{log:false})
    }
    locator_Pending_Build_labelCount()
    {
        return cy.xpath('//h1[contains(.,"Pending Build")]/following-sibling::h1',{log:false})
    }
    //Empty
    locator_EmptyCount()
    {
        return cy.xpath('//h4[contains(.,"Empty")]/following-sibling::div/child::div/following-sibling::div', { log: false })
    }
    
    locator_Empty_label()
    {
        return cy.xpath('//h4[contains(.,"Empty")]/following-sibling::div',{log:false})
    }
    locator_Empty_labelCount()
    {
        return cy.xpath('//h1[contains(.,"Empty")]/following-sibling::h1',{log:false})
    }
    //Date calender 
    locator_Date_StartDate()
    {
        return cy.xpath('//table//tbody/child::tr/td/p[contains(.,"Start Date")]/following-sibling::div/descendant::table[@class="table-condensed"]/tbody/tr/td',{log:false})
    }
    locator_Date_ThruDate()
    {
        return cy.xpath('//table//tbody/child::tr/td/p[contains(.,"Thru Date")]/following-sibling::div/descendant::table[@class="table-condensed"]/tbody/tr/td',{log:false})
    }
    locator_SaveDateButton()
    {
        return cy.xpath('//div[@class="buttonsArea"]/child::button[contains(.,"Save")]',{log:false})
    }

    locator_Reconciliation()
    {
        return cy.xpath('//div[@class="dropDown"]/div[10]',{log:false})
    }
    locator_SchedulingInformation()
    {
        return cy.xpath('//div[@class="dropDown"]/div[11]',{log:false})
    }
    locator_Users()
    {
        return cy.xpath('//div[@class="dropDown"]/div[12]',{log:false})
    }
}

export default CustomersPageObject;