module.exports = {
    //Is login screen is displayed
    "Login into App": function(browser){
        
        browser
            .url("http://localhost:3000")
            .pause(3000)
            .useXpath()
            .maximizeWindow()
            
    },
    "Verify Login page buttons": function(browser){
        browser
        .waitForElementVisible('//*[@id="username"]',"User name is displayed")
        .waitForElementVisible('//*[@id="password"]',"Password is displayed")
        .waitForElementVisible('//*[text()="Login"]',"Login Button is displayed")
        .waitForElementVisible('//*[text()="Sign Up"]',"Sign Up Button is displayed")
    },
    "Enter valid username and password": function(browser){
        browser
        .pause(1000)
        .click('//*[@id="username"]')
        .setValue('//*[@id="username"]', "a")
        .pause(2000)
        .click('//*[@id="password"]')
        .setValue('//*[@id="password"]', "a")
        .click('//*[@id="login"]')
        .pause(2000)
        .waitForElementVisible('//*[text()="Home"]')
    }
}