# PHPMaker Language Translation

# Overview
This is Google Apps Script for translating [PHPMaker](https://phpmaker.dev/) language file from `english.en-US.xml` to another languages.

# Installation
1. This Apps Script need access to Standard GCP Project. Create Standard GCP Project [here](https://console.cloud.google.com/).
2. Enable "Google Drive API" and "Google Picker API" for the project.
3. Generate API Key.
4. Copy GCP project number to **Apps Script -> Project Settings**.

# Usage
1. Upload current `english.en-US.xml` file used by [PHPMaker](https://phpmaker.dev) to Google Drive.
2. Upload your previous translation file to Google Drive.
3. Menu toolbar: **XML -> Get XMLs**, to parse the XMLs to Google Sheets.
4. Translate the newly introduced phrases in empty cells in column C.
5. Menu toolbar: **XML -> Create new XML**, to generate new translation file.

# To Do
Auto translation using "Cloud Translation API".

# Donate
[paypal.me/sangnandar](https://www.paypal.me/sangnandar)
