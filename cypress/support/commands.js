
/// <reference types="cypress" />
import 'cypress-file-upload';

require('cypress-downloadfile/lib/downloadFileCommand')

Cypress.Commands.add("LoaderDisappear", () => {
  const waitForSpinner = () => {
    cy.wait(5000)
    cy.log("Wait Implicit")
    // First, make sure the loading indicator shows up (positive assertion)
    cy.xpath('//div[@class="mainSpinner spinnerIcon ng-isolate-scope big"]/child::div[1]').should('be.visible')

    cy.log('Waiting for Visible')
    // Then Assert it goes away (negative assertion)
    cy.xpath('//div[@class="mainSpinner spinnerIcon ng-isolate-scope big"]/child::div[1]').should('not.be.visible')
    cy.log('Wait for dissappers')
  }
})

Cypress.Commands.overwrite('type', (originalFn, element, text, options) => {
  if (options && options.sensitive) {
    options.log = false

    Cypress.log({
      $el: element,
      name: 'type',
      message: '*'.repeat(text.length),
    })
  }

  return originalFn(element, text, options)
})
Cypress.Commands.add('SelectCommodity', (record_name) => {
  cy.xpath('//label[contains(.,"Commodity")]/following-sibling::div/descendant::div[@ng-if="showDropDown"]/div')
    .find('div')
    .should($a => {
      let rec = $a.map((i, el) => {
        return Cypress.$(el).text().trim()
      })

      expect(rec.get()).to.contain(record_name)


    })



})

Cypress.Commands.add('VerifyRecordPresentInTable', (record_name) => {
  cy.xpath('//div[@class="grid-canvas"]/child::div/child::div')
    .find('div')
    .should($a => {
      let rec = $a.map((i, el) => {
        return Cypress.$(el).text().trim()
      })



      expect(rec.get()).to.contain(record_name)



    })
})
Cypress.Commands.add('VerifyRecordPresentInAdCopyGroupTable', (record_name) => {
  cy.xpath('//div[@class="grid-canvas"]/child::div/child::div')
    .should($a => {
      let rec = $a.map((i, el) => {
        return Cypress.$(el).text().trim()
      })



      expect(rec.get()).to.contain(record_name)



    })
})

Cypress.Commands.add('Select_Customer', (customer) => {
  cy.get('div[name="customer"] input').click({ force: true })
  cy.wait(2000)
  cy.xpath("//span[@class='ng-binding']").each(($el, index, $list) => {
    if ($el.text().includes(customer)) {
      $el.click();
      cy.wait(2000)
    }
    else {
      cy.log('Not selected')
    }
  })
})

Cypress.Commands.add('Select_AddCopyGroupType', (type) => {
  cy.get('//i[@class="fa fa-angle-down"]').trigger('mouseover').click({ force: true })
  cy.wait(2000)
  cy.xpath('//div[@class="dropDown"]/child::div[contains(.,"")]').each(($el, index, $list) => {
    if ($el.text().includes(type)) {
      $el.click();
      cy.wait(2000)
    }
    else {
      cy.log('Not selected')
    }
  })
})



Cypress.Commands.add('VerifyGroupType', (type) => {
  cy.xpath('//div[@class="grid-canvas"]/child::div/child::div').each(($el, index, $list) => {
    if ($el.text().includes(type)) {
      cy.log('record present ' + type)
      cy.wait(2000)
    }
    else {
      cy.log('Not selected')
    }
  })
})
Cypress.Commands.add('getIframe', (iframe) => {
  return cy.get(iframe)
    .its('0.contentDocument.body')
    .should('be.visible')
    .then(cy.wrap);
})

Cypress.Commands.add('VerifyRecordPresentInJobTable', (Job_name) => {
  cy.xpath('//div[@class="grid-canvas"]/div')
    .find('div')
    .should($a => {
      let rec = $a.map((i, el) => {
        return Cypress.$(el).text().trim()
      })

      expect(rec.get()).to.contain(Job_name)

    })
  cy.log('Record present =' + Job_name)
})

Cypress.Commands.add('getIframeBody', (iframe_xpath) => {
  // get the iframe > document > body
  // and retry until the body element is not empty
  return cy
    .xpath(iframe_xpath, { timeout: 60000 })
    .its('0.contentDocument.body').should('not.be.empty')
    // wraps "body" DOM element to allow
    // chaining more Cypress commands, like ".find(...)"
    // https://on.cypress.io/wrap
    .then(cy.wrap)
})

//-----------------------------------------------------------NAGALAKSHMI ORDER COPY MANAGEMENT------------------------------------------------------------------------------------
//Select customer Name from dropdown
Cypress.Commands.add('customer_Name', () => {
  cy.xpath('//div[@select-type="searchSelect"]//div[@class="iconContainer"]/i[@class="fa fa-angle-down"]').click({ log: false })
  cy.xpath('//div[@class="dropDown"]/child::div[contains(.,"")]').each(($el, index, $list) => {
    if ($el.text().includes('Customer Name')) {
      $el.click({ log: false });
      //cy.wait(2000)
    }
  })
})

Cypress.Commands.add('Allow_Billing', () => {
  cy.xpath("//button[text()='Edit']").then((ff) => {
    cy.wait(5000)
    if (ff.hasClass('btnSmall light')) {
      cy.log('Edit button is enabled')
      cy.xpath("//div[@id='orderlinesSettingsGridDrtv.changeBillingMode']").scrollIntoView().then((ee) => {
        cy.wait(5000)
        if (ee.hasClass('inputBlock ng-isolate-scope defaultCheckboxInput ng-valid ng-not-empty ng-touched ng-dirty ng-valid-parse selected')) {
          cy.xpath("//div[@class='buttonsArea detailsPageTop ng-isolate-scope']/button[text()='Save']").click({ force: true })
        }
        else {
          cy.wait(5000)
          cy.xpath("//div[@id='orderlinesSettingsGridDrtv.changeBillingMode']").scrollIntoView().click({ force: true })
          cy.xpath("//div[@class='buttonsArea detailsPageTop ng-isolate-scope']/button[text()='Save']").click({ force: true })
        }
      })
      cy.log('Checked on the Allow Billing Mode Checkbox')

    }
    else {
      //Click on the Allow Billing mode Checkbox
      cy.xpath("//div[@id='orderlinesSettingsGridDrtv.changeBillingMode']").scrollIntoView().then((ee) => {
        cy.wait(5000)
        if (ee.hasClass('inputBlock ng-isolate-scope defaultCheckboxInput ng-valid ng-not-empty ng-touched ng-dirty ng-valid-parse selected')) {
          cy.xpath("//div[@class='buttonsArea detailsPageTop ng-isolate-scope']/button[text()='Save']").click({ force: true })
        }
        else {
          cy.wait(5000)
          cy.xpath("//div[@id='orderlinesSettingsGridDrtv.changeBillingMode']").scrollIntoView().click({ force: true })
          cy.xpath("//div[@class='buttonsArea detailsPageTop ng-isolate-scope']/button[text()='Save']").click({ force: true })
        }
      })
      cy.log('Checked on the Allow Billing Mode Checkbox')
    }
  })
})

Cypress.Commands.add('Select_Month', (month) => {
  for (let i = 0; i < 12; i++) {
    cy.xpath("//div[@class='datetimepicker-days ng-scope']//th[@class='switch ng-binding']").then((ee) => {
      if (!(ee.text().includes(month))) {
        cy.xpath("//div[@class='datetimepicker-days ng-scope']//th[@class='next']").click({ force: true })
        cy.wait(1000)
      }
    })
  }
})

Cypress.Commands.add('Select_Day', (month, day) => {
  cy.xpath("//div[@class='datetimepicker-days ng-scope']//th[@class='switch ng-binding']").then((ee) => {
    if (ee.text().includes(month)) {
      cy.xpath("//div[@class='datetimepicker-days ng-scope']//td[text()='" + day + "']").should('be.visible').click({ force: true })
      cy.wait(1000)
    }
  })
})


//---Inventory 
Cypress.Commands.add('Select_InventoryType', (inventoryType) => {
  cy.xpath('//div[@class="auto-complete-list-drop-down ng-isolate-scope"]/child::div/span').each(($el, index, $list) => {
    if ($el.text().includes(inventoryType)) {
      $el.click();
      cy.wait(2000)
    }
    else {
      cy.log('Not selected any inventory type ')
      //throw new Error("Test fails here , because Not selected any inventory type !!")
    }
  })
})

Cypress.Commands.add('Select_Network', (Network_Name) => {
  cy.xpath('//div[@class="auto-complete-list-drop-down ng-isolate-scope"]/child::div/span').each(($el, index, $list) => {
    if ($el.text().includes(Network_Name)) {
      $el.click();
      cy.wait(2000)
    }
    else {
      cy.log('Not selected any inventory type ')
      //throw new Error("Test fails here , because Not selected any Network name !!")
    }
  })
})

Cypress.Commands.add('Select_ValueFromDropDown', (record_value) => {
  cy.xpath('//span[contains(.,"ID") and @ng-if="settings.title"]/following-sibling::div/child::div[2]/child::div/span', { log: false }).each(($el, index, $list) => {
    if ($el.text().includes(record_value)) {
      $el.click({ force: true });
      cy.wait(2000)
    }
    else {
      cy.log('Not selected any  type ')
      //throw new Error("Test fails here , because Not selected any Network name !!")
    }
  })
})