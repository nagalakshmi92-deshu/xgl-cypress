class Inventory_NewRuleTestPO {
    locator_SubMenu_Scheduling() {

        return cy.get('div[id="header.menuScheduling"]', { timeout: 10000 }, { log: false })

    }


    locator_SubMenu_Inventory() {

        return cy.xpath('//div[@class="dropDown"]/child::div[contains(.,"Inventory")]', { log: false })

    }
    
    locator_PlusIcon() {

        return cy.xpath('//div[@class="row no-margin"]/child::div[3]/child::div/i[@class="add"]', { log: false })

    }
    
    locator_label_NewInventoryAllocationRule() {

        return cy.xpath('//div[@class="innerCrumb ng-isolate-scope"]/span[contains(.,"New Inventory Allocation Rule")]', { log: false })

    }
    
    locator_InventoryType() {

        return cy.xpath('//div[@id="allocation-rule-inventory-type-dd"]/child::input[@ng-model="searchText"]', { log: false })

    }
    
    locator_InputPriority() {

        return cy.xpath('//input[@id="allocation-rule-priority-input"]', { log: false })

    }
    
    locator_InputNetwork() {

        return cy.xpath('//div[@id="allocation-rule-network-or-group-dd"]/input', { log: false })

    }
    
    locator_buttonSave() {

        return cy.xpath('//div[@class="row lastModifiedContainer"]/child::div/descendant::button[@id="cancelSave.save"]', { log: false })

    }
    
    locator_breadCrumbsInventoryAllocationRules() {

        return cy.xpath('//div[@class="breadcrumbs ng-isolate-scope"]//div/div[@id="breadCrumbs.crumb0"]/span', { log: false })

    }
    locator_AdvanceFilterArrow() {

        return cy.xpath('//div[@class="advancedFilters advanced-filters-container ng-isolate-scope"]/div/div[contains(.,"Advanced Filters")]/following-sibling::div/i',{timeout:10000},{log:false})

    }
    locator_InputID() {

        return cy.xpath('//span[contains(.,"ID")]/following-sibling::div/input', { log: false })

    }
    
    locator_listID() {

        return cy.xpath('//span[contains(.,"ID") and @ng-if="settings.title"]/following-sibling::div/child::div[2]/child::div/span', { log: false })

    }
    locator_SearchButtonOnAdvanceFilter() {

        return cy.xpath('//div[@class="buttonsArea"]/child::button[contains(.,"Search")]')

    }
    
    locator_lastId() {

        return cy.xpath('//span[contains(.,"ID") and @ng-if="settings.title"]/following-sibling::div/child::div[2]/child::div/span',{timeout:120000},{log:false})

    }
    locator_buttonAdd() {

        return cy.xpath('//button[contains(.,"Add")]',{log:false})

    }
    locator_buttonSaveOnAddSchedular() {

        return cy.xpath('//button[contains(.,"Save") and @id="cancelSaveOk.Save"]',{log:false})

    }
    locator_Submenu_UserSettings() {
        return cy.xpath("//div[@id='header.subMenuUserSettings.UserRoles']")
    }

} export default Inventory_NewRuleTestPO;