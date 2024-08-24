# Authentication Project

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Requirements](#requirements)
- [How to Run](#how-to-run)
  - [Using Docker](#using-docker)
- [Documentation](#documentation)
- [Contributors](#contributors)
- [License](#license)

## Overview

This project provides a user authentication system using JWT, including user registration, login, and code verification. It consists of a backend built with Spring Boot and a frontend built with Angular.

## Features

- User Registration: Users can register for a new account.
- Email Validation: Accounts are activated using secure email validation codes.
- User Authentication: Existing users can log in to their accounts securely.

## Project Structure

- **backend/**: Contains all the backend code developed with Spring Boot.
- **frontend/**: Contains all the frontend code developed with Angular.

## Requirements

- **Docker**: Required for running the database and MailDev or all project.

## How to Run

To get started with thi project, follow the setup instructions in the respective directories:

- [Backend Setup Instructions](/backend/README.md)
- [Frontend Setup Instructions](/frontend//README.md)


##### OR

### Using Docker

1. Clone this repository:
   ```bash
   git clone https://github.com/VictorSVilela/auth-jwt-spring-angular.git
   cd project

2. Start services using Docker:
   ```bash
   docker-compose up -d

## Documentation

- **Swagger UI**: The backend documentation can be accessed at http://localhost:8080/swagger-ui.html after starting the backend.
- **OpenAPI**: The OpenAPI specification can be accessed at http://localhost:8080/v3/api-docs.

## Contributors

- [Victor Vilela](https://github.com/VictorSVilela)

## License

This project is licensed under the Apache License 2.0. See the [LICENSE](LICENSE) file for details.

