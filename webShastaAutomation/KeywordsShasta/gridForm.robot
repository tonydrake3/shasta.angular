*** Settings ***
Documentation    Enter time test suite
Library    Selenium2Library

# ***Environment - Dev ***

*** Test Cases ***
Grid Form Verification - Enter Hours    Grid Form Verification - Enter Hours
    Project
    Employees
    Dates
    Hours Worked
    Notes
Grid Form Verification - Enter Time In / Time Out    Grid Form Verification - Enter Time In / Time Out
    Clear Form after Project entry


*** Keywords ***
Grid Form Verification - Enter Hours
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
    Sleep    5s
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
Change Project under the Grid Form Screen



##########  Enter Time in / Time Out ##########

Grid Form Verification - Enter Time In / Time Out
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
	wait until page contains    Enter Time In/Time Out
    Sleep    2s
    go back
    wait until page contains    eSUB
    Sleep    5s
    go to    http://web.develop.shasta.esubonline.com/#/time/timesheets
    wait until page contains    eSUB
    click element    id=btnEnterTime
    wait until page contains    eSUB
    Sleep    3s
Clear Form after Project entry
    input text    id=txtFormProject    10000 - Frank's House
    Sleep    7s
    Click Element    id=md-autocomplete-0
    Sleep    4s
    Input Text    id=txtFormPhases    1 - New Phase A
    Sleep    4s
    click element    id=md-autocomplete-1
    Sleep    3s
    clear element text    id=txtFormPhases
    Sleep    3s
    Input Text    id=txtFormPhases    1 - Default Phase
    Sleep    4s
    click element    id=md-autocomplete-1
    Sleep    3s
    Input Text    id=txtFormCostCode    888 - Demolition
    Sleep    4s
    Click Element    id=md-autocomplete-1
    Sleep    3s
    input text    id=txtFormEmployees    10001 - String String
    Sleep    3s
    click button    id=btnFormClear
Resubmit Form
    Sleep    6s
    input text    id=txtFormProject    10000 - Frank's House
    Sleep    7s
    Click Element    id=md-autocomplete-0
    Sleep    4s
    Input Text    id=txtFormPhases    1 - New Phase A
    Sleep    4s
    click element    id=md-autocomplete-1
    Sleep    3s
    clear element text    id=txtFormPhases
    Sleep    3s
    Input Text    id=txtFormPhases    1 - Default Phase
    Sleep    4s
    click element    id=md-autocomplete-1
    Sleep    3s
    Input Text    id=txtFormCostCode    888 - Demolition
    Sleep    4s
    Click Element    id=md-autocomplete-1
    Sleep    3s
    Input Text    id=txtFormPhases    1 - Default Phase
    Sleep    4s
    click element    id=md-autocomplete-1
    Sleep    3s
    click element    id=lnkClearEmployees
    Sleep    4s
    click element    id=lnkFormAllEmployees
    Sleep    6s
    click element    id=txtFormDates
    Sleep    4s
    click element    Xpath=//*[@id="page-container"]/div/div/div/ng-component/div/div/esub-enter-time-form/div[2]/form/div[6]/div/div/esub-daypicker-flyout/div/dp-day-calendar/div/div/div[2]/button[6]
    sleep    5s
Enter Time In and Time Out Hours
    input text    id=txtFormTimeIn    7:15 AM
    Sleep    3s
    input text    id=txtFormTimeOut   5:15 PM
    sleep    4s
    input text    id=txtFormBreakIn    12:00 PM
    Sleep    4s
    input text    id=txtFormBreakOut    12:19 PM
    Sleep    4s
Notes
    input text    id=txtFormNotes    Test Notes to see how many characters are entered The average time of these 30 matches is 25 minutes and 25 seconds (25m 25s). This average is greatly affected by the Iron Man match at WM 12, which lasted over an hour in duration. In actuality, 16 of these 30 matches clocked in between 20m0s and 22m 30s.
    Sleep    6s
    Click button    id=btnFormCreate
    Sleep    5s
    capture page screenshot    Filename=enterHours.png
    Sleep    5s
Filter By Employee
    wait until page contains    eSUB
    Sleep    3s
    click element    id=md-tab-label-1-1
    Sleep    3s
Filter By Project
    click element    id=md-tab-label-1-2
    Sleep    3s
Filter By Date
    click element    id=id=md-tab-label-1-1
    Sleep    3s
    go back
    click element    Xpath=//*[@id="cdk-overlay-11"]/md-dialog-container/esub-confirmation-dialog/md-dialog-actions/button[1]/span
    Sleep    5s
Modify the time In and Time out under Grid View
    input text    id=txtGridFormTimeIn-0-0   5:15 AM
    Sleep    3s
    input text    id=txtGridFormTimeOut-0-0   5:15 PM
    sleep    4s
Modify The Break In and Break Out under Grid View
    input text    id=txtGridFormBreakIn-0-0    12:00 PM
    Sleep    4s
    input text    id=txtGridFormBreakOut-0-0   1:11 PM
    Sleep    4s
Modify Employee Field to an Incorrect Name
    input text    id=txtGridFormEmployee-0-0    ABSCDEFRHAHH - Joe Willis XIV
    Sleep    4s
    input text    id=txtGridFormEmployee-0-2    Dinosaur  - Brother Leroy Jenkins
    Sleep    4s
    input text    id=txtGridFormEmployee-0-3    12345 - Peter Popoff
    Sleep    4s
    input text    id=txtGridFormEmployee-0-4    Willis Jackson
    Sleep    4s
    click button    id=btnGridSubmit
    Sleep    3s
    capture page screenshot    Filename=StringChange.png
    Sleep    3s
Add More Lines
    click button    id=btnGridAddLines
    wait until page contains    Enter Time in/Time out
    input text    id=txtFormProject    1 - Fancy Restaurant
    Sleep    7s
    Click Element    id=md-autocomplete-0
    Sleep    4s
    Input Text    id=txtFormCostCode    777 - Install
    Sleep    4s
    click element    id=md-autocomplete-344
    Sleep    3s
    input text    id=txtFormEmployees    10001 - String String
    Sleep    3s
    Input Text    id=txtFormPhases    1 - Default Phase
    Sleep    4s
    click element    id=md-autocomplete-1
    Sleep    3s

















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
