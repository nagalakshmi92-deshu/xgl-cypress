class FinancePageObject
{
    locator_OpenCount()
    {
        return cy.xpath('//h4[contains(.,"Open")]/following-sibling::div/child::div/following-sibling::div', { log: false })
    }
    
    locator_Open_label()
    {
        return cy.xpath('//h4[contains(.,"Open")]/following-sibling::div',{log:false})
    }
    locator_Total_Billing_Records_labelCount()
    {
        return cy.xpath('//div[@class="cell-10 text-left filters"]//h1[contains(.,"Total Billing Records")]/following-sibling::h1',{log:false})
    } 

    //Prepared
    locator_PreparedCount()
    {
        return cy.xpath('//h4[contains(.,"Prepared")]/following-sibling::div/child::div/following-sibling::div', { log: false })
    }
    
    locator_Prepared_label()
    {
        return cy.xpath('//h4[contains(.,"Prepared")]/following-sibling::div',{log:false})
    }
    locator_Total_Billing_RecordsPrepared_labelCount()
    {
        return cy.xpath('//h1[contains(.,"Total Billing Records Prepared")]/following-sibling::h1',{log:false})
    } 
    // Submitted
    locator_SubmittedCount()
    {
        return cy.xpath('//h4[contains(.,"Submitted")]/following-sibling::div/child::div/following-sibling::div', { log: false })
    }
    
    locator_Submitted_label()
    {
        return cy.xpath('//h4[contains(.,"Submitted")]/following-sibling::div',{log:false})
    }
    locator_Total_Billing_RecordsSumitted_labelCount()
    {
        return cy.xpath('//h1[contains(.,"Total Billing Records Submitted")]/following-sibling::h1',{log:false})
    } 


} export default FinancePageObject;