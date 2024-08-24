# Backend - Authentication Project

This directory contains the backend of the authentication project, developed with Spring Boot. It provides an API for user registration, login, and JWT-based authentication.

## Technologies Used

- **Spring Boot 3**: Main framework for the application.
- **Spring Security 6**: For security and authentication.
- **JWT Token Authentication**: For secure, token-based authentication.
- **Spring Data JPA**: For data access and database integration.
- **OpenAPI and Swagger UI**: For API documentation.
- **Docker**: Used for running the database and MailDev services.

## Requirements

- **Java 17+**
- **Maven 3.8+**
- **Docker**: Required for the database and MailDev.

## Setup and Execution

1. Start the database and MailDev services using Docker:
   ```bash
   docker-compose up -d
   
2. Navigate to the backend directory:
   ```bash
   cd backend

3. Run the Spring Boot application:
   ```bash
   ./mvnw spring-boot:run

4. Access the Swagger UI documentation at http://localhost:8080/swagger-ui.html.

## Docker Services

- **Database**: The database (e.g., PostgreSQL) is run in a Docker container.
- **MailDev**: MailDev is used to capture and inspect emails sent by the application, including verification codes. It can be accessed at http://localhost:1080.

## Endpoints
- **/api/auth/register**: User registration.
- **/api/auth/login**: User login.
- **/api/auth/activate-account**: Code verification.

## Documentation
- **Swagger UI**: http://localhost:8080/swagger-ui.html
- **OpenAPI**: http://localhost:8080/v3/api-docs
