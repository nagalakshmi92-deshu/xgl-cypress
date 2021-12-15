class Create_InventoryTypesTestPageObject
{
    locator_SubMenu_Configuration() {

        return cy.get('div[id="header.menuConfiguration"]', { timeout: 10000 }, { log: false })

    }
    locator_SubMenu_InventorySettings() {

        return cy.xpath('//div[@class="dropDown"]/child::div[contains(.,"Inventory Settings")]', { timeout: 10000 }, { log: false })

    }
    locator_PlusIcon() {

        return cy.xpath('//button[@id="inventoryTypeGridDrtv.add"]', { timeout: 10000 }, { log: false })

    }
    locator_inputInventoryType() {

        return cy.xpath('//label[@id="inventoryTypeProfile_invTypeCode_label"]/following-sibling::input', { timeout: 10000 }, { log: false })

    }
    locator_inputDescription() {

        return cy.xpath('//label[contains(.,"Description")]/following-sibling::input', { timeout: 10000 }, { log: false })

    }
    locator_applyToregionArrow() {

        return cy.xpath('//label[@id="inventoryTypeProfile_regionId_label"]/following-sibling::div/child::div[2]/child::i', { timeout: 10000 }, { log: false })

    }
    locator_displayColorArrow() {

        return cy.xpath('//label[@id="inventoryTypeProfile_targetColor_label"]/following-sibling::div/child::div[1]/child::div[2]/i', { timeout: 10000 }, { log: false })

    }
    locator_applyToregionRecord() {

        return cy.xpath('//div[@class="dropDown"]/child::div[1]', { timeout: 10000 }, { log: false })

    }
    locator_dragColorPoint() {

        return cy.xpath('//div[@class="sp-top-inner"]/div/div/div/div[@style]', { timeout: 10000 }, { log: false })

    }
    locator_dragColorChooseButton() {

        return cy.xpath('//div[@class="sp-button-container sp-cf buttonsArea"]/button[contains(.,"Choose")]', { timeout: 10000 }, { log: false })

    }
    locator_buttonSave() {

        return cy.xpath('//div[@class="row lastModifiedContainer"]/child::div/descendant::button[@id="inventoryTypeBo.cancelSave.save"]', { log: false })

    }
    locator_breadCrumb() {

        return cy.xpath('//div[@ng-repeat="crumb in _breadcrumbs"][1]/div/span', { log: false })

    }
    locator_inputDescription() {

        return cy.xpath('//div[contains(.,"Description")]/parent::div/following-sibling::input', { log: false })

    }
    locator_inputDescriptionmagnifyIcon() {

        return cy.xpath('//div[contains(.,"Description")]/parent::div/following-sibling::input/following-sibling::b', { log: false })

    }

    //-----------------------------------------nagalakshmi-----------------------------
    //locator_Click_Configuration_MainMemu() {
      //  return cy.xpath("//div[@id='header.menuConfiguration']/div[text()='Configuration']")
    //}
    locator_Click_ScheduleSettings_SubMenu(){
      return cy.xpath("//div[@id='header.subMenuScheduleSettings.Dayparts']")
    }
    locator_Click_Networks_SideButton()
    {
        return cy.xpath("//div[@id='ScheduleSettings.Networks']//p[text()='Networks']")
    }
    locator_Select_Network(){
        return cy.xpath("//div[@class='grid-canvas']//div[1]")
    }
    locator_Click_NetworkInstance_SideMenu()
    {
        return cy.xpath("//div[@id='NetworkEntity.NetworkInstance']//p[text()='Network Instance']")
    }
    locator_Click_NetworkInstance_ID()
    {
        return cy.xpath("//div[@class='grid-canvas']//div[1]")
    }
    locator_Click_Schedules_SideMenu(){
        return cy.xpath("//div[@id='NetworkInstanceEntity.Schedules']//p[text()='Schedules']")
    }

    locator_Submenu_UserSettings() {
        return cy.xpath("//div[@id='header.subMenuUserSettings.UserRoles']")
    }

    locator_Submenu_SystemSettings() {
        return cy.xpath("//div[@id='header.subMenuSystemSettings']")
    }
   

} export default Create_InventoryTypesTestPageObject;