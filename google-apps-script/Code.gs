/**
 * Google Apps Script for wedding RSVP form.
 *
 * Setup:
 * 1. Create a Google Sheet with a tab named "RSVP"
 * 2. Row 1 headers (A1:G1):
 *    Дата и время | Имя | Присутствие | Гостей | Еда | Напитки | Комментарий
 * 3. Extensions → Apps Script → paste this file
 * 4. Deploy → New deployment → Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 5. Copy deployment URL to VITE_GOOGLE_SCRIPT_URL in .env
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('RSVP');
    if (!sheet) {
      throw new Error('Sheet "RSVP" not found');
    }

    var data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.name || '',
      data.attending || '',
      data.guests_count || '',
      data.food || '',
      data.drinks || '',
      data.comment || '',
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
