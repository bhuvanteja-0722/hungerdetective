# TODO — The 4 PM Hunger Detective

## 1. Build the playable quiz journey

- [x] Open with the hook “Your hunger is back at 4 PM. Which clue explains it?” and a familiar Indian 4 PM scene featuring chai, biscuits, namkeen, samosas, office routines, commutes, and late-night food delivery. Evidence: `index.html`, `styles.css`.
- [x] Let users select a relatable hunger context without asking for login, weight, a photo, or a medical decision. Evidence: `app.js` context screen.
- [x] Let users select one main GLP-1 concern: safety, muscle loss, weight regain, diabetes eligibility, or whether treatment is relevant to them. Evidence: `app.js` concern data.
- [x] Show one short myth-or-fact interaction tailored to the selected concern, with an immediate educational explanation. Evidence: `app.js` answer screen.
- [x] Show a personalised, non-diagnostic result connecting the selected context and concern. Evidence: `app.js` result screen.
- [x] Provide practical, concern-specific questions the user can take to a clinician. Evidence: result question box in `app.js`.
- [x] Carry the selected concern into the handoff interface. Evidence: `app.js` handoff tag and success state.

## 2. Apply health, trust, and accessibility guardrails

- [x] Make clear throughout that the quiz is educational, prescription treatments are not suitable for everyone, and a clinician must assess treatment suitability. Evidence: safety notes in `index.html` and `app.js`.
- [x] Do not promote a specific medicine, imply eligibility, promise weight loss, show before/after bodies, or diagnose the user. Evidence: copy and result guardrails in `app.js`.
- [x] Use large tap targets, concise single-purpose screens, visible progress feedback, strong contrast, clear focus states, semantic controls, screen-reader-friendly labels, and reduced-motion support. Evidence: `styles.css`, `index.html`, `app.js`.

## 3. Deliver a fast, reusable web prototype

- [x] Keep the core journey completable in 30–60 seconds on mobile with lightweight HTML, CSS, and JavaScript. Evidence: `package.json`, mobile preview.
- [x] Serve `/manus-routes.json` with the complete page route set. Evidence: root `manus-routes.json` returns HTTP 200 on port 3000.
- [x] End in a shareable result-card presentation with two natural handoff actions: “See if a Steer programme could fit you” and “Talk to a Steer doctor about my question.” Evidence: result and handoff screens in `app.js`.
- [x] Configure the project for a static build and verify the preview server on port 3000. Evidence: `package.json`, HTTP 200 preview response.
