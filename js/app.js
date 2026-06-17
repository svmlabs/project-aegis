// ===========================================
// PROJECT: SVM Labs // Project Aegis
// FEATURE: Client-Side Metrics Injection Engine
// AUTHOR: Associate Front-End Engineer
// ===========================================

const verifyButton = document.getElementById("verify-btn");
const articleInput = document.getElementById("article-input");
const resultsPanel = document.getElementById("results-panel");

verifyButton.addEventListener("click", function() {
  const textData = articleInput.value.trim();
  
  // Edge case safety handler
  if (textData === "") {
    resultsPanel.innerHTML =`
    <div class="report-card"
style="border-left-color: #ef4444;">
    <h4 style="color: #ef4444;">SYSTEM NOTICE</h4>
    <p class="metric-line">Submission aborted. Content workplace cannot be blank.</p>
    </div>`;
  return;
  }
  
  // 1. Text Metrics Calculations
  const totalWords = textData.split(/\s+/).length;
  const readingTime = Math.ceil(totalWords/200);
  
  // NEW UPGRADE METRICS
  const totalCharacters = textData.length;
  const totalParagraphs = textData.split("\n").filter(p=> p.trim() !== "").length;
  
  // 2. Security Compliance Logic (Ported from our Python blueprint)
  const bannedKeywords = ["SHOCKING", "BUY", "FREE", "MIRACLE"];
  let isSecurityViolation = false;
  let caughtWord ="";
  
  // Clean and split the incoming text to check individual words
  const upperCaseTextArray = textData.toUpperCase().split(/\s+/);
  
  for (let i =0; i < upperCaseTextArray.length; i++) {
    if (bannedKeywords.includes(upperCaseTextArray[i]))
    {
      isSecurityViolation = true;
      caughtWord = upperCaseTextArray[i];
      break; // Stop scanning immediately once a violation is flagged
    }
  }
  
  // 3. Determine Final Status Badges & Styles Dynamically
  let securityStatusText = "PASSED (Compliance Cleared)";
  let securityColor = "#38bdf8"; // Standard Blueprint Blue
  
  if (totalWords < 10) {
    securityStatusText = "REJECTED (Insufficient Length)";
    securityColor = "#ef4444"; // Alert Red
  } else if (isSecurityViolation) {
    securityStatusText =`REJECTED (Flagged Phrase: "${caughtWord}")`;
    securityColor = "#f59e0b"; // Warning Amber Orange
  }
  
  // 4. Inject Unified Enterprise Report Template
  resultsPanel.innerHTML = `
  <div class="report-card"
  style="border-left-color: ${securityColor};">
    <h4>Core Architecture Logistics Report</h4>
    <div class="metric-line">Analysis Target:
    <span>Active Manuscript Block</span></div>
    <div class="metric-line">Total Word Count: <span>${totalWords} words</span></div>
    <div class="metric-line">Total Characters: <span>${totalCharacters}</span></div>
    <div class="metric-line">Paragraph Count: <span>${totalParagraphs} block(s)</span></div>
    
    
    
    <div class="metric-line">Est. Reading Time: <span>~ ${readingTime} minute(s)</span></div>
    <div class="metric-line">Security Pipeline: <span style="color: ${securityColor};">${securityStatusText}</span></div>
    </div>
    `;
});