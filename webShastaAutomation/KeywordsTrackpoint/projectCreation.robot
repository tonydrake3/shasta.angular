*** Settings ***
Documentation    ProjectCreation - user should be able to add and edit new project - This is under Single Tenant
Library     Selenium2Library


*** Variables ***

*** Keywords ***
Create New Project
    Open Browser    https://www.esubonline.com/TRACKpoint/   Chrome
    Sleep     3s
    Input Text    id=loginName    TrialDiaz
    Sleep    1s
    Click Button    id=Image1
    Sleep    3s
    Capture Page Screenshot    Filename=SubscriberValid.png
    wait until page contains    eSUB
    Sleep    2s
    Input Text    name=username    support@esubinc.com
    Sleep    2s
    Input Text    id=Password1    Tr@pointe$ub
    Sleep    1s
    Click Button    id=Image1
    wait until page contains    eSUB
    Sleep    3s
    Mouse Over    Xpath=/html/body/font/div[1]/a[2]
    Sleep    2s
    click element    Xpath=//*[@id="optionNav"]/a[1]
    wait until page contains    eSUB
    Sleep    2s
    input text     Xpath=//*[@id="ProjectNumber"]    000412343
    Sleep    2s
    mouse over    xpath=//*[@id="status"]
    click element    Xpath=//*[@id="status"]/option[2]
    Sleep    2s
    mouse over    xpath=//*[@id="status"]
    click element    Xpath=//*[@id="status"]/option[3]
    sleep    2s
    mouse over     xpath=//*[@id="status"]
    Click Element    Xpath=//*[@id="status"]/option[5]
    Sleep    2s
    input text    id=ProjectName    The Cleaners of El Cajon Blvd.
    Sleep    4s
    click element    Xpath=//*[@id="Table1"]/tbody/tr[11]/td[2]/select
    Sleep    2s
    Click Element    id=Checkbox1
    Sleep    2s
    Input Text    id=fldComments    These are comments entered into the text box under Create a Project
    Sleep    5s
    capture page screenshot     Filename=createProjectSuccess.png
    Sleep    5s
    close all browsers



Add and Save a Contact.short
    Open Browser    https://www.esubonline.com/TRACKpoint/   Chrome
    Sleep     3s
    Input Text    id=loginName    TrialDiaz
    Sleep    1s
    Click Button    id=Image1
    Sleep    3s
    Capture Page Screenshot    Filename=SubscriberValid.png
    wait until page contains    eSUB
    Sleep    2s
    Input Text    name=username    support@esubinc.com
    Sleep    2s
    Input Text    id=Password1    Tr@pointe$ub
    Sleep    1s
    Click Button    id=Image1
    wait until page contains    eSUB
    Sleep    3s
    Mouse Over    Xpath=/html/body/font/div[1]/a[3]
    Sleep    2s
    click element    Xpath=//*[@id="optionContact"]/a[1]
    wait until page contains    eSUB
    Sleep    3s
    Input Text    id=Company    Drake's Electrical
    Sleep    3s
    mouse over    id=selConType
    Sleep    2s
    mouse over    xpath=//*[@id="selConType"]/option[2]
    Click Element     xpath=//*[@id="selConType"]/option[2]
    Sleep    2s
    mouse over    xpath=//*[@id="selConType"]/option[2]
    Click Element     xpath=//*[@id="selConType"]/option[1]
    Sleep    4s
    input text    id=Text4    San Diego
    Sleep    3s
    Click button    id=Submit

Add and Save a Contact.long
    Open Browser    https://www.esubonline.com/TRACKpoint/   Chrome
    Sleep     3s
    Input Text    id=loginName    TrialDiaz
    Sleep    1s
    Click Button    id=Image1
    Sleep    3s
    Capture Page Screenshot    Filename=SubscriberValid.png
    wait until page contains    eSUB
    Sleep    2s
    Input Text    name=username    support@esubinc.com
    Sleep    2s
    Input Text    id=Password1    Tr@pointe$ub
    Sleep    1s
    Click Button    id=Image1
    wait until page contains    eSUB
    Sleep    3s
    Mouse Over    Xpath=/html/body/font/div[1]/a[3]
    Sleep    2s
    click element    Xpath=//*[@id="optionContact"]/a[1]
    wait until page contains    eSUB
    Sleep    3s
    Input Text    id=Company    Drake's Electrical
    Sleep    3s
    mouse over    id=selConType
    Sleep    2s
    mouse over    xpath=//*[@id="selConType"]/option[2]
    Click Element     xpath=//*[@id="selConType"]/option[2]
    Sleep    2s
    mouse over    xpath=//*[@id="selConType"]/option[2]
    Click Element     xpath=//*[@id="selConType"]/option[1]
    Sleep    4s
    go back
    wait until page contains     eSUB
    Sleep    8s
    go to    https://www.esubonline.com/TRACKpoint/versions/v61/contacts/addcontact.asp??Session=98201780550PM1521&UI=&Site=20
    wait until page contains     eSUB
    Sleep    2s
    input text    id=Text4    San Diego
    Sleep    3s
    Click button    id=Submit


Add and Save Project without required fields entered
    Open Browser    https://www.esubonline.com/TRACKpoint/   Chrome
    Sleep     3s
    Input Text    id=loginName    TrialDiaz
    Sleep    1s
    Click Button    id=Image1
    Sleep    3s
    Capture Page Screenshot    Filename=SubscriberValid.png
    wait until page contains    eSUB
    Sleep    2s
    Input Text    name=username    support@esubinc.com
    Sleep    2s
    Input Text    id=Password1    Tr@pointe$ub
    Sleep    1s
    Click Button    id=Image1
    wait until page contains    eSUB
    Sleep    3s
    Mouse Over    Xpath=/html/body/font/div[1]/a[2]
    Sleep    2s
    click element    Xpath=//*[@id="optionNav"]/a[1]
    wait until page contains    eSUB
    Sleep    2s
    #input text     Xpath=//*[@id="ProjectNumber"]    000412343
    Sleep    2s
    mouse over    xpath=//*[@id="status"]
    click element    Xpath=//*[@id="status"]/option[2]
    Sleep    2s
    mouse over    xpath=//*[@id="status"]
    click element    Xpath=//*[@id="status"]/option[3]
    sleep    2s
    mouse over     xpath=//*[@id="status"]
    Click Element    Xpath=//*[@id="status"]/option[5]
    Sleep    2s
    input text    id=ProjectName    The Cleaners of El Cajon Blvd.
    Sleep    4s
    click element    Xpath=//*[@id="Table1"]/tbody/tr[11]/td[2]/select
    Sleep    2s
    Click Element    id=Checkbox1
    Sleep    2s
    Input Text    id=fldComments    These are comments entered into the text box under Create a Project
    Sleep    5s
    capture page screenshot     Filename=createProjectSuccess.png
    Sleep    5s
    click button    id=Submit


Search Project by no.
    Open Browser    https://www.esubonline.com/TRACKpoint/   Chrome
    Sleep     3s
    Input Text    id=loginName    TrialDiaz
    Sleep    1s
    Click Button    id=Image1
    Capture Page Screenshot    Filename=SubscriberValid.png
    wait until page contains    eSUB
    Sleep    2s
    Input Text    name=username    support@esubinc.com
    Sleep    2s
    Input Text    id=Password1    Tr@pointe$ub
    Sleep    1s
    Click Button    id=Image1
    wait until page contains    eSUB
    Sleep    3s
    input text    id=Text2    12345
    Sleep    2s
    click button    id=Submit1
    capture page screenshot    Filename=SelectProjbyNo.png
    Sleep    4s
    close browser

Search Project by Project Name.
    Open Browser    https://www.esubonline.com/TRACKpoint/   Chrome
    Sleep     3s
    Input Text    id=loginName    TrialDiaz
    Sleep    1s
    Click Button    id=Image1
    Capture Page Screenshot    Filename=SubscriberValid.png
    wait until page contains    eSUB
    Sleep    2s
    Input Text    name=username    support@esubinc.com
    Sleep    2s
    Input Text    id=Password1    Tr@pointe$ub
    Sleep    1s
    Click Button    id=Image1
    wait until page contains    eSUB
    Sleep    3s
    input text    id=Text1    DB4L
    Sleep    2s
    click button    id=Submit1
    capture page screenshot    Filename=SelectProjbyName.png
    Sleep    4s
    close browser

Search Project by People
    Open Browser    https://www.esubonline.com/TRACKpoint/   Chrome
    Sleep     3s
    Input Text    id=loginName    TrialDiaz
    Sleep    1s
    Click Button    id=Image1
    Capture Page Screenshot    Filename=SubscriberValid.png
    wait until page contains    eSUB
    Sleep    2s
    Input Text    name=username    support@esubinc.com
    Sleep    2s
    Input Text    id=Password1    Tr@pointe$ub
    Sleep    1s
    Click Button    id=Image1
    wait until page contains    eSUB
    Sleep    3s
    input text    id=filterPeople    Dra
    Sleep    2s
    click button    id=Submit1
    capture page screenshot    Filename=SelectProjbypeople.png
    Sleep    4s
    close browser

Select Settings
    Open Browser    https://www.esubonline.com/TRACKpoint/   Chrome
    Sleep     3s
    Input Text    id=loginName    TrialDiaz
    Sleep    1s
    Click Button    id=Image1
    Capture Page Screenshot    Filename=SubscriberValid.png
    wait until page contains    eSUB
    Sleep    2s
    Input Text    name=username    support@esubinc.com
    Sleep    2s
    Input Text    id=Password1    Tr@pointe$ub
    Sleep    1s
    Click Button    id=Image1
    wait until page contains    eSUB
    Sleep    3s
    Mouse Over    Xpath=//*[@id="rightMenu"]/div/a[1]
    Sleep    2s
    click element    Xpath=//*[@id="rightMenu"]/div/a[1]
    Sleep    3s
    close browser


Add Employee
    Open Browser    https://www.esubonline.com/TRACKpoint/   Chrome
    Sleep     3s
    Input Text    id=loginName    TrialDiaz
    Sleep    1s
    Click Button    id=Image1
    Capture Page Screenshot    Filename=SubscriberValid.png
    wait until page contains    eSUB
    Sleep    2s
    Input Text    name=username    support@esubinc.com
    Sleep    2s
    Input Text    id=Password1    Tr@pointe$ub
    Sleep    1s
    Click Button    id=Image1
    wait until page contains    eSUB
    Sleep    3s
    Mouse Over    Xpath=//*[@id="rightMenu"]/div/a[1]
    Sleep    2s
    click element    Xpath=//*[@id="rightMenu"]/div/a[1]
    Sleep    3s
    wait until page contains    eSUB
    Click Element    Xpath=//*[@id="Table2"]/tbody/tr/td[4]/a/font/b/span
    Sleep    2s
    capture page screenshot    Filename=Adduser.png
    Sleep    5s
    close browser

Add and save employee with invalid credentials
    Open Browser    https://www.esubonline.com/TRACKpoint/   Chrome
    Sleep     3s
    Input Text    id=loginName    TrialDiaz
    Sleep    1s
    Click Button    id=Image1
    Capture Page Screenshot    Filename=SubscriberValid.png
    wait until page contains    eSUB
    Sleep    2s
    Input Text    name=username    support@esubinc.com
    Sleep    2s
    Input Text    id=Password1    Tr@pointe$ub
    Sleep    1s
    Click Button    id=Image1
    wait until page contains    eSUB
    Sleep    3s
    Mouse Over    Xpath=//*[@id="rightMenu"]/div/a[1]
    Sleep    2s
    click element    Xpath=//*[@id="rightMenu"]/div/a[1]
    Sleep    3s
    wait until page contains    eSUB
    Click Element    Xpath=//*[@id="Table2"]/tbody/tr/td[4]/a/font/b/span
    wait until page contains    eSUB
    Sleep    2s
    input text    name=Number    366509031334534529211
    Sleep    2s
    input text    name=FName    RIC
    Sleep    2s
    Input Text    name=LName    FLAIR
    Sleep    2s
    Click Button     id=Submit
    Sleep    2s
    capture page screenshot     Filename=numbercredentials.png
    Sleep    5s
    close browser

Configure Project and Navigate to Shasta Time
    Open Browser    https://www.esubonline.com/TRACKpoint/   Chrome
    #Set Window Size    ${1600}    ${900}
    Sleep     3s
    Input Text    id=loginName    TrialDiaz
    Sleep    1s
    Click Button    id=Image1
    Sleep    3s
    Capture Page Screenshot    Filename=SubscriberValid.png
    wait until page contains    eSUB
    Sleep    2s
    Input Text    name=username    support@esubinc.com
    Sleep    2s
    Input Text    id=Password1    Tr@pointe$ub
    Sleep    1s
    Click Button    id=Image1
    wait until page contains    eSUB
    Sleep    3s
    Mouse Over    Xpath=/html/body/font/div[1]/a[2]
    Sleep    2s
    click element    Xpath=//*[@id="optionNav"]/a[1]
    wait until page contains    eSUB
    Sleep    2s
    input text     Xpath=//*[@id="ProjectNumber"]    1234567123
    Sleep    2s
    mouse over    xpath=//*[@id="status"]
    click element    Xpath=//*[@id="status"]/option[2]
    Sleep    2s
    mouse over    xpath=//*[@id="status"]
    click element    Xpath=//*[@id="status"]/option[3]
    sleep    2s
    mouse over     xpath=//*[@id="status"]
    Click Element    Xpath=//*[@id="status"]/option[5]
    Sleep    2s
    input text    id=ProjectName    TrapHouse Pest Control
    Sleep    4s
    click element    Xpath=//*[@id="Table1"]/tbody/tr[11]/td[2]/select
    Sleep    2s
    Click Element    id=Checkbox1
    Sleep    2s
    Input Text    id=fldComments    new project,for testing purposes
    Sleep    5s
    capture page screenshot     Filename=createProjectSuccess.png
    Sleep    5s
    Click element    id=Submit
    Wait unitl Page contains    eSUB
    Sleep    3s
    Click Element     Xpath=//*[@id="Table2"]/tbody/tr[3]/td/div/nobr/a[2]/img  #display all
    Sleep    3s
    click element    Xpath=//*[@id="Table1"]/tbody/tr[1]/td[3]/a
    Sleep    3s
    click element    Xpath=//*[@id="Table1"]/tbody/tr[6]/td[3]/input
    Sleep    3s
    capture page screenshot    Filename=hideallbutone.png




*** Test Cases ***
Configure Project and Navigate to Shasta Time    Configure Project and Navigate to Shasta Time



