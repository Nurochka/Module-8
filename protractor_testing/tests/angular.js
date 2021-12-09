describe("Bosch site tests", function(){

    it('open bosch.com angular page', function(){
        browser.get('https://www.bosch.com/');

        element(by.className('BoschPrivacySettingsV2__button BoschPrivacySettingsV2__button--primary')).click();

        expect(browser.getTitle()).toEqual("Invented for life | Bosch Global");

    });

    it('go to search "At home" products', function(){ 
        element(by.className('M-Main-Navigation__toggle__icon')).click();
        browser.sleep(1000);

        element(by.className('M-Main-Navigation__link M-Main-Navigation__linkToSecond')).click();
        browser.sleep(1000);

        element(by.linkText('At home')).click();
        browser.sleep(1000);

        expect(browser.getTitle()).toEqual("At home | Bosch Global");
        browser.sleep(1000);

    });

    it('go to not angular https://www.bosch-home.by/ page', function(){ 
        element(by.css('[data-a-modal-trigger="CountrySelectorModal1-493941_2"] > .A-Button-Core__label')).click();
        browser.sleep(1000);

        element(by.css('[name="selectedRegion-{{$ctrl.businessActivityDetails.id}}"]')).click();
        browser.sleep(1000);

       $$('[name="selectedRegion-{{$ctrl.businessActivityDetails.id}}"] option')
            .filter(function(elem, index){
                return elem.getText().then(function(text){
                    return text ==='Europe';
                });
                    
        }).first().click();
        browser.sleep(1000);

        element(by.className('M-Modals-CountrySelector__headline')).click();
        browser.sleep(1000);
  
        element(by.css('[name="selectedCountry-{{$ctrl.businessActivityDetails.id}}"]')).click();
        browser.sleep(1000);
        
       $$('[name="selectedCountry-{{$ctrl.businessActivityDetails.id}}"] option')
            .filter(function(elem, index){
                return elem.getText().then(function(text){
                    return text ==='Belarus';
                });
                    
        }).first().click();
        browser.sleep(1000);

        element(by.className('M-Modals-CountrySelector__headline')).click();
        browser.sleep(1000);

        element(by.css('.A-Link__link--button')).click();
        
        let EC = protractor.ExpectedConditions;
        browser.wait(EC.urlContains('by'), 5000);

        browser.waitForAngularEnabled(false);

        expect(browser.getTitle()).toContain("Беларусь");
        browser.sleep(2000);                       
    });

    it('check there are search resutls (not angular page)', function(){ 
        element(by.className('m-forminput input normal js-search-input')).sendKeys('пылесос');
        browser.sleep(1000);

        element(by.className('icon icon-search icon-m')).click();
        browser.sleep(1000);

        let result = element(by.css('.js-counter'));
        expect(result).toBeTruthy();
        browser.sleep(1000);

    });

});