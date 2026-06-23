# AI Powered Recipe Finder

A full-stack AI-powered recipe finder application built with React, FastAPI, SQLAlchemy, and SQLite.

## Features

* User authentication with JWT
* AI recipe generation
* Favorites management
* Cooking history tracking
* Pagination
* Responsive UI with Tailwind CSS

## Tech Stack

### Frontend

* React
* Vite
* Tailwind CSS

### Backend

* FastAPI
* SQLAlchemy
* JWT Authentication

### Database

* SQLite

## Environment Variables

Create a `.env` file inside the backend folder and add:

* SECRET_KEY
* DATABASE_URL
* GROQ_API_KEY
* PEXELS_API_KEY
* PEXELS_API_URL

## Run Locally

Frontend:

npm install
npm run dev

Backend:

pip install -r requirements.txt
uvicorn main:app --reload
