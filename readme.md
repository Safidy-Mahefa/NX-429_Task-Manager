# NX-429 - Task Manager

## Overview

**NX-429 - Task Manager** started as a small exercise to practice JavaScript exception handling (`try...catch...finally`) but evolved into a fully functional, interactive task management app.

This project demonstrates **object-oriented programming in JavaScript**, robust error handling, and modern UI design with **Bootstrap 5**. It allows users to **add, edit, delete, and complete tasks**, each with a name, due date, priority, and status.

> Note: The JSON export feature is fully implemented in the class method, but the front-end integration to trigger it is not yet active.

---

## Features

* **Add Tasks**: Quickly create tasks with name, due date, and priority.
* **Edit Tasks**: Modify task details safely with validation.
* **Delete Tasks**: Remove tasks with confirmation and notifications.
* **Mark as Done**: Toggle tasks between "in progress" and "completed" statuses.
* **Dynamic UI Updates**: Task list updates automatically on every action.
* **Bootstrap Styling**: Modern card-based layout, responsive design, interactive buttons.
* **Toast Notifications**: Real-time feedback for every user action.
* **JSON Export (Backend Ready)**: Generate a clean JSON representation of all tasks using the class method (front-end button not yet implemented).

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/NX-429-Task-Manager.git
```

2. Open `index.html` in your browser.

3. Make sure to include the following dependencies (already linked in the project):

* Bootstrap 5 CSS & JS
* Bootstrap Icons
* Google Fonts: Inter

---

## Usage

1. Fill the form to add a new task.
2. Tasks will appear in the list with priority and status.
3. Use the **check button** to mark a task as completed.
4. Use the **trash button** to delete a task.
5. All actions trigger **toast notifications** for feedback.

> JSON export can currently be tested via the class method in the console, but there is no front-end button yet.

---

## Learning Points

This project was a great exercise for:

* Practicing **JavaScript classes** and **OOP concepts**.
* Handling errors gracefully with `try...catch...finally`.
* Building **dynamic and interactive DOM manipulation**.
* Implementing a modern, responsive UI with **Bootstrap 5**.

---

## Tech Stack

* **JavaScript (ES6)** – Classes, exception handling, DOM manipulation
* **HTML5 & CSS3** – Semantic markup and styling
* **Bootstrap 5** – Responsive layout, cards, buttons, toasts
* **Bootstrap Icons** – Interactive icons
* **Google Fonts (Inter)** – Modern typography

---

## Contributing

This is a personal learning project, but feel free to fork and improve:

* Add **drag & drop task reordering**
* Implement a **backend for persistence**
* Enhance **UI/UX** with animations or dark mode
* Add a **front-end button to export tasks as JSON**

---

## License

MIT License © 2025 – [Your Name]

---

**NX-429 - Task Manager** – a small practice project that turned into a functional, clean, and modern task manager app. Perfect for learning **JS exception handling**, **OOP**, and **front-end interactivity**. JSON export is ready in the class method, waiting for a front-end inte
