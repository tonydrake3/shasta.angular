*** Settings ***
Documentation    Cost Codes for Shasta Time
Library    Selenium2Library


*** Keywords ***
Create New Cost Code
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
    click element    Xpath=/html/body/font/div[1]/a[2]
    Sleep    3s
    mouse over    Xpath=//*[@id="optionNav"]/a[2]
    Sleep    1s
    click element    Xpath=//*[@id="optionNav"]/a[2]
    wait until page contains    eSUB
    SLEEP    3s
    click element    Xpath=//*[@id="Table3"]/tbody/tr/td/a
    wait until page contains    eSUB
    sleep    3s
    click element    Xpath=//*[@id="Table1"]/tbody/tr[10]/td[2]/a
    wait until page contains    eSUB
    Sleep    3s
    input text    id=Text2     619
    Sleep    3s
    input text    id=Aname     Electrical Wiring
    Sleep    2s
    mouse over    id=Select1
    Sleep    2s
    click element    id=Select1
    Sleep    2s
    click element    Xpath=//*[@id="Select1"]/option[2]
    Sleep    2s
    Click element    id=Radio2
    Sleep    3s
    input text    id=quickBooksServiceItemName    Roof Repair and Water Damage Control
    sleep    3s
    click button    id=Submit
    Sleep    3s
    click element    Xpath=//*[@id="Select1"]/option[1]
    Sleep    3s
    click element    name=FilterString3
    Sleep    3s
    click element    Xpath=//*[@id="Table1"]/tbody/tr[10]/td[1]/a/img
    wait until page contains    eSUB
    Sleep    3s
    input text    id=Desc   Registered Drywall Repair & Director, Head of CEEMA (Central and Eastern Europe, Middle East & Africa) and Latin America Equity Focus, Institutional Client Group - Fundamental Equity, Corporate & Institutional Banking - Global Markets
    Sleep    3s
    click element    Xpath=//*[@id="Table1"]/tbody/tr[1]/td[2]/a
    #capture page screenshot    Filename=hideallbutone.png
    Sleep    3s
    #go back
    #wait until page contains    eSUB
    #Sleep    3s
    #go to    https://www.esubonline.com/TRACKpoint/versions/v61/dailyreport/editactivity.asp?Session=922201740007PM511&UI=&Site=&ActID=13&Type=#



#Configure Project and Navigate to Shasta Time - (this is TBD until Shasta Time is Implemented)
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
    Wait until Page contains    eSUB
    Sleep    3s
    Click Element     Xpath=//*[@id="Table2"]/tbody/tr[3]/td/div/nobr/a[2]/img  #display all
    Sleep    3s
    click element    Xpath=//*[@id="Table1"]/tbody/tr[1]/td[3]/a
    Sleep    3s
    click element    Xpath=//*[@id="Table1"]/tbody/tr[6]/td[3]/input
    Sleep    3s
    capture page screenshot    Filename=hideallbutone.png
    Sleep    3s
    click element    Xpath=//*[@id="Table1"]/tbody/tr[7]/td[3]/input


Change Status of Labor Activity
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
    click element    Xpath=/html/body/font/div[1]/a[2]
    Sleep    3s
    mouse over    Xpath=//*[@id="optionNav"]/a[2]
    Sleep    1s
    click element    Xpath=//*[@id="optionNav"]/a[2]
    wait until page contains    eSUB
    SLEEP    3s
    click element    Xpath=//*[@id="Table3"]/tbody/tr/td/a
    wait until page contains    eSUB
    sleep    3s
    click element    Xpath=//*[@id="Table1"]/tbody/tr[10]/td[2]/a
    wait until page contains    eSUB
    Sleep    3s
    click element    Xpath=//*[@id="Table1"]/tbody/tr[10]/td[1]/a/img
    wait until page contains    eSUB
    click element    id=newProjectsDisplay   #Switching over to Display from Hide
    Sleep    3s
    input text    id=quickBooksServiceItemName    Submitted Receipts after purchase of a water hose and Saw and a Sander and a Buffer for the deck and more studfinders and less amount of Nails than last time
    Sleep    3s
    clear element text    id=quickBooksServiceItemName
    Sleep    5s
    input text    id=quickBooksServiceItemName    Submitted Receipts after purchase of a water hose and Saw and a Sander and
    click element    id=Submit
    Sleep    3s
    click element      Xpath=//*[@id="Table1"]/tbody/tr[14]/td[5]/a  #for inactive status
    Sleep    3s
    mouse over    id=Select1
    Sleep    2s
    click element    Xpath=//*[@id="Select1"]/option[3]
    Sleep    2s
    click element    id=Submit2


Search by Inactive Labor Status
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
    click element    Xpath=/html/body/font/div[1]/a[2]
    Sleep    3s
    mouse over    Xpath=//*[@id="optionNav"]/a[2]
    Sleep    1s
    click element    Xpath=//*[@id="optionNav"]/a[2]
    wait until page contains    eSUB
    SLEEP    3s
    click element    Xpath=//*[@id="Table3"]/tbody/tr/td/a
    wait until page contains    eSUB
    sleep    3s
    click element    Xpath=//*[@id="Table1"]/tbody/tr[10]/td[2]/a
    wait until page contains    eSUB
    Sleep    3s
    click element    Xpath=//*[@id="Table1"]/tbody/tr[10]/td[1]/a/img
    wait until page contains    eSUB
    # Editing /Assigning Lab Activity
    click element    id=newProjectsDisplay   #Switching over to Display from Hide
    Sleep    2s
    #click element    id=//*[@id="Radio2"]   #Overhead Activity? = Changes from No to Yes
    Sleep    3s
    input text    id=quickBooksServiceItemName    Submitted Receipts after purchase of a water hose and Saw and a Sander and a Buffer for the deck and more studfinders and less amount of Nails than last time
    Sleep    3s
    clear element text    id=quickBooksServiceItemName
    Sleep    5s
    input text    id=quickBooksServiceItemName    Submitted Receipts after purchase of a water hose and Saw and a Sander and
    click element    id=Submit
    Sleep    3s
    click element      Xpath=//*[@id="Table1"]/tbody/tr[9]/td[5]/a  #for inactive status
    Sleep    3s
    MOUSE OVER    Xpath=(//*[@id="Select1"])[2]/option[2]
    Sleep    1s
    CLICK ELEMENT    Xpath=(//*[@id="Select1"])[2]/option[2]
    Sleep    3s
    Click Element    Xpath=(//*[@id="Select1"])[2]/option[2]


Hide New Projects
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
    click element    Xpath=/html/body/font/div[1]/a[2]
    Sleep    3s
    mouse over    Xpath=//*[@id="optionNav"]/a[2]
    Sleep    1s
    click element    Xpath=//*[@id="optionNav"]/a[2]
    wait until page contains    eSUB
    SLEEP    3s
    click element    Xpath=//*[@id="Table3"]/tbody/tr/td/a
    wait until page contains    eSUB
    sleep    3s
    click element    Xpath=//*[@id="Table1"]/tbody/tr[10]/td[2]/a
    wait until page contains    eSUB
    Sleep    3s
    click element    id=Radio1
    wait until page contains    eSUB
    Sleep    3s
    click element    Xpath=//*[@id="Table1"]/tbody/tr[9]/td[1]/a/img
    wait until page contains    eSUB
    Sleep    3s
    click element   Xpath=//*[@id="Table1"]/tbody/tr[32]/td[3]/input
    Sleep    2s
    click element    id=Submit

Click to Collapse / Expand
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
    click element    Xpath=/html/body/font/div[1]/a[2]
    Sleep    3s
    mouse over    Xpath=//*[@id="optionNav"]/a[2]
    Sleep    1s
    click element    Xpath=//*[@id="optionNav"]/a[2]
    wait until page contains    eSUB
    SLEEP    3s
    click element    Xpath=//*[@id="Table3"]/tbody/tr/td/a
    wait until page contains    eSUB
    sleep    3s
    click element    Xpath=//*[@id="Table1"]/tbody/tr[10]/td[2]/a
    wait until page contains    eSUB
    Sleep    3s
    click element    Xpath=//*[@id="Table2"]/tbody/tr[8]/td/div/div[1]/div/a
    Sleep     4s
    click element    Xpath=//*[@id="Table2"]/tbody/tr[8]/td/div/div[1]/div/a
    Sleep     2s
    mouse over    Xpath=//*[@id="rightMenu"]/a
    Sleep    2s
    click element    Xpath=//*[@id="rightMenu"]/a
    Sleep    2s
    click element    Xpath=//*[@id="userMenu"]/a[1]
    wait until page contains    eSUB
    go back
    wait until page contains    eSUB
    click element    Xpath=//*[@id="Table2"]/tbody/tr[8]/td/div/div[1]/div/a
    Sleep    2s
    Click Element    Xpath=//*[@id="Table2"]/tbody/tr[8]/td/div/div[1]/div/a
    #capture page screenshot    Filename=Expand.collapse
    Sleep    2s
    click element    Xpath=//*[@id="Table1"]/tbody/tr[17]/td[1]/a/img
    Sleep    3s
    wait until page contains    eSUB
    Sleep    3s
    click element    Xpath=//*[@id="Table1"]/tbody/tr[1]/td[2]/a
    Sleep    3s
    close window
    Sleep    3s
    close browser



















