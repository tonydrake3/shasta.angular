
*** Settings ***
Documentation    Enter time test suite
Library    Selenium2Library

*** Test Cases ***
Copy Yesterday's Time    Copy Yesterday's Time
Enter and Create Hours    Enter and Create Hours
Edit Timesheet under Grid Form    Edit Timesheet under Grid Form
Copy Time From Yesterday    Copy Time From Yesterday
Change Project Name    Change Project Name
Change Employee's Name    Change Employee's Name
Change System Field    Change System Field
Add Note Before Submitting Time    Add Note Before Submitting Time
Sort By Project    Sort By Project
Sort By Employee    Sort By Employee
Sory By Date    Sory By Date
Submit Time    Submit Time
#Change Cost Code    Change Cost Code

*** Keywords ***

Copy Yesterday's Time
    [Tags]    Smoke
    Open Browser    http://qa-app.esub.com/#/login    Chrome
    Wait Until Page Contains    eSUB
    Sleep    3s
    Input Text    id=txtUsername    execadmin@metest1.com
    Sleep    2s
    Input Text    id=txtPassword     password
    Click Button    id=btnLogin
    Sleep    3s
    Wait Until Page Contains    eSUB    timeout=7
    Sleep    2s
    Sleep    5s
    mouse over    CSS=#page-container > esub-trackpoint-header > section > div > div.top-nav-left > ul > li:nth-child(1) > button > span
    Sleep    5s
    click element    CSS=#page-container > esub-trackpoint-header > section > div > div.top-nav-left > ul > li:nth-child(1) > button > span
    Sleep    4s
    click element    CSS=#cdk-overlay-0 > div > div > button:nth-child(1) > div
    Sleep    2s
    wait until page contains    Enter Hours    timeout=30
Enter and Create Hours
    input text    id=txtFormProject    10000 - Frank's House
    Sleep    5s
    Click Element    id=md-autocomplete-1
    Sleep    4s
    Input Text    id=txtFormPhases    1 - New Phase A
    Sleep    4s
    click element    id=md-autocomplete-2
    Sleep    3s
    Input Text    id=txtFormPhases    1 - Default Phase
    Sleep    4s
    click element    id=md-autocomplete-2
    Sleep    3s
    Input Text    id=txtFormCostCode    888 - Demolition
    Sleep    4s
    Click Element    id=md-autocomplete-3
    Sleep    3s
    input text    id=txtFormEmployees    10001 - String String
    Sleep    5s
    click element    id=md-autocomplete-4
    Sleep    4s
    click element    id=lnkClearEmployees
    Sleep    3s
    input text    id=txtFormEmployees    10001 - String String
    Sleep    3s
    click element    id=md-autocomplete-4
    Sleep    3s
    click element    id=txtFormDates
    Sleep    4s
    click element    CSS=#page-container > div > div > div > ng-component > div > div.esub-card.no-hover > esub-enter-time-form > div.enter-time-form > form > div.row.mb-3 > div > div > esub-daypicker-flyout > div > dp-day-calendar > div > div > div:nth-child(3) > button.dp-calendar-day.dp-current-month.dp-current-day
    sleep    5s
    click element    id=txtFormNotes
    Sleep    3s
    clear element text    id=txtFormST
    Sleep    3s
    Press Key    id=txtFormST    8
    Sleep    3s
    clear element text    id=txtFormDT
    Sleep    3s
    Press Key    id=txtFormDT    1
    Sleep    3s
    input text    id=txtFormNotes    Test notes
    Sleep    3s
    click button    id=btnFormCreate
Edit Timesheet under Grid Form
    wait until page contains    Employee    timeout=7
    Sleep    3s
    clear element text    id=txtGridFormDT-0-0
    Sleep    3s
    clear element text    id=txtGridFormST-0-0
    Sleep    3s
    press key    id=txtGridFormST-0-0    8
    Sleep    3s
    press key    id=txtGridFormDT-0-0   1
    Sleep    3s
    click button    id=btnGridSubmit
    Sleep    3s
    wait until page contains    Employee     timeout=10
Copy Time From Yesterday
    Sleep    3s
    mouse over    Xpath=//*[@id="page-container"]/esub-trackpoint-header/section/div/div[2]/ul/li[1]/button/span
    Sleep    5s
    click element    Xpath=//*[@id="page-container"]/esub-trackpoint-header/section/div/div[2]/ul/li[1]/button/span
    Sleep    4s
    click element    Xpath=//*[@id="cdk-overlay-0"]/div/div/button[1]/div
    Sleep    3s
    wait until page contains    Enter Hours    timeout=10
    Sleep    3s
    click element     CSS=#page-container > div > div > div > ng-component > div > div.enter-time-button-group > div.copy-yesterday-button > button > span
    Sleep    3s
Change Project Name
    wait until page contains    Employee    timeout=10
    Sleep    2s
    clear element text    id=txtGridFormProject-0-0
    Sleep    3s
    input text    id=txtGridFormProject-0-0    2312 - Esub Remodel
    Sleep    3s
    click element    id=md-autocomplete-15
    Sleep    3s
Change Employee's Name
    Sleep    3s
    clear element text    id=txtGridFormEmployee-0-0
    Sleep    4s
    input text      id=txtGridFormEmployee-0-0    10001 - Athgar Heece
    #Sleep    3s
    click element    Xpath=//*[@id="page-container"]/div/div/div/ng-component/div/div/esub-enter-time-grid/div/form/div[1]/div[1]/div[2]/div/div[2]/div[6]/div/md-input-container
    Sleep    3s
Change System Field
    Input Text    id=txtGridFormSystem-0-1    99 - System Alpha DX Plus
    Sleep    2s
    click element    id=md-autocomplete-17
    Sleep    3s
#Change Cost Code
    #input text     id=txtGridFormCostCode-0-1   905 - Frame
    #Sleep    2s
    #click element    id=md-autocomplete-19
    #Sleep    3s
Add Note Before Submitting Time
    click element    id=btnGridFormNote-0-0
    sleep    3s
    wait until page contains    Save    timeout=8
    Sleep    3s
    press key    id=txtEnterTimeGridNote    New Note Saved for Adding Copying Yesterday's Time (sample)
    Sleep    3s
    Mouse Over     CSS=#cdk-overlay-9 > md-dialog-container > esub-notes-entry-dialog > md-dialog-actions > button:nth-child(2) > div.mat-button-ripple.mat-ripple
    Sleep    2s
    click button    CSS=#cdk-overlay-9 > md-dialog-container > esub-notes-entry-dialog > md-dialog-actions > button:nth-child(2) > div.mat-button-ripple.mat-ripple
    wait until page contains    Employee     timeout=7
    Sleep    3s
    click element    id=btnGridFormNote-0-0
    wait until page contains    Add New Note    timeout=8
    Input Text    id=txtEnterTimeGridNote    New Note Saved for Adding Copying Yesterday's Time (sample)
    Sleep    3s
    Mouse Over     Xpath=/*[@id="cdk-overlay-9"]/md-dialog-container/esub-notes-entry-dialog/md-dialog-actions/button[1]/span
    Sleep    2s
    click button    Xpath=//*[@id="cdk-overlay-9"]/md-dialog-container/esub-notes-entry-dialog/md-dialog-actions/button[1]/span
    Sleep    3s
Sort By Employee
    click element    id=md-tab-label-1-1
    Sleep    5s
Sort By Project
    Click element    id=md-tab-label-1-2
    Sleep    5s
Sory By Date
    click element    id=md-tab-label-1-1
    Sleep    5s
Submit Time
    submit form    id=btnGridSubmit

Copy Last Week's Time with previous infomration entered
    [Tags]    Smoke
    Open Browser    http://web.qa.shasta.esubonline.com/    Chrome
    #Set Window Size    ${1600}    ${1000}
    Wait Until Page Contains    eSUB
    Sleep    3s
    Input Text    id=txtUsername    Tonyd@esub.com
    Sleep    3s
    Input Text    id=txtPassword     Test1234
    Sleep    3s
    Click Button    id=btnLogin
    Wait Until Page Contains    Employee     timeout=8
    #Sleep    2s
    #click element    id=companyCard1
    Sleep    5s
    mouse over    Xpath=//*[@id="page-container"]/esub-trackpoint-header/section/div/div[2]/ul/li[1]/button/span
    Sleep    5s
    click element    Xpath=//*[@id="page-container"]/esub-trackpoint-header/section/div/div[2]/ul/li[1]/button/span
    Sleep    4s
    click element    Xpath=//*[@id="cdk-overlay-0"]/div/div/button[1]
    wait until page contains    Enter Hours    timeout=30
    Sleep    3s
Click Copy Last Week's Time
    click element    Xpath=//*[@id="page-container"]/div/div/div/ng-component/div/div[1]/div[1]/button
    Sleep    3s
    input text    id=txtGridFormProject-0-0    99 - Random Autom Dealership
    Sleep    5s
    Click Element    id=md-autocomplete-0
    Sleep    4s
    Input Text    id=txtFormCostCode    777 - Install
    Sleep    4s
    Click Element    id=md-autocomplete-3
    Sleep    3s
    input text    id=txtFormEmployees    100001 - Mike O'Gorman
    Sleep    3s
    click element    id=md-autocomplete-4
    Sleep    3s
    click element     Css=#page-container > div > div > div > ng-component > div > div.esub-card.no-hover > esub-enter-time-form > div.enter-time-form > form > div.row.mb-3 > div > div > esub-daypicker-flyout > div > dp-day-calendar > div > div > div:nth-child(2) > button.dp-calendar-day.dp-selected.dp-current-month
    Sleep    3s
    Click Element     Css=#page-container > div > div > div > ng-component > div > div.esub-card.no-hover > esub-enter-time-form > div.enter-time-form > form > div.row.mb-3 > div > div > esub-daypicker-flyout > div > dp-day-calendar > div > div > div:nth-child(2) > button:nth-child(5)
    Sleep    3s
    click element     Css=#page-container > div > div > div > ng-component > div > div.esub-card.no-hover > esub-enter-time-form > div.enter-time-form > form > div.row.mb-3 > div > div > esub-daypicker-flyout > div > dp-day-calendar > div > div > div:nth-child(2) > button:nth-child(6)
    Sleep    3s
    click element     Xpath=//*[@id="page-container"]/div/div/div/ng-component/div/div[2]/esub-enter-time-form/div[2]/form/div[5]/div/div/esub-daypicker-flyout/div/dp-day-calendar/div/dp-calendar-nav/div/div[1]/button
    Sleep    3s
    click element     Css=#page-container > div > div > div > ng-component > div > div.esub-card.no-hover > esub-enter-time-form > div.enter-time-form > form > div.row.mb-3 > div > div > esub-daypicker-flyout > div > dp-day-calendar > div > div > div:nth-child(6) > button.dp-calendar-day.dp-selected.dp-current-month
    Sleep    3s
    click element     CSS=#page-container > div > div > div > ng-component > div > div.esub-card.no-hover > esub-enter-time-form > div.enter-time-form > form > div.row.mb-3 > div > div > esub-daypicker-flyout > div > dp-day-calendar > div > div > div:nth-child(6) > button:nth-child(2)
    Sleep    3s
    input text    id=txtGridFormEmployee-0-0    10001 - String String
    Sleep    5s
    click element    id=md-autocomplete-5
    Sleep    4s
    #click element    id=lnkClearEmployees
    #Sleep    3s
    #input text    id=txtGridFormEmployee-0-0     10001 - String String
    #Sleep    3s
    #click element    id=md-autocomplete-5
    #Sleep    3s
    #click element    id=txtFormDates
    #Sleep    4s
    #click element    CSS=#page-container > div > div > div > ng-component > div > div.esub-card.no-hover > esub-enter-time-form > div.enter-time-form > form > div.row.mb-3 > div > div > esub-daypicker-flyout > div > dp-day-calendar > div > div > div:nth-child(3) > button.dp-calendar-day.dp-current-month.dp-current-day
    #sleep    5s
    click element    id=btnGridFormNote-0-0
    Sleep    3s
    input text    id=btnGridFormNote-0-0    Test Note
    Sleep    3s
    click button    Xpath=//*[@id="cdk-overlay-7"]/md-dialog-container/esub-notes-entry-dialog/md-dialog-actions/button[2]/span
    Sleep    3s
    clear element text    id=txtGridFormST-0-0
    Sleep    3s
    Press Key    id=txtGridFormST-0-0    8
    Sleep    3s
    clear element text    id=txtGridFormDT-0-0
    Sleep    3s
    Press Key    id=txtGridFormDT-0-0    3
    Sleep    3s
    input text    id=tnGridFormNote-0-0    Test notes for a living
    #Sleep    3s
    #click element    id=btnGridFormDeleteCard-0
    Sleep    3s
    click button    id=btnGridSubmit

