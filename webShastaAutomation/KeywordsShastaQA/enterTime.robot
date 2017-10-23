*** Settings ***
Documentation    Enter time test suite
Library    Selenium2Library

# ***Environment - QA ***


*** Variables ***
${BROWSER}    chrome
${SLEEP}    6s

*** Keywords ***
Create New Time
    [Tags]    Smoke
    Open Browser    http://web.qa.shasta.esubonline.com/    Chrome
    Set Window Size    ${1600}    ${1000}
    Wait Until Page Contains    eSUB
    Sleep    3s
    Input Text    id=txtUsername    Tonyd@esub.com
    Sleep    3s
    Input Text    id=txtPassword     Test1234
    Click Button    id=btnLogin
    Wait Until Page Contains    eSUB
    Sleep    5s
	Click element    Xpath=//*[@id="page-container"]/div/div/div/esub-time-expenses/div/div[1]/div[3]/button
	Wait until page contains    Enter Hours
	Input text    id=txtFormProject    White House Remodel
    Sleep    6s
    Click Element    id=md-autocomplete-0
    Sleep    4s
    #click element    id=txtFormSystem
    #Sleep    4s
    Input Text    id=txtFormSystem    100 - Building 1
    Sleep    3s
    Click Element     id=md-autocomplete-1
    sleep     3s
    Click Element    id=txtFormPhases
    Sleep    2s
    Input Text    id=txtFormPhases    1 - Floor 1
    Sleep    3s
    Click Element     id=md-autocomplete-4
    Sleep    5s
    Click Element    id=txtFormCostCode
    Sleep    3s
    Input Text    id=txtFormCostCode    26-01 - Site Work
    Sleep    5s
    Input Text    id=txtFormEmployees    10001 - Cad Bane
    Sleep    7s
    click element    id=txtFormDates
    Sleep    5s
    Wait Until Page Contains Element   xpath=(//div[@class="mat-input-infix mat-form-field-infix"])[6]
    Sleep    4s
    Click Element    xpath=(//div[@class="mat-input-infix mat-form-field-infix"])[6]
    Sleep    5s
    Click Element    xpath=//*[@id="page-container"]/div/div/div/ng-component/div/div/esub-enter-time-form/div[2]/form/div[7]/div/div/esub-daypicker-flyout/div/dp-day-calendar/div/div/div[2]/button[6]
    Sleep    3s
    #Click Element    Xpath=//button[@class="dp-calendar-day dp-current-month dp-current-day"]
    #Sleep    5s
    Click element    id=txtFormST
    Sleep    3s
    Input Text    Xpath=//input[@id="txtFormST"]    8
    Sleep    4s
    Click Element    id=txtFormNotes
    Sleep    3s
    Input Text    id=txtFormNotes    Test notes
    Close browser



Enter Indirect Costs
    [Tags]    Smoke
    Open Browser    http://web.qa.shasta.esubonline.com/    Chrome
    Set Window Size     ${1600}    ${1000}
    Wait Until Page Contains    eSUB
    Sleep    3s
    Input Text    id=txtUsername    Tonyd@esub.com
    Sleep    3s
    Input Text    id=txtPassword     Test1234
    Click Button    id=btnLogin
    Wait Until Page Contains    eSUB

Successful Login
    Sleep    5s
	Click element    Xpath=//*[@id="page-container"]/div/div/div/esub-time-expenses/div/div[1]/div[3]/button
	Wait until page contains    Enter Indirect Costs
	Click Element    id=md-tab-label-0-1
	Input Text    id=txtFormCostCode    Overhead costs - Overhead costs
	Sleep    3s
    Click Element    id=md-autocomplete-1
    Sleep    4s
    Input Text    id=txtFormEmployees    10001 - Test 001
    Sleep    5s
    Click Element    id=md-autocomplete-2
    Sleep    5s
    Click element    id=txtFormDates
    Sleep    5s
    Wait Until Page Contains Element   xpath=//*[@id="page-container"]/div/div/div/ng-component/div/div/esub-enter-time-form/div[2]/form/div[4]/div/div/esub-daypicker-flyout/div/dp-day-calendar/div/div/div[3]/button[2]
    Sleep    7s
    Click Element    xpath=//*[@id="page-container"]/div/div/div/ng-component/div/div/esub-enter-time-form/div[2]/form/div[4]/div/div/esub-daypicker-flyout/div/dp-day-calendar/div/div/div[2]/button[6]
    Sleep    4s
    input Text    id=txtFormST    8
    Sleep    5s
    Input Text    id=txtFormNotes    Test Notes for indirect Cost - Sample Test
    Sleep    5s
    Click Button    id=btnFormCreate
    Sleep    5s
    Wait Until page contains    eSUB
    Sleep    3s
    Click Button     id=btnGridSubmit
    Sleep    3s
    Wait until Page Contains     eSUB
    Go Back
    Wait Until page contains     Enter Hours
    Sleep    5s
Back To Enter Hours  #October 9th  - Be sure to change the dates under Xpath xpath=//*[@id="page-container"]/div/div/div/ng-component/div/div/esub-enter-time-form/div[2]/form/div[7]/div/div/esub-daypicker-flyout/div/dp-day-calendar/div/div/div[3]/button[2]
    #Sleep    4s
    Input text    id=txtFormProject    White House Remodel
    Sleep    6s
    Click Element    id=md-autocomplete-5
    Sleep    4s
    #click element    id=txtFormSystem
    #Sleep    4s
    Input Text    id=txtFormSystem    100 - Building 1
    Sleep    3s
    Click Element     id=md-autocomplete-6
    sleep     3s
    Click Element    id=txtFormPhases
    Sleep    2s
    Input Text    id=txtFormPhases    1 - Floor 1
    Sleep    3s
    Click Element     id=md-autocomplete-9
    Sleep    5s
    Click Element    id=txtFormCostCode
    Sleep    3s
    Input Text    id=txtFormCostCode    26-01 - Site Work
    Sleep    5s
    Input Text    id=txtFormEmployees    10001 - Cad Bane
    Sleep    7s
    click element    id=txtFormDates
    Sleep    5s
    Click Element    xpath=//*[@id="page-container"]/div/div/div/ng-component/div/div/esub-enter-time-form/div[2]/form/div[7]/div/div/esub-daypicker-flyout/div/dp-day-calendar/div/div/div[3]/button[2]
    Sleep    4s
    Input Text    id=txtFormNotes    Test Notes for Entering Hours - Sample Test
    Sleep    7s
    Close Browser


Enter Hours
    [Tags]    Smoke
    Open Browser    http://web.qa.shasta.esubonline.com/    Chrome
    Set Window Size    ${1600}    ${1000}
    Wait Until Page Contains    eSUB
    Sleep    3s
    Input Text    id=txtUsername    Tonyd@esub.com
    Sleep    3s
    Input Text    id=txtPassword     Test1234
    Click Element   id=btnLogin
    Wait Until Page Contains    eSUB
    Sleep    5s
	Click element   id=btnEnterTime
	Wait until page contains    Enter Hours
	Input text    id=txtFormProject    White House Remodel
    Sleep    6s
    Click Element    id=md-autocomplete-0
    Sleep    4s
    #click element    id=txtFormSystem
    #Sleep    4s
    Input Text    id=txtFormSystem    100 - Building 1
    Sleep    3s
    Click Element     id=md-autocomplete-1
    sleep     3s
    Click Element    id=txtFormPhases
    Sleep    2s
    Input Text    id=txtFormPhases    1 - Floor 1
Enter More Employees
    Sleep    4s
    Input Text    id=txtFormEmployees    10001 - Zam Wesell
    Sleep    3s
    Click Element     id=md-autocomplete-3
    Sleep    5s
    Input Text    id=txtFormEmployees    10001 - Aurra Sing
    Sleep    3s
    Click Element     id=md-autocomplete-3
    Sleep    5s
    Input Text    id=txtFormEmployees    10001 - Athgar Heece
    Sleep    4s
    Click Element     id=md-autocomplete-3
    Sleep    5s
    Input Text    id=txtFormST    1
    Sleep    4s
Enter Cost Code
    Input Text     id=txtFormCostCode    26-05 - Lighting Fixtures
    Sleep    4s
    Click element     id=md-autocomplete-2
    Sleep    5s
Enter a Vaild Date
     click element    id=txtFormDates
     Sleep    5s
     Click Element    xpath=//*[@id="page-container"]/div/div/div/ng-component/div/div/esub-enter-time-form/div[2]/form/div[7]/div/div/esub-daypicker-flyout/div/dp-day-calendar/div/div/div[3]/button[2]
     Sleep    7s
     Click Element    id=txtFormNotes
     Sleep    3s
     #Input Text    id=txtFormNotes    Test Notes for entering a valid Date - Sample Test
     Sleep    5s
Enter Multiple hours worked
     Input Text    id=txtFormST    8
     Sleep    3s
     Input Text    id=txtFormOT    3
     Sleep    4s
     Input Text    id=txtFormDT    0.75
     Sleep    4s
Enter Notes
     Input Text    id=txtFormNotes    Notes after entry and Before Submitting
     Sleep    3s
Submit All
     Click Button    id=btnFormCreate
     Sleep    3s
     Close Browser



#Display Week and Totals
#Expand Day
#View Time Record
#Edit Record (hours Worked and Time in / Out)
#Edit Breaks
#Validate / Save
#Apply Commenting Component

*** Test Cases ***
Enter Indirect Costs    Enter Indirect Costs
    Successful Login

#Enter Hours    Enter Hours
    Enter More Employees
    Enter Cost Code
    Enter a Vaild Date
    Enter Multiple hours worked
    Enter Notes
    Submit All





