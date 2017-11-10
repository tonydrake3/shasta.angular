*** Settings ***
Documentation    Enter time test suite
Library    Selenium2Library
Resource    /Users/tonydrake/gitrepos/shasta.angular/webShastaAutomation/KeywordsShasta/copyYesterdaysTime.robot

# ***Environment - QA ***

*** Test Cases ***


Modify Timecard    Modify Timecard
project information    project information
Employees Information    Employees Information
Dates Entry    Dates Entry
Hours Worked Information    Hours Worked Information
Enter Notes    Enter Notes
Change Note    Change Note
Modify System    Modify System
Modify OT Hours    Modify OT Hours
Copy Timecard and Sign out    Copy Timecard and Sign out




Navigate To Approve Timecards and enter the incorrect PIN    Navigate To Approve Timecards and enter the incorrect PIN
Filter By Project    Filter By Project
Filter By Employee    Filter By Employee
Select ALL Time Cards    Select ALL Time Cards
Unselect Select ALL Time Cards    Unselect Select ALL Time Cards
Double Click Select All Time Cards    Double Click Select All Time Cards
View Calendar Dates    View Calendar Dates




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


Create New Timesheet     Create New Timesheet

*** Keywords ***
Copy Last Week's Time Without any previous Timesheet created
    [Tags]    Smoke
    Open Browser    http://web.qa.shasta.esubonline.com   Chrome
    Set Window Size    ${1600}    ${1000}
    Wait Until Page Contains    eSUB
    Sleep    3s
    Input Text    id=txtUsername    Heatherh@esub.com
    Sleep    3s
    Input Text    id=txtPassword     Test1234
    Sleep    3s
    Click Button    id=btnLogin
    Wait Until Page Contains    Select Company    timeout=30
    Sleep    2s
    click element    id=companyCard2
    Sleep    5s
    mouse over    Xpath=//*[@id="page-container"]/esub-trackpoint-header/section/div/div[2]/ul/li[1]/button/span
    Sleep    5s
    click element    Xpath=//*[@id="page-container"]/esub-trackpoint-header/section/div/div[2]/ul/li[1]/button/span
    Sleep    4s
    click element    Xpath=//*[@id="cdk-overlay-0"]/div/div/button[1]
    wait until page contains    Enter Hours    timeout=30
	sleep    3s
	click button    Xpath=//*[@id="page-container"]/div/div/div/ng-component/div/div[1]/div[1]/button
	Sleep    3s
	Mouse Over    Xpath=//*[@id="cdk-overlay-1"]/md-dialog-container/esub-warning-dialog/md-dialog-actions/button
	Sleep    3s
	#pop up modal display of timesheets not created
	click element    Xpath=//*[@id="cdk-overlay-1"]/md-dialog-container/esub-warning-dialog/md-dialog-actions/button
	Sleep    3s
	capture page screenshot    Filename=PopUpModalCopyLastWeek.png
	Sleep    3s
	close browser


Copy Yesterday's Time Without any previous Timesheet created
     [Tags]    Smoke
    Open Browser    http://web.qa.shasta.esubonline.com    Chrome
    #Set Window Size    ${1600}    ${1000}
    Wait Until Page Contains    eSUB
    Sleep    3s
    Input Text    id=txtUsername    Heatherh@esub.com
    Sleep    3s
    Input Text    id=txtPassword     Test1234
    Sleep    3s
    Click Button    id=btnLogin
    Wait Until Page Contains    Select Company    timeout=8
    Sleep    2s
    click element    id=companyCard2
    Sleep    5s
    mouse over    Xpath=//*[@id="page-container"]/esub-trackpoint-header/section/div/div[2]/ul/li[1]/button/span
    Sleep    5s
    click element    Xpath=//*[@id="page-container"]/esub-trackpoint-header/section/div/div[2]/ul/li[1]/button/span
    Sleep    4s
    click element    Xpath=//*[@id="cdk-overlay-0"]/div/div/button[1]
    wait until page contains    Enter Hours    timeout=30
	sleep    3s
	#pop up modal display of timesheets not created
	click button    Xpath=//*[@id="page-container"]/div/div/div/ng-component/div/div[1]/div[2]/button
	Sleep    3s
	close browser
	#Sleep    3s
	#Mouse Over    Xpath=//*[@id="cdk-overlay-1"]/md-dialog-container/esub-warning-dialog/md-dialog-actions/button
	#Sleep    3s
	#click element    Xpath=//*[@id="cdk-overlay-1"]/md-dialog-container/esub-warning-dialog/md-dialog-actions/button


Enter Hours Field
    [Tags]    Smoke
    Open Browser    http://web.qa.shasta.esubonline.com    Chrome
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
    mouse over    Xpath=//*[@id="page-container"]/esub-trackpoint-header/section/div/div[2]/ul/li[1]/button/span
    Sleep    3s
    click element    Xpath=//*[@id="page-container"]/esub-trackpoint-header/section/div/div[2]/ul/li[1]/button/span
    Sleep    4s
    click element    Xpath=//*[@id="cdk-overlay-0"]/div/div/button[1]
	sleep    3s

Enter Project Information
    input text    id=txtFormProject    Random Auto Dealership
    Sleep    3s
    Click Element    id=md-autocomplete-1
    Sleep    4s
    Input Text    id=txtFormCostCode    777 - Install
    Sleep    4s
    Click Element    id=md-autocomplete-1
    Sleep    2s
    #click element    id=txtFormProject
    #Sleep    3s
Enter Employee Information
    input text    id=txtFormEmployees    eSUB Support
    Sleep    4s
    Click Element    id=md-autocomplete-5
Enter Dates Information
    click element    id=txtFormDates
    Sleep    4s
    click element    CSS=#page-container > div > div > div > ng-component > div > div.esub-card.no-hover > esub-enter-time-form > div.enter-time-form > form > div.row.mb-3 > div > div > esub-daypicker-flyout > div > dp-day-calendar > div > div > div:nth-child(3) > button.dp-calendar-day.dp-current-month.dp-current-day
    sleep    5s
Enter Hours Worked
    click element    id=txtFormST
    Sleep    5s
    Input Text    id=txtFormST    8
    sleep    4s
    input text    id=txtFormOT    2
    Sleep    4s
    Input Text    id=txtFormDT    0.75
    Sleep    4s
Type In Notes
    input text    id=txtFormNotes    Test notes - Development Environment
    Sleep    6s
    Click button    id=btnFormCreate
    Sleep    5s
    capture page screenshot    Filename=enterHours.png
    Sleep    5s
    close browser


Modify Timecard
    [Tags]    Smoke
    Open Browser    http://web.qa.shasta.esubonline.com    Chrome
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
	Wait Until Page Contains    Employee    timeout=30
	Sleep    4s
    mouse over    Xpath=//*[@id="page-container"]/esub-trackpoint-header/section/div/div[2]/ul/li[1]/button/span
    Sleep    3s
    click element    Xpath=//*[@id="page-container"]/esub-trackpoint-header/section/div/div[2]/ul/li[1]/button/span
    Sleep    4s
    click element    Xpath=//*[@id="cdk-overlay-0"]/div/div/button[1]
	sleep    3s
Project information
    wait until page contains    Enter Hours    timeout=30
    input text    id=txtFormProject    Random Auto Dealership
    Sleep    7s
    Click Element    id=md-autocomplete-1
    Sleep    4s
    Input Text    id=txtFormCostCode    777 - Install
    Sleep    4s
    Click Element    id=md-autocomplete-2
    Sleep    2s
    #click element    id=txtFormProject
    #Sleep    3s
Employees Information
    input text    id=txtFormEmployees    10001 - Mike O'Gorman
    Sleep    4s
    Click Element    id=md-autocomplete-3
Dates Entry
    click element    id=txtFormDates
    Sleep    4s
    click element    CSS=#page-container > div > div > div > ng-component > div > div.esub-card.no-hover > esub-enter-time-form > div.enter-time-form > form > div.row.mb-3 > div > div > esub-daypicker-flyout > div > dp-day-calendar > div > div > div:nth-child(3) > button.dp-calendar-day.dp-current-month.dp-current-day
    sleep    5s
Hours Worked Information
    click element    id=txtFormST
    Sleep    5s
    Input Text    id=txtFormST    8
    sleep    4s
    input text    id=txtFormOT    2
    Sleep    4s
    Input Text    id=txtFormDT    0.75
    Sleep    4s
Enter Notes
    input text    id=txtFormNotes    Test notes - Development Environment
    Sleep    6s
    Click button    id=btnFormCreate
    Sleep    5s
    capture page screenshot    Filename=enterHours.png
    Sleep    5s
Change Note
    Wait until page contains    eSUB
    Sleep    3s
    Click Element    id=btnGridFormNote-0-0
    Sleep    3s
    wait until page contains    Change note
    clear element text    id=txtEnterTimeGridNote
    Sleep    3s
    Input Text    id=txtEnterTimeGridNote    Testing this once more to verify note changes
    Sleep    3s
    mouse over    Xpath=//*[@id="cdk-overlay-5"]/md-dialog-container/esub-notes-entry-dialog/md-dialog-actions/button[2]
    Sleep    3s
    click Button    Xpath=//*[@id="cdk-overlay-5"]/md-dialog-container/esub-notes-entry-dialog/md-dialog-actions/button[2]
    Sleep    3s
Modify System
    wait until page contains    Employee    timeout=30s
    clear element text    id=txtGridFormSystem-0-0
    sleep    3s
    input text    id=txtGridFormSystem-0-0    0 - System 4286
    Sleep    3s
Modify OT Hours
    clear element text    id=txtGridFormOT-0-0
    sleep    3s
    input text    id=txtGridFormOT-0-0    1
    sleep    3s
Copy Timecard and Sign out
    click element    id=btnGridFormCopyRow-0-0
    sleep    2s
    click button    id=btnGridSubmit
    Sleep    3s
    wait until page contains    Employee
    mouse over    Xpath=//*[@id="page-container"]/esub-trackpoint-header/section/div/div[3]/ul/li[2]/button
    Sleep    3s
    click element    Xpath=//*[@id="page-container"]/esub-trackpoint-header/section/div/div[3]/ul/li[2]/button
    Sleep    3s
    click element    Xpath=//*[@id="cdk-overlay-8"]/div/div/button
    Sleep    2s
    close browser


Enter Indirect Costs
    [Tags]    Smoke
    Open Browser    http://web.qa.shasta.esubonline.com    Chrome
    Set Window Size     ${1600}    ${1000}
    Wait Until Page Contains    eSUB
    Sleep    5s
    Input Text    id=txtUsername    Tonyd@esub.com
    Sleep    5s
    Input Text    id=txtPassword     Test1234
    Sleep    5s
    Click Button    id=btnLogin
    Wait Until Page Contains    Employee    timeout=30
    mouse over    Xpath=//*[@id="page-container"]/esub-trackpoint-header/section/div/div[2]/ul/li[1]/button/span
    Sleep    5s
    click element    Xpath=//*[@id="page-container"]/esub-trackpoint-header/section/div/div[2]/ul/li[1]/button/span
    Sleep    5s
    click element    Xpath=//*[@id="cdk-overlay-0"]/div/div/button[1]
Successful Login
    #Sleep    5s
    #click button    id=btnEnterTime
    wait until page contains    Enter Indirect Costs    timeout=30
    Sleep    3s
    #Click Indirect Costs Field
    click element     id=md-tab-label-0-2
    Sleep    3s
	Input text    id=txtFormCostCode    Overhead costs - Overhead costs
	Sleep    3s
    Click Element    id=md-autocomplete-2
    Sleep    3s
    Input Text    id=txtFormEmployees    10001 - String String
    Sleep    3s
    Click Element    id=md-autocomplete-3
    Sleep    3s
    Click element    id=lnkClearEmployees
    Sleep    4s
    click element    id=lnkFormAllEmployees
    Sleep    4s
    click element    id=txtFormDates
    Sleep    4s
    mouse over    Xpath=//*[@id="page-container"]/div/div/div/ng-component/div/div[2]/esub-enter-time-form/div[2]/form/div[4]/div/div/esub-daypicker-flyout/div/dp-day-calendar/div/div/div[3]/button[5]
    Sleep    3s
    click element    Xpath=//*[@id="page-container"]/div/div/div/ng-component/div/div[2]/esub-enter-time-form/div[2]/form/div[4]/div/div/esub-daypicker-flyout/div/dp-day-calendar/div/div/div[3]/button[5]
    Sleep    4s
    #User wants to click out of the calendar view
    Click Element    id=txtFormNotes
    Sleep    4s
    input Text    id=txtFormST    8
    Sleep    4s
    Input Text    id=txtFormNotes    Test Notes for indirect Cost - Sample Test
    Sleep    4s
    Click element    id=lnkClearEmployees
    Sleep    4s
    input text    id=txtFormEmployees    10001 - Joey Heck
    Sleep    4s
    click element    id=md-autocomplete-3
    Sleep    4s
    Click Button     id=btnFormCreate
    Sleep    4s
    Wait until Page Contains     Employee    timeout=30s
    click button    id=btnGridAddLines

Return to Enter Hours Field
    Wait Until page contains     Enter Hours    timeout=30
    sleep    7s
    Input text    id=txtFormProject    White House Remodel
    Sleep    7s
    Click Element    id=md-autocomplete-6
    Sleep    3s
Select 100 System Beta Zero in order to populate the Phase Field
    input text    id=txtFormSystem    100 - System Beta Zero
    Sleep    3s
    Click Element    id=md-autocomplete-7
    Sleep    3s
    input text    id=txtFormPhases   1 - Phase 3
    Sleep    3s
    click element    id=md-autocomplete-10
    Sleep    3s
    input text    id=txtFormCostCode    777 - Install
    sleep    3s
    click element    id=md-autocomplete-8
    Sleep    5s
    input text    id=txtFormEmployees    10001 - Aurra Sing
    Sleep    3s
    click element    id=md-autocomplete-9
    Sleep    7s
    click element    id=expandEmployee
    Sleep    4s
    click element    id=lnkClearEmployees
    Sleep    4s
    click element     id=txtFormDates
Enter A New Calendar Date
    Sleep    3s
    click element     CSS=#page-container > div > div > div > ng-component > div > div.esub-card.no-hover > esub-enter-time-form > div.enter-time-form > form > div.row.mb-3 > div > div > esub-daypicker-flyout > div > dp-day-calendar > div > div > div:nth-child(3) > button.dp-calendar-day.dp-current-month.dp-current-day
    sleep    4s
    click element    id=txtFormNotes
    Sleep    4s
    Input Text    id=txtFormST    8
    sleep    6s
    input text    id=txtFormOT    2
    Sleep    4s
    Input Text    id=txtFormDT    0.75
    Sleep    6s
    #Lengthy foreign text below to try and break the notes field
    Input Text    id=txtFormNotes    1 sal ki keemat us shaks sy puchu jo fail ho gya ho 1 maheeny ki keemat us shaks sy puchu jis ko sara mahena pay na mili ho 1 hafty ki keemat us shaks sy puchu jo sara hafta hospital mai admt rha ho 1 din ki keemat us shaks sy pucho jo sara din bhuka rha ho.1 gantay ki keemat us sy pucho jisay ek gntay tk kisi ka intzar krna pary. 1 mint ki keemat us sy pucho jis ny 1 mint ki wja sy apni train mis kr di ho. 1 second: ki keemat us sy pucho jo ek second k farq sy boht bray accidnt sy bcha ho. Hr ek lamha boht keemti hai. Hmara kal tareekh bnjata hai. Hmara anay wala kal hmaray lye chalnge hai, But hmara aj hmaray ly ek tohfa ha, is lye to isay PRESENT kehtay hn:) 1 sal ki keemat us shaks sy puchu jo fail ho gya ho 1 maheeny ki keemat us shaks sy puchu jis ko sara mahena pay na mili ho 1 hafty ki keemat us shaks sy puchu jo sara hafta hospital mai admt rha ho 1 din ki keemat us shaks sy pucho jo sara din bhuka rha ho.1 gantay ki keemat us sy pucho jisay ek gntay tk kisi ka intzar krna pary. 1 mint ki keemat us sy pucho jis ny 1 mint ki wja sy apni train mis kr di ho. 1 second: ki keemat us sy pucho jo ek second k farq sy boht bray accidnt sy bcha ho. Hr ek lamha boht keemti hai. Hmara kal tareekh bnjata hai. Hmara anay wala kal hmaray lye chalnge hai, But hmara aj hmaray ly ek tohfa ha, is lye to isay PRESENT kehtay hn:)
    Sleep    3s
    input text    id=txtFormEmployees    10001 - Ketsu Onyo
    Sleep    6s
    click element    id=md-autocomplete-9
    Sleep    3s
    input text    id=txtFormEmployees    10001 - Zam Wesell
    Sleep    3s
    click element    id=md-autocomplete-9
    Sleep    3s
Change System Field to remove the Phase Field
    Input text    id=txtFormSystem    99 - System Alpha DX Plus
    sleep    7s
    Click Element    id=md-autocomplete-7
    Sleep    6s
Enter New Hours Worked
    Input Text    id=txtFormST    10
    sleep    7s
    input text    id=txtFormOT    21
    Sleep    7s
    Input Text    id=txtFormDT    1
    Sleep    6s
    click button    id=btnFormCreate

Delete One Card By Selecting The Trash Can Icon
    wait until page contains    Employee    timeout=30s
    click element    id=btnGridFormIndirectNote-0-0
    #pop up begins with Change Note
    clear element text    id=txtEnterTimeGridNote
    Sleep    7s
    mouse over    Xpath=//*[@id="cdk-overlay-9"]/md-dialog-container/esub-notes-entry-dialog/md-dialog-actions/button[2]
    Sleep    6s
    click button    Xpath=//*[@id="cdk-overlay-9"]/md-dialog-container/esub-notes-entry-dialog/md-dialog-actions/button[2]
    Sleep    7s
    click element    id=btnGridFormIndirectDeleteRow-0-0
    Sleep    6s
    capture page screenshot    Filename=DeleteCardSuccess.png
    Sleep    6s
Clear Overtime Hours From the Grid Form
    clear element text    id=txtGridFormOT-0-0
    Sleep    6s
    clear element text    id=txtGridFormOT-0-1
    Sleep    6s

Change to an Invalid Project Inside The Grid Form
    input text    id=txtGridFormProject-0-0    2312 - Esub Remodel
    Sleep    6s
    input text    id=txtGridFormEmployee-0-0    10001 - string string
    Sleep    6s
    capture page screenshot    filename=gridFormModification.png
Modify Employee Field to an Incorrect Name
    clear element text    id=txtGridFormEmployee-0-0
    Sleep    4s
    clear element text    id=txtGridFormEmployee-0-1
    Sleep    4s
    input text    id=txtGridFormEmployee-0-0    ABSCDEFRHAHH - Joe Willis XIV
    Sleep    4s
    click element    id=txtGridFormCostCode-0-0
    Sleep    4s
    input text    id=txtGridFormEmployee-0-1    Brother Leroy Jenkins
    Sleep    4s
    Click Element    id=txtGridFormCostCode-0-0
    Sleep    3s
    click button    id=btnGridSubmit
    Sleep    5s
    close browser



Navigate To Approve Timecards and enter the incorrect PIN
    [Tags]    Smoke
    Open Browser    http://web.qa.shasta.esubonline.com   Chrome
    #Set Window Size    ${1600}    ${1000}
    Wait Until Page Contains    eSUB    timeout=15
    Sleep    4s
    Input Text    id=txtUsername    tonyd@esub.com
    Sleep    4s
    Input Text    id=txtPassword     Test1234
    Sleep    4s
    Click Button    id=btnLogin
    wait until page contains    Employee    timeout=10
	sleep    5s
	mouse over    Xpath=//*[@id="page-container"]/esub-trackpoint-header/section/div/div[2]/ul/li[2]/button
	Sleep    5s
	click button    Xpath=//*[@id="page-container"]/esub-trackpoint-header/section/div/div[2]/ul/li[2]/button
	Sleep    5s
	Mouse Over    Xpath=//*[@id="cdk-overlay-0"]/div/div/button
	Sleep    5s
	#pop up modal display of timesheets not created
	click element    Xpath=//*[@id="cdk-overlay-0"]/div/div/button
	Sleep    5s
	wait until page contains    Pin    timeout=15
	press key    id=pin    12345678910111213141516171819120
	Sleep    5s
	capture page screenshot    Filename=IncorrectPinNumber.png
	Sleep    5s
	click button    css=body > md-card > div:nth-child(2) > button
	Sleep    5s
	wait until page contains    Employee    timeout=15
Filter By Project
    click element     id=time-expenses.group-by-project
    #user should see in bold text - the Project Name rather than the Employee name
    Sleep    5s
Filter By Employee
    CLICK ELEMENT    id=time-expenses.group-by-employee
    #user should see in bold text - the Employee Name rather than the Project name
    Sleep    5s
Select ALL Time Cards
    click element    id=md-checkbox-1
    Sleep    5s
Unselect Select ALL Time Cards
    click element    id=md-checkbox-1
    Sleep    5s
Double Click Select All Time Cards
    double click element    id=md-checkbox-1
    sleep    5s
View Calendar Dates
    click element    id=esub-week-selector.open-calendar
    Sleep    3s
    Mouse Over     Xpath=//*[@id="md-datepicker-0"]/div[1]/div/button[1]/span
    Sleep    3s
    click element    Xpath=//*[@id="md-datepicker-0"]/div[1]/div/button[1]/span
    Sleep    3s
    click element    Xpath=//*[@id="md-datepicker-0"]/div[2]/mat-year-view/table/tbody/tr[3]/td[4]
    Sleep    3s
    click element    Xpath=//*[@id="md-datepicker-0"]/div[2]/md-month-view/table/tbody/tr[4]/td[6]
    Sleep    3s
    Mouse Over     id=esub-week-selector.open-calendar
    Sleep    3s
    click element    id=esub-week-selector.open-calendar
    Sleep    3s
    mouse over     Xpath=//*[@id="md-datepicker-0"]/div[2]/md-month-view/table/tbody/tr[4]/td[6]/div
    Sleep    3s
    click element    Xpath=//*[@id="md-datepicker-0"]/div[2]/md-month-view/table/tbody/tr[4]/td[6]/div
    Sleep    3s
    click element    id=esub-week-selector.previous-week
    Sleep    3s
    click element    id=esub-week-selector.previous-week
    sleep    3s
    click element    id=esub-week-selector.previous-week
    sleep    3s
    click element    id=esub-week-selector.previous-week
    Sleep    3s
    click element    id=esub-week-selector.previous-week
    Sleep    3s
    click element    id=esub-week-selector.previous-week
    sleep    3s
    click element    id=esub-week-selector.previous-week
    sleep    3s
    click element    id=esub-week-selector.next-week
    sleep    3s
    click element    id=esub-week-selector.next-week
    sleep    3s
    click element    id=esub-week-selector.next-week
    sleep    3s
    click element    id=esub-week-selector.next-week
    sleep    3s
    click element    id=esub-week-selector.next-week
    Sleep    3s
    click element    id=esub-week-selector.open-calendar
    Sleep    3s
    Mouse Over     Xpath=//*[@id="md-datepicker-0"]/div[1]/div/button[1]/span
    Sleep    5s
    click element    Xpath=//*[@id="md-datepicker-0"]/div[1]/div/button[1]/span
    Sleep    5s
    click element    Xpath=//*[@id="md-datepicker-0"]/div[2]/mat-year-view/table/tbody/tr[4]/td[3]/div
    Sleep    5s
    click element    Xpath=//*[@id="md-datepicker-0"]/div[2]/md-month-view/table/tbody/tr[1]/td[2]/div
    capture page screenshot    Filename=calendarView.png
    sleep     3s
    close browser


Create New Timesheet
    [Tags]    Smoke
    Open Browser    http://web.qa.shasta.esubonline.com    Firefox
    Set Window Size    ${1600}    ${1000}
    Wait Until Page Contains    eSUB    timeout=10
    Sleep    3s
    Input Text    id=txtUsername    Tonyd@esub.com
    Sleep    3s
    Input Text    id=txtPassword     Test1234
    Sleep    3s
    Click Button    id=btnLogin
    Wait Until Page Contains    eSUB
    Sleep    5s
    wait until page contains    Employee    timeout=10
    Sleep    7s
    mouse over    Xpath=//*[@id="page-container"]/esub-trackpoint-header/section/div/div[2]/ul/li[1]/button/span
    Sleep    3s
    click element    Xpath=//*[@id="page-container"]/esub-trackpoint-header/section/div/div[2]/ul/li[1]/button/span
    Sleep    4s
    click element    Xpath=//*[@id="cdk-overlay-0"]/div/div/button[1]
	sleep    3s
	close browser

























#Display Week and Totals
#Expand Day
#View Time Record
#Edit Record (hours Worked and Time in / Out)
#Edit Breaks
#Validate / Save
#Apply Commenting Component



#Enter Hours    Enter Hours
    #Enter More Employees
    #Enter Cost Code
    #Enter a Vaild Date
    #Enter Multiple hours worked
    #Enter Notes
    #Submit All

#Enter Indirect Costs    Enter Indirect Costs
    #Successful Login















#Display Week and Totals
#Expand Day
#View Time Record
#Edit Record (hours Worked and Time in / Out)
#Edit Breaks
#Validate / Save
#Apply Commenting Component




