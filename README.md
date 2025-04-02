# MuBA
# Music Booking App API

## Overview
The **Music Booking App API** is a backend service for managing artist profiles, event listings, and booking transactions. It provides secure authentication, database integration with Prisma, and a well-structured RESTful API for seamless interaction.

## Features
- **User Authentication** (JWT-based authentication)
- **Artist Profiles** (Create and manage artist details)
- **Event Listings** (CRUD operations for events)
- **Booking Transactions** (Manage event bookings)
- **Secure API Access**

## Tech Stack
- **Node.js** (Backend runtime)
- **Express.js** (Framework for API routing)
- **Prisma** (ORM for database management)
- **PostgreSQL** (Relational database)
- **JWT** (Authentication & security)
- **Multer** (For image/file uploads)
- **dotenv** (Environment variable management)

## Installation

### Prerequisites
- **Node.js** (v18+ recommended)
- **PostgreSQL** database
- **npm**  installed

### Steps
1. **Clone the repository:**
   ```sh
   git clone https://github.com/eyimofet/muba.git
   cd music-booking-app
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Set up environment variables:**
   Create a `env_config.json` file in the root directory and add:
   ```env
    "ENV":"test",
    "PORT":5001,
    "DATABASE_URL":"",

    "JWT_SECRET_KEY": "",
    "JWT_EXPIRES_IN": ,
    "BCRYPT_HASH_SALT_VALUE": ,

    "GOOGLE_DRIVE_PHOTO_UPLOAD_FOLDER_ID_LIVE":"",
    "GOOGLE_DRIVE_PHOTO_UPLOAD_FOLDER_ID_TEST":""

   ```

   Get a google account service key, rename to 'google_service_key.json' in root directory
4. **Run database migrations:**
   ```sh
   npx prisma migrate dev --name init
   ```
5. **Start the server:**
   ```sh
   npm start
   ```

## API Endpoints and Documentations
https://documenter.getpostman.com/view/15065406/2sB2cSg3KK



## Contributing
1. **Fork the repository**
2. **Create a new branch** (`feature/your-feature`)
3. **Commit changes** (`git commit -m "Add new feature"`)
4. **Push branch** (`git push origin feature/your-feature`)
5. **Open a pull request**

## License
This project is licensed under the **MIT License**.

## Contact
For inquiries, reach out via tuoyocliffordeyimofe@gmail.com or open an issue on GitHub.



