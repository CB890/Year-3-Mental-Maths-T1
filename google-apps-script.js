/**
 * Mental Math Assessment Results - Google Apps Script
 * This script receives assessment data and saves it to Google Sheets
 * Updated with CORS support for cross-origin requests
 */

// Handle OPTIONS requests for CORS preflight
function doOptions(e) {
  return ContentService
    .createTextOutput('')
    .setMimeType(ContentService.MimeType.TEXT)
    .setHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400'
    });
}

// Main function to handle POST requests from the assessment app
function doPost(e) {
  try {
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Validate required fields
    if (!data.studentName || !data.studentClass || !data.assessmentNumber) {
      return ContentService
        .createTextOutput(JSON.stringify({
          success: false,
          error: 'Missing required student information'
        }))
        .setMimeType(ContentService.MimeType.JSON)
        .setHeaders({
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type'
        });
    }
    
    // Save data to sheet
    const result = saveAssessmentData(data);
    
    // Return success response with CORS headers
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'Assessment results saved successfully',
        rowNumber: result.rowNumber
      }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      });
      
  } catch (error) {
    // Log error for debugging
    console.error('Error processing assessment data:', error);
    
    // Return error response with CORS headers
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: 'Failed to save assessment results: ' + error.message
      }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      });
  }
}

// Function to save assessment data to the Google Sheet
function saveAssessmentData(data) {
  // Get the active spreadsheet
  const sheet = SpreadsheetApp.getActiveSheet();
  
  // Prepare the row data array
  const rowData = [
    new Date(), // Timestamp
    data.studentName,
    data.studentClass,
    data.assessmentNumber
  ];
  
  // Add question data (12 questions × 4 columns each = 48 columns)
  for (let i = 0; i < 12; i++) {
    const question = data.questions[i];
    if (question) {
      rowData.push(
        question.problem || '',      // Question problem text
        question.studentAnswer || '', // Student's answer
        question.correct ? 'YES' : 'NO', // Whether correct
        question.timeSpent || 0      // Time spent in seconds
      );
    } else {
      // Fill empty questions with blanks
      rowData.push('', '', '', '');
    }
  }
  
  // Add summary data
  rowData.push(
    data.totalScore || 0,
    data.percentage || 0
  );
  
  // Find the next empty row
  const lastRow = sheet.getLastRow();
  const nextRow = lastRow + 1;
  
  // Insert the data
  sheet.getRange(nextRow, 1, 1, rowData.length).setValues([rowData]);
  
  // Format the new row
  formatNewRow(sheet, nextRow);
  
  return {
    rowNumber: nextRow,
    timestamp: rowData[0]
  };
}

// Function to format newly added rows
function formatNewRow(sheet, rowNumber) {
  try {
    // Get the range for the entire row
    const range = sheet.getRange(rowNumber, 1, 1, sheet.getLastColumn());
    
    // Apply formatting
    range.setFontSize(10);
    range.setVerticalAlignment('middle');
    
    // Format timestamp column
    sheet.getRange(rowNumber, 1).setNumberFormat('yyyy-mm-dd hh:mm:ss');
    
    // Format percentage column (last column)
    const lastCol = sheet.getLastColumn();
    sheet.getRange(rowNumber, lastCol).setNumberFormat('0.00%');
    
    // Color-code correct/incorrect answers
    for (let col = 7; col <= 51; col += 4) { // Every 4th column starting from G (Q1 Correct)
      const cell = sheet.getRange(rowNumber, col);
      const value = cell.getValue();
      if (value === 'YES') {
        cell.setBackground('#d4edda'); // Light green
        cell.setFontColor('#155724'); // Dark green
      } else if (value === 'NO') {
        cell.setBackground('#f8d7da'); // Light red
        cell.setFontColor('#721c24'); // Dark red
      }
    }
    
  } catch (error) {
    console.error('Error formatting row:', error);
    // Don't throw error - formatting is not critical
  }
}

// Test function - run this to verify everything works
function testSaveAssessmentData() {
  const testData = {
    studentName: 'Test Student',
    studentClass: 'Year 3 Blue',
    assessmentNumber: 1,
    questions: [
      {
        problem: '2 + 3',
        studentAnswer: '5',
        correct: true,
        timeSpent: 3.2
      },
      {
        problem: '7 - 4',
        studentAnswer: '3',
        correct: true,
        timeSpent: 2.8
      },
      {
        problem: '5 × 2',
        studentAnswer: '10',
        correct: true,
        timeSpent: 4.1
      }
      // Add more test questions as needed
    ],
    totalScore: 3,
    percentage: 0.25
  };
  
  try {
    const result = saveAssessmentData(testData);
    console.log('Test successful! Data saved to row:', result.rowNumber);
    return result;
  } catch (error) {
    console.error('Test failed:', error);
    throw error;
  }
}

// Function to handle GET requests (for testing) with CORS headers
function doGet(e) {
  return ContentService
    .createTextOutput('Mental Math Assessment API is running!')
    .setMimeType(ContentService.MimeType.TEXT)
    .setHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
}

// Function to get assessment statistics (bonus feature)
function getAssessmentStats() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const data = sheet.getDataRange().getValues();
  
  if (data.length <= 1) {
    return { message: 'No assessment data found' };
  }
  
  const stats = {
    totalAssessments: data.length - 1,
    averageScore: 0,
    assessmentBreakdown: {}
  };
  
  let totalPercentage = 0;
  
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const assessmentNum = row[3];
    const percentage = row[row.length - 1];
    
    totalPercentage += percentage;
    
    if (!stats.assessmentBreakdown[assessmentNum]) {
      stats.assessmentBreakdown[assessmentNum] = {
        count: 0,
        totalScore: 0
      };
    }
    
    stats.assessmentBreakdown[assessmentNum].count++;
    stats.assessmentBreakdown[assessmentNum].totalScore += percentage;
  }
  
  stats.averageScore = (totalPercentage / (data.length - 1)) * 100;
  
  return stats;
} 