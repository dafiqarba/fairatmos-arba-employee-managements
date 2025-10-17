# Fairatmos - Frontend Technical Test (React + TS)

A small and simple Employee Managements web application.

## Live Demo

[Employee Management](https://fairatmos-arba-employee-managements.vercel.app/)

## Features

- Table with Client-side pagination.
- "Add Employee" modal form with validation (React Hook Form + Zod)
- TanStack Query for data fetching
- **UX**: responsive page, loading skeletons, error handling, and success notification.

## Tech Stacks
- React.js + Typescript + Vite
- Tailwind CSS
- React Hook Form + Zod
- TanStack Query 

## Setup and Run Locally

```bash
npm i
cp .env.example .env  

# edit .env for the API base URL and Signature

npm run dev
```

## Project Structure

```
src/     
├── styles/       # global styles
├── pages/        # Employee Management Page
├── types/        # Global reusable type definition
├── utils/        # Function helpers
├── config/       # Configuration-related
├── components/
│   ├── common/   # Shared components like Button, Tag, etc
```



