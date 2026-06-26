# React + FastAPI CRUD App

A simple full-stack CRUD application built with **React** and **FastAPI** to learn frontend-backend communication using REST APIs.

## Features

* Create new fruits
* View all fruits
* Edit existing fruits
* Delete fruits
* Loading state while fetching data
* Error handling with retry option
* Optimistic UI updates
* Keyboard shortcuts

  * `Enter` → Save changes
  * `Esc` → Cancel editing

---

## Tech Stack

### Frontend

* React
* Axios
* JavaScript
* Vite

### Backend

* FastAPI
* Pydantic
* Uvicorn
* Python

---

## Project Structure

```
react-fastapi-crud/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── FruitList.jsx
│   │   │   └── AddFruitForm.jsx
│   │   └── api.js
│   └── package.json
│
├── backend/
│   └── main.py
│
└── README.md
```

---

## API Endpoints

| Method | Endpoint       | Description    |
| ------ | -------------- | -------------- |
| GET    | `/fruits`      | Get all fruits |
| POST   | `/fruits`      | Add a fruit    |
| PUT    | `/fruits/{id}` | Update a fruit |
| DELETE | `/fruits/{id}` | Delete a fruit |

---

## Getting Started

### Backend

Create a virtual environment and install dependencies.

```bash
pip install fastapi uvicorn
```

Run the server.

```bash
python main.py
```

Backend runs on:

```
http://localhost:8000
```

---

### Frontend

Install dependencies.

```bash
npm install
```

Install Axios.

```bash
npm install axios
```

Start the development server.

```bash
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

## Learning Objectives

This project helped me learn:

* React Components
* Props
* useState
* useEffect
* Controlled Forms
* REST API Integration
* Axios
* FastAPI
* Pydantic Models
* CRUD Operations
* CORS Configuration
* Error Handling
* Loading States
* Optimistic UI Updates

---

## Future Improvements

* Connect to PostgreSQL instead of in-memory storage
* Add authentication
* Dockerize the application
* Pagination
* Search and filtering
* Unit and integration tests
* Deploy frontend and backend
* CI/CD using GitHub Actions

---

## Author

**Ashutosh Narayan**
