const ss = SpreadsheetApp.getActiveSpreadsheet();
var ui;
try {
  ui = SpreadsheetApp.getUi();
} catch (e) {
  Logger.log('You are using script editor.');
}

const docProps = PropertiesService.getDocumentProperties();
const scriptProps = PropertiesService.getScriptProperties();
const filenameSuffix = ' - ' + Utilities.formatDate(new Date(), 'UTC', "YYYYMMdd-HHmmss");

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function showPicker() {
  if (ui) {
    const { apiKey, projectNumber } = scriptProps.getProperties();

    const template = HtmlService.createTemplateFromFile('dialog.html');
    Object.assign(template, { apiKey, projectNumber: Number(projectNumber) });
    html = template.evaluate();
    ui.showModalDialog(
      html
        .setWidth(800)
        .setHeight(600),
      'Select XML files'
    );
  }
}

/**
 * In this case, the function includes an unused call
 * to a DriveApp method to ensure that Apps Script requests access to all files
 * in the user's Drive.
 *
 * @return {string} The user's OAuth 2.0 access token.
 */
function getOAuthToken() {
  try {
    DriveApp.getRootFolder();
    return ScriptApp.getOAuthToken();
  } catch (e) {
    Logger.log('Failed with error: %s', e.error);
  }
}
