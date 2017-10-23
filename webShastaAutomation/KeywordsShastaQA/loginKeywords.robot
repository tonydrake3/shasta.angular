*** Settings ***
Documentation    Logging into eSUB Time
Library    Selenium2Library

#Environment - QA#


*** Test Cases ***
Attempt to Login with eMail only    Attempt to Login with eMail only
Attempt to Login with password only    Attempt to Login with password only

Blank Login    Blank Login
Invalid Login    Invalid Login
Invalid Login then Valid Login    Invalid Login then Valid Login
Valid Login    Valid Login


*** Keywords ***
Blank Login
    Open Browser    http://web.qa.shasta.esubonline.com/   Chrome
    Wait Until Page Contains    eSUB
    Sleep   7s
    Click Button    id=btnLogin
    Close Browser

Valid Login
    Open Browser    http://web.qa.shasta.esubonline.com/   Chrome
    Wait Until Page Contains    eSUB
    Input Text    id=txtUsername    tonyd@esub.com
    Sleep    2s
    Input Text    id=txtPassword     Test1234
    Click Button    id=btnLogin
    Sleep    3s
    #Capture Page Screenshot    filename=first-screenshot.png
    Sleep    3s
    Close Browser

Invalid Login
    Open Browser    http://web.qa.shasta.esubonline.com/    Firefox
    Wait Until Page Contains    eSUB
    Input Text    id=txtUsername    contact-admin-hello-webmaster-info-services-peter-crazy-but-oh-so-ubber-cool-english-alphabet-loverer-abcdefghijklmnopqrstuvwxyz@please-try-to.send-me-an-email-if-you-can-possibly-begin-to-remember-this-coz.this-is-the-longest-email-address-known-to-man-but-to-be-honest.this-is-such-a-stupidly-long-sub-domain-it-could-go-on-forever.pacraig.com
    Sleep    2s
    Input Text    id=txtPassword     Test1234567
    Click Button    id=btnLogin
    Sleep    3s
    Close Browser

Invalid Login then Valid Login
    Open Browser    http://web.qa.shasta.esubonline.com/   Chrome
    Wait Until Page Contains    eSUB
    Input Text    id=txtUsername    tonyd@esub.com
    Sleep    2s
    Input Text    id=txtPassword     Test1234567
    Click Button    id=btnLogin
    Sleep    3s
    Wait Until Page Contains   The user name or password is incorrect.
    Sleep    3s
    clear element text    id=txtPassword
    Sleep    3s
    Input Text    id=txtUsername   tonyd@esub.com
    Sleep    2s
    Input Text    id=txtPassword     Test1234
    Click Button    id=btnLogin
    Sleep    3s
    Close Browser

Attempt to Login with eMail only
    Open Browser    http://web.qa.shasta.esubonline.com/   Chrome
    Wait Until Page Contains    eSUB
    Input Text    id=txtUsername    tonyd@esub.com
    Sleep    3s
    Click Button    id=btnLogin
    Sleep    3s
    close browser

Attempt to Login with password only
    Open Browser    http://web.qa.shasta.esubonline.com/   Chrome
    Wait Until Page Contains    eSUB
    Input Text    id=txtPassword     Test1234
    Sleep    3s
    Click Button    id=btnLogin
    Sleep    3s
    close browser

    #Open Browser    Open Browser    http://web.develop.shasta.esubonline.com/   Chrome
    #Wait Until Page Contains Element    css=.login-description
    #Input Text    id=txtUsername    tonyd@esub.com
    #Sleep    2s
    #Click Element    ##Forgot Password## ##Come back once this is completed
    #Go Back
