*** Settings ***
Documentation  ProjectCreation - user should be able to add and edit new project - This is under Single Tenant
Library    Selenium2Library


*** Keywords ***
Save employee with valid Credentials
    Open Browser    https://www.esubonline.com/TRACKpoint/   Firefox
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
    Click Element    css=html.vendor-mozilla body font div.mainContainer table#Table2 tbody tr td.bgcolor2 a
    wait until page contains    eSUB
    Click Element    Xpath=//*[@id="Table2"]/tbody/tr/td[4]/a/font/b/span
    Sleep    2s
    wait until page contains    eSUB
    Sleep    2s
    Input Text    Xpath=//*[@id="Table2"]/tbody/tr[3]/td[2]/input    0004
    Sleep    2s
    Input Text    Xpath=//*[@id="Table2"]/tbody/tr[4]/td[2]/input    John
    Sleep    2s
    input text    Xpath=//*[@id="Table2"]/tbody/tr[5]/td[2]/input    Smith
    Sleep    2s
    Click Button    id=Submit
    Sleep    4s
    CAPTURE PAGE SCREENSHOT    Filenam=SaveSuccess.png
    close browser

Save employee without Credentials
    Open Browser    https://www.esubonline.com/TRACKpoint/   Firefox
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
    Click Element    css=html.vendor-mozilla body font div.mainContainer table#Table2 tbody tr td.bgcolor2 a
    wait until page contains    eSUB
    Click Element    Xpath=//*[@id="Table2"]/tbody/tr/td[4]/a/font/b/span
    Sleep    2s
    wait until page contains    eSUB
    Sleep    2s
    Click Button    id=Submit
    Sleep    4s
    CAPTURE PAGE SCREENSHOT    Filenam=SaveSuccessnoEmployee.png
    close browser

Add Employee Without Saving
    Open Browser    https://www.esubonline.com/TRACKpoint/   Firefox
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
    Click Element    css=html.vendor-mozilla body font div.mainContainer table#Table2 tbody tr td.bgcolor2 a
    wait until page contains    eSUB
    Click Element    Xpath=//*[@id="Table2"]/tbody/tr/td[4]/a/font/b/span
    Sleep    2s
    wait until page contains    eSUB
    Sleep    2s
    Input Text    Xpath=//*[@id="Table2"]/tbody/tr[3]/td[2]/input    TEST NAME USER
    Sleep    2s
    Input Text    Xpath=//*[@id="Table2"]/tbody/tr[4]/td[2]/input    Test
    Sleep    2s
    input text    Xpath=//*[@id="Table2"]/tbody/tr[5]/td[2]/input    Name
    Sleep    2s
    input text    Xpath=//*[@id="Text2"]    12345787878975928208204204920942424820820482092392039203920392082048204920392 Main Street
    Sleep    2s
    Input Text    Xpath=//*[@id="Text3"]    Suite 5000
    Sleep    2s
    input text    Xpath=//*[@id="Text4"]    Kill Devil Hills
    Sleep    2s
    input text    Xpath=//*[@id="Text5"]    NC
    Sleep    2s
    input text    Xpath=//*[@id="Text6"]    21435
    Sleep    2s
    Go Back
    Sleep    7s
    Go to    https://www.esubonline.com/TRACKpoint/versions/v61/admin/userlog.asp?Session=91201710424AM5441&UI=&Site=
    wait until page contains    eSUB
    Click Element    css=html.vendor-mozilla body font div.mainContainer table#Table2 tbody tr td.bgcolor2 a
    wait until page contains    eSUB
    Click Element    Xpath=//*[@id="Table2"]/tbody/tr/td[4]/a/font/b/span
    Sleep    10s
    capture page screenshot    Filename=EmployeeInfonotSaved.png
    Sleep    3s
    close browser


Chrome Add Employee to all projects
    Open Browser    https://www.esubonline.com/TRACKpoint/    Chrome
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
    Click Element    Xpath=//*[@id="rightMenu"]/div/a[1]/i
    wait until page contains    eSUB
    Click Element    Xpath=//*[@id="Table2"]/tbody/tr/td[4]/a/font/b/span
    Sleep    2s
    wait until page contains    eSUB
    Sleep    2s
    Input Text    Xpath=//*[@id="Table2"]/tbody/tr[3]/td[2]/input    0004
    Sleep    2s
    Input Text    Xpath=//*[@id="Table2"]/tbody/tr[4]/td[2]/input    John
    Sleep    2s
    input text    Xpath=//*[@id="Table2"]/tbody/tr[5]/td[2]/input    Smith
    Sleep    2s
    #click button    Xpath=//*[@id="toggleAddEmployeeToProject"]
    Sleep    10s
    close browser

Add Employee to all projects(Firefox)
    Open Browser    https://www.esubonline.com/TRACKpoint/    Firefox
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
    Click Element    Xpath=//*[@id="rightMenu"]/div/a[1]/i
    wait until page contains    eSUB
    Click Element    Xpath=//*[@id="Table2"]/tbody/tr/td[4]/a/font/b/span
    Sleep    2s
    wait until page contains    eSUB
    Sleep    2s
    Input Text    Xpath=//*[@id="Table2"]/tbody/tr[3]/td[2]/input    0004
    Sleep    2s
    Input Text    Xpath=//*[@id="Table2"]/tbody/tr[4]/td[2]/input    John
    Sleep    2s
    input text    Xpath=//*[@id="Table2"]/tbody/tr[5]/td[2]/input    Smith
    Sleep    2s
    input text    Xpath=//*[@id="Text2"]    12345 Juniper Street
    Sleep    2s
    #click button    Xpath=//*[@id="toggleAddEmployeeToProject"]
    Sleep    10s
    close browser

Clear user information then save
    Open Browser    https://www.esubonline.com/TRACKpoint/    Firefox
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
    Click Element    Xpath=//*[@id="rightMenu"]/div/a[1]/i
    wait until page contains    eSUB
    Click Element    Xpath=//*[@id="Table2"]/tbody/tr/td[4]/a/font/b/span
    Sleep    2s
    wait until page contains    eSUB
    Sleep    2s
    Input Text    Xpath=//*[@id="Table2"]/tbody/tr[3]/td[2]/input    0004
    Sleep    2s
    Input Text    Xpath=//*[@id="Table2"]/tbody/tr[4]/td[2]/input    John
    Sleep    2s
    input text    Xpath=//*[@id="Table2"]/tbody/tr[5]/td[2]/input    Smith
    Sleep    2s
    input text    Xpath=//*[@id="Text2"]    12345 Juniper Street
    Sleep    2s
    Clear Element Text    Xpath=//*[@id="Table2"]/tbody/tr[5]/td[2]/input
    Sleep    1s
    #click button    Xpath=//*[@id="toggleAddEmployeeToProject"]
    clear element text    Xpath=//*[@id="Table2"]/tbody/tr[4]/td[2]/input
    Sleep    1s
    clear element text    Xpath=//*[@id="Table2"]/tbody/tr[3]/td[2]/input
    Sleep    3s
    click button    id=Submit
    Sleep    4s
    capture page screenshot    Filename=ClearAlluserDatabeforeSave.png
    close browser


Logout before saving additional Employee(Firefox)
    Open Browser    https://www.esubonline.com/TRACKpoint/   Firefox
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
    Click Element    css=html.vendor-mozilla body font div.mainContainer table#Table2 tbody tr td.bgcolor2 a
    wait until page contains    eSUB
    Click Element    Xpath=//*[@id="Table2"]/tbody/tr/td[4]/a/font/b/span
    Sleep    2s
    wait until page contains    eSUB
    Sleep    2s
    Input Text    Xpath=//*[@id="Table2"]/tbody/tr[3]/td[2]/input    0004
    Sleep    2s
    Input Text    Xpath=//*[@id="Table2"]/tbody/tr[4]/td[2]/input    John
    Sleep    2s
    input text    Xpath=//*[@id="Table2"]/tbody/tr[5]/td[2]/input    Smith
    Sleep    2s
    input text    Xpath=//*[@id="Text2"]    12345 Juniper Street
    Sleep    2s
    Mouse Over    Xpath=//*[@id="rightMenu"]/div/a[1]
    Sleep    2s
    click element    Xpath=//*[@id="rightMenu"]/div/a[1]
    Sleep    4s
    capture page screenshot    Filename=LogoutBeforeSaving.png
    close browser

Logout before saving additional Employee(Chrome)
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
    Mouse Over    Xpath=//*[@id="rightMenu"]/div/a[1]/i
    Sleep    2s
    click element    Xpath=//*[@id="rightMenu"]/div/a[1]
    Sleep    3s
    wait until page contains    eSUB
    Click Element    Xpath=//*[@id="Table2"]/tbody/tr/td[4]/a/font/b/span
    wait until page contains    eSUB
    Sleep    2s
    wait until page contains    eSUB
    Sleep    2s
    Input Text    Xpath=//*[@id="Table2"]/tbody/tr[3]/td[2]/input    0004
    Sleep    2s
    Input Text    Xpath=//*[@id="Table2"]/tbody/tr[4]/td[2]/input    John
    Sleep    2s
    input text    Xpath=//*[@id="Table2"]/tbody/tr[5]/td[2]/input    Smith
    Sleep    2s
    input text    Xpath=//*[@id="Text2"]    12345 Juniper Street
    Sleep    2s
    Mouse Over    Xpath=//*[@id="rightMenu"]/div/a[1]
    Sleep    2s
    click element    Xpath=//*[@id="rightMenu"]/div/a[1]
    Sleep    4s
    capture page screenshot    Filename=LogoutBeforeSaving.png
    close browser

Edit Employee

    Open Browser    https://www.esubonline.com/TRACKpoint/   Firefox
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
    Click Element    css=html.vendor-mozilla body font div.mainContainer table#Table2 tbody tr td.bgcolor2 a
    wait until page contains    eSUB
    Click Element    Xpath=//*[@id="Table2"]/tbody/tr/td[4]/a/font/b/span
    Sleep    2s
    wait until page contains    eSUB
    Sleep    2s
    Input Text    Xpath=//*[@id="Table2"]/tbody/tr[3]/td[2]/input    0004
    Sleep    2s
    Input Text    Xpath=//*[@id="Table2"]/tbody/tr[4]/td[2]/input    John
    Sleep    2s
    input text    Xpath=//*[@id="Table2"]/tbody/tr[5]/td[2]/input    Smith
    Sleep    2s
    clear element text    Xpath=//*[@id="Table2"]/tbody/tr[3]/td[2]/input
    Sleep    2s
    clear element text    Xpath=//*[@id="Table2"]/tbody/tr[4]/td[2]/input
    Sleep    2s
    clear element text    Xpath=//*[@id="Table2"]/tbody/tr[5]/td[2]/input
    Sleep    2s
    Input Text    Xpath=//*[@id="Table2"]/tbody/tr[3]/td[2]/input    90210
    Sleep    2s
    Input Text    Xpath=//*[@id="Table2"]/tbody/tr[4]/td[2]/input    Mr
    Sleep    2s
    input text    Xpath=//*[@id="Table2"]/tbody/tr[5]/td[2]/input    Villa VAnilla Thrilla
    Click Button    id=Submit
    Sleep    4s
    close browserw


#Add Employee to Time

#Invite Employees to Shasta(TBD)
#Batch Update
#Add Employee
#NewSection
#Add Employee to TIM
#Add New User
#User Level
#Password
#Password Confirmation

*** Test Cases ***
Edit Employee     Edit Employee


