# 🎾 Rule Quizzer – Adaptive Tennis Rules Quiz

A 10-question interactive tennis rules quiz designed to teach kids the fundamentals of tennis in a fun, adaptive way.

Built as part of a Software Engineering Internship assessment for a sports education game company.

🔗 **Live Demo:**  
👉 [View Deployed App](http://tennis-quiz-game.vercel.app/)

---

## 📌 Overview

**Rule Runner** is a web-based educational quiz application that:

- Teaches core tennis rules and scoring
- Adapts difficulty dynamically in real time
- Provides immediate, kid-friendly explanations
- Tracks progress and saves the last attempt locally
- Is modular and scalable for future multi-sport expansion

This project demonstrates strong front-end architecture, TypeScript usage, and adaptive logic implementation.

---

## 🎯 Features

### ✅ 10-Question Adaptive Quiz
- 3 difficulty levels: `Easy`, `Medium`, `Hard`
- Dynamic difficulty adjustment:
  - **2 correct answers in a row → increase difficulty**
  - **2 incorrect answers in a row → decrease difficulty**

### ✅ Immediate Feedback
- Visual correctness indicators
- Clear rule explanations after each answer

### ✅ Progress Tracking
- Question counter
- Score tracker
- Summary screen
- Last attempt saved in `localStorage`

### ✅ SPA Routing
- Home page
- Quiz page
- Summary page
- React Router with Vercel rewrite configuration

---

## 🛠 Tech Stack

| Technology | Purpose |
|------------|----------|
| **React** | UI Framework |
| **TypeScript** | Type safety & maintainability |
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
- Adaptive logic isolated in `/logic`
- Strong TypeScript typing across modules
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

