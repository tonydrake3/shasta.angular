*** Settings ***
Documentation    Enter time test suite
Library    Selenium2Library

# ***Environment - Dev ***

*** Test Cases ***
#Grid Form Verification - Enter Hours    Grid Form Verification - Enter Hours
#Create Project    Create Project
#Create Employees    Create Employees
#Create Dates    Create Dates
#Create Hours Worked    Create Hours Worked
#Type in Notes    Type in Notes

Copy Stats from Employee Card (By Date)    Copy Stats from Employee Card (By Date)
Copy Stats from Employee Card (By Employee)    Copy Stats from Employee Card (By Employee)
Copy Stats from Employee Card (By Project)    Copy Stats from Employee Card (By Project)
Navigate to Utilities before Submitting    Navigate to Utilities before Submitting
Cancel and Navigate to the Enter Time Option    Cancel and Navigate to the Enter Time Option
#Group by Mine    Group by Mine
#Grid Form Verification - Enter Hours    Grid Form Verification - Enter Hours
    #Project
    #Employees
    #Dates
    #Hours Worked
    #Notes

#Grid Form Verification - Enter Time In / Time Out    Grid Form Verification - Enter Time In / Time Out
#Clear Form after Project entry    Clear Form after Project entry
#Resubmit Form    Resubmit Form
#Enter Time In and Time Out Hours     Enter Time In and Time Out Hours
#Enter Notes    Enter Notes
#Filter By Employee     Filter By Employee
#Filter By Project    Filter By Project
#Filter By Date    Filter By Date
#Modify the time In and Time out under Grid View    Modify the time In and Time out under Grid View
#Modify The Break In and Break Out under Grid View    Modify The Break In and Break Out under Grid View
#Modify Employee Field to an Incorrect Name    Modify Employee Field to an Incorrect Name
#Add More Lines    Add More Lines


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
    Wait Until Page Contains    Employee
    Sleep    5s
    click element    id=time-expenses.filter-to-mine
    Sleep    5s
	wait until page contains     Time    timeout=30
	mouse over    Xpath=//*[@id="page-container"]/esub-trackpoint-header/section/div/div[2]/ul/li[1]/button/span
	Sleep    2s
	click element    Xpath=//*[@id="page-container"]/esub-trackpoint-header/section/div/div[2]/ul/li[1]/button/span
	Sleep    3s
	wait until page contains    Employee
    Sleep    2s
    click element    Xpath=//*[@id="cdk-overlay-0"]/div/div/button[1]/div
    Sleep    3s
	wait until page contains    Enter Hours
    Sleep    3s
Create Project
    #Select Project that contains costcode and employees
    Input Text    id=txtFormProject    99 - Random Auto Dealership
    Sleep    3s
    Click Element    id=md-autocomplete-0
    Sleep    4s

    input text    id=txtFormCostCode    777 - Install
    Sleep    3s
    click element    id=md-autocomplete-1

    #Input Text    id=txtFormSystem    100 - System Beta Zero
    #Sleep    4s
    #lick Element    id=md-autocomplete-18
    #Sleep    3s
    #cost code should not promote any other fields below
    #nput text    id=txtFormCostCode    666 - Site Work
    Sleep    3s
Create Employees
    input text    id=txtFormEmployees    10001 - Mike O'Gorman
    Sleep    4s
    click element    id=md-autocomplete-2
    Sleep    3s
    click element    id=lnkClearEmployees
    Sleep    3s
    click element   id=lnkFormAllEmployees
    Sleep    4s
    #input text    id=txtFormEmployees    eSUB Support
    Sleep    4s
    #Click Element    id=md-autocomplete-2
Create Dates
    click element    id=txtFormDates
    Sleep    4s
    click element    Xpath=//*[@id="page-container"]/div/div/div/ng-component/div/div/esub-enter-time-form/div[2]/form/div[5]/div/div/esub-daypicker-flyout/div/dp-day-calendar/div/div/div[3]/button[3]
    sleep    5s
Create Hours Worked
    click element    id=txtFormST
    Sleep    5s
    Input Text    id=txtFormST    8
    sleep    4s
    input text    id=txtFormOT    2
    Sleep    4s
    Input Text    id=txtFormDT    0.75
    Sleep    4s
Type in Notes
    input text    id=txtFormNotes    Test notes - Development Environment
    Sleep    6s
    Click button    id=btnFormCreate
    Sleep    5s
    capture page screenshot    Filename=enterHours.png
    Sleep    5s
    close browser

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
    Wait Until Page Contains    Employee    timeout=30
    Sleep    5s
    click element    id=time-expenses.filter-to-mine
    Sleep    5s
	wait until page contains     Project    timeout=30
	mouse over    Xpath=//*[@id="page-container"]/esub-trackpoint-header/section/div/div[2]/ul/li[1]/button
	Sleep    2s
	click element    Xpath=//*[@id="page-container"]/esub-trackpoint-header/section/div/div[2]/ul/li[1]/button
	Sleep    3s
	click element    Xpath=//*[@id="cdk-overlay-0"]/div/div/button[1]

Clear Form after Project entry
    wait until page contains    Enter Hours     timeout=30
    Sleep    3s
    click element    id=md-tab-label-0-1
    Sleep    3s
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
    click element    Xpath=//*[@id="page-container"]/div/div/div/ng-component/div/div/esub-enter-time-form/div[2]/form/div[6]/div/div/esub-daypicker-flyout/div/dp-day-calendar/div/div/div[5]/button[5]
    Sleep    3s
     input text    id=txtFormNotes   Clear Notes
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
    #clear element text    id=txtFormPhases
   # Sleep    3s
    #Input Text    id=txtFormPhases    1 - Default Phase
    #Sleep    4s
    #click element    id=md-autocomplete-1
    #Sleep    3s
    Input Text    id=txtFormCostCode    888 - Demolition
    Sleep    4s
    Click Element    id=md-autocomplete-5
    Sleep    3s
    click element    id=lnkClearEmployees
    Sleep    4s
    click element    id=lnkFormAllEmployees
    Sleep    6s
    click element    id=txtFormDates
    Sleep    4s
    click element    Xpath=//*[@id="page-container"]/div/div/div/ng-component/div/div/esub-enter-time-form/div[2]/form/div[6]/div/div/esub-daypicker-flyout/div/dp-day-calendar/div/div/div[2]/button[6]
    sleep    5s
    click element    id=txtFormNotes
    Sleep    3s
Enter Time In and Time Out Hours
    Sleep    3s
    press key    id=txtFormTimeIn    7:15AM
    Sleep    3s
    press key    id=txtFormTimeOut   5:15PM
    sleep    4s
    press key    id=txtFormBreakIn    12:00PM
    Sleep    4s
    press key    id=txtFormBreakOut    12:19PM
    Sleep    6s
Enter Notes
    click element    id=txtFormNotes
    Sleep     5s
    Input text    id=txtFormNotes    Test Notes to see how many characters are entered The average time of these 30 matches is 25 minutes and 25 seconds (25m 25s). This average is greatly affected by the Iron Man match at WM 12, which lasted over an hour in duration. In actuality, 16 of these 30 matches clocked in between 20m0s and 22m 30s.
    Sleep    6s
    capture page screenshot    Filename=enterHours.png
    Sleep    3s
    Click button    id=btnFormCreate
    Sleep    5s
Filter By Employee
    wait until page contains    Employee
    Sleep    3s
    click element    id=md-tab-label-1-1
    Sleep    3s
Filter By Project
    click element    id=md-tab-label-1-2
    Sleep    3s
Modify the time In and Time out under Grid View
    wait until page contains    Employee     timeout=30
    Sleep     3s
    press key    id=txtGridFormTimeIn-0-0   5:15AM
    Sleep    3s
    press key    id=txtGridFormTimeOut-0-0   5:15PM
    sleep    4s
Modify The Break In and Break Out under Grid View
    press key    id=txtGridFormBreakIn-0-0    12:00PM
    Sleep    4s
    press key    id=txtGridFormBreakOut-0-0   1:PM
    Sleep    4s
Modify Employee Field to an Incorrect Name
    input text    id=txtGridFormEmployee-0-0    ABSCDEFRHAHH Joe Willis XIV
    Sleep    4s
    #click element    id=btnGridFormCopyRow-0-0
    #Sleep    3s
    input text    id=txtGridFormEmployee-0-1    Dinosaur Brother Leroy Jenkins
    Sleep    3s
    capture page screenshot    Filename=StringChange.png
    click button    id=btnGridSubmit
    Sleep    3s
Add More Lines
    Wait until page contains    Employee    timeout=30
    Sleep    3s
    mouse over    id=btnGridAddLines
    Sleep    3s
    click button    id=btnGridAddLines
    Sleep    3s
    wait until page contains    Enter Hours     timeout=30
    Sleep    3s
    click element    id=md-tab-label-2-1
    Sleep    3s
    input text    id=txtFormProject    1 - Fancy Restaurant
    Sleep    7s
    Click Element    id=md-autocomplete-85
    Sleep    4s
    Input Text    id=txtFormCostCode    777 - Install
    Sleep    4s
    click element    id=md-autocomplete-86
    Sleep    3s
    input text    id=txtFormEmployees    10001 - String String
    Sleep    4s
    click element    id=md-autocomplete-87
    Sleep    3s
    click element    id=txtFormDates
    Sleep    3s
    click button    Xpath=//*[@id="page-container"]/div/div/div/ng-component/div/div[2]/esub-enter-time-form/div[2]/form/div[5]/div/div/esub-daypicker-flyout/div/dp-day-calendar/div/div/div[5]/button[6]
    Sleep    5s
    click element    id=txtFormNotes
    Sleep    4s
    press key    id=txtFormTimeIn    7:15AM
    Sleep    3s
    press key    id=txtFormTimeOut   5:15PM
    sleep    4s
    Press Key    id=txtFormBreakIn    12:00PM
    Sleep    4s
    press key    id=txtFormBreakOut    12:45PM
    Sleep    4s
    click button    id=btnFormCreate
    sleep    4s
    capture page screenshot    Filename=SubmitTime.png
    Sleep    3s
    close browser


Copy Stats from Employee Card (By Date)
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
    Sleep    2s
    wait until page contains    Employee
    #capture page screenshot    Filename=pinNumberField.png
    #input text    id=pin    1234
    #Sleep    3s
    #click Button    Xpath=/html/body/div/div/div[2]/md-dialog-container/esub-timesheet-card-pin/html/form/body/md-card/div[2]/button
    Sleep    3s
    Wait Until Page Contains    Employee
    Sleep    5s
    click element    id=time-expenses.filter-to-mine
    Sleep    5s
	wait until page contains     Time    timeout=30
	mouse over    Xpath=//*[@id="page-container"]/esub-trackpoint-header/section/div/div[2]/ul/li[1]/button/span
	Sleep    2s
	click element    Xpath=//*[@id="page-container"]/esub-trackpoint-header/section/div/div[2]/ul/li[1]/button/span
	Sleep    3s
	wait until page contains    Employee
    Sleep    2s
    click element    Xpath=//*[@id="cdk-overlay-0"]/div/div/button[1]/div
    Sleep    3s
    click element    id=md-tab-label-0-2
    Sleep    3s
    input text    id=txtFormCostCode    Sick Time - Sick Time
    Sleep    3s
    click element    id=md-option-1
    Sleep    3s
    input text    id=txtFormEmployees     10001 - Joey Heck
    Sleep    3s
    click element    id=md-autocomplete-2
    Sleep    3s
    click element    id=txtFormDates
    Sleep    3s
    click element    Xpath=//*[@id="page-container"]/div/div/div/ng-component/div/div/esub-enter-time-form/div[2]/form/div[4]/div/div/esub-daypicker-flyout/div/dp-day-calendar/div/div/div[2]/button[4]
    Sleep    2s
    click element    Xpath=//*[@id="page-container"]/div/div/div/ng-component/div/div/esub-enter-time-form/div[2]/form/div[4]/div/div/esub-daypicker-flyout/div/dp-day-calendar/div/div/div[3]/button[4]
    Sleep    2s
    click element    Xpath=//*[@id="page-container"]/div/div/div/ng-component/div/div/esub-enter-time-form/div[2]/form/div[4]/div/div/esub-daypicker-flyout/div/dp-day-calendar/div/div/div[5]/button[2]
    sleep    2s
    CLICK ELEMENT    XPath=//*[@id="page-container"]/div/div/div/ng-component/div/div/esub-enter-time-form/div[2]/form/div[4]/div/div/esub-daypicker-flyout/div/dp-day-calendar/div/div/div[5]/button[4]
    Sleep    3s
    click element    id=txtFormNotes
    Sleep    3s
    input text    id=txtFormST    6
    Sleep    3s
    input text    id=txtFormNotes    Sick Day
    Sleep    3s
    click button    id=btnFormCreate
    wait until page contains    Employee    timeout=30
    Sleep    3s
    click element    id=btnGridFormIndirectCopyRow-0-0
    Sleep    3s
    capture page screenshot    Filename=copyCard.png
    Sleep    5s
Copy Stats from Employee Card (By Employee)
    click element    id=md-tab-label-1-1
    Sleep    5s
    click element    id=btnGridFormIndirectCopyRow-0-0
    Sleep    3s
    capture page screenshot    Filename=copyCard.png
    Sleep    4s
Copy Stats from Employee Card (By Project)
    click element    id=md-tab-label-1-2
    Sleep    5s
    click element    id=btnGridFormIndirectCopyRow-0-0
    Sleep    3s
    click element    id=btnGridFormIndirectCopyRow-0-2
    Sleep    3s
    click element    id=btnGridFormIndirectCopyRow-0-3
    capture page screenshot    Filename=copyCard.png
    Sleep    4s
Navigate to Utilities before Submitting
    mouse over    Xpath=//*[@id="page-container"]/esub-trackpoint-header/section/div/div[2]/ul/li[2]/button/span
    Sleep    3s
    click element    Xpath=//*[@id="page-container"]/esub-trackpoint-header/section/div/div[2]/ul/li[2]/button/span
    Sleep    3s
    click element    Xpath=//*[@id="cdk-overlay-8"]/div/div/button
    Sleep    3s
    click element    Xpath=//*[@id="cdk-overlay-9"]/md-dialog-container/esub-confirmation-dialog/md-dialog-actions/button[1]/span
    Sleep    3s
Cancel and Navigate to the Enter Time Option
    click element    Xpath=//*[@id="page-container"]/esub-trackpoint-header/section/div/div[2]/ul/li[1]/button/span
    Sleep    3s
    Mouse Over    Xpath=//*[@id="cdk-overlay-0"]/div/div/button[1]
    Sleep    3s
    click element    Xpath=//*[@id="cdk-overlay-0"]/div/div/button[1]
    Sleep    3s
    #Currently missing the pop up modal - (lost Save Changes) - 11.1.17 - Issue Created by Mike G
Delete 1 Time Card
    click element    Xpath=//*[@id="btnGridFormDeleteCard-1"]/span
    SLeep    5s
    close browser







###########
Group by Mine
    [Tags]    Smoke
    Open Browser    http://web.develop.shasta.esubonline.com/#/time/timesheets    Chrome
    Set Window Size    ${1600}    ${1000}
    Wait Until Page Contains    eSUB
    Sleep    3s
    Input Text    id=txtUsername    Tonyd@esub.com
    Sleep    3s
    Input Text    id=txtPassword     Test1234
    Sleep    3s
    Click Button    id=btnLogin
    Wait Until Page Contains    Employee    timeout=30
    Sleep    5s
    click element    id=time-expenses.filter-to-mine
    #Filter should display when user selects "Mine" (bug #SH-887)
    sleep    4s
    capture page screenshot    Filename=noRecordsunderMine.png
    click element    id=time-expenses.group-by-project
    #group by project (Timerecords does not display)
    Sleep    4s
    capture page screenshot    Filename=noRecordsunderMineProject.png
    click element    id=time-expenses.group-by-employee
    #group by Employee (Timerecords does not display)
    Sleep    4s
    capture page screenshot    Filename=noRecordsunderMineEmployee.png
    click element    id=time-expenses.filter-to-all
    #clicking on (ALL) displays the time records
    Sleep    4s
    click element    id=esub-week-selector.previous-week
    Sleep    4s
    click element    id=esub-week-selector.next-week
    Sleep    4s
    close browser

















####################################################


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
