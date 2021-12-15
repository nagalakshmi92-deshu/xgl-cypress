/// <reference types="Cypress-xpath" />


import CreateORRetailandthreasoldPageObject from '../../../support/ObjectRepository/Orders/CreateORRetailandthreasoldPageObject'
import MissionControlPageObject from '../../../support/ObjectRepository/MissionControl/MissionControlPageObject'
describe('Verification of XGLT-6694-Misc charge', () => {
    const rt = new CreateORRetailandthreasoldPageObject();
    const mso = new MissionControlPageObject();

    // program to generate random strings
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    function generateString(length) {
        let result = ' ';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        return result;
    }
    //Use the cy.fixture() method to pull data from fixture file
    before(function () {

    })

    beforeEach(() => {
        cy.fixture('Configurations').then(function (data) {
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
    it('XGLT-6694-Misc charge', () => {

        cy.fixture('Configurations.json').then(function (data) {
            this.data = data;


            //Step 1: (Verification) landed on dashboed page
            cy.url().should('contain', '/MissionControl');
            cy.log('Successfully landed on dashboard');
            cy.screenshot();

            // Step 2 : Click on the Main Menu Orders 
            rt.locator_Click_on_Main_Menu_Orders().click({ log: false });
            cy.log('Clicked on the Main Menu Orders Sucessfully')
            cy.screenshot()

            // Click on Customer
            rt.locator_Click_onSubMenu_Customer().click()
            cy.log('Clicked on the Customer Sucessfully')

            // Step 3 : Select description 
            cy.contains('Customers')
            cy.xpath('//div[@select-type="searchSelect"]//div[@class="iconContainer"]/i[@class="fa fa-angle-down"]',{log:false}).click()
            cy.xpath('//div[@class="dropDown"]/child::div[contains(.,"")]').each(($el, index, $list) => {
                if ($el.text().includes('Customer Name')) {
                    $el.click();
                    cy.wait(2000)
                }
                else {
                    cy.log('Not selected')
                }
            }) // Step 4 : Input customer Name
            cy.xpath("//b/preceding-sibling::input[@ng-model='tempModel.value']")
                .invoke('show').clear()
                .click({ log: false })
                .type('Anand1')

            //Step 5 : Click on Search button
            cy.xpath("//input[@ng-model='tempModel.value']/following-sibling::b")
                .click()
            cy.log('Clicked on search button')
            cy.wait(6000)
            cy.log('searched the Customer');

            // Step 6 : Click on the Customer ID
            rt.locator_click_on_CustomerID().click()
            cy.log('Click on the Customer ID ')

            // Step 7 : Click on the Orders for the Side Menu
            rt.locators_Click_on_Orders_from_Side_Menu().click()
            cy.log('Clicked on the Orders for the Side Menu');
            cy.wait(6000)

            // Step 8 : click on the top order from the List
            cy.xpath('//div[@class="grid-canvas"]/div[1]/div[@class="slick-cell l0 r0 actionHighlight"]',{log:false}).click()
            cy.log('clicked on the top order from the List')

            // Step 9 : Click on MiscellaneousCharges
            cy.get('div[id="CustomerOrderEntity.MiscellaneousCharges"]',{log:false}).click()
            cy.log('Clicked on MiscellaneousCharges')

            // Step 10 : Click on the + sign to create new MiscellaneousCharges
            cy.get('button[id="miscellaneousChargesGridDrtv.add"]',{log:false}).click()
            cy.log('Clicked on + sign to create new MiscellaneousCharges')
            cy.screenshot()

            // Step 11 : Imput value in description 
            this.description = generateString(5);
            console.log(this.description);

            // Step 12 : Input the above generated random string to description
            cy.wait(3000)
            cy.get('input[id="miscellaneousChargesProfile_description"]')
                .invoke('show').clear().invoke('val', '').type(this.description+'{enter}');
                
            
            cy.log('Inputed value in description'+ this.description)
            
            // Step 13 : Save the MiscellaneousCharges
            cy.wait(6000)
            cy.get('button[id="cancelSave.save"]').click()
            cy.wait(6000)
            cy.log('Saved the MiscellaneousCharges')
            cy.screenshot()

            // Step 14 : Get Description from MiscellaneousCharges Label
            var MisChargesDesc;
            cy.xpath('//div[@class="innerCrumb ng-isolate-scope"]//*[contains(text(),"Miscellaneous")]').then((e1) => {
                var e2 = e1.text().split(':')
                MisChargesDesc = e2[1]
                cy.log("MisChargesDesc is " + e2[1])


                // Step 15 : Click on Orders and the on MiscellaneousCharges Page
                cy.get('div[id="breadCrumbs.crumb2"] span',{log:false}).click()
                cy.get('div[id="CustomerOrderEntity.MiscellaneousCharges"]',{log:false}).click()
                cy.log('Clicked on MiscellaneousCharges')

                // Step 16 : search for Newly Created MiscellaneousCharges and Click on it 
                cy.get('input[ng-model="tempModel.value"]',{log:false}).type(MisChargesDesc)
               rt.locator_Click_on_Search().click({ force: true })
                
                cy.xpath('//div[@class="grid-canvas"]/div[1]/div[3]',{timeout:20000},{log:false}).click()
                cy.log('Successfully Landed on  Newly Created MiscellaneousCharges record !')
                cy.screenshot()
            })

        })
    })

})