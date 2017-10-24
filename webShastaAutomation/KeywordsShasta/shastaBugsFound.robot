*** Settings ***
Documentation    Scroll Element into View
Library    Selenium2Library

# ***Environment - Dev ***

*** Test Cases ***
SH-905    SH-905
Navigate to Approve Timecard Screen    Navigate to Approve Timecard Screen



*** Keywords ***
SH-905
    [Tags]    Regression
    Open Browser    http://web.develop.shasta.esubonline.com/#/login    Firefox
    Set Window Size    ${1600}    ${1000}
    Wait Until Page Contains    eSUB
    Sleep    3s
    Input Text    id=txtUsername    Mikeg@esub.com
    Sleep    3s
    Input Text    id=txtPassword     Test1234
    Sleep    3s
    Click Button    id=btnLogin
    Wait Until Page Contains    Employee    timeout=30
Navigate to Approve Timecard Screen
    mouse over    Xpath=/html/body/esub-root/div[2]/esub-app-home/section/esub-trackpoint-header/section/div/div[2]/ul/li[2]/button
    Sleep    3s
    click element    Xpath=/html/body/esub-root/div[2]/esub-app-home/section/esub-trackpoint-header/section/div/div[2]/ul/li[2]/button
    Sleep    3s
    click element    Xpath=/html/body/div/div[2]/div/div/button
	wait until page contains    Employee    timeout=10s
	Sleep    2s
	click element    id=esub-week-selector.previous-week
	Sleep    3s
	wait until page contains    Mike O'Gorman    timeout=30
	Sleep    6s
	Execute JavaScript    document.querySelector("#page-container > div > div > div > esub-time-expenses > div > esub-timesheet-card > esub-base-card:nth-child(8) > div > div > div > div:nth-child(1) > div.col-md-6.card-title > span").scrollIntoView(true);
	execute javascript    window.scrollBy(0, -50)
    Sleep    5s
    #user is now clicking into Mike O'Gorman's "Select All" checkbox
	click element    id=checkbox
	capture page screenshot    Filename=bennybaltroskyCheckbox.png
	Sleep    8s
	close browser

Scroll Element To View
    [Arguments]    ${element}
    [Documentation]    Scroll Element To View
    Assign Id To Element    ${element}    element_id
    Execute Javascript    document.querySelector("#page-container > div > div > div > esub-time-expenses > div > esub-timesheet-card > esub-base-card:nth-child(8) > div > div > div > div:nth-child(1) > div.col-md-6.card-title > span").scrollIntoView(true);




