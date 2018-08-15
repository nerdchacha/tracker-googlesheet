const GoogleSpreadsheet = require('google-spreadsheet');

const { GOOGLE_SHEET_ID, GOOGLE_CLIENT_EMAIL, GOOGLE_PRIVATE_KEY } = process.env;

class GoogleSheet {
  constructor () {
    this.doc = new GoogleSpreadsheet(GOOGLE_SHEET_ID);
  }
  async authenticate () {
    const credentials = {
      client_email: GOOGLE_CLIENT_EMAIL,
      private_key: GOOGLE_PRIVATE_KEY
    }
    return new Promise((resolve, reject) => {
      this.doc.useServiceAccountAuth(credentials, (err) => {
        if (err) { reject(err); }
        resolve();
      });
    });
  }
  async getSheet () {
    return new Promise((resolve, reject) => {
      this.doc.getInfo((err, info) => {
        if (err) { return reject(err); }
        if (!info.worksheets) { throw new Error('Google sheet has no worksheet'); }
        const [sheet] = info.worksheets
        resolve(sheet);
      });
    });
  }
  async addRow (url, tracker, exists) {
    await this.authenticate();
    const sheet = await this.getSheet();
    const data = { 
      'URL': url, 
      'Tracker': tracker, 
      'Exists': exists, 
      'Date': new Date(),
    };
    return new Promise((resolve, reject) => {
      sheet.addRow(data, (err) => {
        if (err) { return reject(err); }
        console.log('Successfully inserted row ');
        resolve();
      });
    });
  }
}

module.exports = GoogleSheet;