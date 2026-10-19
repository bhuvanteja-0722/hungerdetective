# The 4 PM Hunger Detective

A playable, mobile-first web quiz created for Steer Hackathon Problem Statement 1 (PS1).

**Contributor:** Bhuvan Teja Ponakala (solo contributor)

## Overview

The experience opens with: **“Your hunger is back at 4 PM. Which clue explains it?”** Users choose a familiar Indian food/routine context, select a GLP-1-related concern, answer a short myth-or-fact question, and receive an educational, non-diagnostic takeaway with practical questions to discuss with a qualified clinician.

The goal is to turn a cold advertisement into an interactive learning moment: provide useful information before asking for contact, capture what the user cares about, and offer a gentle handoff to Steer.

## Core journey

- Indian 4 PM hunger hook and familiar food/routine context
- Context selection and GLP-1 concern selection
- Myth-or-fact interaction with an educational explanation
- Personalised, non-diagnostic takeaway
- Clinician discussion questions
- Share-result action and Steer handoff
- Responsive mobile layout and bundled SVG food artwork
- No login required

## Safety and trust

This is an educational prototype, not a medical device or diagnostic tool. It does not recommend a specific medicine, promise weight loss, or determine treatment eligibility. Users should discuss treatment suitability with a qualified clinician.

## Run locally

Requirements: Python 3 (or another static HTTP server).

```bash
npm start
```

Then open <http://localhost:3000>.

Alternatively, from the project directory run:

```bash
python3 -m http.server 3000
```

## Deployment

This is a static website. It can be hosted with GitHub Pages from the repository root (Settings → Pages → Deploy from a branch → `main` → `/ (root)`). After GitHub finishes deployment, the site URL should be:

<https://bhuvanteja-0722.github.io/hungerdetective/>

## Tools and attribution

- **Solo contributor:** Bhuvan Teja Ponakala.
- **AI tool disclosure:** Manus AI was used to inspect, modify, style, package, and validate the HTML/CSS/JavaScript project and create the original bundled SVG food artwork.
- **Visual reference supplied by the contributor:** [Dribbble — Donut Delights Landing Page UI](https://dribbble.com/shots/25390229-Donut-Delights-Landing-Page-UI). Used for visual inspiration only; the final interface and artwork are original.
- **Product/problem-statement content:** Steer Hackathon PS1 brief supplied by the contributor.

No stock images, copied code, or third-party artwork were intentionally used, according to the contributor's project disclosure.
