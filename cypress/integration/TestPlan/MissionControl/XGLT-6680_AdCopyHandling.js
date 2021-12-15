/// <reference types="cypress-xpath"/>
import MissionControlPageObject from '../../../support/ObjectRepository/MissionControl/MissionControlPageObject'

describe('XGLT-6680_AdCopyHandling', () => {
    var missing_Ad_tom_text;
    var missing_Ad_tom_page;
    var missing_Ad_next4d_text;
    var missing_Ad_next4d_page;
    var adCopy_Pending_tom_text;
    var adCopy_Pending_tom_page;
    var adCopy_Pending_next4d_text;
    var adCopy_Pending_next4d_page;
    const mso = new MissionControlPageObject();

    before(function () {
        cy.fixture('missionControl.json').then(function (data) {
            this.data = data;

            cy.visit(this.data.Environment.baseURL).then(() => {
                cy.log('Entering Username')
                mso.locator_Login_Username().type(this.data.Environment.Username, { sensitive: true });
                cy.log('Entering  Password')
                mso.locator_Login_Password().type(this.data.Environment.Password, { sensitive: true });
                cy.log('Click on Login Button')
                mso.locator_Login_LoginButton().click({ log: false });
                cy.log('Sucess !!');
            })

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


        })
    })

    it('Verify the AD COPY HANDLING ', () => {

        //Test case:1 Validate Ad copy handling on Mission Control page
        //Step 5: (Verification) Validate Ad copy handling quadrate on Mission Control page
        cy.contains('Ad Copy Handling', { log: false })
            .then(() => {
                if (cy.contains('Overview of Ad Units that are missing Ad Copy instructions or are pending update for Ad Copy.', { log: false })) {
                    cy.log('Successfully! Ad copy handling on Mission Control page is appear')
                }
                else {
                    cy.log('Soory! something went wrong')
                }

            })


        //Test case:2 Missing Ad copy Instructions button count for TOMORROW option
        //Scenario 1: FOR TOMORROW - Missing Ad Copy Instructions
        //Step 6: Get the count on Missing Ad Copy Instuction button text and click on it
        cy.wait(10000)
        cy.xpath("//div[h4[text()='Missing Ad Copy Instructions']]//div[@class='ng-binding']", { log: false })
            .invoke('text', { log: false })
            .then((e1) => {
                cy.log('missing_Ad_tom_text: ' + missing_Ad_tom_text)
            })

        cy.xpath("//h4[text()='Missing Ad Copy Instructions']/parent::div[@class='inlineBlock butt1']/div[@class='btnBig arrow']")
            .click({ log: false })

        cy.url()
            .should('contain', 'MissingCopy')
        cy.wait(5000)

        //Step 7:Get the text on label and compare it with the text on button
        cy.xpath("//aside[@class='sidebarCopyHandling ng-scope']//div[@class='btnBig arrow top']")
            .should('be.visible')
            .invoke('text')
            .then((e1) => {
                var e2 = e1.split('Missing')
                missing_Ad_tom_page = e2[0]
                cy.log('missing_Ad_tom_page: ' + missing_Ad_tom_page)
            }).then(() => {
                if (Number(missing_Ad_tom_text) == Number(missing_Ad_tom_page)) {
                    cy.log('Both counts are equal')
                }
                else {
                    // assert.equal(Number(missing_Ad_tom_text), Number(missing_Ad_tom_page), 'counts not matched')
                }
            })

        //Scenario 2: Next 4 days - Missing Ad Copy Instructions
        //Step 8: Get the count on Missing Ad Copy Instuction button text and click on it, for next 4 days

        cy.go('back')
        cy.wait(5000)
        cy.contains("div[class='defaultRadioInputs ng-binding ng-scope']", 'Next 4 days')
            .click({ log: false })

        cy.wait(3000)
        cy.xpath("//div[h4[text()='Missing Ad Copy Instructions']]//div[@class='ng-binding']")
            .should('be.visible')
            .invoke('text')
            .then((e1) => {
                missing_Ad_next4d_text = e1
                cy.log('missing_Ad_next4d_text: ' + missing_Ad_next4d_text)
            })

        //Step 9:(Verification) Go to next page, get text and compare
        cy.xpath("//h4[text()='Missing Ad Copy Instructions']/parent::div[@class='inlineBlock butt1']/div[@class='btnBig arrow']")
            .click({ log: false })

        cy.url()
            .should('contain', 'MissingCopy')

        cy.wait(5000)
        cy.xpath("//aside[@class='sidebarCopyHandling ng-scope']//div[@class='btnBig arrow top']")
            .invoke('text')
            .then((e1) => {
                var e2 = e1.split('Missing')
                missing_Ad_next4d_page = e2[0]
                cy.log('missing_Ad_next4d_page: ' + missing_Ad_next4d_page)
            }).then(() => {
                if (Number(missing_Ad_next4d_page) == Number(missing_Ad_next4d_text)) {
                    cy.log('Both counts are equal')
                }
                else {
                    assert.equal(Number(missing_Ad_next4d_page), Number(missing_Ad_next4d_text), 'count not matched')
                }
            })

        //Test case 3: click on button under Ad Copy Pending Update Label
        //Scenario 1: Tomorrow -  Ad Copy Pending Update
        //Step 10: Get the text on the buton of Ad Copy Pending Update for TOMORROW

        cy.go('back')
        cy.wait(5000)
        cy.xpath("//h4[text()='Ad Copy Pending Update']/parent::div[@class='inlineBlock butt2']//div[@class='ng-binding']")
            .should('be.visible')
            .invoke('text')
            .then((e1) => {
                adCopy_Pending_tom_text = e1
                cy.log('adCopy_Pending_tom_text: ' + adCopy_Pending_tom_text)
            })
        //Step 11: (Verification) Click on button, navigate to next page, get the count and compare
        cy.xpath("//h4[text()='Ad Copy Pending Update']/parent::div[@class='inlineBlock butt2']/div[@class='btnBig arrow']")
            .should('be.visible')
            .click({ log: false })
        cy.url()
            .should('contain', 'CopyHandling/CopyHandling/CopyUpdate')
        cy.wait(5000)
        cy.xpath("//aside[@class='sidebarCopyHandling ng-scope']//div[@class='btnBig arrow top']")
            .should('be.visible')
            .invoke('text')
            .then((e1) => {
                var e2 = e1.split('Ad')
                adCopy_Pending_tom_page = e2[0]
                cy.log('adCopy_Pending_tom_page :' + adCopy_Pending_tom_page)
            }).then(() => {
                if (Number(adCopy_Pending_tom_page) == Number(adCopy_Pending_tom_text)) {
                    cy.log('Both count are equal')
                }
                else {
                    assert.equal(Number(adCopy_Pending_tom_page), Number(adCopy_Pending_tom_text), 'Count not Matched')
                }
            })
        //Scenario :2 For next 4 days -  Ad Copy Pending Update
        //Step 12:Click on next 4 days radio button, get the text on the button of Ad Copy pending update
        cy.go('back')
        cy.wait(5000)
        cy.xpath("//div[@class='defaultRadioInputs ng-binding ng-scope']")
            .contains('Next 4 days')
            .click({ log: false })

        cy.xpath("//h4[text()='Ad Copy Pending Update']/parent::div[@class='inlineBlock butt2']//div[@class='ng-binding']")
            .should('be.visible')
            .invoke('text')
            .then((e1) => {
                adCopy_Pending_next4d_text = e1
                cy.log('adCopy_Pending_next4d_text: ' + adCopy_Pending_next4d_text)
            })

        //Step 11: (Verification) Click on button, navigate to next page, get the count and compare
        cy.xpath("//h4[text()='Ad Copy Pending Update']/parent::div[@class='inlineBlock butt2']/div[@class='btnBig arrow']")
            .should('be.visible')
            .click({ log: false })
        cy.url()
            .should('contain', 'CopyHandling/CopyHandling/CopyUpdate')
        cy.wait(5000)
        cy.xpath("//aside[@class='sidebarCopyHandling ng-scope']//div[@class='btnBig arrow top']")
            .should('be.visible')
            .invoke('text')
            .then((e1) => {
                var e2 = e1.split('Ad')
                adCopy_Pending_next4d_page = e2[0]
                cy.log('adCopy_Pending_tom_page :' + adCopy_Pending_next4d_page)
            }).then(() => {
                if (Number(adCopy_Pending_next4d_page) == Number(adCopy_Pending_next4d_text)) {
                    cy.log('Both counts are equal')
                }
                else (
                    assert.equal(Number(adCopy_Pending_next4d_page), Number(adCopy_Pending_next4d_text), 'Count not Matched')
                )
            })

        //Step 11: Click on Setting Icon and make reset
        cy.go(-1)
        cy.wait(2000)
        mso.locator_SettingIcon().scrollIntoView()
        mso.locator_SettingIcon().click({ force: true });
        cy.log('Clicked on Settings icon');
        mso.locator_MissionControlWidgetSettings().then(($el) => {
            expect($el.text()).equals('Mission Control Widget Settings');
        })
        cy.log('Mission Control Widget Settings popup visible on screen')
        cy.screenshot();

        // Click on Save button
        mso.locator_button_reset().click({ force: true });
        cy.contains('Ad Copy Handling');
        cy.log('Clicked on reset button successfully.')
    })



})