*** Settings ***
Documentation    Enter time test suite
Library    Selenium2Library
#Library    AngularJSLibrary

# ***Environment - Dev ***


*** Test Cases ***
Switch Between Reports    Switch Between Reports

#Grid Form Verification - Enter Time In / Time Out    Grid Form Verification - Enter Time In / Time Out
    #Clear Form after Project entry
    #Resubmit Form
    #Enter Time In and Time Out Hours
    #Notes
    #Filter By Employee
    #Filter By Project
    #Filter By Date

*** Keywords ***
Grid Form Verification - Enter Time In / Time Out
    [Tags]    Smoke
    Open Browser     http://web.develop.shasta.esubonline.com/#/login    Chrome
    Set Window Size    ${1600}    ${1000}
    Wait Until Page Contains    eSUB
    Sleep    3s
    press key    id=txtUsername    Tonyd@esub.com
    Sleep    3s
    press key    id=txtPassword     Test1234
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
    Sleep    3s
    wait until page contains    eSUB
    Sleep    3s
Clear Form after Project entry
    click element    id=md-tab-label-0-1
    Sleep    3s
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
    Click Element    id=md-autocomplete-2
    Sleep    3s
    input text    id=txtFormEmployees    10001 - String String
    Sleep    5s
    click element    id=md-autocomplete-3
    Sleep    4s
    click element    id=lnkClearEmployees
    Sleep    3s
    input text    id=txtFormEmployees    10001 - String String
    Sleep    3s
    click element    id=md-autocomplete-3
    Sleep    3s
    click element    id=txtFormDates
    Sleep    3s
    click element    id=txtFormTimeIn
    Sleep    3s
    input text    id=txtFormNotes    Clear Notes
    Sleep    4s
    click button    id=btnFormClear
Resubmit Form
    Sleep    6s
    input text    id=txtFormProject    10000 - Frank's House
    Sleep    7s
    Click Element    id=md-autocomplete-0
    Sleep    4s
    Input Text    id=txtFormPhases    1 - New Phase A
    Sleep    4s
    click element    id=md-autocomplete-4
    Sleep    3s
    clear element text    id=txtFormPhases
    Sleep    3s
    Input Text    id=txtFormPhases    1 - Default Phase
    Sleep    4s
    click element    id=md-autocomplete-4
    Sleep    3s
    Input Text    id=txtFormCostCode    888 - Demolition
    Sleep    4s
    Click Element    id=md-autocomplete-5
    Sleep    3s
    #Input Text    id=txtFormPhases    1 - Default Phase
    #Sleep    4s
    #click element    id=md-autocomplete-1
    #Sleep    3s
    click element    id=lnkClearEmployees
    Sleep    4s
    click element    id=lnkFormAllEmployees
    Sleep    6s
    click element    id=txtFormDates
    Sleep    4s
    click element    Xpath=//*[@id="page-container"]/div/div/div/ng-component/div/div/esub-enter-time-form/div[2]/form/div[6]/div/div/esub-daypicker-flyout/div/dp-day-calendar/div/div/div[4]/button[2]
    sleep    5s
    click element    id=txtFormTimeIn
    Sleep    5s
Enter Time In and Time Out Hours
    press key    id=txtFormTimeIn    7:15 AM
    Sleep    3s
    press key   id=txtFormTimeOut   5:15 PM
    sleep    4s
    press key    id=txtFormBreakIn    12:00 PM
    Sleep    4s
    press key    id=txtFormBreakOut    12:19 PM
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
    click element    id=md-tab-label-1-1
    Sleep    3s
    go back
    Sleep    3s
    click element    Xpath=//*[@id="cdk-overlay-6"]/md-dialog-container/esub-confirmation-dialog/md-dialog-actions/button[2]
    capture page screenshot    Filename=saveChanges.png
    Sleep    5s
    close browser
###################################



Switch Between Reports
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
    Wait Until Page Contains    Enter Time   timeout=30
    click button    id=btnEnterTime
	wait until page contains    Enter Hours    timeout=30
    input text    id=txtFormProject    10000 - Frank's House
    Sleep    3s
    click element    id=md-autocomplete-0
    Sleep    4s
    #Enter Time in / Time Out
    click element    id=md-tab-label-0-1
    Sleep    3s
    input text    id=txtFormProject    10000 - Frank's House
    Sleep    3s
    click element    id=md-tab-label-0-2
    Sleep    7s
    input text    id=txtFormCostCode    Overhead costs - Overhead Costs
    Sleep    3s
    click element    id=md-autocomplete-4
    Sleep    5s
    Click element    id=md-tab-label-0-0
    Sleep    3s
    mouse over    Xpath=//*[@id="page-container"]/esub-trackpoint-header/section/div/div[3]/ul/li[2]/button/span
    Sleep    2s
    click element    Xpath=//*[@id="page-container"]/esub-trackpoint-header/section/div/div[3]/ul/li[2]/button/span/i
    Sleep    3s
    click element    Xpath=//*[@id="cdk-overlay-2"]/div/div/button/div
    Sleep    3s
    close browser









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
    input text    id=txtGridFormEmployee-0-1    Dinosaur  - Brother Leroy Jenkins
    Sleep    4s
    input text    id=txtGridFormEmployee-0-2    12345 - Peter Popoff
    Sleep    4s
    input text    id=txtGridFormEmployee-0-3    Willis Jackson
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
    Sleep    4s
    click element    id=md-autocomplete-1
    Sleep    3s
    click button    Xpath=//*[@id="page-container"]/div/div/div/ng-component/div/div/esub-enter-time-form/div[2]/form/div[5]/div/div/esub-daypicker-flyout/div/dp-day-calendar/div/div/div[3]/button[6]
    Sleep    5s
    input text    id=txtFormTimeIn    7:15 AM
    Sleep    3s
    input text    id=txtFormTimeOut   5:15 PM
    sleep    4s
    input text    id=txtFormBreakIn    12:00 PM
    Sleep    4s
    input text    id=txtFormBreakOut    12:19 PM
    Sleep    4s
    click button    id=btnFormCreate
    sleep    4s
    capture page screenshot    Filename=SubmitTime.png
    Sleep    3s
    close browser
