# Kambaz Next.js Application

This project is a Next.js web application for the Kambaz project, which includes a series of lab exercises. Below is an overview of the project structure and its components.

## Project Structure

```
kambaz-next-app
├── src
│   ├── app
│   │   ├── page.tsx          # Landing page for the Kambaz application
│   │   ├── Labs
│   │   │   ├── Lab1
│   │   │   │   └── page.tsx  # Content for Lab 1
│   │   │   ├── Lab2
│   │   │   │   └── page.tsx  # Content for Lab 2
│   │   │   └── Lab3
│   │   │       └── page.tsx  # Content for Lab 3
│   │   ├── Kambaz
│   │   │   └── page.tsx      # Kambaz application page
│   │   └── layout.tsx        # Layout for the application
│   └── components
│       └── Navbar.tsx        # Navigation component
├── public
│   └── favicon.ico           # Favicon for the application
├── package.json              # NPM configuration file
├── tsconfig.json             # TypeScript configuration file
└── README.md                 # Project documentation
```

## Features

- **Landing Page**: Displays your full name and section, links to each lab assignment, a link to the Kambaz application, and links to relevant source code repositories.
- **Lab Assignments**: Each lab has its own page with detailed content and a link back to the landing page.
- **Kambaz Application**: A dedicated page for the Kambaz application with navigation options.

## Getting Started

1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd kambaz-next-app
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Run the development server:
   ```
   npm run dev
   ```
5. Open your browser and go to `http://localhost:3000` to view the application.

## Links

- [Lab 1](src/app/Labs/Lab1/page.tsx)
- [Lab 2](src/app/Labs/Lab2/page.tsx)
- [Lab 3](src/app/Labs/Lab3/page.tsx)
- [Kambaz Application](src/app/Kambaz/page.tsx)
- [Source Code Repository](<repository-url>)

## Author

Your Full Name  
Section: CS5016 Fall 2025