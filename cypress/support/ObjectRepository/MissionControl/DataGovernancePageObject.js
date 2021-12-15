



class DataGovernancePageObject {


   // Activation - Headend
    locator_HeadendCount() {
        return cy.xpath('//h4[contains(.,"Headend")]/following-sibling::div/child::div/following-sibling::div', { log: false })
    }

    locator_Headend_label() {
        return cy.xpath('//h4[contains(.,"Headend")]/following-sibling::div', { log: false })
    }

    locator_NetworkCount() {
        return cy.xpath('//h4[contains(.,"Network")]/following-sibling::div/child::div/following-sibling::div', { log: false })
    }

    locator_Network_label() {
        return cy.xpath('//h4[contains(.,"Network")]/following-sibling::div', { log: false })
    }

    // Deactivation - Headend
    locator_Dec_Headend_Count() {
        return cy.xpath('//h4[contains(.,"Deactivation")]/parent::div/following-sibling::div/descendant::div[@loading-icon="dataGovernance.cfg.HeadendDeactiveCount"]/following-sibling::div', { log: false })
    }
    locator_Dec_Headend_label() {
        return cy.xpath('//h4[contains(.,"Deactivation")]/parent::div/following-sibling::div/descendant::div[contains(@ng-click,"HeadendDeactive")]', { log: false })
    }
    locator_Dec_Network_Count() {
        return cy.xpath('//h4[contains(.,"Deactivation")]/parent::div/following-sibling::div/descendant::div[@loading-icon="dataGovernance.cfg.NetworkDeactiveCount"]/following-sibling::div', { log: false })
    }
    locator_Dec_Network_label() {
        return cy.xpath('//h4[contains(.,"Deactivation")]/parent::div/following-sibling::div/descendant::div[@class="btnBig arrow butt2" and contains(@ng-click,"NetworkDeactive")]', { log: false })
    }

    //Name/Code Changes 
    locator_NC_Headend_Count() {
        return cy.xpath('//h4[contains(.,"Name/Code Changes")]/parent::div/following-sibling::div/descendant::div[contains(@ng-click ,"HeadedNameCode")]/descendant::div[@class="ng-binding"]', { log: false })
    }
    locator_NC_Headend_label() {
        return cy.xpath('//h4[contains(.,"Name/Code Changes")]/parent::div/following-sibling::div/descendant::div[contains(@ng-click ,"HeadedNameCode")]', { log: false })
    }
    locator_NC_Network_Count() {
        return cy.xpath('//h4[contains(.,"Name/Code Changes")]/parent::div/following-sibling::div/descendant::div[@loading-icon="dataGovernance.cfg.NetworkNameCodeCount"]/following-sibling::div', { log: false })
    }
    locator_NC_Network_label() {
        return cy.xpath('//h4[contains(.,"Name/Code Changes")]/parent::div/following-sibling::div/descendant::div[contains(@ng-click ,"NetworkNameCode")]', { log: false })
    }

} 
export default DataGovernancePageObject;
