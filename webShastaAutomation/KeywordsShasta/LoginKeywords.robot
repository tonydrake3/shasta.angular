*** Settings ***
Library    Selenium2Library

*** Test Cases ***
Blank Login    Blank Login

Invalid Login   Invalid Login

Valid Login    Valid Login

Invalid Login then Valid Login  Invalid Login then Valid Login



*** Keywords ***

## Login ##

Blank Login
    Open Browser    http://web.develop.shasta.esubonline.com/   Chrome
    Wait Until Page Contains    eSUB
    Sleep   7s
    Click Button    id=btnLogin
    Close Browser


Valid Login
    Open Browser    http://web.develop.shasta.esubonline.com/   Chrome
    Wait Until Page Contains    eSUB
    Input Text    id=txtUsername    manager@esub.com
    Sleep    2s
    Input Text    id=txtPassword     Test1234
    Click Button    id=btnLogin
    Sleep    3s
    Capture Page Screenshot    filename=first-screenshot.png
    Close Browser

Invalid Login
    Open Browser    http://web.develop.shasta.esubonline.com/   Chrome
    Wait Until Page Contains    eSUB
    Input Text    id=txtUsername    manager@esub.com
    Sleep    2s
    Input Text    id=txtPassword     Test1234567
    Click Button    id=btnLogin
    Sleep    3s
    Close Browser

##Forgot Password

    Open Browser    Open Browser    http://web.develop.shasta.esubonline.com/   Chrome
    Wait Until Page Contains Element    css=.login-description
    Input Text    id=txtUsername    manager@esub.com
    Sleep    2s
    Click Element    ##Forgot Password## ##Come back once this is completed
    Go Back


Invalid Login then Valid Login
    Open Browser    http://web.develop.shasta.esubonline.com/   Chrome
    Wait Until Page Contains    eSUB
    Input Text    id=txtUsername    manager@esub.com
    Sleep    2s
    Input Text    id=txtPassword     Test1234567
    Click Button    id=btnLogin
    Sleep    3s
    Wait Until Page Contains   The user name or password is incorrect.
    Sleep    3s
    Input Text    id=txtUsername    manager@esub.com
    Sleep    2s
    Input Text    id=txtPassword     Test1234
    Click Button    id=btnLogin
    Sleep    3s
    Close Browser

