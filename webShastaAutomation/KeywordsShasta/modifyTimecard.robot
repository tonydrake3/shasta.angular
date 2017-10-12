*** Settings ***
Documentation    Enter time test suite
Library    Selenium2Library

*** Test Cases ***

Group By Project    Group By Project

#Modify Timecard    Modify Timecard
    #Project
    #Employees
    #Dates
   # Hours Worked
   # Notes
   # Edit Time Card
    #Delete Timecard

*** Keywords ***

Modify Timecard
    [Tags]    Smoke
    Open Browser    http://web.develop.shasta.esubonline.com/    Chrome
    Set Window Size    ${1600}    ${1000}
    Wait Until Page Contains    eSUB
    Sleep    3s
    Input Text    id=txtUsername    Tonyd@esub.com
    Sleep    3s
    Input Text    id=txtPassword     Test1234
    Sleep    3s
    Click Button    id=btnLogin
    Wait Until Page Contains    eSUB
    Sleep    5s
	click element    Xpath=//*[@id="page-container"]/div/div/div/esub-time-expenses/div/div[1]/div[3]/button
	wait until page contains    Enter Hours
    Sleep    2s
    go back
    wait until page contains    eSUB
    Sleep    7s
    go to    http://web.develop.shasta.esubonline.com/#/time/timesheets
    wait until page contains    eSUB
    click element    id=btnEnterTime
    wait until page contains    eSUB
    Sleep    3s
Project
    input text    id=txtFormProject    Random Auto Dealership
    Sleep    7s
    Click Element    id=md-autocomplete-0
    Sleep    4s
    Input Text    id=txtFormCostCode    777 - Install
    Sleep    4s
    Click Element    id=md-autocomplete-1
    Sleep    2s
    #click element    id=txtFormProject
    #Sleep    3s
Employees
    input text    id=txtFormEmployees    eSUB Support
    Sleep    4s
    Click Element    id=md-autocomplete-2
Dates
    click element    id=txtFormDates
    Sleep    4s
    click element    Xpath=//*[@id="page-container"]/div/div/div/ng-component/div/div/esub-enter-time-form/div[2]/form/div[5]/div/div/esub-daypicker-flyout/div/dp-day-calendar/div/div/div[3]/button[3]
    sleep    5s
Hours Worked
    click element    id=txtFormST
    Sleep    5s
    Input Text    id=txtFormST    8
    sleep    4s
    input text    id=txtFormOT    2
    Sleep    4s
    Input Text    id=txtFormDT    0.75
    Sleep    4s
Notes
    input text    id=txtFormNotes    Test notes - Development Environment
    Sleep    6s
    Click button    id=btnFormCreate
    Sleep    5s
    capture page screenshot    Filename=enterHours.png
    Sleep    5s
Edit Time Card
    Wait until page contains    eSUB
    Click Element    id=btnGridFormNote-0-0
    Sleep    3s
    wait until element contains    id=md-dialog-title-0   Change note
    clear element text    Xpath=//*[@id="txtEnterTimeGridNote"]
    Sleep    3s
    Input Text    id=txtEnterTimeGridNote    Testing this once more to verify note changes
    Sleep    4scd
    click element    id=md-dialog-title-0
    Sleep    4s
    click element   id=cdk-overlay-4
    Sleep    4s


    #Click Element    Xpath=//*[@id="body"]/div[1]/div/div[1]
#Delete Timecard
    #wait until page contains    eSUB
    #Sleep    3s
    ##click element    id=btnGridFormDeleteCard-0
    #Sleep    4s
    capture page screenshot    Filename=deleteTimecard
    close browser


#######Tests while BlackListed#######

Group By Project
    [Tags]    Smoke
    Open Browser    http://web.qa.shasta.esubonline.com/    Chrome
    Set Window Size    ${1600}    ${1000}
    Wait Until Page Contains    eSUB
    Sleep    3s
    Input Text    id=txtUsername    TONYD@ESUB.COM
    Sleep    3s
    Input Text    id=txtPassword     Test1234
    Sleep    3s
    Click Button    id=btnLogin
    Wait Until Page Contains    eSUB
    Sleep    5s
    Click Element    id=time-expenses.group-by-project
    Sleep    5s
    Click Element    id=time-expenses.filter-to-mine
    Sleep    5s
    click element    id=time-expenses.filter-to-all
    Sleep    5s
    click element    id=btnEnterTime

    close browser


#############################################
SHOW MINE
    [Tags]    Smoke
    Open Browser    http://web.develop.shasta.esubonline.com/    Chrome
    Set Window Size    ${1600}    ${1000}
    Wait Until Page Contains    eSUB
    Sleep    3s
    Input Text    id=txtUsername    Tonyd@esub.com
    Sleep    3s
    Input Text    id=txtPassword     Test1234
    Sleep    3s
    Click Button    id=btnLogin
    Wait Until Page Contains    eSUB
    Sleep    5s
    Click Element    id=(Enter ID HERE)   ##########OF SHOW MINE#######
    Sleep    4s
Show ALL
    Click Element    id=(Enter ID HERE)   ##########OF SHOW MINE#######
    Sleep    4s
    Click Button    id=btnLogin
    Wait Until Page Contains    eSUB
    Sleep    5s
    click element    #Enter Indirect Costs
    Sleep    5s
    Click Element
    Wait until page contains    Enter Indirect Costs
	Click Element    id=md-tab-label-0-1
	Input Text    id=txtFormCostCode    Overhead costs - Overhead costs
	Sleep    3s





