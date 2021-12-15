/// <reference types="cypress-xpath"/>

import Create_InventoryTypesTestPageObject from '../../../support/ObjectRepository/Configuration/Create_InventoryTypesTestPageObject'
import MissionControlPageObject from '../../../support/ObjectRepository/MissionControl/MissionControlPageObject'

describe('Verification XGLT-6802_Build_Inventory _Test', () => {
    const inp = new Create_InventoryTypesTestPageObject();
    const mso = new MissionControlPageObject();

    var before_Scheduled_Modified
    var before_Scheduled_Modified_by
    var before_Inventry_Modified
    var before_Inventry_Modified_by


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

    it('XGLT-6802_Build_Inventory _Test', () => {

        //(Verification) landed on dashboed page
        cy.url().should('contain', '/MissionControl');
        cy.log('Successfully landed on dashboard');
        cy.screenshot();

        //Step 1: Click on the Configuration from main menu
        inp.locator_SubMenu_Configuration()
            .should('be.visible')
            .click({ force: true })
        cy.log('Clicked on the Configuration from main menu')

        //Step 2 : Click on Schedule Sttingd in SubMenu
        inp.locator_Click_ScheduleSettings_SubMenu()
            .should('be.visible')
            .click({ force: true })
        cy.log('Clicked on Schedule Sttingd in SubMenu')

        //(Verification): Verify that we reached ScheduleSettings page
        cy.url().should('contain', 'ScheduleSettings')
        cy.log('Reached ScheduleSettings page')

        //Step 3 : Click on Networks in the Side Menu
        inp.locator_Click_Networks_SideButton()
            .should('be.visible')
            .click({ force: true })
        cy.log('Clicked on Networks in the Side Menu')
        cy.wait(3000)

        //(Verification): Verify that we reached Networks page
        cy.url().should('contain', 'Networks')
        cy.log('Reached Networks page')

        //Step 4 : Click on Any Network (As of now select 'AEN')
        inp.locator_Select_Network()
            .each((ee, index, list) => {
                if (ee.text().includes('AEN')) { ee.click() } //AEN
            })
        cy.log('Selected the network')
        cy.screenshot();

        //Step 5 : Click on Network Instance in the side menu
        inp.locator_Click_NetworkInstance_SideMenu().click({ force: true })
        cy.log('Clicked on Network Instance in the side menu')

        //(Verification): Verify that we reached NetworkInstance page
        cy.url().should('contain', 'NetworkInstance')
        cy.log('Reached NetworkInstance page')

        //Step 6 : Click on any Network instance ID 
        cy.xpath("//div[@class='grid-canvas']/div/div[2]").each((ee, index, list) => {
            if (ee.text().includes('DEFAULT')) //DEFAULT
            {
                cy.xpath("//div[@class='grid-canvas']/div/div[1]").eq(index).click({ force: true })
            }
        })
        cy.log('Clicked on one of the Network instance ID ')

        //Step 7 : Click on Schedules in Side menu
        inp.locator_Click_Schedules_SideMenu().should('be.visible').click({ force: true })
        cy.log('Clicked on Schedules  in Side menu')

        //(Verification): Verify that we reached Schedules page
        cy.url().should('contain', 'Schedules')
        cy.log('Reached Schedules page')

        // Get Scheduled last modified before Scheduled (Date)
        cy.xpath("//div[@class='grid-canvas']/div/div[9]").eq(0).then((ee) => {
            before_Scheduled_Modified = ee.text().trim()
        })

        // Get Scheduled last modified by before Scheduled (user)
        cy.xpath("//div[@class='grid-canvas']/div/div[10]").eq(0).then((ee) => {
            before_Scheduled_Modified_by = ee.text().trim()
        })

        // Get Inventry last modified before Alloted (Date)
        cy.xpath("//div[@class='grid-canvas']/div/div[7]").eq(0).then((ee) => {
            before_Inventry_Modified = ee.text().trim()
        })

        // Get Inventry last modified by before Alloted (user)
        cy.xpath("//div[@class='grid-canvas']/div/div[8]").eq(0).then((ee) => {
            before_Inventry_Modified_by = ee.text().trim()
        })

        //Step 8 :Click on a date whose status is Empty 
        //select date from the grid 
        cy.xpath("//div[@class='grid-canvas']/div/div[2]").eq(0).then((ff) => {

            //Step 9 :Click on a date whole status is empty
            if (ff.text().includes('Empty')) {
                cy.xpath("//div[@class='grid-canvas']/div/div[1]").eq(0).click({ force: true })
                cy.log('Selected the date which is Empty')
                cy.screenshot();

                //Step 10 :  Click on the Date whose status is empty
                cy.xpath("//div[@class='grid-canvas']/div/div[3]").eq(0).click({ force: true })
                cy.log('Click on the Date whose status is empty')
                cy.screenshot()

                //(Verification) : Verify that Profile page is reached or not
                cy.url().should('contain', 'Profile')
                cy.log('Reached Profile page')
                cy.wait(3000)
                cy.screenshot()

                //Click on the Checkbox to select all
                cy.xpath("//div[@class='slick-header-columns']//div[@class='checkBoxSelection']").should('not.be.checked').scrollIntoView().click({ force: true })
                cy.log('Clicked on the Checkbox to select all')
                cy.wait(2000)

                //Click on the Assign Break Formats button
                cy.xpath("//button[@id='assign-break-formats-button']").scrollIntoView().click({ force: true })
                cy.log('Click on the Assign Break Formats button')
                cy.wait(2000)

                //Select break format from the dropdown
                cy.xpath("//div[@name='breakFormat']/input").click({ force: true })
                cy.xpath("//div[@class='auto-complete-list-drop-down ng-isolate-scope']//span").eq(0).click({ force: true })

                //Click on the Assign button
                cy.xpath("//button[text()='Assign']").scrollIntoView().click({ force: true })
                cy.log('Clicked on the Assign button')
                cy.wait(5000)

                //Click on the Checkbox to select all
                cy.xpath("//div[@class='slick-header-columns']//div[@class='checkBoxSelection']").should('not.be.checked').scrollIntoView().click({ force: true })
                cy.log('Clicked on the Checkbox to select all')
                cy.wait(2000)

                //Click on Build button
                cy.xpath("//button[@id='build-button']").scrollIntoView().click({ force: true })
                cy.log('Clicked on Build button')
                cy.wait(5000)

                //Click on Build button
                cy.xpath("//button[text()='Build']").scrollIntoView().click({ force: true })
                cy.log('Clicked on Build button')


                //Clcik on the Network Instance to get into the Shedule 
                cy.xpath("//div[@id='breadCrumbs.crumb2']/span[contains(text(),'Network Instance')]").scrollIntoView().click({ force: true })
                cy.log('Clciked on the Network Instance')
                cy.wait(5000)

                //(Verification): Verify that we reached Schedules page
                cy.url().should('contain', 'Schedules')
                cy.log('Reached Schedules page')
                cy.screenshot()

                //1.(Verification): Verify That status is now Scheduled
                cy.xpath("//div[@class='grid-canvas']/div/div[2]").eq(0).then((gg) => {
                    if (gg.text().includes('Scheduled')) {
                        cy.xpath("//div[@class='grid-canvas']/div/div[1]").eq(0).click({ force: true })
                        cy.log('Selected the date which is Scheduled')
                        cy.screenshot();
                    }
                    else {
                        cy.log('not entered into if loop')
                    }
                })
            }
        })

        //2.(Verification): Verify That Scheduled last modified and Scheduled last modified by is updated or not
        //(Verification): Get Scheduled last modified after Scheduled
        cy.xpath("//div[@class='grid-canvas']/div/div[5]").eq(0).then((ee) => {
            assert.notEqual(ee.text().trim(), before_Scheduled_Modified, 'Succesfully! Date Modified ')
        })

        /*    //(Verification): Get Scheduled last modified by after Scheduled
            cy.xpath("//div[@class='grid-canvas']/div/div[6]").eq(0).then((ee) => {
                assert.notEqual(ee.text().trim(),before_Scheduled_Modified_by, 'Succesfully! User Modified')
            })*/

        //3.(Verification): Verify That no other field is affected other than these
        //(Verification): Get Inventry last modified after Alloted
        cy.xpath("//div[@class='grid-canvas']/div/div[7]").eq(0).then((ee) => {
            assert.equal(ee.text().trim(), before_Inventry_Modified, 'Date Not Modified ')
        })
        
        /*       //(Verification): Get Inventry last modified by after Alloted
                  cy.xpath("//div[@class='grid-canvas']/div/div[8]").eq(0).then((ee) => {
                      assert.equal(ee.text().trim(), before_Inventry_Modified_by, 'User Not Modified')
                  })*/
    })

})
