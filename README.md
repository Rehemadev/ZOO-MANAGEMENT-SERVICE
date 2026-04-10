# Zoo Management System 🐾

A full-stack, enterprise-grade Zoo Management platform designed for efficient tracking of animals, staff, health records, and visitor bookings. Featuring a modern Glassmorphism UI and a robust Spring Boot backend.

## 🌟 Key Features

### 🔐 Authentication & Security
- **JWT-Based Authentication**: Secure login and registration with JSON Web Tokens.
- **Role-Based Access Control (RBAC)**: Specific dashboards and permissions for **Admin**, **Zookeeper**, and **Visitor** roles.
- **CORS Configured**: Fully integrated and secure communication between the React frontend and Spring Boot backend.

### 🦁 Management Modules
- **Animal Inventory**: Comprehensive CRUD operations for zoo animals including name, species, age, and health metadata.
- **Health Records & Treatment**: Track medical history and treatments for every animal. 
- **Feeding Schedules**: Manage dietary needs and timing for the entire zoo population.
- **Visitor Bookings & Payments**: Seamless ticket booking for visitors with integrated mock payment tracking.

### ⚡ Advanced Business Logic & Features
- **Dynamic Filtering**: Robust search capabilities allowed by the API to filter animals by species or health status.
- **Automated Workflows**: Smart status updates! Adding a health record with keywords like *"recovered"* or *"sick"* automatically triggers a transactional update to the animal's status.
- **Data Integrity**: Full JSR-303/Jakarta Bean Validation ensuring all incoming JSON data is validated (emails, ticket counts, mandatory fields).
- **Global Exception Handling**: Detailed error reporting with field-level precision for a better developer and user experience.

---

## 🛠️ Tech Stack

### Backend
- **Framework**: Spring Boot 4.0.5
- **Security**: Spring Security, JJWT (v0.12.6)
- **Database**: MySQL with Hibernate/JPA
- **Validation**: Jakarta Bean Validation
- **Tools**: Lombok, Maven, Jakarta Persistence

### Frontend
- **Framework**: React + Vite
- **Styling**: Vanilla CSS (Custom Design System)
- **State Management**: React Hooks & Context API
- **HTTP Client**: Axios

---

## 🚀 Getting Started

### Prerequisites
- Java 17+
- MySQL Server (running on `localhost:3306`)
- Node.js (v18+)

### 1. Backend Setup
1. Clone the repository and navigate to the root directory.
2. Configure your MySQL credentials in `src/main/resources/application.properties`.
3. Create a database named `zoo_management`.
4. Run the application:
   ```bash
   ./mvnw spring-boot:run
   ```
   *The system automatically seeds initial roles (ADMIN, ZOOKEEPER, VISITOR) and starter animal data on the first run.*

### 2. Frontend Setup
1. Navigate to the `zoo-frontend` directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Access the app at `http://localhost:5173`.

---

## 👩‍💻 User Roles

| Role | Permissions |
| :--- | :--- |
| **Admin** | Full system access, manage staff, manage animals, view all bookings. |
| **Zookeeper** | Update animal health/feeding statuses, view animal list. |
| **Visitor** | View available animals, book tickets, view personal booking history. |

---

## 📝 License
This project is for educational purposes as part of the Year 2 Zoo Management Service project.
