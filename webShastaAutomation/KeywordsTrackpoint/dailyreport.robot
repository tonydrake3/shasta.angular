*** Settings ***
Documentation    To focus tests on Daily Reports
Library    Selenium2Library



*** Keywords ***
Navigate to Daily Report
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
    input text    id=Text2   12345
    Sleep    2s
    Click element    id=Table11
    Sleep    3s
    click button    id=Submit1
    Sleep    4s
    wait until page contains    eSUB
    Sleep    2s
    click element    xpath=//*[@id="Table9"]/tbody/tr[4]/td[3]/a
    wait until page contains    eSUB
    sleep    3s
    #Click Element    xpath=//*[@id="Table7"]/tbody/tr[1]/td/a/font/b
    Sleep    2s
    mouse over    Xpath=/html/body/font/div[1]/a[4]
    Sleep    2s
    click element    Xpath=//*[@id="optionProd3"]/a[2]
    capture page screenshot    Filename=CreateDailyReport.png
    Sleep    4s
    WAIT UNTIL PAGE CONTAINS    eSUB
    input text    Xpath=//*[@id="Table1"]/tbody/tr[7]/td/table/tbody/tr/td[1]/table/tbody/tr[1]/td[2]/input    1234565728
    Sleep    3s
    close browser



Save daily report with empty required fields
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
    Input Text    id=Password1     Tr@pointe$ub
    Sleep    1s
    Click Button    id=Image1
    wait until page contains    eSUB
    Sleep    3s
    input text    id=Text2   12345
    Sleep    2s
    Click element    id=Table11
    Sleep    3s
    click button    id=Submit1
    Sleep    4s
    wait until page contains    eSUB
    Sleep    2s
    click element    xpath=//*[@id="Table9"]/tbody/tr[4]/td[3]/a
    wait until page contains    eSUB
    sleep    3s
    mouse over    Xpath=/html/body/font/div[1]/a[4]
    Sleep    2s
    click element    Xpath=//*[@id="optionProd3"]/a[2]
    capture page screenshot    Filename=CreateDailyReport.png
    Sleep    4s
    WAIT UNTIL PAGE CONTAINS    eSUB
    input text    Xpath=//*[@id="Table1"]/tbody/tr[7]/td/table/tbody/tr/td[1]/table/tbody/tr[1]/td[2]/input    1234565728
    Sleep    3s
    click button    id=Submit2
    Sleep    2s


Create and Save daily report with 2 required fields complete
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
    input text    id=Text2   12345
    Sleep    2s
    Click element    id=Table11
    Sleep    3s
    click button    id=Submit1
    Sleep    4s
    wait until page contains    eSUB
    Sleep    2s
    click element    xpath=//*[@id="Table9"]/tbody/tr[4]/td[3]/a
    wait until page contains    eSUB
    Sleep    2s
    mouse over    Xpath=/html/body/font/div[1]/a[4]
    Sleep    2s
    click element    Xpath=//*[@id="optionProd3"]/a[2]
    capture page screenshot    Filename=CreateDailyReport.png
    Sleep    4s
    WAIT UNTIL PAGE CONTAINS    eSUB
    input text    Xpath=//*[@id="Table1"]/tbody/tr[7]/td/table/tbody/tr/td[1]/table/tbody/tr[1]/td[2]/input    1234565728
    Sleep    3s
    Click element    Xpath=//*[@id="fd-but-drDate"]
    Sleep    3s
    Click element    id=drDate-next-month-but
    Sleep    2s
    Click element    id=drDate-next-month-but
    Sleep    2s
    Click element    id=drDate-next-month-but
    Sleep    2s
    Click Element     xpath=//*[@id="fd-drDate"]/table/tbody/tr[3]/td[4]
    Sleep    3s
    mouse over    id=selWeather
    Click element    id=selWeather
    Sleep    1s
    click element    xpath=//*[@id="selWeather"]/optgroup[2]/option[1]
    Sleep    2s
    Click button    id=Submit2


Create and Save daily report with All Required Fields complete
    Open Browser    https://www.esubonline.com/TRACKpoint/    Chrome
    #Set Window Size    ${1600}    ${900}
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
    input text    id=Text2   12345
    Sleep    2s
    Click element    id=Table11
    Sleep    3s
    click button    id=Submit1
    Sleep    4s
    wait until page contains    eSUB
    Sleep    2s
    click element    xpath=//*[@id="Table9"]/tbody/tr[4]/td[3]/a
    wait until page contains    eSUB
    sleep    3s
    #Click Element    xpath=//*[@id="Table7"]/tbody/tr[1]/td/a/font/b
    Sleep    2s
    mouse over    Xpath=/html/body/font/div[1]/a[4]
    Sleep    2s
    click element    Xpath=//*[@id="optionProd3"]/a[2]
    capture page screenshot    Filename=CreateDailyReport.png
    Sleep    4s
    WAIT UNTIL PAGE CONTAINS    eSUB
    input text    Xpath=//*[@id="Table1"]/tbody/tr[7]/td/table/tbody/tr/td[1]/table/tbody/tr[1]/td[2]/input    1234565728
    Sleep    3s
    Click element    Xpath=//*[@id="fd-but-drDate"]
    Sleep    3s
    Click element    id=drDate-next-month-but
    Sleep    2s
    Click Element     xpath=//*[@id="fd-drDate"]/table/tbody/tr[3]/td[4]
    Sleep    3s
    mouse over    id=selWeather
    Click element    id=selWeather
    Sleep    1s
    click element    xpath=//*[@id="selWeather"]/optgroup[2]/option[1]
    Sleep    2s
    click element    id=Select1
    Sleep    3s
    click element    xpath=//*[@id="Select1"]/option[2]
    Sleep    2s
    Click element    xpath=//*[@id="selWind"]/option[3]
    Sleep    2s
    click element    id=selWind
    Sleep    4s
    click element    xpath=//*[@id="selWind"]/option[3]
    Sleep    2s
    click element    xpath=//*[@id="selWind"]/option[4]
    mouse over     id=Select1
    Sleep    2s
    Click element    id=Select1
    Sleep    2s
    click element    xpath=//*[@id="Select1"]/option[3]
    Sleep   2s
    input text     id=temperature    100
    Sleep    3s
    Execute JavaScript   return document.getElementById('crewItem').scrollIntoView()
    Sleep    10s
    click element    xpath=//*[@id="crewSelector__c01_chosen"]/ul/li/input
    Sleep    3s
    click element    Xpath=//*[@id="crewSelector__c01_chosen"]/div/ul/li[6]
    Sleep    4s
    click element    Xpath=//*[@id="laborActivity__c01_chosen"]/a/span
    Sleep    4s
    Click Element    Xpath=//*[@id="laborActivity__c01_chosen"]/div/ul/li[8]
    #click button    Xpath=//*[@id="laborActivity__c01_chosen"]/div/div/input
    #Sleep    4s
    #click element    Xpath=//*[@id="laborActivity__c01_chosen"]/div/ul/li[2]
    #Sleep    5s
    #click element    id=crewItem
    #sleep    4s
    #click element    xpath=//*[@id="laborActivity__c01_chosen"]/a/span
    #Sleep    2s
    #click element    xpath=//*[@id="laborActivity__c01"]/optgroup/option[4]
    #Sleep    3s
    #click element    xpath=//*[@id="crewSelector__c01_chosen"]/ul
    #Sleep    2s
    #click element    xpath=//*[@id="crewSelector__c01"]/optgroup/option[6]
    #Sleep    5s
    Click button    id=Submit2

Edit Daily Report
    Open Browser    https://www.esubonline.com/TRACKpoint/    Chrome
    #Set Window Size    ${1600}    ${900}
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
    click element    Xpath=//*[@id="Table9"]/tbody/tr[4]/td[1]/a[4]/img
    wait until page contains    eSUB
    Sleep    3s
    click element     id=Select3
    Sleep    2s
    mouse over    Xpath=//*[@id="Select3"]/optgroup[1]/option[3]
    Sleep    4s
    click element    xpath=//*[@id="Select3"]/optgroup[1]/option[3]
    Sleep    3s
    mouse over    Xpath=/html/body/font/div[1]/a[5]
    Sleep    1s
    click element     Xpath=//*[@id="optionProd4"]/a[2]
    Sleep    2s
    Click element     Xpath=//*[@id="Table3"]/tbody/tr[3]/td[1]/nobr/a[1]/img
    wait until page contains     eSUB
    input text     Xpath=//*[@id="Table1"]/tbody/tr[5]/td/table/tbody/tr/td[1]/table/tbody/tr[1]/td[2]/input    54321
    Sleep    3s
    go back
    wait until page contains     eSUB
    click element    Xpath=//*[@id="Table3"]/tbody/tr[3]/td[1]/nobr/a[1]/img
    wait until page contains    eSUB
    click element    Xpath=//*[@id="Table1"]/tbody/tr[7]/td/div/div[1]/div/a

    click element    id=Submit2

Create a new Daily Report after Editing current Daily Report
    Open Browser    https://www.esubonline.com/TRACKpoint/    Chrome
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
    click element    Xpath=//*[@id="Table9"]/tbody/tr[4]/td[1]/a[4]/img
    wait until page contains    eSUB
    Sleep    3s
    click element     id=Select3
    Sleep    2s
    mouse over    Xpath=//*[@id="Select3"]/optgroup[1]/option[3]
    Sleep    4s
    click element    xpath=//*[@id="Select3"]/optgroup[1]/option[3]
    Sleep    3s
    mouse over    Xpath=/html/body/font/div[1]/a[5]
    Sleep    1s
    click element     Xpath=//*[@id="optionProd4"]/a[2]
    Sleep    2s
    Click element     Xpath=//*[@id="Table3"]/tbody/tr[3]/td[1]/nobr/a[1]/img
    wait until page contains     eSUB
    input text     Xpath=//*[@id="Table1"]/tbody/tr[5]/td/table/tbody/tr/td[1]/table/tbody/tr[1]/td[2]/input    54321
    Sleep    3s
    go back
    wait until page contains     eSUB
    Sleep    3s
    Mouse over    id=Select3
    Sleep    3s
    click element   id=Select3
    Sleep    3s
    click element    Xpath=//*[@id="Table3"]/tbody/tr[3]/td[1]/nobr/a[1]/img
    click button    id=Submit2
    wait until page contains    eSUB
    Sleep    3s
    click element    Xpath=//*[@id="Table1"]/tbody/tr/td[1]/a/font/b/span
    WAIT UNTIL PAGE CONTAINS    eSUB
    input text    Xpath=//*[@id="Table1"]/tbody/tr[7]/td/table/tbody/tr/td[1]/table/tbody/tr[1]/td[2]/input    1234565728
    Sleep    3s
    Click element    Xpath=//*[@id="fd-but-drDate"]
    Sleep    3s
    Click element    id=drDate-next-month-but
    Sleep    2s
    Click Element     xpath=//*[@id="fd-drDate"]/table/tbody/tr[3]/td[4]
    Sleep    3s
    mouse over    id=selWeather
    Click element    id=selWeather
    Sleep    1s
    click element    xpath=//*[@id="selWeather"]/optgroup[2]/option[1]
    Sleep    2s
    click element    id=Select1
    Sleep    3s
    Click element    xpath=//*[@id="selWind"]/option[4]
    mouse over     id=Select1
    Sleep    2s
    Click element    id=Select1
    Sleep    2s
    click element    xpath=//*[@id="Select1"]/option[3]
    Sleep   2s
    input text     id=temperature    81
    Execute JavaScript   return document.getElementById('crewItem').scrollIntoView()
    Sleep    4s
    click element    xpath=//*[@id="crewSelector__c01_chosen"]/ul/li/input
    Sleep    3s
    click element    Xpath=//*[@id="crewSelector__c01_chosen"]/div/ul/li[6]
    Sleep    4s
    click element    Xpath=//*[@id="laborActivity__c01_chosen"]/a/span
    Sleep    4s
    Click Element    Xpath=//*[@id="laborActivity__c01_chosen"]/div/ul/li[8]
    Sleep    3s
    Click button    id=Submit2



    #Execute JavaScript   return document.getElementById('crewItem').scrollIntoView()
Create Daily Report from Copy
    Open Browser    https://www.esubonline.com/TRACKpoint/    Chrome
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
    input text    id=Text2   12345
    Sleep    2s
    Click element    id=Table11
    Sleep    3s
    click button    id=Submit1
    Sleep    4s
    wait until page contains    eSUB
    Sleep    2s
    click element    xpath=//*[@id="Table9"]/tbody/tr[4]/td[3]/a
    wait until page contains    eSUB
    Sleep    2s
    mouse over    Xpath=/html/body/font/div[1]/a[4]
    Sleep    2s
    click element    Xpath=//*[@id="optionProd3"]/a[2]
    capture page screenshot    Filename=CreateDailyReport.png
    Sleep    4s
    WAIT UNTIL PAGE CONTAINS    eSUB
    Sleep    2s
    click element    Xpath=//*[@id="selClone_chosen"]/a/span
    Sleep    2s
    click element    Xpath=//*[@id="selClone_chosen"]/div/ul/li[2]


Email DR from a Copy
    Open Browser    https://www.esubonline.com/TRACKpoint/    Chrome
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
    input text    id=Text2   12345
    Sleep    2s
    Click element    id=Table11
    Sleep    3s
    click button    id=Submit1
    Sleep    4s
    wait until page contains    eSUB
    Sleep    2s
    click element    xpath=//*[@id="Table9"]/tbody/tr[4]/td[3]/a
    wait until page contains    eSUB
    Sleep    2s
    mouse over    Xpath=/html/body/font/div[1]/a[4]
    Sleep    2s
    click element    Xpath=//*[@id="optionProd3"]/a[2]
    capture page screenshot    Filename=CreateDailyReport.png
    Sleep    4s
    WAIT UNTIL PAGE CONTAINS    eSUB
    Sleep    2s
    click element    Xpath=//*[@id="selClone_chosen"]/a/span
    Sleep    2s
    click element    Xpath=//*[@id="selClone_chosen"]/div/ul/li[2]
    wait until page contains    eSUB
    click element    Xpath=//*[@id="Table1"]/tbody/tr/td[2]/a
    mouse over    Xpath=//*[@id="Table3"]/tbody/tr[3]/td[1]/nobr/a[3]/img
    Sleep    2s
    click element    Xpath=//*[@id="Table3"]/tbody/tr[3]/td[1]/nobr/a[3]/img
    wait until page contains    eSUB
    click element    Xpath=//*[@id="selSendTo"]/option[1]
    Sleep    2s
    Execute JavaScript   return document.getElementById('emailMessage').scrollIntoView()
    Sleep    2s
    input text    id=emailMessage    text test message
    Sleep    3s
    Click button     id=Submit





*** Test Cases ***
Navigate to Daily Report    Navigate to Daily Report


#Create and Save daily report with All Required Fields complete    Create and Save daily report with All Required Fields complete
#Edit Daily Report    Edit Daily Report
#Email DR from a Copy    Email DR from a Copy
#Create Daily Report from Copy    Create Daily Report from Copy

