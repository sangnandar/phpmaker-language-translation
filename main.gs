function onOpen() {
  ui
    .createMenu('XML')
      .addItem('Get XMLs', 'showPicker')
      .addItem('Create new XML', 'createXml')
    .addToUi();
}

function parseXmlFiles(args) {

  const lang = args[2];
  const xmlFileIds = [args[0], args[1]]
  docProps.setProperty('xmlFileId', xmlFileIds[0]); // store in docProps to be used on createXml()
  
  const en_US = {};
  xmlFileIds.forEach((xmlFileId, i) => {

    const xml = DriveApp.getFileById(xmlFileId).getBlob().getDataAsString();
    
    // Parse the XML
    const global = XmlService.parse(xml).getRootElement().getChild('global')
    const keys = ['phrases', 'datetimepicker', 'select2', 'querybuilderjs', 'fullcalendar'];
    const children = keys.reduce((acc, key) => {
      acc[key] = (key === 'phrases') ? global.getChildren('phrase') : global.getChild(key);
      return acc;
    }, {});

    const collectPhrases = (element, data) => {
      if (element.getName() === 'phrase') {
        const id = element.getAttribute('id') ? "'" + element.getAttribute('id').getValue() : '' ;
        const value = element.getAttribute('value') ? "'" + element.getAttribute('value').getValue() : '' ;
        data.push([id, value]);
      }
      element.getChildren().forEach(child => collectPhrases(child, data)); // collect <phrase> elements recursively
    }

    let data, sheet, bgColors;
    keys.forEach(key => {
      data = [];
      if (key === 'phrases') {
        children[key].forEach(element => {
          const id = element.getAttribute('id') ? "'" + element.getAttribute('id').getValue() : '' ;
          const value = element.getAttribute('value') ? "'" + element.getAttribute('value').getValue() : '' ;
          data.push([id, value]);
        });
      } else {
        collectPhrases(children[key], data);
      }

      sheet = ss.getSheetByName(key);
      bgColors = [];
      if (i === 0) {
        en_US[key] = data;
        sheet.clear(); // Clear any existing data
        sheet.getRange(1, 1, data.length, data[0].length).setValues(data); // write col ID and col en-US
      } else {
        const lookup = Object.fromEntries(data);
        // re-create to match en-US and translate new phrases
        data = en_US[key].map(x => {
          bgColors.push([lookup[x[0]] ? null : 'pink']);
          return [lookup[x[0]] || LanguageApp.translate(x[1], 'en', lang)];
        });
        sheet.getRange(1, 3, data.length, data[0].length)
          .setValues(data)
          .setBackgrounds(bgColors);
      }
    });
  });

}

function createXml() {
  // copy en-US
  const xmlFileId = docProps.getProperty('xmlFileId');
  const file = DriveApp.getFileById(xmlFileId);
  const filename = file.getName() + ' - translated' + filenameSuffix + '.xml';
  const fileCopy = file.makeCopy(filename);

  // change phrase's value
  const sheets = ss.getSheets();
  const data = [], lookup = [], result = [];
  for (const sheet of sheets) {
    const temp = sheet.getRange('A:C').getValues();
    data.push(...temp);
  }
  for (const item of data) {
    lookup.push(item[0]);
    result.push(item[2]);
  }

  const modifyValues = (element) => {
    if (element.getName() === 'phrase') {
      const index = lookup.indexOf(element.getAttribute('id').getValue());
      if (index !== -1) element.getAttribute('value').setValue(result[index]);
    }
    element.getChildren().forEach(child => modifyValues(child)); // modify values recursively
  };

  const xml = fileCopy.getBlob().getDataAsString();
  const document = XmlService.parse(xml);
  modifyValues(document.getRootElement());
  const modifiedXml = XmlService.getPrettyFormat().format(document);
  fileCopy.setContent(modifiedXml);

}
