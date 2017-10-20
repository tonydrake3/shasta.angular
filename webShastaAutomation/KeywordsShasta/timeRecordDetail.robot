*** Settings ***
Documentation    Enter time test suite
Library    Selenium2Library


# ***Environment - Dev ***


*** Test Cases ***
Time Record Detail    Time Record Detail


*** Keywords ***
Time Record Detail
    [Tags]    Smoke
   Open Browser    http://web.develop.shasta.esubonline.com/    Chrome
    Set Window Size    ${1600}    ${1000}
    Wait Until Page Contains    eSUB
    Sleep    3s
    Input Text    id=txtUsername    Tonyd@esub.com
    Sleep    3s
    Input Text    id=txtPassword     Test1234
    Sleep    3s
    Click Button    id=btnLogin
    Wait Until Page Contains    Employee   timeout=30
    Sleep    4s
    click button    id=btnShowModal
    Sleep    6s
	input text    id=txtFormST    8
	Sleep    4s
	input text    id=txtFormOT    0.25
	Sleep    3s
	input text    id=txtFormDT    0
	Sleep    4s
    click element    Xpath=//*[@id="cdk-overlay-0"]/md-dialog-container/esub-time-record-detail-modal/md-dialog-actions/button[2]/span
    Sleep    3s
	close browser
