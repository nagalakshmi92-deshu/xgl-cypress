/// <reference types="Cypress-xpath" />
/// <reference types="Cypress-iframe" />

import MissionControlPageObject from '../../../support/ObjectRepository/MissionControl/MissionControlPageObject'
import Inventory_NewRuleTestPO from '../../../support/ObjectRepository/Scheduling/Inventory_NewRuleTestPageObject'
import MassRevertOrderlinesTest_PageObject from '../../../support/ObjectRepository/Orders/MassRevertOrderlinesTest_PageObject'
import 'cypress-iframe'

describe('Verification of XGLT-6810', () => {

    const mso = new MissionControlPageObject();
    const ipo = new Inventory_NewRuleTestPO();
    const mro = new MassRevertOrderlinesTest_PageObject()
    var ad_copy_row;
    var ad_copy_sch;

    //Use the cy.fixture() method to pull data from fixture file
    before(function () {

    })

    beforeEach(() => {
        cy.fixture('Configurations.json').then(function (data) {
            this.data = data;

            cy.visit(this.data.Environment.baseURL).then(() => {
                cy.log('Entering Username')
                mso.locator_Login_Username().type(this.data.Environment.Username);
                cy.log('Entering  Password')
                mso.locator_Login_Password().type(this.data.Environment.Password, { log: false });
                cy.log('Click on Login Button')
                mso.locator_Login_LoginButton().click({ log: false });
                cy.log('Sucess !!');
            })
        })

    })

    it('XGLT-6810_Schedule_ViewerTest.js', () => {
        cy.fixture('Configurations.json').then(function (data) {
            this.data = data;

            // (Verification) landed on dashboed page
            cy.url().should('contain', '/MissionControl');
            cy.log('Successfully landed on dashboard');
            cy.screenshot();

            //Click on the Orders in the main menu
            cy.xpath("//div[@id='header.menuOrders']").click({ force: true })
            cy.log('Clicked on the Orders in the main menu')

            //Click on the Orderlines in the sub menu
            cy.xpath("//div[@id='header.subMenuOrderlines']").click({ force: true })
            cy.log('Clicked on the Orderlines in the sub menu')

            //Click on the orderline which is already scheduled
            cy.xpath("//div[@class='grid-canvas']/div/div[2]/div/div").each((ee, index, list) => {
                if (ee.hasClass('SC')) {
                    cy.xpath("//div[@class='grid-canvas']/div/div[3]").eq(index).click({ force: true })
                    cy.log(index)
                    return false
                }
            })

            //Click on the Current state in the side menu
            cy.xpath("//div[@id='OrderlineEntity.CurrentState']").scrollIntoView().click({ force: true })
            cy.log('Clicked on the Current state in the side menu')

            //Select on row and Get the details of the orderline
            cy.xpath("//div[@class='slick-header-columns']/div").each((gg, index, list) => {
                if (gg.text().includes('Sch')) {
                    const index1=index+1
                    cy.log('index='+index)
                    cy.log('index1='+index1)
                    const index2=1
                    cy.xpath("//div[@class='grid-canvas']/div/div["+index1+"]").each((ee, index2, list) => {
                        cy.log(ee.text())
                        if (ee.text().includes('Yes')) {
                            cy.xpath("//div[@class='grid-canvas']/div/div[1]").eq(0).click()
                            return false;
                        }
                        //Get the details of the orderline
                        cy.xpath("//div[@class='grid-canvas']/div/div[1]").eq(0).then((ee) => {
                            ad_copy_row = ee.text()
                        })

                    })
                }
            })

            //--------------------------------------------------------
            //Select one of the checkbox
          //  cy.xpath("//div[@class='grid-canvas']/div/div[1]").click({ force: true })
           // cy.log('Selected one of the checkbox')

            //Click on the viewSchedule button
            cy.xpath("//button[@id='orderlineAdUnitGrid.viewSchedule']").scrollIntoView().should('be.enabled').then((tt)=>{
               cy.log(tt.prop('href'))
            })
            //.invoke('removeAttr','ng-disabled').click({ force: true })
            cy.log('Clicked on the viewSchedule button')

            //working with iframes
            cy.frameLoaded("[class='svIframe ng-scope']")
            //Rght click on any job which is not LEFT 
            cy.iframe().xpath("//div[@class='schedules-container']/div[@id='breaks-and-schedules']/div[@id='rows']/div[@class='break-row']//div[@class='sv-ad-item-inner']").eq(1).trigger('mouseover').then(() => {
                cy.wait(3000)
                cy.iframe().xpath("//div[div[text()='Ad Copy Name']]/div[2]").then((ff) => {
                    ad_copy_sch = ff
                    if (ad_copy_row.includes(ad_copy_sch)) {
                        cy.log('Check the orderline created is placed in the proper schedule')
                    }
                    else {
                        cy.log('something went wrong')
                    }
                })
            })
        })
    })

})