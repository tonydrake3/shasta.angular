*** Settings ***
Documentation    Enter time test suite
Library    Selenium2Library



*** Keywords ***

Create New Time
    [Tags]    Smoke
    Open Browser    http://web.develop.shasta.esubonline.com/    Chrome
    #Set Window Size    ${800}    ${600}
    Wait Until Page Contains    eSUB
    Sleep    3s
    Input Text    id=txtUsername    Tonyd@esub.com
    Sleep    3s
    Input Text    id=txtPassword     Test1234
    Click Button    id=btnLogin
    Wait Until Page Contains    eSUB
    Sleep    7s
	click element    Xpath=//*[@id="page-container"]/div/div/div/esub-time-expenses/div/div[1]/div[3]/button
	wait until page contains    Enter Hours
	Sleep    3s
    click element    id=md-tab-label-0-2
    sleep    4s
    Click element    id=md-tab-label-0-1
    Sleep    2s
    go back
    wait until page contains    eSUB
    Sleep    7s
    go to    http://web.develop.shasta.esubonline.com/#/time/timesheets
    wait until page contains    eSUB
    click element    id=btnEnterTime
    wait until page contains    eSUB
    Sleep    3s
    input text    id=txtFormProject    Random Auto Dealership
    Sleep    5s
    mouse over    id=md-option-0
    Sleep    2s
    click element    id=md-option-0
    #Sleep    3s
    input text    id=txtFormEmployees    eSUB Support
    Sleep    5s
    mouse over    id=cdk-overlay-1
    Sleep    5s
    click element    id=cdk-overlay-1
    sleep    7s
    click element    id=txtFormDates
    Sleep    5s
    click element    Xpath=//*[@id="page-container"]/div/div/div/ng-component/div/div/esub-enter-time-form/div[2]/form/div[5]/div/div/esub-daypicker-flyout/div/dp-day-calendar/div/div/div[2]/button[2]
    Sleep    5s
    close browser






    #Sleep    3s
    #input text    id=txtFormProject







#Display Week and Totals
#Expand Day
#View Time Record
#Edit Record (hours Worked and Time in / Out)
#Edit Breaks
#Validate / Save
#Apply Commenting Component

*** Test Cases ***
Create New Time    Create New Time
