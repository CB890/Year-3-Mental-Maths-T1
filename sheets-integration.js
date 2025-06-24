/**
 * Google Sheets Integration for Mental Math Assessment
 * Add this code to your existing script.js file
 */

// ===== CONFIGURATION =====
// REPLACE THIS URL WITH YOUR ACTUAL DEPLOYMENT URL FROM STEP 3
const GOOGLE_SHEETS_URL = 'YOUR_DEPLOYMENT_URL_HERE';

// ===== GLOBAL VARIABLES FOR TRACKING =====
let assessmentData = {
    studentName: '',
    studentClass: '',
    assessmentNumber: null,
    questions: [],
    startTime: null,
    currentQuestionStartTime: null
};

// ===== UTILITY FUNCTIONS =====

// Function to initialize assessment tracking
function initializeAssessmentTracking(studentName, studentClass, assessmentNumber) {
    assessmentData = {
        studentName: studentName,
        studentClass: studentClass,
        assessmentNumber: assessmentNumber,
        questions: [],
        startTime: new Date(),
        currentQuestionStartTime: null
    };
    
    console.log('Assessment tracking initialized for:', studentName);
}

// Function to start tracking a new question
function startQuestionTracking(questionNumber, problemText) {
    assessmentData.currentQuestionStartTime = new Date();
    
    // Ensure we have a slot for this question
    while (assessmentData.questions.length < questionNumber) {
        assessmentData.questions.push({
            problem: '',
            studentAnswer: '',
            correct: false,
            timeSpent: 0
        });
    }
    
    // Set the problem text
    assessmentData.questions[questionNumber - 1].problem = problemText;
}

// Function to record a question result
function recordQuestionResult(questionNumber, studentAnswer, correctAnswer, problemText) {
    const questionIndex = questionNumber - 1;
    
    // Calculate time spent on this question
    const timeSpent = assessmentData.currentQuestionStartTime ? 
        (new Date() - assessmentData.currentQuestionStartTime) / 1000 : 0;
    
    // Ensure we have enough question slots
    while (assessmentData.questions.length <= questionIndex) {
        assessmentData.questions.push({
            problem: '',
            studentAnswer: '',
            correct: false,
            timeSpent: 0
        });
    }
    
    // Record the question data
    assessmentData.questions[questionIndex] = {
        problem: problemText || assessmentData.questions[questionIndex].problem,
        studentAnswer: studentAnswer,
        correct: studentAnswer == correctAnswer,
        timeSpent: timeSpent
    };
    
    console.log(`Question ${questionNumber} recorded:`, assessmentData.questions[questionIndex]);
}

// Function to calculate final scores
function calculateFinalScores() {
    const totalQuestions = assessmentData.questions.length;
    const correctAnswers = assessmentData.questions.filter(q => q.correct).length;
    const percentage = totalQuestions > 0 ? correctAnswers / totalQuestions : 0;
    
    return {
        totalScore: correctAnswers,
        totalQuestions: totalQuestions,
        percentage: percentage
    };
}

// Function to send data to Google Sheets
async function sendToGoogleSheets() {
    try {
        // Calculate final scores
        const scores = calculateFinalScores();
        
        // Prepare data for Google Sheets
        const dataToSend = {
            studentName: assessmentData.studentName,
            studentClass: assessmentData.studentClass,
            assessmentNumber: assessmentData.assessmentNumber,
            questions: assessmentData.questions,
            totalScore: scores.totalScore,
            percentage: scores.percentage
        };
        
        console.log('Sending data to Google Sheets:', dataToSend);
        
        // Send data to Google Sheets
        const response = await fetch(GOOGLE_SHEETS_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSend)
        });
        
        const result = await response.json();
        
        if (result.success) {
            console.log('✅ Data successfully saved to Google Sheets!');
            showSuccessMessage('Your results have been saved successfully!');
            return true;
        } else {
            console.error('❌ Failed to save to Google Sheets:', result.error);
            showErrorMessage('Could not save results. They have been stored locally.');
            saveToLocalStorage(dataToSend);
            return false;
        }
        
    } catch (error) {
        console.error('❌ Error sending to Google Sheets:', error);
        showErrorMessage('Could not save results online. They have been stored locally.');
        
        // Save locally as backup
        const scores = calculateFinalScores();
        const dataToSend = {
            studentName: assessmentData.studentName,
            studentClass: assessmentData.studentClass,
            assessmentNumber: assessmentData.assessmentNumber,
            questions: assessmentData.questions,
            totalScore: scores.totalScore,
            percentage: scores.percentage
        };
        saveToLocalStorage(dataToSend);
        return false;
    }
}

// Function to save data locally when online saving fails
function saveToLocalStorage(data) {
    try {
        const existingData = JSON.parse(localStorage.getItem('mentalMathResults') || '[]');
        existingData.push({
            ...data,
            timestamp: new Date().toISOString(),
            saved: false // Mark as not yet saved to sheets
        });
        localStorage.setItem('mentalMathResults', JSON.stringify(existingData));
        console.log('📱 Data saved locally');
    } catch (error) {
        console.error('Failed to save locally:', error);
    }
}

// Function to retry sending local data when back online
async function retryLocalData() {
    try {
        const localData = JSON.parse(localStorage.getItem('mentalMathResults') || '[]');
        const unsavedData = localData.filter(item => !item.saved);
        
        if (unsavedData.length === 0) return;
        
        console.log(`Attempting to send ${unsavedData.length} locally stored results...`);
        
        for (let i = 0; i < unsavedData.length; i++) {
            const data = unsavedData[i];
            try {
                const response = await fetch(GOOGLE_SHEETS_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                });
                
                const result = await response.json();
                if (result.success) {
                    // Mark as saved
                    const index = localData.findIndex(item => 
                        item.studentName === data.studentName && 
                        item.timestamp === data.timestamp
                    );
                    if (index !== -1) {
                        localData[index].saved = true;
                    }
                }
            } catch (error) {
                console.error('Failed to send stored data:', error);
                break; // Stop trying if we're still offline
            }
        }
        
        // Update local storage
        localStorage.setItem('mentalMathResults', JSON.stringify(localData));
        
    } catch (error) {
        console.error('Error retrying local data:', error);
    }
}

// Function to show success message to user
function showSuccessMessage(message) {
    // Create success message element
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `
        <div class="message-content">
            <span class="success-icon">✅</span>
            <span class="message-text">${message}</span>
        </div>
    `;
    
    // Add to page
    document.body.appendChild(successDiv);
    
    // Remove after 5 seconds
    setTimeout(() => {
        if (successDiv.parentNode) {
            successDiv.parentNode.removeChild(successDiv);
        }
    }, 5000);
}

// Function to show error message to user
function showErrorMessage(message) {
    // Create error message element
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerHTML = `
        <div class="message-content">
            <span class="error-icon">⚠️</span>
            <span class="message-text">${message}</span>
        </div>
    `;
    
    // Add to page
    document.body.appendChild(errorDiv);
    
    // Remove after 7 seconds
    setTimeout(() => {
        if (errorDiv.parentNode) {
            errorDiv.parentNode.removeChild(errorDiv);
        }
    }, 7000);
}

// Function to check if online and retry local data
function handleOnlineStatus() {
    if (navigator.onLine) {
        console.log('📶 Back online - checking for locally stored data...');
        retryLocalData();
    } else {
        console.log('📴 Offline - will save locally');
    }
}

// ===== EVENT LISTENERS =====

// Listen for online/offline status changes
window.addEventListener('online', handleOnlineStatus);
window.addEventListener('offline', handleOnlineStatus);

// Check for local data when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're online and have local data to send
    if (navigator.onLine) {
        retryLocalData();
    }
});

// ===== TESTING FUNCTION =====

// Function to test the Google Sheets connection
async function testGoogleSheetsConnection() {
    console.log('🧪 Testing Google Sheets connection...');
    
    const testData = {
        studentName: 'Test Student',
        studentClass: 'Test Class',
        assessmentNumber: 1,
        questions: [
            {
                problem: '2 + 2',
                studentAnswer: '4',
                correct: true,
                timeSpent: 3.5
            }
        ],
        totalScore: 1,
        percentage: 1.0
    };
    
    try {
        const response = await fetch(GOOGLE_SHEETS_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(testData)
        });
        
        const result = await response.json();
        
        if (result.success) {
            console.log('✅ Google Sheets connection test successful!');
            alert('Google Sheets connection is working! Check your spreadsheet for the test data.');
            return true;
        } else {
            console.error('❌ Google Sheets connection test failed:', result.error);
            alert('Google Sheets connection failed: ' + result.error);
            return false;
        }
        
    } catch (error) {
        console.error('❌ Google Sheets connection test error:', error);
        alert('Could not connect to Google Sheets. Check your URL and try again.');
        return false;
    }
}

// ===== EXPORT FOR DEBUGGING =====
// These functions will be available in the browser console for debugging
window.testGoogleSheetsConnection = testGoogleSheetsConnection;
window.assessmentData = assessmentData; 