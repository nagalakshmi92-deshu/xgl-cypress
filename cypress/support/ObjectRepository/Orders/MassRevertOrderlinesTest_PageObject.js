class MassRevertOrderlinesTest_PageObject
{
    locator_SubMenu_OrderLine() {

        return cy.xpath('//div[@class="dropDown"]/child::div[contains(.,"Order Lines")]',{timeout:10000},{log:false})

    }

    
    locator_AdvanceFilterArrow() {

        return cy.xpath('//div[@id="orderlinesGrid.advanced"]/div/div[contains(.,"Advanced Filters")]/following-sibling::div/i',{timeout:10000},{log:false})

    }
    
    locator_OrderLineStatusArrow() {

        return cy.xpath('//div[@class="cloud addFiltersWapper double"]/div/div//label[contains(.,"Order Line Status")]/following-sibling::div/child::div[@class="iconContainer"]/i',{timeout:10000},{log:false})

    }
    
    locator_Customer_nameArrow() {

        return cy.xpath('//div[@select-type="searchSelect"]/child::div[2]/i[@class="fa fa-angle-down"]',{timeout:10000},{log:false})

    }
    
    
    locator_Customer_nameInput() {

        return cy.xpath('//div[@class="selectSearchAdvancedFilter ng-isolate-scope"]/descendant::input',{timeout:10000},{log:false})

    }
    
    locator_Customer_nameInputArrowIcon() {

        return cy.xpath('//div[@class="selectSearchAdvancedFilter ng-isolate-scope"]/descendant::input/following-sibling::b',{timeout:10000},{log:false})

    }
    locator_SubMenu_Approved_Scheduled() {

        return cy.xpath('//div[@class="dropDown"]/child::div[contains(.,"Approved")][1]')

    }
    locator_SubMenu_Proposed_Scheduled() {

        return cy.xpath('//div[@class="dropDown"]/child::div[contains(.,"Proposed")]')

    }
    locator_SubMenu_CustomerName() {

        return cy.xpath('//div[@class="dropDown"]/child::div[contains(.,"Customer Name")]')

    }
    locator_SearchButtonOnAdvanceFilter() {

        return cy.xpath('//div[@class="buttonsArea"]/child::button[contains(.,"Search")]')

    }
    locator_SaveButton() {

        return cy.xpath('//div[@class="calendarWrapper ng-isolate-scope"]/child::div/child::button[contains(.,"Save")]',{timeout:60000},{log:false})

    }
    
    locator_ApproveButton() {

        return cy.xpath('//div[@name="filterForm"]/child::div[2]//div[@id="orderlinesGrid.approve"]',{timeout:60000},{log:false})

    }
    locator_SelectDeselectAllButton() {

        return cy.xpath('//div[@name="filterForm"]//button[@id="orderlinesGrid.deselectAll"]',{timeout:60000},{log:false})

    }
    locator_APRecords() {

        return cy.xpath('//div[@class="grid-canvas"]/div/div//div[@class="orderline"]/div[contains(@class,"ngCellText statusIcon AP")]',{timeout:120000},{log:false})

    }
    locator_PRRecords() {

        return cy.xpath('//div[@class="grid-canvas"]/div/div//div[@class="orderline"]/div[contains(@class,"ngCellText statusIcon PR")]',{timeout:120000},{log:false})

    }
} export default MassRevertOrderlinesTest_PageObject;