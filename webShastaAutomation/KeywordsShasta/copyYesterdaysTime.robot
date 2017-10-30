
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
Change Cost Code    Change Cost Code
Add Note Before Submitting Time    Add Note Before Submitting Time
Sort By Employee    Sort By Employee
Sort by Date     Sory By Date
Submit Time    Submit Time

*** Keywords ***

Copy Yesterday's Time
     [Tags]    Smoke
    Open Browser    http://web.develop.shasta.esubonline.com/#/login    Chrome
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
Enter and Create Hours
    input text    id=txtFormProject    10000 - Frank's House
    Sleep    5s
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
    #Change Calendar Date each time when running this test (on a daily basis)
    click element    Xpath=//*[@id="page-container"]/div/div/div/ng-component/div/div[2]/esub-enter-time-form/div[2]/form/div[6]/div/div/esub-daypicker-flyout/div/dp-day-calendar/div/div/div[6]/button[2]
    Sleep    3s
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
    click element    Xpath=//*[@id="cdk-overlay-0"]/div/div/button[1]
    Sleep    3s
    wait until page contains    Enter Hours    timeout=30
    Sleep    3s
    click button    Xpath=//*[@id="page-container"]/div/div/div/ng-component/div/div[1]/div[2]/button
    Sleep    3s
Change Project Name
    wait until page contains    Employee    timeout=10
    Sleep    2s
    clear element text    id=txtGridFormProject-0-0
    Sleep    3s
    input text    id=txtGridFormProject-0-0    2312 - Esub Remodel
    Sleep    3s
    click element    id=md-autocomplete-7
    Sleep    3s
Change Employee's Name
    Sleep    3s
    clear element text    id=txtGridFormEmployee-0-0
    Sleep    4s
    input text      id=txtGridFormEmployee-0-0    10001 - Athgar Heece
    Sleep    3s
    click element    id=md-autocomplete-5
    Sleep    3s
Change System Field
    Input Text    id=txtGridFormSystem-0-0    99 - System Alpha DX Plus
    Sleep    2s
    click element    id=md-autocomplete-1
    Sleep    3s
Change Cost Code
    input text    id=txtGridFormCostCode-0-0    905 - Frame
    Sleep    2s
    click element    id=md-autocomplete-3
    Sleep    3s
Add Note Before Submitting Time
    click element    id=btnGridFormNote-0-0
    wait until page contains    Add New Note    timeout=8
    Sleep    3s
    press key    id=txtEnterTimeGridNote    New Note Saved for Adding Copying Yesterday's Time (sample)
    Sleep    3s
    Mouse Over     Xpath=Xpath=//*[@id="cdk-overlay-9"]/md-dialog-container/esub-notes-entry-dialog/md-dialog-actions/button[1]/span
    Sleep    2s
    click button    Xpath=//*[@id="cdk-overlay-9"]/md-dialog-container/esub-notes-entry-dialog/md-dialog-actions/button[1]/span
    wait until page contains    Employee     timeout=7
    Sleep    3s
    click element    id=btnGridFormNote-0-0
    wait until page contains    Add New Note    timeout=8
    Input Text    id=txtEnterTimeGridNote    New Note Saved for Adding Copying Yesterday's Time (sample)
    Sleep    3s
    Mouse Over     Xpath=Xpath=//*[@id="cdk-overlay-9"]/md-dialog-container/esub-notes-entry-dialog/md-dialog-actions/button[1]/span
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
