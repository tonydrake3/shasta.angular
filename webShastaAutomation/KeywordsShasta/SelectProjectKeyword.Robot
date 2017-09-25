*** Settings ***
Documentation    Select Project and Timesheet, Taken from Zeplin Wireframes
Library    Selenium2Library


*** Keywords ***

Valid Login
    [Tags]    Smoke
    Open Browser    http://web.develop.shasta.esubonline.com/   Chrome
    Set Window Size    ${800}    ${600}
    Wait Until Page Contains    eSUB
    Input Text    id=txtUsername    manager@esub.com
    Sleep    3s
    Input Text    id=txtPassword     Test1234
    Click Button    id=btnLogin
    Sleep    3s
    Wait Until Page Contains    eSUB
	Capture Page Screenshot    filename=ValidLogin.png
	Close Browser

Select Project
    Open Browser    http://web.develop.shasta.esubonline.com/   Chrome
    Set Window Size    ${800}    ${600}
    Wait Until Page Contains    eSUB
    Input Text    id=txtUsername    manager@esub.com
    Sleep    2s
    Input Text    id=txtPassword     Test1234
    Click Button    id=btnLogin
    Sleep    3s
    Wait Until Page Contains    eSUB
    Sleep    3s
    Click Element    #Click The Pproject By Name **I dont think this is implemented yet*  id=md-input-5
    Input Text    Random Auto Dealership
    Sleep    3s
    Capture Page Screenshot    filename=SearchProjects.png


Create Project
    Open Browser    http://web.develop.shasta.esubonline.com/   Chrome
    Set Window Size    ${800}    ${600}
    Wait Until Page Contains    eSUB
    Input Text    id=txtUsername    manager@esub.com
    Sleep    2s
    Input Text    id=txtPassword     Test1234
    Click Button    id=btnLogin
    Sleep    3s
    Wait Until Page Contains    Project Manager
    Click Button    css=esub-button secondary mat-raised-button
    Sleep    3s
    Close Browser


#< Nav -1 Page - Zeplin>
Group By Employee

Group By Project

Show All

Show Mine

#< Nav -2 Page - Zeplin>

Click Button on Weekly Calendar to view dates under Timesheet

Click New TimeSheet

Copy Last Week's Time

Copy Last Day's Time

Click on the Dropdown arrow next to Employee Name

Settings

Username

Notifications Badge

#< Nav -3 Page - Zeplin>

Any Day Of The Week

Timesheet Category

Timesheet Sub-Category

Enter Time

Export Time

Approve Time

Blank Space

