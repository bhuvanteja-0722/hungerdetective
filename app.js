const contexts = {
  chai: {
    icon: "☕",
    title: "Chai, biscuit or samosa break",
    note: "The 4 PM classic",
    short: "chai + snack break",
    scene: "The chai break is a clue—not a verdict. Let’s look at the question behind it."
  },
  desk: {
    icon: "⌁",
    title: "I graze between calls or tasks",
    note: "Desk-side bites",
    short: "between-task grazing",
    scene: "Busy days can make food cues feel noisy. Your question is still worth unpacking."
  },
  commute: {
    icon: "↗",
    title: "I grab something during my commute",
    note: "Quick and convenient",
    short: "on-the-go eating",
    scene: "A quick bite on the move is real life. Now let’s make the next conversation useful."
  },
  night: {
    icon: "☾",
    title: "Late-night delivery is my weak spot",
    note: "The long-day encore",
    short: "late-night cravings",
    scene: "Long days leave clues. A good plan should fit your routine—not fight it."
  }
};

const concerns = {
  safety: {
    icon: "✦",
    title: "Is it safe?",
    note: "I want the full picture before I consider anything.",
    question: "A clinician should check whether a GLP-1 programme is appropriate before it starts.",
    answer: "Fact",
    resultTitle: "Your top question: is it right for you?",
    resultCopy: "GLP-1 treatment is not a one-size-fits-all shortcut. A clinician needs to review your health history, medicines, goals and relevant tests before recommending a programme.",
    questions: ["What would an evaluation look at for someone like me?", "How would side effects or other medicines be monitored?", "What support would sit alongside any treatment?"],
    takeaway: "Suitability comes before a prescription."
  },
  muscle: {
    icon: "◒",
    title: "Will I lose muscle?",
    note: "I care about what the scale cannot show.",
    question: "A structured programme should care about body composition, nutrition and resistance exercise—not only scale weight.",
    answer: "Fact",
    resultTitle: "Your top question: protecting muscle",
    resultCopy: "The useful conversation is not only “How much weight can I lose?” It also includes body composition, nutrition, protein and strength-building—because muscle protection needs a plan, not a promise.",
    questions: ["How will my body composition be monitored?", "What nutrition and resistance-training plan could suit me?", "What should I discuss if side effects affect eating or activity?"],
    takeaway: "The scale is one signal, not the whole story."
  },
  regain: {
    icon: "↺",
    title: "Will the weight come back?",
    note: "I want something that makes sense long term.",
    question: "Everyone automatically keeps the weight off after stopping treatment.",
    answer: "Myth",
    resultTitle: "Your top question: what happens long term",
    resultCopy: "Individual outcomes vary. A thoughtful programme should include habits, follow-up, nutrition, activity and a personalised maintenance plan—not just a starting prescription.",
    questions: ["What would my long-term maintenance plan include?", "How would progress be reviewed over time?", "What support is available if my hunger or routine changes?"],
    takeaway: "Long-term care deserves a plan from day one."
  },
  diabetes: {
    icon: "＋",
    title: "Is it only for diabetes?",
    note: "The headlines have left me unsure.",
    question: "GLP-1 medicines are only for people with diabetes.",
    answer: "Myth",
    resultTitle: "Your top question: what is actually relevant?",
    resultCopy: "Some GLP-1 medicines may be prescribed for different clinical indications. The right decision depends on the specific medicine, your health history and a clinician’s assessment—it cannot be decided by a quiz.",
    questions: ["Which health factors would a clinician review?", "What tests or measurements could be relevant for me?", "What non-medication support would be part of the programme?"],
    takeaway: "Headlines are not a clinical assessment."
  },
  relevant: {
    icon: "?",
    title: "Is it even relevant to me?",
    note: "I’m curious, but I do not want a sales pitch.",
    question: "A quiz can tell you whether a prescription treatment is right for you.",
    answer: "Myth",
    resultTitle: "Your top question: what fits your life",
    resultCopy: "A quiz can help you name your questions, but it cannot diagnose you or decide on treatment. A clinician needs to understand your health, goals, routines and relevant measurements.",
    questions: ["What would make a programme appropriate—or not appropriate—for me?", "How would my goals and routine shape the plan?", "What should I know before making a decision?"],
    takeaway: "Curiosity is a good start. Clinical context comes next."
  }
};

const state = { screen: 1, context: null, concern: null, answer: null, submitted: false, hinglish: false };
const quizContent = document.getElementById("quizContent");
const progressStep = document.getElementById("progressStep");
const progressLabel = document.getElementById("progressLabel");
const progressBar = document.getElementById("progressBar");
const progressSlash = document.getElementById("progressSlash");
const progressTotal = document.getElementById("progressTotal");
const sceneCaption = document.getElementById("sceneCaption");
const toast = document.getElementById("toast");
let hasRenderedOnce = false;

const contextChoices = Object.entries(contexts).map(([key, item]) => `
  <button class="choice" type="button" data-choice-context="${key}" aria-pressed="false">
    <span class="choice-icon" aria-hidden="true">${item.icon}</span>
    <span class="choice-copy"><span class="choice-title">${item.title}</span><span class="choice-note">${item.note}</span></span>
    <span class="choice-arrow" aria-hidden="true">›</span>
  </button>`).join("");

const concernChoices = Object.entries(concerns).map(([key, item]) => `
  <button class="choice" type="button" data-choice-concern="${key}" aria-pressed="false">
    <span class="choice-icon" aria-hidden="true">${item.icon}</span>
    <span class="choice-copy"><span class="choice-title">${item.title}</span><span class="choice-note">${item.note}</span></span>
    <span class="choice-arrow" aria-hidden="true">›</span>
  </button>`).join("");

function render() {
  if (state.screen === 1) renderContext();
  if (state.screen === 2) renderConcern();
  if (state.screen === 3) renderAnswer();
  if (state.screen === 4) renderResult();
  if (state.screen === 5) renderHandoff();
  updateProgress();
  updateScene();
  bindInteractions();
  const newHeading = document.getElementById("quiz-title");
  if (hasRenderedOnce && newHeading) newHeading.focus({ preventScroll: true });
  hasRenderedOnce = true;
}

function updateProgress() {
  const labels = { 1: "YOUR 4 PM MOMENT", 2: "THE QUESTION BEHIND IT", 3: "THE QUICK CHECK", 4: "YOUR TAKEAWAY", 5: "A GENTLE NEXT STEP" };
  const step = Math.min(state.screen, 3);
  const complete = state.screen > 3;
  progressStep.textContent = complete ? "✓" : String(step).padStart(2, "0");
  progressSlash.textContent = complete ? "" : "/";
  progressTotal.textContent = complete ? "DONE" : "03";
  progressLabel.textContent = labels[state.screen];
  progressBar.style.width = `${complete ? 100 : Math.min(step / 3, 1) * 100}%`;
}

function updateScene() {
  if (state.context && state.screen >= 2) sceneCaption.textContent = contexts[state.context].scene;
  else sceneCaption.textContent = "Real food. Real routines. Start with what feels familiar.";
}

function renderContext() {
  quizContent.innerHTML = `
    <div class="quiz-kicker">START WITH THE CLUE</div>
    <h2 class="quiz-title" id="quiz-title" tabindex="-1">It’s 4 PM. What feels most familiar?</h2>
    <p class="quiz-subtitle">No perfect answer. Choose the moment that sounds most like your day.</p>
    <div class="choice-list" role="group" aria-labelledby="quiz-title">${contextChoices}</div>
    <div class="nudge"><span class="nudge-mark" aria-hidden="true">↘</span><span><strong>Tap once.</strong> We’ll follow the question, not the judgement.</span></div>`;
}

function renderConcern() {
  quizContent.innerHTML = `
    <div class="quiz-kicker">YOUR QUESTION COUNTS</div>
    <h2 class="quiz-title" id="quiz-title" tabindex="-1">What are you most unsure about when you hear “GLP-1”?</h2>
    <p class="quiz-subtitle">Pick the question you would want answered first.</p>
    <div class="choice-list" role="group" aria-labelledby="quiz-title">${concernChoices}</div>
    <div class="nudge"><span class="nudge-mark" aria-hidden="true">✦</span><span><strong>${contexts[state.context].short}.</strong> Now let’s make it a useful conversation.</span></div>`;
}

function renderAnswer() {
  const item = concerns[state.concern];
  const answerSelected = state.answer !== null;
  const isCorrect = state.answer === item.answer;
  quizContent.innerHTML = `
    <div class="quiz-kicker">MYTH OR FACT?</div>
    <h2 class="quiz-title" id="quiz-title" tabindex="-1">Think like a detective.</h2>
    <p class="quiz-subtitle">${item.question}</p>
    <div class="choice-list" role="group" aria-label="Choose whether the statement is a myth or fact">
      ${["Fact", "Myth", "Not sure"].map(answer => `<button class="choice" type="button" data-answer="${answer}" aria-pressed="${state.answer === answer}"><span class="choice-icon" aria-hidden="true">${answer === "Fact" ? "✓" : answer === "Myth" ? "×" : "?"}</span><span class="choice-copy"><span class="choice-title">${answer}</span><span class="choice-note">Tap to reveal the useful part</span></span><span class="choice-arrow" aria-hidden="true">›</span></button>`).join("")}
    </div>
    ${answerSelected ? `<div class="answer-block ${isCorrect ? "correct" : "missed"}"><div class="answer-status"><span aria-hidden="true">${isCorrect ? "✓" : "✦"}</span>${isCorrect ? "GOOD DETECTIVE WORK" : "THE USEFUL ANSWER"}</div><p>${answerExplanation(item, isCorrect)}</p><div class="answer-actions"><button class="primary-button" type="button" data-action="result">See my takeaway <span aria-hidden="true">→</span></button><button class="secondary-button" type="button" data-action="back-concern">Change question</button></div></div>` : `<div class="nudge"><span class="nudge-mark" aria-hidden="true">?</span><span><strong>One tap.</strong> The answer comes with context.</span></div>`}`;
}

function answerExplanation(item, isCorrect) {
  if (state.concern === "diabetes") return "Not always. Some GLP-1 medicines may be prescribed for different clinical indications, but the specific medicine and your suitability must be assessed by a clinician.";
  if (state.concern === "regain") return "There is no automatic guarantee. Long-term outcomes vary, and habits, follow-up and an individual maintenance plan matter over time.";
  if (state.concern === "relevant") return "A quiz cannot decide whether prescription treatment is right for you. It can help you arrive at a clinician conversation with better questions.";
  if (state.concern === "muscle") return "A structured programme should look beyond the scale. Nutrition, resistance exercise, body composition and clinical monitoring all deserve a place in the conversation.";
  return "Fact. Prescription treatment should begin only after a clinician considers whether it is appropriate for you, including your health history, medicines and relevant measurements.";
}

function renderResult() {
  const item = concerns[state.concern];
  const context = contexts[state.context];
  quizContent.innerHTML = `
    <div class="result-card">
      <div class="result-top"><span class="result-badge"><span class="result-badge-dot" aria-hidden="true"></span> YOUR TAKEAWAY</span><button class="share-button" type="button" data-action="share">↗ Share result</button></div>
      <h2 class="result-title" id="quiz-title" tabindex="-1">${item.resultTitle}</h2>
      <div class="result-context"><span aria-hidden="true">${context.icon}</span> Your clue: ${context.short}</div>
      <p class="result-copy">${item.resultCopy}</p>
      <div class="question-box"><h3>Take these questions to a clinician</h3><ul>${item.questions.map(question => `<li>${question}</li>`).join("")}</ul></div>
      <div class="medical-note"><span class="medical-note-icon" aria-hidden="true">i</span><span>This quiz is for education, not diagnosis. Prescription treatments are not suitable for everyone. A qualified clinician must assess whether any treatment is appropriate for you.</span></div>
      <div class="result-actions"><button class="primary-button" type="button" data-action="handoff">See if a Steer programme could fit you <span aria-hidden="true">→</span></button><button class="secondary-button" type="button" data-action="handoff">Talk to a Steer doctor about my question</button></div>
    </div>`;
}

function renderHandoff() {
  const item = concerns[state.concern];
  quizContent.innerHTML = `
    <div class="handoff-card">
      <div class="result-badge"><span class="result-badge-dot" aria-hidden="true"></span> CONVERSATION STARTER</div>
      <h2 class="handoff-title" id="quiz-title" tabindex="-1">Let’s carry your question forward.</h2>
      <p class="handoff-copy">Your result can help a Steer doctor start with what matters to you—not with a generic explanation.</p>
      <div class="handoff-tag">Your concern · ${item.title}</div>
      <div class="form-stack" aria-label="Optional contact details">
        <label class="field-label" for="phone">Phone number <span>(optional for this prototype)</span><input class="field-input" id="phone" type="tel" placeholder="+91 98••••••••" inputmode="tel" /></label>
        <label class="field-label" for="time">Preferred conversation window <span>(optional)</span><select class="field-select" id="time"><option>Whenever works</option><option>Morning</option><option>Afternoon</option><option>Evening</option></select></label>
      </div>
      <p class="handoff-note">No login required. In the live experience, these details would go only to the Steer team so they can follow up on your selected question.</p>
      ${state.submitted ? `<div class="success-panel" role="status"><strong>Your question is ready to share.</strong><p>This prototype has kept your “${item.title.toLowerCase()}” concern attached to the handoff. That is the difference between a cold lead and a useful first conversation.</p></div>` : ""}
      <div class="handoff-actions"><button class="primary-button" type="button" data-action="submit">${state.submitted ? "Done" : "Share my question"} <span aria-hidden="true">→</span></button><button class="secondary-button" type="button" data-action="back-result">Back</button></div>
    </div>`;
}

function bindInteractions() {
  document.querySelectorAll("[data-choice-context]").forEach(button => button.addEventListener("click", () => {
    state.context = button.dataset.choiceContext;
    state.screen = 2;
    render();
  }));
  document.querySelectorAll("[data-choice-concern]").forEach(button => button.addEventListener("click", () => {
    state.concern = button.dataset.choiceConcern;
    state.answer = null;
    state.screen = 3;
    render();
  }));
  document.querySelectorAll("[data-answer]").forEach(button => button.addEventListener("click", () => {
    state.answer = button.dataset.answer;
    render();
  }));
  document.querySelectorAll("[data-action]").forEach(button => button.addEventListener("click", () => handleAction(button.dataset.action)));
}

function handleAction(action) {
  if (action === "result") { state.screen = 4; render(); }
  if (action === "handoff") { state.screen = 5; state.submitted = false; render(); }
  if (action === "back-concern") { state.screen = 2; render(); }
  if (action === "back-result") { state.screen = 4; render(); }
  if (action === "submit") {
    if (!state.submitted) { state.submitted = true; render(); showToast("Your question is ready to share."); }
    else { state.screen = 4; render(); }
  }
  if (action === "share") shareResult();
}

async function shareResult() {
  const item = concerns[state.concern];
  const message = `My top question is: ${item.title}. I took Steer’s 4 PM Hunger Detective quiz and got useful questions to discuss with a clinician.`;
  try {
    if (navigator.share) await navigator.share({ title: "The 4 PM Hunger Detective", text: message });
    else if (navigator.clipboard) { await navigator.clipboard.writeText(message); showToast("Result summary copied to your clipboard."); }
    else showToast("Your result is ready to share with Steer.");
  } catch (_) { /* User closed the share sheet. */ }
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("visible");
  window.clearTimeout(showToast.timeout);
  showToast.timeout = window.setTimeout(() => toast.classList.remove("visible"), 2800);
}

document.getElementById("restartButton").addEventListener("click", () => {
  state.screen = 1; state.context = null; state.concern = null; state.answer = null; state.submitted = false; render();
});

document.getElementById("languageToggle").addEventListener("click", (event) => {
  state.hinglish = !state.hinglish;
  event.currentTarget.setAttribute("aria-pressed", String(state.hinglish));
  showToast(state.hinglish ? "Hinglish mode is ready for the next content pass." : "English mode selected.");
});

render();
