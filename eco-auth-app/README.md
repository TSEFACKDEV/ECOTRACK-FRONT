# Eco Auth App

## Overview
Eco Auth App is a React application that provides authentication features including user registration and login. It utilizes Redux for state management and Formik with Yup for form handling and validation.

## Features
- User registration and login
- Role-based access control (Admin and Citizen)
- Responsive design with a navigation header
- Form validation using Yup
- State management with Redux

## Project Structure
```
eco-auth-app
├── src
│   ├── api
│   │   └── authApi.ts          # API calls for authentication
│   ├── app
│   │   └── store.ts            # Redux store configuration
│   ├── components
│   │   ├── Header.tsx          # Navigation header component
│   │   ├── Login.tsx           # Login form component
│   │   └── Register.tsx        # Registration form component
│   ├── features
│   │   └── auth
│   │       ├── authSlice.ts    # Redux slice for authentication
│   │       └── authTypes.ts     # TypeScript types for authentication
│   ├── hooks
│   │   └── useAuth.ts          # Custom hook for authentication
│   ├── utils
│   │   └── validationSchemas.ts # Validation schemas for forms
│   ├── App.tsx                 # Main application component
│   ├── index.tsx               # Entry point of the application
│   └── react-app-env.d.ts      # TypeScript definitions for React
├── public
│   └── index.html              # Main HTML file
├── package.json                 # Project metadata and dependencies
├── tsconfig.json               # TypeScript configuration
└── README.md                   # Project documentation
```

## Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd eco-auth-app
   ```
3. Install dependencies:
   ```
   npm install
   ```

## Usage
1. Start the development server:
   ```
   npm start
   ```
2. Open your browser and navigate to `http://localhost:3000`.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License
This project is licensed under the MIT License.