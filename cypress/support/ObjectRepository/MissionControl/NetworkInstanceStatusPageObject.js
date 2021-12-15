class NetworkInstanceStatusPageObject
{
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

}
export default NetworkInstanceStatusPageObject;