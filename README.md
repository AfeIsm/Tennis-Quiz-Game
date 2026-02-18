# 🎾 Rule Quizzer – Adaptive Tennis Rules Quiz

A 10 question interactive tennis rules quiz made to teach people the rules of tennis in a fun way.


🔗 **Live Demo:**  
👉 [View Deployed App](http://tennis-quiz-game.vercel.app/)

---

## Overview

**Rule Quizzer** is a web-based educational quiz application that:

- Teaches core tennis rules and scoring
- Adapts difficulty of questions in real time
- Provides immediate, beginner explanations
- Tracks progress and saves the last attempt locally
- Its a modular format and scalable for multiple sports

---

## Features

### 10-Question Adaptive Quiz
- 3 difficulty levels: `Easy`, `Medium`, `Hard`
- Dynamic difficulty adjustment:
  - **2 correct answers in a row → increase difficulty**
  - **2 incorrect answers in a row → decrease difficulty**

### Immediate Feedback
- Visual correctness indicators
- Clear rule explanations after each answer

### Progress Tracking
- Question counter
- Score tracker
- Summary screen
- Last attempt saved in `localStorage`

### SPA Routing
- Home page
- Quiz page
- Summary page
- React Router with Vercel rewrite configuration

---

## Tech Stack

| Technology | Purpose |
|------------|----------|
| **React** | UI Framework |
| **TypeScript** | Type for safety & maintainability |
| **Vite** | Fast dev server & build tool |
| **React Router** | Client-side routing |
| **Vercel** | Deployment platform |

---

## 🧠 Architecture

src/

├── data/ # Question bank

├── logic/ # Adaptive difficulty + quiz engine

├── pages/ # Home, Quiz, Summary

├── types/ # TypeScript interfaces

├── App.tsx # Router configuration

└── main.tsx # Application entry point

### Design Principles

- Clear separation of UI and business logic
- Adaptive logic kept only in `/logic`
- Lots of TypeScript typing across modules
- Easily extendable for additional sports

---

## 🔁 Adaptive Difficulty Algorithm

```text
Start at EASY.

If 2 correct answers in a row:
    Increase difficulty one level.

If 2 incorrect answers in a row:
    Decrease difficulty one level.
```
### Running Locally
npm install
npm run dev

Then open:
http://localhost:5173

### Build for Production

npm run build

Production files are generated into: 
/dist

### Deployment
Deployed using Vercel

SPA rewrite configuration(vercel.json):
```
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```
### Future Improvements
- More Questions for rules
- Multiple choices for sports
- A backend API integration
- Player accounts and progress
- Leaderboard
- A more creative and eye catching UI design



