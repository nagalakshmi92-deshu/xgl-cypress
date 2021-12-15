/// <reference types="Cypress-xpath" />


import CreateORRetailandthreasoldPageObject from '../../../support/ObjectRepository/Orders/CreateORRetailandthreasoldPageObject'
import CreateCustomerTestpageObject from '../../../support/ObjectRepository/Orders/CreateCustomerTestpageObject'
import MissionControlPageObject from '../../../support/ObjectRepository/MissionControl/MissionControlPageObject'


describe('Verification of OrderCopyMangement', () => {
    const ocm = new CreateCustomerTestpageObject();
    const mso = new MissionControlPageObject();
    const rt = new CreateORRetailandthreasoldPageObject();

    var customer_Id;

    //Use the cy.fixture() method to pull data from fixture file
    before(function () {

    })

    beforeEach(() => {
        cy.fixture('Order.json').then(function (data) {
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

    it('XGLT-6666 Create Customer Test', () => {
        cy.fixture('Order.json').then(function (data) {
            this.data = data;
            //Step 1: (Verification) landed on dashboed page
            cy.url()
                .should('contain', '/MissionControl');
            cy.log('Successfully landed on dashboard');
            cy.screenshot();

            //Step 2: Click on Setting Icon and verify that settings icon is opened

            mso.locator_SettingIcon()
                .scrollIntoView()
                .should('be.visible', { timeout: 5000 }, { log: false })
                .click();
            cy.log('Clicked on Settings icon');
            mso.locator_MissionControlWidgetSettings()
                .then(($el) => {
                    expect($el.text()).equals('Mission Control Widget Settings');
                })
            cy.log('Mission Control Widget Settings popup visible on screen')
            cy.screenshot();


            //Step 3: select 'Ad copy Handling' in 1st  Quadrant


            mso.locator_SelectFirstArrow().click({ log: false })
            mso.locator_ACH_records().click({ force: true }, { log: false })

            mso.locator_SelectSecondArrow().click({ log: false })
            mso.locator_DataGovernance_records().click({ force: true }, { log: false })

            mso.locator_SelectThirdArrow().click({ log: false })
            mso.locator_Finance_records().click({ force: true }, { log: false })

            mso.locator_SelectForthArrow().click({ log: false })
            mso.locator_Reconciliation().click({ force: true }, { log: false })


            //Step 4: Click on save button
            cy.log('check whether save button is enabled or not and then click on it')
            mso.locator_button_Save()
                .should('not.be.disabled', { log: false })
                .click({ force: true }, { log: false })
            cy.log('Clicked on Save button')
            cy.wait(5000)

            cy.xpath("//div[@class='copyhandling ng-scope']//div[@class='inlineBlock butt2']//div[@class='btnBig arrow']")
                .should('be.visible')
                .click({ force: true })
                cy.wait(5000)
            cy.url()
                .should('contain', 'CopyHandling/CopyHandling/CopyUpdate')
            cy.wait(5000)

            //filter
           // cy.xpath("//button[text()='×']").click({ force: true }, { log: false })
            cy.xpath("//div[@id='customersGrid.advanced']//div[@class='icon']").invoke('show').scrollIntoView().trigger('click')
            cy.xpath("//b[@class='lamp']").eq(0).click({force:true})
            cy.xpath("(//input[contains(@class,'defaultTextInput ')])[2]")
              .click()
              .type(this.data.AdCopyGroup.Customer_Name,{force: true})
            cy.xpath("//button[text()='Search']").scrollIntoView().click({ force: true }, { log: false })

cy.wait(10000)
            cy.xpath("//button[@id='copyUpdate.runCopyUpdate']").scrollIntoView().click({ force: true }, { log: false })
            for (let i = 0; i < 10; i++) {
                cy.xpath("//div[@class='grid-canvas']").then((ee) => {
                    if (ee.find("div").length > 0) {
                        cy.wait(5000)
                        cy.xpath("//button[@class='refresh']").trigger('click')
                    }
                    else { return false }
                })
            }
        })
    })
})
