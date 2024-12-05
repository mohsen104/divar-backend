# Divar Backend Project

A backend service for managing categories, options, user authentication, and other core functionalities for a marketplace-like application.


## 📜 Features
- **Authentication**: 
  - Login with OTP, check OTP, and logout functionalities.
- **Category Management**: 
  - Create, fetch, and delete categories.
- **Option Management**: 
  - Add, update, fetch, and delete options for categories.
- **User Profile**: 
  - Fetch user profile information.
- **API Documentation**: 
  - Swagger documentation for all endpoints.


## 🚀 Technologies Used
- **Node.js**: Runtime environment.
- **Express.js**: Web framework.
- **MongoDB**: NoSQL database (via Mongoose).
- **JWT**: Authentication tokens.
- **Swagger UI**: API documentation.
- **Multer**: File uploads.
- **dotenv**: Environment variable management.


## 🔧 Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/mohsen104/divar-backend.git
   cd divar-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```env
   PORT
   NODE_ENV
   MONGODB_URL
   JWT_SECRET_KEY
   COOKIE_SECRET_KEY
   MAP_IR_URL
   MAP_API_KEY
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Access the Swagger documentation at:
   ```
   http://localhost:3000/api-docs
   ```

## 📘 API Documentation

API documentation is available through Swagger at `/api-docs`.

### Authentication
- **POST** `/auth/send-otp`: Login with OTP.
- **POST** `/auth/check-otp`: Verify OTP for login.
- **GET** `/auth/logout`: Logout user.

### Category Management
- **POST** `/category`: Create a new category.
- **GET** `/category`: Fetch all categories.
- **DELETE** `/category/{id}`: Delete a category by ID.

### Option Management
- **POST** `/option`: Create a new option for a category.
- **GET** `/option`: Fetch all options.
- **PUT** `/option/{id}`: Update an option by ID.
- **DELETE** `/option/{id}`: Delete an option by ID.
- **GET** `/option/by-category/{categoryId}`: Fetch options for a category by ID.
- **GET** `/option/by-category-slug/{slug}`: Fetch options for a category by slug.

### User Profile
- **GET** `/user/whoami`: Fetch current user profile.