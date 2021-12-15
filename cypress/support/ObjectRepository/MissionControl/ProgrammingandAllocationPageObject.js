class ProgrammingandAllocationPageObject
{
locator_closeIcon()
{
    return cy.xpath('//div[@class="modal-content"]/child::div/child::i', { log: false })
}

locator_gridRecords()
{
    return cy.xpath('//div[@class="grid-canvas"]/child::div', { log: false })
}
//BuildInventory
locator_BuildInventoryCount()
{
    return cy.xpath('//bar-chart-drtv[@settings="local.barChartBuildInventory"]//div[@class="bar-chart form-container form-container-auto"]//div[@id="bar-value-0"]', { log: false })
}

locator_BuildInventory_label()
{
    return cy.xpath('//bar-chart-drtv[@loading-icon="loadingIconObjBuildInventory"]/parent::div/parent::div',{log:false})
}

// Allocate Inventory
locator_AllocateInventoryCount()
{
    return cy.xpath('//bar-chart-drtv[@settings="local.barChartAllocateInventory"]//div[@class="bar-chart form-container form-container-auto"]//div[@id="bar-value-0"]', { log: false })
}

locator_AllocateInventory_label()
{
    return cy.xpath('//bar-chart-drtv[@loading-icon="loadingIconObjAllocateInventory"]/parent::div/parent::div',{log:false})
}

// Network Programming Import 
locator_NetworkProgrammingCount()
{
    return cy.xpath('//bar-chart-drtv[@settings="local.barChartNpImport"]//div[@class="bar-chart form-container form-container-auto"]//div[@id="bar-value-0"]', { log: false })
}

locator_NetworkProgramming_label()
{
    return cy.xpath('//bar-chart-drtv[@loading-icon="loadingIconObjNpImport"]/parent::div/parent::div',{log:false})
}


// SFO Import 
locator_SFOImportCount()
{
    return cy.xpath('//bar-chart-drtv[@settings="local.barChartSfoImport"]//div[@class="bar-chart form-container form-container-auto"]//div[@id="bar-value-0"]', { log: false })
}

locator_SFOImport_label()
{
    return cy.xpath('//bar-chart-drtv[@loading-icon="loadingIconObjSfoImport"]/parent::div/parent::div',{log:false})
}

}
export default  ProgrammingandAllocationPageObject