const {By,Key,Builder,until} = require("selenium-webdriver");
const expect = require("chai").expect;

require("chromedriver");
 
describe("Perform search for job position on careers.epam.by and check thre are correspondance results", function(){    
        let searchPosition = "Test Automation Engineer";                               
                    
        it("should search for job and filter results", async function () {             
         
        let driver = await new Builder().forBrowser("chrome").build();
        driver.manage().window().maximize();
        
        //To fetch https://careers.epam.by/ from the browser
        await driver.get("https://careers.epam.by/");
        
        //To click on 'Карьера' button in top menu
        driver.executeScript("arguments[0].style.backgroundColor = '" + "red" + "'", await driver.findElement(By.xpath("//a[text()='Карьера']")));
        driver.sleep(9000);

        //await driver.findElement(By.xpath("//a[text()='Карьера']")).click();
        driver.actions().click(await driver.findElement(By.xpath("//a[text()='Карьера']"))).perform();
        
        //Close pop-up with cookies
        try{
                await driver.findElement(By.className("button-ui bg-color-light-blue cookie-disclaimer__button")).click();
        } 
                catch(StaleElementReferenceError){
                        await driver.findElement(By.className("button-ui bg-color-light-blue cookie-disclaimer__button")).click();
                }

        //To send a search query by passing the value in searchPosition
        await driver.findElement(By.xpath("//input[@id='new_form_job_search-keyword']")).sendKeys(searchPosition);
        await driver.findElement(By.className("recruiting-search__submit")).click();
        driver.sleep(20000);   
              
        //To filter results
        await driver.findElement(By.className("recruiting-search__filter-label checkbox-custom-label")).click();
        driver.navigate().refresh();
               
        //To highlight results
        let recordWithResults =  await driver.wait(until.elementLocated(By.className("search-result__heading")));
        await driver.executeScript("arguments[0].style.backgroundColor = '" + "green" + "'", recordWithResults);
        driver.sleep(2000);

        //const results = Object.entries(await driver.findElements(By.className("search-result__item"))).length;

        //click on "Узнать больше" button
        driver.executeScript('window.scrollTo(0,450);');                
        driver.actions().click(await driver.wait(until.elementLocated(By.className("search-result__item-apply")))).perform();
        driver.sleep(2000);

        //let jobName = await driver.wait(until.elementLocated(By.xpath("//h1[1]"))).getText();
        try {
               expect(await driver.wait(until.elementLocated(By.xpath("//h1[1]"))).getText()).to.contain("Test Automation");   
        }
            catch(StaleElementReferenceError)
            {
               expect(await driver.wait(until.elementLocated(By.xpath("//h1[1]"))).getText()).to.contain("Test Automation");   
            }

        //To quit the browser after execution
        //driver.quit();                
        });
});