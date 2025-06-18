# Mental Math Assessment - Complete Implementation Guide for Cursor AI

## Implementation Checklist

### **Phase 1: Basic Structure & Setup** ⭐ (Easy)

- [ ] **Task 1.1: Create Basic HTML Structure**
  - [ ] Create main HTML file with responsive meta tags
  - [ ] Set up basic CSS framework for mobile-friendly design
  - [ ] Include Web Speech API setup
  - **Acceptance Criteria:** HTML validates, responsive viewport works on mobile, TTS API loads without errors

- [ ] **Task 1.2: Design Main Menu Page**
  - [ ] Create child-friendly main menu with 6 assessment buttons
  - [ ] Add clear instructions for students
  - [ ] Implement basic navigation between menu and assessments
  - **Acceptance Criteria:** Menu displays all 6 assessments, instructions are clear and readable, buttons work for navigation

- [ ] **Task 1.3: Create Student Name Input**
  - [ ] Add name input field on main menu
  - [ ] Store name for results display
  - [ ] Basic form validation
  - **Acceptance Criteria:** Name is captured, stored, and displayed in results, validation prevents empty submissions

### **Phase 2: Core Assessment Engine** ⭐⭐ (Medium)

- [ ] **Task 2.1: Build Question Display System**
  - [ ] Create question container with text display
  - [ ] Implement question progression logic
  - [ ] Add answer input field (number input for mobile)
  - **Acceptance Criteria:** Questions display correctly, input accepts numbers, progression moves to next question

- [ ] **Task 2.2: Implement Text-to-Speech Integration**
  - [ ] Integrate Web Speech API
  - [ ] Create function to read questions twice
  - [ ] Add speech completion detection
  - **Acceptance Criteria:** TTS reads each question exactly twice, speech is clear and appropriate speed, works on mobile browsers

- [ ] **Task 2.3: Create Basic Timer System**
  - [ ] Implement countdown timer (5 seconds for first 8, 10 seconds for last 4)
  - [ ] Timer starts ONLY after second reading completes
  - [ ] Auto-advance when timer reaches zero
  - **Acceptance Criteria:** Timer shows correct duration, starts after second reading, auto-advances, displays countdown visually

### **Phase 3: Assessment Logic & Flow** ⭐⭐ (Medium)

- [ ] **Task 3.1: Build Single Assessment (Assessment 1)**
  - [ ] Implement complete flow for Assessment 1 only
  - [ ] Load questions from data structure
  - [ ] Handle answer collection and validation
  - **Acceptance Criteria:** Assessment 1 runs from start to finish, collects all answers, handles timing correctly

- [ ] **Task 3.2: Add Transition Screen for 10-Second Questions**
  - [ ] Create instruction screen before questions 9-12
  - [ ] Add "Begin" button to continue
  - [ ] Pause assessment flow appropriately
  - **Acceptance Criteria:** Screen appears after question 8, shows clear instructions about 10-second timing, continues only when Begin is clicked

- [ ] **Task 3.3: Implement Results Page**
  - [ ] Display student name and assessment number
  - [ ] Show all questions with student answers
  - [ ] Mark correct/incorrect answers
  - [ ] Calculate and display score
  - **Acceptance Criteria:** All questions shown with correct answers, clear right/wrong indicators, accurate score calculation, student name displayed

### **Phase 4: Enhanced UX & Polish** ⭐⭐⭐ (Medium-Hard)

- [ ] **Task 4.1: Create Professional Child-Friendly Design**
  - [ ] Implement colorful, engaging CSS styling
  - [ ] Add animations for timer countdown
  - [ ] Create clear visual feedback for answer submission
  - [ ] Mobile-optimized touch targets
  - **Acceptance Criteria:** Design is visually appealing to children, animations are smooth, touch targets are appropriately sized (44px minimum), colors have good contrast

- [ ] **Task 4.2: Add Visual Timer Indicators**
  - [ ] Implement circular or bar progress indicator
  - [ ] Color changes (green → yellow → red) as time decreases
  - [ ] Clear visual cues for timer status
  - **Acceptance Criteria:** Timer is visually obvious, color changes are intuitive, works smoothly on mobile

- [ ] **Task 4.3: Enhance Results Display for Teachers**
  - [ ] Create teacher-friendly results summary
  - [ ] Add timestamp and assessment details
  - [ ] Format for easy reading/screenshot
  - [ ] Include percentage scores and question breakdown
  - **Acceptance Criteria:** Results are clearly formatted, include all necessary information for teachers, easy to screenshot or print

### **Phase 5: Complete Assessment System** ⭐⭐⭐⭐ (Hard)

- [ ] **Task 5.1: Implement All 6 Assessments**
  - [ ] Create data structure for all assessment questions
  - [ ] Extend assessment engine to handle all 6 assessments
  - [ ] Ensure consistent timing and flow across all assessments
  - **Acceptance Criteria:** All 6 assessments work identically, questions load correctly, timing is consistent

- [ ] **Task 5.2: Add Assessment Selection Logic**
  - [ ] Link menu buttons to specific assessments
  - [ ] Pass assessment ID through the system
  - [ ] Load correct question sets
  - **Acceptance Criteria:** Each menu button loads the correct assessment, questions are assessment-specific, no cross-contamination

- [ ] **Task 5.3: Implement Return to Menu Functionality**
  - [ ] Add option to return to main menu after results
  - [ ] Reset all assessment state
  - [ ] Clear previous answers and timer states
  - **Acceptance Criteria:** Clean return to menu, no residual data from previous assessment, ready for new assessment

### **Phase 6: Advanced Features & Optimization** ⭐⭐⭐⭐⭐ (Very Hard)

- [ ] **Task 6.1: Cross-Browser TTS Compatibility**
  - [ ] Test and fix TTS across different mobile browsers
  - [ ] Add fallback options for unsupported browsers
  - [ ] Implement TTS error handling
  - **Acceptance Criteria:** Works on Chrome, Safari, Firefox mobile, graceful degradation for unsupported browsers

- [ ] **Task 6.2: Advanced Error Handling**
  - [ ] Handle network connectivity issues
  - [ ] Manage TTS failures gracefully
  - [ ] Add user feedback for technical issues
  - **Acceptance Criteria:** App continues to function with poor connectivity, clear error messages, recovery options provided

- [ ] **Task 6.3: Performance Optimization**
  - [ ] Optimize for slow mobile connections
  - [ ] Minimize resource loading
  - [ ] Ensure smooth animations on older devices
  - **Acceptance Criteria:** Loads quickly on 3G connections, smooth performance on 2-year-old mobile devices, minimal data usage

---

## Assessment Questions Data Structure

**IMPORTANT: Use this exact data structure in your JavaScript code:**

```javascript
const assessments = {
  1: {
    title: "Assessment 1",
    questions: [
      { text: "What is 8 × 4?", answer: "32", time: 5 },
      { text: "Count on 100 from 245.", answer: "345", time: 5 },
      { text: "What is ½ of 16?", answer: "8", time: 5 },
      { text: "Add £1.20 and 50p.", answer: "£1.70", time: 5 },
      { text: "How many minutes in half an hour?", answer: "30", time: 5 },
      { text: "What is 9 less than 302?", answer: "293", time: 5 },
      { text: "Write six hundred and nine in numerals.", answer: "609", time: 5 },
      { text: "What is 24 ÷ 8?", answer: "3", time: 5 },
      { text: "365 – 78 = ?", answer: "287", time: 10 },
      { text: "4 × 7 × 2 = ?", answer: "56", time: 10 },
      { text: "Which is larger: ¾ or ⅖?", answer: "¾", time: 10 },
      { text: "The perimeter of a square is 24 cm. How long is one side?", answer: "6 cm", time: 10 }
    ]
  },
  2: {
    title: "Assessment 2",
    questions: [
      { text: "What is 6 × 3?", answer: "18", time: 5 },
      { text: "Count back 10 from 540.", answer: "530", time: 5 },
      { text: "What is a quarter of 12?", answer: "3", time: 5 },
      { text: "£2.00 minus 75p equals?", answer: "£1.25", time: 5 },
      { text: "How many days in February during a leap year?", answer: "29", time: 5 },
      { text: "What is 37 + 9?", answer: "46", time: 5 },
      { text: "What digit is in the hundreds place of 748?", answer: "7", time: 5 },
      { text: "32 ÷ 4 equals?", answer: "8", time: 5 },
      { text: "420 + 180 = ?", answer: "600", time: 10 },
      { text: "56 ÷ 8 = ?", answer: "7", time: 10 },
      { text: "Add ⅖ + ⅕.", answer: "⅗", time: 10 },
      { text: "A rectangle is 5 cm long and 3 cm wide. What is its perimeter?", answer: "16 cm", time: 10 }
    ]
  },
  3: {
    title: "Assessment 3",
    questions: [
      { text: "What is 7 × 8?", answer: "56", time: 5 },
      { text: "What is 100 less than 683?", answer: "583", time: 5 },
      { text: "Write four hundred and two in numerals.", answer: "402", time: 5 },
      { text: "Double 35.", answer: "70", time: 5 },
      { text: "How many centimetres in 3 metres?", answer: "300 cm", time: 5 },
      { text: "24 ÷ 3 = ?", answer: "8", time: 5 },
      { text: "What is ¾ of 20?", answer: "15", time: 5 },
      { text: "Count in 50s: What comes after 150?", answer: "200", time: 5 },
      { text: "239 + 47 = ?", answer: "286", time: 10 },
      { text: "8 × 9 ÷ 3 = ?", answer: "24", time: 10 },
      { text: "What fraction is equivalent to ½: 2/4 or 3/5?", answer: "2/4", time: 10 },
      { text: "The time is quarter past 7. Write this in 24-hour time.", answer: "07:15", time: 10 }
    ]
  },
  4: {
    title: "Assessment 4",
    questions: [
      { text: "9 × 4 = ?", answer: "36", time: 5 },
      { text: "What is 10 more than 489?", answer: "499", time: 5 },
      { text: "What is ⅓ of 9?", answer: "3", time: 5 },
      { text: "£5 minus £2.45 equals?", answer: "£2.55", time: 5 },
      { text: "How many seconds in 2 minutes?", answer: "120", time: 5 },
      { text: "56 ÷ 7 = ?", answer: "8", time: 5 },
      { text: "Count from 0 in 8s: 0, 8, 16, ?", answer: "24", time: 5 },
      { text: "What number is half-way between 100 and 200?", answer: "150", time: 5 },
      { text: "673 – 189 = ?", answer: "484", time: 10 },
      { text: "A bar chart shows 12 red apples and 9 green. How many apples altogether?", answer: "21", time: 10 },
      { text: "Add ⅖ + ⅖.", answer: "⅘", time: 10 },
      { text: "A shape has 3 right angles and one angle greater than a right angle. What shape is it?", answer: "Right-angled trapezium", time: 10 }
    ]
  },
  5: {
    title: "Assessment 5",
    questions: [
      { text: "4 × 8 = ?", answer: "32", time: 5 },
      { text: "What is 90 – 6?", answer: "84", time: 5 },
      { text: "What is one tenth of 70?", answer: "7", time: 5 },
      { text: "£3.40 + £1 equals?", answer: "£4.40", time: 5 },
      { text: "How many hours in 3 days?", answer: "72", time: 5 },
      { text: "25 + 9 = ?", answer: "34", time: 5 },
      { text: "Write five hundred and eighteen in numerals.", answer: "518", time: 5 },
      { text: "64 ÷ 8 = ?", answer: "8", time: 5 },
      { text: "358 + ? = 640", answer: "282", time: 10 },
      { text: "7 × 6 + 8 = ?", answer: "50", time: 10 },
      { text: "Order from smallest: ⅓, ½, ¼.", answer: "¼, ⅓, ½", time: 10 },
      { text: "A ribbon 60 cm long is cut into 5 equal pieces. How long is each piece?", answer: "12 cm", time: 10 }
    ]
  },
  6: {
    title: "Assessment 6",
    questions: [
      { text: "3 × 8 = ?", answer: "24", time: 5 },
      { text: "Count on 50 from 320.", answer: "370", time: 5 },
      { text: "What is ⅖ of 10?", answer: "4", time: 5 },
      { text: "£10 minus £7.65 equals?", answer: "£2.35", time: 5 },
      { text: "How many days in a week and a half?", answer: "10½ days", time: 5 },
      { text: "42 ÷ 6 = ?", answer: "7", time: 5 },
      { text: "Round 289 to the nearest 100.", answer: "300", time: 5 },
      { text: "What is 14 more than 99?", answer: "113", time: 5 },
      { text: "705 – 327 = ?", answer: "378", time: 10 },
      { text: "9 × 4 ÷ 2 = ?", answer: "18", time: 10 },
      { text: "Add ⅙ + ⅙ + ⅙.", answer: "½", time: 10 },
      { text: "A train leaves at 09:25 and arrives at 10:03. How long is the journey?", answer: "38 minutes", time: 10 }
    ]
  }
};
```

---

## Critical Implementation Notes for Cursor AI

### **Text-to-Speech Requirements:**
```javascript
// TTS must read each question EXACTLY twice
// Timer starts ONLY after second reading completes
function readQuestionTwice(questionText) {
  return new Promise((resolve) => {
    const utterance = new SpeechSynthesisUtterance(questionText);
    utterance.rate = 0.8; // Slightly slower for children
    
    let readCount = 0;
    utterance.onend = () => {
      readCount++;
      if (readCount === 1) {
        // Read second time
        speechSynthesis.speak(utterance);
      } else {
        // Start timer after second reading
        resolve();
      }
    };
    
    speechSynthesis.speak(utterance);
  });
}
```

### **Timer Logic:**
- Questions 1-8: 5 seconds each
- Questions 9-12: 10 seconds each
- Show transition screen before question 9 with "Begin" button
- Timer must be visually prominent with countdown
- Auto-advance when timer reaches zero

### **Results Display for Teachers:**
- Student name and timestamp
- Assessment number and title
- All 12 questions with student answers
- Correct answers shown alongside
- Clear ✓/✗ indicators
- Score: X/12 (XX%)
- Format optimized for screenshots/printing

### **Mobile-First Design:**
- Large touch targets (minimum 44px)
- Clear, readable fonts
- High contrast colors
- Works in portrait mode
- Number input keyboards on mobile

---

## Start with Phase 1, Task 1.1!
Begin by creating the basic HTML structure with responsive design and Web Speech API integration.