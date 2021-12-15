/// <reference types="cypress-xpath"/>

import Create_InventoryTypesTestPageObject from '../../../support/ObjectRepository/Configuration/Create_InventoryTypesTestPageObject'
import MissionControlPageObject from '../../../support/ObjectRepository/MissionControl/MissionControlPageObject'

describe('Verification XGLT-6804_AllocateInventoryTest', () => {

    const inp = new Create_InventoryTypesTestPageObject();
    const mso = new MissionControlPageObject();
    var before_Alloted_Modified
    var before_Alloted_Modified_by
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

    it('XGLT-6804_AllocateInventoryTest', () => {

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

        //(Verification): Verify that we reached Networks page
        cy.url().should('contain', 'Networks')
        cy.log('Reached Networks page')
        cy.wait(3000);

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

        // Get Allocated last modified before Alloted (Date)
        cy.xpath("//div[@class='grid-canvas']/div/div[9]").eq(0).then((ee) => {
            before_Alloted_Modified = ee.text().trim()
        })

        // Get Allocated last modified by before Alloted (user)
        cy.xpath("//div[@class='grid-canvas']/div/div[10]").eq(0).then((ee) => {
            before_Alloted_Modified_by = ee.text().trim()
        })

        // Get Inventry last modified before Alloted (Date)
        cy.xpath("//div[@class='grid-canvas']/div/div[7]").eq(0).then((ee) => {
            before_Inventry_Modified = ee.text().trim()
        })

        // Get Inventry last modified by before Alloted (user)
        cy.xpath("//div[@class='grid-canvas']/div/div[8]").eq(0).then((ee) => {
            before_Inventry_Modified_by = ee.text().trim()
        })


        //Step 8 :Click on a date whose status is scheduled 
        cy.xpath("//div[@class='grid-canvas']/div/div[2]").eq(0).then((ff) => {

            //Step 9 :select date from the grid which is scheduled
            if (ff.text().includes('Scheduled')) {

                // Get Allocated last modified before Alloted (Date)
                cy.xpath("//div[@class='grid-canvas']/div/div[9]").eq(0).then((ee) => {
                    before_Alloted_Modified = ee.text().trim()
                })

                // Get Allocated last modified by before Alloted (user)
                cy.xpath("//div[@class='grid-canvas']/div/div[10]").eq(0).then((ee) => {
                    before_Alloted_Modified_by = ee.text().trim()
                })

                // Get Inventry last modified before Alloted (Date)
                cy.xpath("//div[@class='grid-canvas']/div/div[7]").eq(0).then((ee) => {
                    before_Inventry_Modified = ee.text().trim()
                })

                // Get Inventry last modified by before Alloted (user)
                cy.xpath("//div[@class='grid-canvas']/div/div[8]").eq(0).then((ee) => {
                    before_Inventry_Modified_by = ee.text().trim()
                })

                //Select the date which is Scheduled
                cy.xpath("//div[@class='grid-canvas']/div/div[1]").eq(0).click({ force: true })
                cy.log('Selected the date which is Scheduled')
                cy.screenshot();

                //Step 10 : Click on Allocate 
                cy.xpath("//button[@id='network-instance-schedules-allocate']").scrollIntoView().click({ force: true })
                cy.xpath("//button[text()='Allocate']").scrollIntoView().click({ force: true })
                cy.log('Clicked on Allocate button ')

                //1.(Verification): Verify That status is now Allocated
                for (let i = 0; i < 5; i++) {
                    cy.wait(5000)
                    cy.reload()
                    cy.xpath("//div[@class='grid-canvas']/div/div[2]", { timeout: 120000 }).eq(0).then((gg) => {
                        if (gg.text().includes('Allocated')) {
                            cy.log('The status is now Allocated ')
                            cy.screenshot();
                            return false;
                        }
                    })
                }
            }
            //2.(Verification): Verify That allocated last modified and allocated last modified by is updated or not
            //(Verification): Get Allocated last modified after Alloted
            cy.xpath("//div[@class='grid-canvas']/div/div[9]").eq(0).then((ee) => {
                assert.notEqual(ee.text().trim(), before_Alloted_Modified, 'Succesfully! Date Modified ')
            })

            /*    //(Verification): Get Allocated last modified by after Alloted
                cy.xpath("//div[@class='grid-canvas']/div/div[10]").eq(0).then((ee) => {
                    assert.notEqual(ee.text().trim(),before_Alloted_Modified_by, 'Succesfully! User Modified')
                })*/

            //3.(Verification): Verify That no other field is affected other than these
            //(Verification): Get Allocated last modified after Alloted
            cy.xpath("//div[@class='grid-canvas']/div/div[7]").eq(0).then((ee) => {
                assert.equal(ee.text().trim(), before_Inventry_Modified, 'Date Not Modified ')
            })

            /*       //(Verification): Get Allocated last modified by after Alloted
                      cy.xpath("//div[@class='grid-canvas']/div/div[8]").eq(0).then((ee) => {
                          assert.equal(ee.text().trim(), before_Inventry_Modified_by, 'User Not Modified')
                      })*/
        })
    })
})


