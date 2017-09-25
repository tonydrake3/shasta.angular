*** Settings ***
Library    Selenium2Library


*** Keywords ***

## Side Menu ##

Corporate Management
    Open Browser    http://web.develop.shasta.esubonline.com/   Firefox
    Wait Until Page Contains    eSUB
    Input Text    id=txtUsername    manager@esub.com
    Sleep    2s
    Input Text    id=txtPassword     Test1234
    Click Button    id=btnLogin
    Sleep    3s
    Wait Until Page Contains    Project Manager
    Click Element    id=navlink-corporateManagement
	Capture Page Screenshot    filename=projectSelectionScreenshot.png



Time & Expense
    Open Browser    http://web.develop.shasta.esubonline.com/   Chrome
    Wait Until Page Contains    eSUB
    Input Text    id=txtUsername    manager@esub.com
    Sleep    2s
    Input Text    id=txtPassword     Test1234
    Click Button    id=btnLogin
    Sleep    3s
    Wait Until Page Contains    Project Manager
    Click Element    id=navlink-timesheets
    Capture Page Screenshot    filename=TimeandexpenseScreenshot.png


Resource Management
    Open Browser    http://web.develop.shasta.esubonline.com/   Chrome
    Wait Until Page Contains    eSUB
    Input Text    id=txtUsername    manager@esub.com
    Sleep    2s
    Input Text    id=txtPassword     Test1234
    Click Button    id=btnLogin
    Sleep    3s
    Wait Until Page Contains    Project Manager
    Click Element    id=navlink-resourceManagement
    Capture Page Screenshot    filename=RSCMgmntScreenshot.png


Scheduling
    Open Browser    http://web.develop.shasta.esubonline.com/   Chrome
    Wait Until Page Contains    eSUB
    Input Text    id=txtUsername    manager@esub.com
    Sleep    2s
    Input Text    id=txtPassword     Test1234
    Click Button    id=btnLogin
    Sleep    3s
    Wait Until Page Contains    Project Manager
    Click Element    id=navlink-scheduling
    Capture Page Screenshot    filename=scheduling.png


