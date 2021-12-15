/// <reference types="cypress-xpath"/>
import MissionControlPageObject from '../../../support/ObjectRepository/MissionControl/MissionControlPageObject'

describe('Verification of Ad copy status', () => {
var windows_loggedIn_text;
var windows_loggedIn_page;
var xGLinear_loggedIn_text;
var xGLinear_loggedIn_page;

var windows_total_text;
var windows_total_page;
var xGLinear_total_text;
var xGLinear_total_page;

    const mso = new MissionControlPageObject();
    before(function () {
        cy.fixture('missionControl.json').then(function (data) {
            this.data = data
            //LOGIN INTO APPLICATION
            cy.visit(this.data.Environment.baseURL).then(() => {
                cy.log('Entering Username')
                mso.locator_Login_Username().type(this.data.Environment.Username,{sensitive:true })
                cy.log('Entering  Password')
                mso.locator_Login_Password().type(this.data.Environment.Password,{sensitive:true })
                cy.log('Click on Login Button')
                mso.locator_Login_LoginButton().click({ log: false })
                cy.log('Sucess !!');
            })

        })
    })

    it('To verify the ad copy status details are visible', () => {

        cy.wait(8000)
        //Step 1: (Verification) landed on dashboed page
        cy.url().should('contain', '/MissionControl');
        cy.log('Successfully landed on dashboard');
        cy.screenshot();

        //Step 2: Click on Setting Icon 
        mso.locator_SettingIcon().click();
        cy.log('Clicked on Settings icon');
        mso.locator_MissionControlWidgetSettings().then(($el) => {
            expect($el.text()).equals('Mission Control Widget Settings');
        })
        cy.log('Mission Control Widget Settings popup visible on screen')
        cy.screenshot();


        //Step 3: select 'Reconciliation' in 1st  Quadrant
        mso.locator_SelectFirstArrow().click()
        mso.locator_Users().click({ force: true })
        
        mso.locator_SelectSecondArrow().click({ log: false })
        mso.locator_DataGovernance_records().click({ force: true }, { log: false })

        mso.locator_SelectThirdArrow().click({ log: false })
        mso.locator_Finance_records().click({ force: true }, { log: false })
                    
        mso.locator_SelectForthArrow().click({ log: false })
         mso.locator_ACS_records().click({ force: true }, { log: false })


        //Step 4: Click on save button
        cy.log('check whether save button is enabled or not')
        mso.locator_button_Save()
            .should('not.be.disabled')
            .click({ force: true })
        cy.log('Clicked on Save button')

        //Test case:1 
        //Step 5: (Verification) Validate Ad copy handling on Mission Control page
        cy.contains('Users').then(() => {
            if (cy.contains('Windows Active Directory')) {
                cy.log('Successfully! Users on Mission Control page is appear')
            }
            else {
                cy.log('Soory! something went wrong')
            }
        })
    

        //Test case:2  Observe the counts on all four buttons under Users section and click on the respective buttons
        //Windows Active Directory - Logged In
        //Step 6: Get the text on the Windows Active Directory button for LoggedIn and rows count, then compare them
        cy.wait(5000)
        cy.xpath("//h4[text()='Windows Active Directory']/ancestor::div[@class='row']/div[h4[text()='Logged In']]//div[@class='ng-binding']").invoke('text').then((e1)=>{
            windows_loggedIn_text=e1
            cy.log('Count on Windows Active Directory for Logged In text :'+windows_loggedIn_text)
        })   

        cy.xpath("//h4[text()='Windows Active Directory']/ancestor::div[@class='row']/div[h4[text()='Logged In']]//div[@class='inlineBlock butt1']").click()
        cy.url().should('contain','UserSettings/UserSecurity')
        cy.wait(5000)
        cy.get("div.slick-viewport div.grid-canvas").then(($body) => {
            if ($body.find(".ui-widget-content.slick-row").length > 0) {
                windows_loggedIn_page=$body.find(".ui-widget-content.slick-row").length
                cy.log('No.of rows on User Security page =' + windows_loggedIn_page)
       
            }
            else {
                cy.log('Count the no.of rows present in the Ad copy page')
                windows_loggedIn_page=0
                cy.log('No.of rows on User Security page =' + windows_loggedIn_page)
            }
       
        }).then(()=>{
            if(Number(windows_loggedIn_page)==Number(windows_loggedIn_text))
            {
                cy.log('row count and text on button are EQUAL - Windows Active Directory - Logged In')
            }
            else{
                
               assert.equal(Number(windows_loggedIn_page),Number(windows_loggedIn_text),'Count not matched')
            }
        })
        
     
        //xGLinear - Logged In
        //Step 7: Get the text on the xGLinear button for LoggedIn xGLinear rows count, then compare them
        cy.go('back')
        cy.wait(5000)
        cy.xpath("//h4[text()='xG Linear']/ancestor::div[@class='row']//div[@class='ng-binding']").eq(0).invoke('text').then((e1)=>{
            xGLinear_loggedIn_text=e1
            cy.log('Count on Windows Active Directory for Logged In text :'+xGLinear_loggedIn_text)
        })   
        
        cy.xpath("//h4[text()='xG Linear']/ancestor::div[@class='row']//div[@class='inlineBlock butt1']").eq(0).click()
        cy.url().should('contain','UserSettings/UserSecurity')
        cy.wait(5000)
        cy.get("div.slick-viewport div.grid-canvas").then(($body) => {
            if ($body.find(".ui-widget-content.slick-row").length > 0) {
                xGLinear_loggedIn_page=$body.find(".ui-widget-content.slick-row").length
                cy.log('No.of rows on User Security page= ' + xGLinear_loggedIn_page)
            }
            else {
                xGLinear_loggedIn_page=0
                cy.log('No.of rows on User Security page =' + windows_loggedIn_page)
            }
       
        }).then(()=>{
            if(Number(xGLinear_loggedIn_page)==Number(xGLinear_loggedIn_text))
            {
                cy.log('row count and text on button are EQUAL - xGLinear_loggedIn - Logged In')
            }
            else{
                assert.equal(Number(xGLinear_loggedIn_page),Number(xGLinear_loggedIn_text),'Count not matched')
            }
        })

        //Total - Windows Active Directory
        //Step 8: Get the text on the Windows Active Directory button for total rows count, then compare them
        cy.go('back')
        cy.wait(5000)
        cy.xpath("//h4[text()='Windows Active Directory']/ancestor::div[@class='row']/div[h4[text()='Total']]//div[@class='ng-binding']").invoke('text').then((e1)=>{
         var e2=e1.split(',').join('') 
        windows_total_text=Number(e2)
            cy.log('Count on Windows Active Directory for Logged In text :'+windows_total_text)
        })   
        
        cy.xpath("//h4[text()='Windows Active Directory']/ancestor::div[@class='row']/div[h4[text()='Total']]//div[@class='inlineBlock butt1']").click()
        cy.url().should('contain','UserSettings/UserSecurity')
        cy.wait(5000)
        cy.get("div.slick-viewport div.grid-canvas").then(($body) => {
            if ($body.find(".ui-widget-content.slick-row").length > 0) {
                const aa=$body.find(".ui-widget-content.slick-row").length
                windows_total_page=Number(aa)
                cy.log('No.of rows on User Security page= ' + windows_total_page)
       
            }
            else {
                windows_total_page=0
                cy.log('No.of rows on User Security page =' + windows_total_page)
            }
       
        }).then(()=>{
            assert.isAbove(windows_total_text, windows_total_page, 'count matched')
            
            
        })

     //Total -xGLinear 
     //Step 9:Get the text on the xGLinear button for total rows count, then compare them
     cy.go('back')
     cy.wait(5000)
     cy.xpath("//h4[text()='xG Linear']/ancestor::div[@class='row']//div[@class='ng-binding']").eq(1).invoke('text').then((e1)=>{
        xGLinear_total_text=e1
         cy.log('Count on Windows Active Directory for Logged In text :'+xGLinear_total_text)
     })   

     cy.xpath("//h4[text()='xG Linear']/ancestor::div[@class='row']//div[@class='inlineBlock butt1']").eq(1).click()
     cy.url().should('contain','UserSettings/UserSecurity')
     cy.wait(5000)
     cy.get("div.slick-viewport div.grid-canvas").then(($body) => {
         if ($body.find(".ui-widget-content.slick-row").length > 0) {
            xGLinear_total_page=$body.find(".ui-widget-content.slick-row").length
             cy.log('No.of rows on User Security page= ' + xGLinear_total_page)
    
         }
         else {
            xGLinear_total_page=0
             cy.log('No.of rows on User Security page =' + xGLinear_total_page)
         }
    
     }).then(()=>{
         if(Number(xGLinear_total_text)>=Number(xGLinear_total_page))
         {
             cy.log('row count and text on button are EQUAL - Total - xGLinear')
         }
         else{
             assert.equal(Number(xGLinear_total_text),Number(xGLinear_total_page),'Count not matched')
         }
     })

     // Click on Setting Icon and make reset
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