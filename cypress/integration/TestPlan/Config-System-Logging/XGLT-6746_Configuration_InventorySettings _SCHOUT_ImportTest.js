/// <reference types="cypress-xpath"/>
import Create_InventoryTypesTestPageObject from '../../../support/ObjectRepository/Configuration/Create_InventoryTypesTestPageObject'
import MissionControlPageObject from '../../../support/ObjectRepository/MissionControl/MissionControlPageObject'
import 'cypress-file-upload'
describe('Verification of XGLT-6746', () => {

    const inp = new Create_InventoryTypesTestPageObject();
    const mso = new MissionControlPageObject();

    before('Get the data from fixture folder', () => {
        cy.fixture('Configurations.json').then(function (data) {
            this.data = data
            cy.visit(this.data.Environment.baseURL).then(() => {
                cy.viewport(1300, 660)
                // cy.login(this.data.Environment.Username,this.data.Environment.Password, {sensitive:true})
                cy.log('Entering Username')
                mso.locator_Login_Username().type(this.data.Environment.Username, { sensitive: true })
                cy.log('Entering  Password')
                mso.locator_Login_Password().type(this.data.Environment.Password, { sensitive: true })
                cy.log('Click on Login Button')
                mso.locator_Login_LoginButton().click({ log: false })
                cy.log('Sucess !!');
            })

        })
    })

    it('XGLT-6746 - Configuration_InventorySettings _SCHOUT_ImportTest', () => {
        cy.fixture('Configurations.json').then(function (data) {
            this.data = data;
            // (Verification) landed on dashboed page
            cy.url().should('contain', '/MissionControl');
            cy.log('Successfully landed on dashboard');
            cy.screenshot();

            //--------------------------------file creation--------------------------------------------------------------------

            //Step 1: Click on the Configuration from main menu
            inp.locator_SubMenu_Configuration()
                .should('be.visible')
                .click({ force: true })
            cy.log('Clicked on the Configuration from main menu')

            //Step 2: Click on the submenu system settings
            inp.locator_Submenu_SystemSettings()
                .should('be.visible')
                .click({ force: true })
            cy.log('Click on the submenu system settings')

            //Click on 
            cy.xpath("//div[@id='SystemSettings.DefaultExportFilenames']").scrollIntoView().trigger('click')
            cy.xpath("//button[@id='add-default-export']").scrollIntoView().trigger('click')
            cy.xpath("//input[@name='description']").click().type('descripton')
            cy.xpath("//div[@id='AddDefaultExportPage.createDate']").click({ force: true })
            cy.xpath("//div[@id='AddDefaultExportPage.week']").click({ force: true })
            cy.xpath("//div[@id='AddDefaultExportPage.networkCode']").click({ force: true })
            cy.xpath("//div[@id='AddDefaultExportPage.headendCode']").click({ force: true })
            cy.xpath("//input[@name='filename']").type('65')

            cy.xpath("//button[@id='cancelSave.save']").scrollIntoView().trigger('click')
            cy.wait(5000)

            //------------------------------------schout import-----------------------------
            //Step 1: Click on the Configuration from main menu
            inp.locator_SubMenu_Configuration()
                .should('be.visible')
                .click({ force: true })
            cy.log('Clicked on the Configuration from main menu')

            inp.locator_SubMenu_InventorySettings().should('be.visible').click({ force: true })

            cy.xpath("//div[@id='InventorySettings.schoutExport']").scrollIntoView().trigger('click')
            cy.xpath("//button[@id='schoutExportGridDrtv.add']").scrollIntoView().trigger('click')
            cy.xpath("//input[@name='name']").click().type('rrrrwwwv')
            cy.xpath("//div[@id='eventLists.headend']/input").click()
            cy.get("div[class='auto-complete-list-drop-down ng-isolate-scope'] div span").eq(0).click()
            cy.wait(3000)
            cy.xpath("//div[@class='grid-canvas']/div[1]/div[1]").click({ multiple: true })
            //   cy.xpath("//div[@class='grid-canvas']/div[1]/div[1]").eq(1).click({force:true})
            cy.wait(5000)
            cy.xpath("//button[@id='cancelSave.save']").scrollIntoView().trigger('click')
            cy.wait(5000)
            cy.xpath("//button[contains(text(),'Export')]").should('be.enabled').trigger('click')
            cy.wait(5000)

            //------------------footer job--------------------------------------
            cy.xpath("//div[@class='footerControlBlock jobsBlock ng-scope']/div[@class='openClose ng-scope']").scrollIntoView().trigger('click')
            cy.wait(3000)
            cy.xpath("//div[span[contains(text(),'Completed')]]").eq(0).click({ force: true })
            cy.wait(10000)
            cy.xpath("//div[@class='grid-canvas']/div[1]/div[11]").then((ff) => {
                cy.log(ff.text())
            })
            cy.xpath("//div[@class='grid-canvas']/div[1]/div[11]").trigger('click')
            cy.wait(5000)
            //cy.xpath("")
            //------------------------------export--------------------------
            cy.xpath("//div[@class='footerControlBlock jobsBlock ng-scope select']/div[@class='openClose ng-scope']").scrollIntoView().trigger('click')
            
            cy.wait(3000)
            //Step 1: Click on the Configuration from main menu
            inp.locator_SubMenu_Configuration()
                .should('be.visible')
                .click({ force: true })
            cy.log('Clicked on the Configuration from main menu')

            inp.locator_SubMenu_InventorySettings().should('be.visible').click({ force: true })
            cy.xpath("//div[@id='InventorySettings.schoutImport']").scrollIntoView().trigger('click')
            cy.xpath("//button[@id='schoutImportGridDrtv.add']").scrollIntoView().trigger('click')
            cy.xpath("//input[@name='code']").type('67')
            cy.xpath("//input[@name='description']").type('desription')
            cy.xpath("//button[@id='cancelSaveOk.OK']").scrollIntoView().trigger('click')
            cy.wait(3000)
            cy.scrollTo('topRight')
            cy.xpath("//div[@class='slick-header-columns']//span[text()='Actions']").scrollIntoView().should('be.visible')
            cy.xpath("//div[@class='grid-canvas']/div").then((ee)=>{
                const len=ee.length
                cy.log(len)
                cy.xpath("//div[@class='actionMenuButton']").eq(len-1).scrollIntoView().click({ force: true })
                cy.wait(3000)
                var filepath='downloads/CD-20211212_WK-52_NC-AEN_HC-ALXA_12.sfo'
                cy.xpath("//div[@class='actionMenuButton dropDownOpened']//div[text()='Import']").scrollIntoView().trigger('click').click({ force: true })
                cy.wait(3000)
                //cy.xpath("//div[@class='actionMenuButton dropDownOpened']//div[text()='Import']").focused().dblclick({ force: true })
                cy.xpath("//div[@class='actionMenuButton dropDownOpened']//div[text()='Import']").trigger('mouseover').attachFile(filepath)
                cy.wait(10000)
            })
            

        })

    })
})
