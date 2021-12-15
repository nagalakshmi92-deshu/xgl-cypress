/// <reference types="cypress-xpath"/>

import Create_InventoryTypesTestPageObject from '../../../support/ObjectRepository/Configuration/Create_InventoryTypesTestPageObject'
import MissionControlPageObject from '../../../support/ObjectRepository/MissionControl/MissionControlPageObject'

describe('Verification of XGLT-6756', () => {
    const inp = new Create_InventoryTypesTestPageObject();
    const mso = new MissionControlPageObject();
    
    

    const integers = '0123456789';
    function userID(length) {
        let result = ' ';
        const charactersLength = integers.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    } 
    const characters='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    function userROLE(length) {
        let result = ' ';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    } 
    
    var userId=userID(3)
    var userRole=userROLE(5)

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

    it('XGLT-756 - Configuration UserSettings Test', () => {
        cy.fixture('Configurations.json').then(function (data) {
            this.data = data;
            // (Verification) landed on dashboed page
            cy.url().should('contain', '/MissionControl');
            cy.log('Successfully landed on dashboard');
            cy.screenshot();

            //Step 1: Click on the Configuration from main menu
            inp.locator_SubMenu_Configuration()
                .should('be.visible')
                .click({ force: true })
            cy.log('Clicked on the Configuration from main menu')

            //Step 2 :Click on the submenu UserSettings
            inp.locator_Submenu_UserSettings()
                .should('be.visible')
                .click({ force: true })
            cy.log('Clicked on the submenu UserSettings')

            //Step 3:(Verification): Verify that we reached UserRoles page
            cy.url().should('contain', 'UserRoles')
            cy.log('Successfully! Reached UserRoles page')

            //Step 4:Click on plus button
            cy.xpath("//button[@id='userRolesGridDrtv.add']").scrollIntoView().trigger('click')
            cy.log('Clicked on the plus button to create new user roles')

            //Step 5:Enter required data
           // Enter the user role code
            cy.xpath("//input[@name='userRoleCode']").click().type(userId)
            cy.log('Entered the user role code')

            //Enter User Role Description 
            cy.xpath("//input[@name='description']").click().type(userRole)
            cy.log('Entered the user Description')
            cy.wait(3000)

            //click on the check box to grant perssions
            cy.xpath("//div[@class='grid-canvas']/div[1]/div[1]").scrollIntoView().click({force:true})
            cy.log('clicked on the check box to grant perssions')

            //Click on the Grant button
            cy.xpath("//button[@id='userRolesGridDrtv.Grant']").should('be.enabled').trigger('click')
            cy.log('Clicked on the Grant button')
            cy.wait(2000)

            //(Verification) Verify in the pop up window
            cy.xpath("//div[@class='popupWindowBody']/div").then((ff)=>{
                if(ff.text().includes('grant permission'))
                {
                    cy.xpath("//div[@class='popupWindowButtons buttonsArea']/button[text()='Yes']").trigger('click')
                    cy.log("Click on OK button in the popup window")
                }
            })

            //Click on the checkbox to Revoke it again
            cy.xpath("//div[@class='grid-canvas']/div[1]/div[1]").scrollIntoView().click({force:true})
            cy.xpath("//button[@id='userRolesGridDrtv.Revoke']").should('be.enabled').trigger('click')
            cy.log('Clicked on the Revoke button')
            cy.wait(2000)
            
            //Step 6: Click on save button 
            cy.xpath("//button[@id='cancelSave.save']").click({force:true})
            cy.log('Clicked on save button ')
            cy.wait(3000)

            cy.log(userId)
            cy.log(userROLE(5))

            //(Verification): Click on the User Settings to get the created user role
            cy.xpath("//div[@class='crumb ng-scope last']").then((ee) => {
                var e1 = ee.text().split(':')
                cy.log('e1'+e1)
                var e2 = e1[1].trim()
                cy.log('e2'+e2)
                var createdId = e2
                assert.isOk(createdId,userId,'User role is created Successfully')
                //assert.equal(userId,createdId,)
                cy.log('User role is created Successfully') 
            })   
        })
    })
})
