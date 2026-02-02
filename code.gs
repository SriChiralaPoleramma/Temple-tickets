function doPost(e) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("Bookings") || ss.getSheets()[0];

  try {
    const data = [
      e.parameter.bookingID,
      e.parameter.name,
      e.parameter.phone,
      e.parameter.gothram,
      e.parameter.family,
      e.parameter.startMonth,
      e.parameter.endMonth,
      e.parameter.totalAmount,
      e.parameter.bookingDate
    ];

    sheet.appendRow(data);

    return ContentService.createTextOutput("Success")
      .setMimeType(ContentService.MimeType.TEXT);

  } catch (error) {
    return ContentService.createTextOutput("Error: " + error.toString())
      .setMimeType(ContentService.MimeType.TEXT);
  }
}
