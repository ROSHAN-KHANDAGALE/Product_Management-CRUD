# Product Management System

## Overview

This is a Product Management system built with React for the frontend and Node.js with Express for the backend. It allows users to register products, view them in a table, edit or delete them. The backend implements a full CRUD API for managing products.

## Features

- Add new products: Users can add a new product with details like product name, type, company, and price.
- View all products: Products are listed in a table format.
- Edit products: Existing products can be edited inline.
- Delete products: Products can be deleted from the list.
- Pagination: Supports paginated views of product data.

## Table of Contents

- Technologies Used
- Installation
- Running the App
- API Endpoints
- Frontend Components
- Backend Implementation

## Technologies Used

### Frontend

- React: A JavaScript library for building user interfaces.
- Axios: A promise-based HTTP client used to make API requests.
- React Bootstrap: For UI components and styling.
- React Pagination: For paginating product data.

### Backend

- Node.js: JavaScript runtime for server-side code.
- Express: Web framework for building REST APIs.
- MongoDB: NoSQL database for storing product data.

## Installation

### Prerequisites

- Node.js and npm installed on your machine.
- Required Packages are :
  - For the Frontend side:
    - Axios
    - react-bootstrap
  - For the Backend side:
    - express
    - cors
    - mongoose
    - nodemon
    - body-parser (optional)
- MongoDB instance running (locally or via a cloud provider like MongoDB Atlas).

### Clone the Repository

```
git clone https://github.com/your-username/product-management-system.git
cd product-management-system

```

### Install Frontend Dependencies

```
cd ../frontend
npm install
```

### Install Backend Dependencies

```
cd backend
npm install
```

## Running the App

### Backend Setup

1. Ensure your MongoDB is running and accessible.
2. Start the backend server:

```
cd backend
npm start
```

### Frontend Setup

1. Start the React frontend:

```
cd frontend
npm start
```

## Frontend Components

### 1. ProductRegisterForm.js

- A modal form for adding a new product to the system.
- Takes input fields for product name, type, company, and price.
- On submission, the data is sent to the backend using Axios to create a new product.

### 2. TableForm.js

- Displays all available products in a table.
- Users can edit or delete products directly from the table.
- Implements pagination to display a limited number of products per page.
- Includes inline editing for updating products.

### 3. BasicPagination.js

- A pagination component that helps navigate through the product list.

### 4. App.js

- The main entry point of the app. It combines the ProductRegisterForm and TableForm components to display the product registration form and the product list on the same page.

## Backend Implementation

The backend is built using Node.js and Express. It provides a RESTful API to manage product data with the following functionality:

- CRUD Operations:
  1. Create: Add new products.
  2. Read: Fetch all or individual products.
  3. Update: Modify product details.
  4. Delete: Remove products from the system.

## Future Enhancements

- User authentication for restricted access to product management.
- Filtering and sorting of products by type, company, or price.
- Improved error handling and validation for the product form.
