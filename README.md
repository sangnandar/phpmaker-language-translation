# PHPMaker Language Translation

# Overview
This is Google Apps Script for translating [PHPMaker](https://phpmaker.dev/) language file from `english.en-US.xml` to another languages.

# Installation
1. This Apps Script need access to Standard GCP Project. Create Standard GCP Project [here](https://console.cloud.google.com/).
2. Enable "Google Drive API" and "Google Picker API" for the project.
3. Generate API Key.
4. Copy GCP Project Number to **Apps Script -> Project Settings -> Google Cloud Platform (GCP) Project**.
5. Store API Key and GCP Project Number in Script Properties. Add key-value pair `{ "apiKey": API Key, "projectNumber": GCP Project Number }` to **Apps Script -> Project Settings -> Script Properties**.

# Usage
1. Upload current `english.en-US.xml` file used by PHPMaker to Google Drive.
2. Upload your previous translation file to Google Drive.
3. Menu toolbar: **XML -> Get XMLs**, to parse the XMLs to Google Sheets. Input your language in ISO-639 code. Please be aware that Google Cloud Translation use [ISO-639](https://www.iso.org/iso-639-language-code) while PHPMaker use [RFC 4646](https://datatracker.ietf.org/doc/html/rfc4646).
4. Newly introduced phrases will be auto-translated and highlighted in column C.
5. Old phrases will not be translated. Please recheck because sometimes PHPMaker change the value of old phrases.
6. DO NOT translate %s, %d, %d%%, %n$d of %n$d, {n} and $n (where n is digit).
7. Menu toolbar: **XML -> Create new XML**, to generate new translation file.

# Reference
[PHPMaker documentation](https://phpmaker.dev/docs/#/multilang.html?id=making-language-files)

# Donate
[paypal.me/sangnandar](https://www.paypal.me/sangnandar)
