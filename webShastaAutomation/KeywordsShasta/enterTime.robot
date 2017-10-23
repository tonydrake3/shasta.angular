*** Settings ***
Documentation    Enter time test suite
Library    Selenium2Library

# ***Environment - Dev ***

*** Test Cases ***
#Enter Indirect Costs    Enter Indirect Costs
    #Successful Login
    #Return to Enter Hours Field
    #Select 100 System Beta Zero in order to populate the Phase Field
    #Change System Field to remove the Phase Field
    #Enter New Hours Worked
    #Delete One Card By Selecting The Trash Can Icon
    #Clear Overtime Hours From the Grid Form
    #Change to an Invalid Project Inside The Grid Form
    #Modify Employee Field to an Incorrect Name

Modify Timecard    Modify Timecard
    project information
    Employees Information
    Dates Entry
    Hours Worked Information
    Enter Notes
    Change Note
    Modify System
    Modify OT Hours
    Copy Timecard and Sign out

#Enter Hours Field    Enter Hours Field
    #Enter Project Information
    #Enter Employee Information
    #Enter Dates Information
    #Enter Hours Worked
    #Type In Notes


*** Keywords ***
Enter Hours Field
    [Tags]    Smoke
    Open Browser    http://web.develop.shasta.esubonline.com/#/login    Firefox
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
	Sleep    4s
    mouse over    Xpath=//*[@id="page-container"]/esub-trackpoint-header/section/div/div[2]/ul/li[1]/button/span
    Sleep    3s
    click element    Xpath=//*[@id="page-container"]/esub-trackpoint-header/section/div/div[2]/ul/li[1]/button/span
    Sleep    4s
    click element    Xpath=//*[@id="cdk-overlay-0"]/div/div/button[1]
	sleep    3s

Enter Project Information
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
Enter Employee Information
    input text    id=txtFormEmployees    eSUB Support
    Sleep    4s
    Click Element    id=md-autocomplete-2
Enter Dates Information
    click element    id=txtFormDates
    Sleep    4s
    click element    Xpath=//*[@id="page-container"]/div/div/div/ng-component/div/div/esub-enter-time-form/div[2]/form/div[5]/div/div/esub-daypicker-flyout/div/dp-day-calendar/div/div/div[3]/button[3]
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
    Open Browser    http://web.develop.shasta.esubonline.com/#/login    Chrome
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
	Wait Until Page Contains    Employee
	Sleep    4s
    mouse over    Xpath=//*[@id="page-container"]/esub-trackpoint-header/section/div/div[2]/ul/li[1]/button/span
    Sleep    3s
    click element    Xpath=//*[@id="page-container"]/esub-trackpoint-header/section/div/div[2]/ul/li[1]/button/span
    Sleep    4s
    click element    Xpath=//*[@id="cdk-overlay-0"]/div/div/button[1]
	sleep    3s
Project information
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
Employees Information
    input text    id=txtFormEmployees    eSUB Support
    Sleep    4s
    Click Element    id=md-autocomplete-2
Dates Entry
    click element    id=txtFormDates
    Sleep    4s
    click element    Xpath=//*[@id="page-container"]/div/div/div/ng-component/div/div/esub-enter-time-form/div[2]/form/div[5]/div/div/esub-daypicker-flyout/div/dp-day-calendar/div/div/div[3]/button[3]
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
    Open Browser    http://web.develop.shasta.esubonline.com/    Firefox
    Set Window Size     ${1600}    ${1000}
    Wait Until Page Contains    eSUB
    Sleep    3s
    Input Text    id=txtUsername    Tonyd@esub.com
    Sleep    3s
    Input Text    id=txtPassword     Test1234
    Sleep    3s
    Click Button    id=btnLogin
    Wait Until Page Contains    Employee
    mouse over    Xpath=//*[@id="page-container"]/esub-trackpoint-header/section/div/div[2]/ul/li[1]/button/span
    Sleep    3s
    click element    Xpath=//*[@id="page-container"]/esub-trackpoint-header/section/div/div[2]/ul/li[1]/button/span
    Sleep    4s
    click element    Xpath=//*[@id="cdk-overlay-0"]/div/div/button[1]
Successful Login
    #Sleep    5s
    #click button    id=btnEnterTime
    wait until page contains    Enter Indirect Costs    timeout=30s
    Sleep    3s
    click element    id=md-tab-label-0-2
    #Click Indirect Costs Field
	Input text    id=txtFormCostCode    Overhead costs - Overhead costs
	Sleep    3s
    Click Element    id=md-autocomplete-1
    Sleep    4s
    Input Text    id=txtFormEmployees    10001 - String String
    Sleep    5s
    Click Element    id=md-autocomplete-2
    Sleep    5s
    Click element    id=lnkClearEmployees
    Sleep    5s
    click element    id=lnkFormAllEmployees
    Sleep    3s
    click element    id=txtFormDates
    Sleep    5s
    click element    Xpath=//*[@id="page-container"]/div/div/div/ng-component/div/div/esub-enter-time-form/div[2]/form/div[4]/div/div/esub-daypicker-flyout/div/dp-day-calendar/div/div/div[4]/button[5]
    Sleep    4s
    #User wants to click out of the calendar view
    Click Element    id=txtFormNotes
    Sleep    4s
    input Text    id=txtFormST    8
    Sleep    5s
    Input Text    id=txtFormNotes    Test Notes for indirect Cost - Sample Test
    Sleep    5s
    Click element    id=lnkClearEmployees
    Sleep    5s
    input text    id=txtFormEmployees    10001 - Joey Heck
    Sleep    4s
    click element    id=md-autocomplete-2
    Sleep    4s
    Click Button     id=btnFormCreate
    Sleep    3s
    Wait until Page Contains     Employee    timeout=30s
    click button    id=btnGridAddLines

Return to Enter Hours Field  #October 9th  - Be sure to change the dates under Xpath xpath=//*[@id="page-container"]/div/div/div/ng-component/div/div/esub-enter-time-form/div[2]/form/div[7]/div/div/esub-daypicker-flyout/div/dp-day-calendar/div/div/div[3]/button[2]
    Wait Until page contains     Enter Hours    timeout=30s
    sleep    4s
    Input text    id=txtFormProject    White House Remodel
    Sleep    6s
    Click Element    id=md-autocomplete-5
    Sleep    4s
Select 100 System Beta Zero in order to populate the Phase Field
    input text    id=txtFormSystem    100 - System Beta Zero
    Sleep    4s
    Click Element    id=md-autocomplete-6
    Sleep    3s
    input text    id=txtFormPhases   1 - Phase 3
    Sleep    3s
    click element    id=md-autocomplete-9
    Sleep    4s
    input text    id=txtFormCostCode    777 - Install
    sleep    3s
    click element    id=md-autocomplete-7
    #place a long sleep on this test then delete after running (Below)
    Sleep    15s
    input text    id=txtFormEmployees    10001 - Aurra Sing
    Sleep    3s
    click element    id=md-autocomplete-8
    Sleep    5s
    click element    id=expandEmployee
    Sleep    3s
    click element    id=lnkClearEmployees
    Sleep    3s
    click element     id=txtFormDates
    Sleep    4s
    click element    Xpath=//*[@id="page-container"]/div/div/div/ng-component/div/div/esub-enter-time-form/div[2]/form/div[7]/div/div/esub-daypicker-flyout/div/dp-day-calendar/div/div/div[4]/button[6]
    sleep    3s
    click element    id=txtFormNotes
    Sleep    3s
    Input Text    id=txtFormST    8
    sleep    4s
    input text    id=txtFormOT    2
    Sleep    4s
    Input Text    id=txtFormDT    0.75
    Sleep    4s
    #Lengthy foreign text below to try and break the notes field
    Input Text    id=txtFormNotes    1 sal ki keemat us shaks sy puchu jo fail ho gya ho 1 maheeny ki keemat us shaks sy puchu jis ko sara mahena pay na mili ho 1 hafty ki keemat us shaks sy puchu jo sara hafta hospital mai admt rha ho 1 din ki keemat us shaks sy pucho jo sara din bhuka rha ho.1 gantay ki keemat us sy pucho jisay ek gntay tk kisi ka intzar krna pary. 1 mint ki keemat us sy pucho jis ny 1 mint ki wja sy apni train mis kr di ho. 1 second: ki keemat us sy pucho jo ek second k farq sy boht bray accidnt sy bcha ho. Hr ek lamha boht keemti hai. Hmara kal tareekh bnjata hai. Hmara anay wala kal hmaray lye chalnge hai, But hmara aj hmaray ly ek tohfa ha, is lye to isay PRESENT kehtay hn:) 1 sal ki keemat us shaks sy puchu jo fail ho gya ho 1 maheeny ki keemat us shaks sy puchu jis ko sara mahena pay na mili ho 1 hafty ki keemat us shaks sy puchu jo sara hafta hospital mai admt rha ho 1 din ki keemat us shaks sy pucho jo sara din bhuka rha ho.1 gantay ki keemat us sy pucho jisay ek gntay tk kisi ka intzar krna pary. 1 mint ki keemat us sy pucho jis ny 1 mint ki wja sy apni train mis kr di ho. 1 second: ki keemat us sy pucho jo ek second k farq sy boht bray accidnt sy bcha ho. Hr ek lamha boht keemti hai. Hmara kal tareekh bnjata hai. Hmara anay wala kal hmaray lye chalnge hai, But hmara aj hmaray ly ek tohfa ha, is lye to isay PRESENT kehtay hn:)
    Sleep    4s
    input text    id=txtFormEmployees    10001 - Ketsu Onyo
    Sleep    3s
    click element    id=md-autocomplete-8
    Sleep    3s
    input text    id=txtFormEmployees    10001 - Zam Wesell
    Sleep    3s
    click element    id=md-autocomplete-8
    Sleep    5s
Change System Field to remove the Phase Field
    Input text    id=txtFormSystem    99 - System Alpha DX Plus
    sleep    3s
    Click Element    id=md-autocomplete-6
    Sleep    3s
Enter New Hours Worked
    Input Text    id=txtFormST    10
    sleep    4s
    input text    id=txtFormOT    21
    Sleep    4s
    Input Text    id=txtFormDT    1
    Sleep    4s
    click button    id=btnFormCreate

Delete One Card By Selecting The Trash Can Icon
    wait until page contains    Employee    timeout=30s
    click element    id=btnGridFormIndirectNote-0-0
    #pop up begins with Change Note
    clear element text    id=txtEnterTimeGridNote
    Sleep    3s
    mouse over    Xpath=//*[@id="cdk-overlay-9"]/md-dialog-container/esub-notes-entry-dialog/md-dialog-actions/button[2]
    Sleep    3s
    click button    Xpath=//*[@id="cdk-overlay-9"]/md-dialog-container/esub-notes-entry-dialog/md-dialog-actions/button[2]
    Sleep    3s
    click element    id=btnGridFormIndirectDeleteRow-0-0
    Sleep    4s
    capture page screenshot    Filename=DeleteCardSuccess.png
    Sleep    3s
Clear Overtime Hours From the Grid Form
    clear element text    id=txtGridFormOT-0-0
    Sleep    3s
    clear element text    id=txtGridFormOT-0-1
    Sleep    3s
    #clear element text    id=txtGridFormOT-0-2
    #Sleep    3s
    #clear element text    id=txtGridFormOT-0-3
    #Sleep    3s
Change to an Invalid Project Inside The Grid Form
    input text    id=txtGridFormProject-0-0    2312 - Esub Remodel
    Sleep    3s
    #click element    id=md-autocomplete-16
    #Sleep    3s
    input text    id=txtGridFormEmployee-0-0    10001 - string string
    sleep    3s
    #click element    id=md-autocomplete-17
    Sleep    3s
    capture page screenshot    filename=gridFormModification.png
Modify Employee Field to an Incorrect Name
    clear element text    id=txtGridFormEmployee-0-0
    Sleep    4s
    clear element text    id=txtGridFormEmployee-0-1
    Sleep    4s
    #clear element text    id=txtGridFormEmployee-0-2
    #Sleep    4s
    #clear element text    id=txtGridFormEmployee-0-3
   # Sleep    4s
    input text    id=txtGridFormEmployee-0-0    ABSCDEFRHAHH - Joe Willis XIV
    Sleep    4s
    click element    id=txtGridFormCostCode-0-0
    Sleep    4s
    input text    id=txtGridFormEmployee-0-1    Brother Leroy Jenkins
    Sleep    4s
    Click Element    id=txtGridFormCostCode-0-0
    #Sleep    4s
    #input text    id=txtGridFormEmployee-0-3    Willis Jackson
    #Sleep    4s
    click button    id=btnGridSubmit
    Sleep    4s
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




