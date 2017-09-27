*** Settings ***
Documentation    administration / Login
Library    Selenium2Library



#Staging link  https://staging.esubonline.com/TRACKpoint/

*** Keywords ***

Incorrect Login
    Open Browser    https://staging.esubonline.com/TRACKpoint/   Chrome
    Set Window Size    ${1600}    ${900}
    Sleep     3s
    Input Text    id=loginName    TrialDiaz
    Sleep    1s
    Click Button    id=Image1
    Capture Page Screenshot    Filename=SubscriberValid.png
    wait until page contains    eSUB
    Sleep    2s
    Input Text    name=username    support@esubinc.com
    Sleep    2s
    Input Text    id=Password1    Tr@pointe$u
    Sleep    1s
    Click Button    id=Image1
    wait until page contains    eSUB
    Sleep    3s
    close browser

Login and Logout

    Open Browser    https://staging.esubonline.com/TRACKpoint/   Chrome
    Set Window Size    ${1600}    ${900}
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
    wait until page contains    eSUB
    Sleep    2s
    Click element    id=eSUBTopLogo
    wait until page contains    eSUB
    Sleep    2s
    mouse over      Xpath=//*[@id="rightMenu"]/a
    Sleep    2s
    click element    Xpath=//*[@id="userMenu"]/a[5]
    Sleep    3s
    close browser

Reminders
    Open Browser    https://staging.esubonline.com/TRACKpoint/   Chrome
    Set Window Size    ${1600}    ${900}
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
    wait until page contains    eSUB
    Sleep    2s
    Click element    id=eSUBTopLogo
    wait until page contains    eSUB
    Sleep    2s
    mouse over      Xpath=//*[@id="rightMenu"]/a
    Sleep    2s
    click element    Xpath=//*[@id="userMenu"]/a[1]
    wait until page contains    eSUB
    input text    Xpath=//*[@id="Table2"]/tbody/tr[3]/td[2]/input    tonyd@esub.com
    Sleep    2s
    input text    id=SubjectLine    Contracting Work Saturday September 30, 2017
    Sleep    10s
    input text    id=MessageBody    Hello, I will be available this saturday for work.
    Sleep    2s
    Click element    id=fd-but-ReminderDate
    Sleep    2s
    click element    id=ReminderDate-next-month-but
    Sleep    3s
    mouse over      Xpath=//*[@id="fd-ReminderDate"]/table/tbody/tr[3]/td[6]
    Sleep    3s
    click element     id=ReminderDate-today-but
    Sleep    4s
    click element     Xpath=//*[@id="fd-ReminderDate"]/table/tbody/tr[5]/td[4]
    sleep    3s
    input text    id=ReminderDate    09/28/2017
    Sleep    3s
    click element    id=Submit


Enhancements
    Open Browser    https://staging.esubonline.com/TRACKpoint/   Chrome
    Set Window Size    ${1600}    ${900}
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
    wait until page contains    eSUB
    Sleep    2s
    Click element    id=eSUBTopLogo
    wait until page contains    eSUB
    Sleep    2s
    mouse over      Xpath=//*[@id="rightMenu"]/a
    Sleep    2s
    click element    Xpath=//*[@id="userMenu"]/a[2]
    wait until page contains    eSUB
    Sleep    2s
    input text    id=SuggestedEnhancement    Please add more blocks


*** Test Cases ***
enhancements    enhancements


