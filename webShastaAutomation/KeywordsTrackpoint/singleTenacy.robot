*** Settings ***
Documentation     A test suite for single tenacy companies
Library    Selenium2Library

*** Test Cases ***
Single Tenancy    Single Tenancy


*** Keywords ***
Single Tenancy
    Open Browser    https://www.esubonline.com/TRACKpoint/    Firefox
    Sleep     3s
    Input Text    id=loginName    support@esubinc.com
    Sleep    3s
    Click Button    id=Image1
    Capture Page Screenshot    Filename=SingleTenacyLogin.png

#Login as Single Tenacy With valid Subscriber
    Open Browser    https://www.esubonline.com/TRACKpoint/    Firefox
    Sleep     3s
    Input Text    id=loginName    trialdiaz
    Sleep    3s
    Click Button    id=Image1
    Capture Page Screenshot    Filename=SingleTenacyLogin.png

