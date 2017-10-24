*** Settings ***
Documentation    Filter within the Timesheets
Library    Selenium2Library

# ***Environment - Dev ***

*** Test Cases ***
View by Calendar Day    View by Calendar Day
*** Keywords ***
View by Calendar Day
    [Tags]    Regression
    Open Browser    http://web.develop.shasta.esubonline.com/#/login    Firefox
    Set Window Size    ${1600}    ${1000}
    Wait Until Page Contains    eSUB
    Sleep    3s
    Input Text    id=txtUsername    Mikeg@esub.com
    Sleep    3s
    Input Text    id=txtPassword     Test1234
    Sleep    3s
    Click Button    id=btnLogin
    Sleep    3s
    Wait Until Page Contains    Employee    timeout=30
    Sleep    6s
    #user lands on timesheets page
    click element    id=esub-week-selector.open-calendar
    Sleep    3s
    Mouse Over     Xpath=/html/body/div/div[2]/md-datepicker-content/mat-calendar/div[1]/div/button[1]
    Sleep    3s
    click element    Xpath=/html/body/div/div[2]/md-datepicker-content/mat-calendar/div[1]/div/button[1]
    Sleep    3s
    click element    Xpath=/html/body/div/div[2]/md-datepicker-content/mat-calendar/div[2]/mat-year-view/table/tbody/tr[2]/td[4]/div
    Sleep    3s
    click element    Xpath=/html/body/div/div[2]/md-datepicker-content/mat-calendar/div[2]/md-month-view/table/tbody/tr[4]/td[7]/div
    Sleep    3s
    Mouse Over     id=esub-week-selector.open-calendar
    Sleep    4s
    click element    id=esub-week-selector.open-calendar
    Sleep    3s
    mouse over    Xpath=/html/body/div/div[2]/md-datepicker-content/mat-calendar/div[1]/div/button[1]
    Sleep    3s
    click element    Xpath=/html/body/div/div[2]/md-datepicker-content/mat-calendar/div[1]/div/button[1]
    Sleep    3s
    click element    Xpath=/html/body/div/div[2]/md-datepicker-content/mat-calendar/div[2]/mat-year-view/table/tbody/tr[4]/td[2]/div
    sleep    3s
    click element    Xpath=/html/body/div/div[2]/md-datepicker-content/mat-calendar/div[2]/md-month-view/table/tbody/tr[5]/td[3]/div
    Sleep    3s
    click element    id=esub-week-selector.previous-week
    Sleep    3s
    click element    id=esub-week-selector.previous-week
    sleep    1s
    click element    id=esub-week-selector.previous-week
    sleep    1s
    click element    id=esub-week-selector.previous-week
    Sleep    1s
    click element    id=esub-week-selector.previous-week
    Sleep    1s
    click element    id=esub-week-selector.previous-week
    sleep    1s
    click element    id=esub-week-selector.previous-week
    sleep    1s
    click element    id=esub-week-selector.next-week
    sleep    1s
    click element    id=esub-week-selector.next-week
    sleep    1s
    click element    id=esub-week-selector.next-week
    sleep    1s
    click element    id=esub-week-selector.next-week
    sleep    1s
    click element    id=esub-week-selector.next-week
    Sleep    2s
    capture page screenshot    Filename=calendarView.png
    Sleep    2s
    close browser


Show Time

Show Totals

Show Badges

Support Grouping

Limit To Self Based on Permissions

Week Navigation

Filtering

Saving of Filtered View ("My Crew")

Copy Last Day

Copy Last Week

Enter Time Button


*** Test Cases ***


