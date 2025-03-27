# User Registration Endpoint Documentation

## Endpoint: `/users/register`

### Description

This endpoint is used to register a new user in the system. It validates the input data, creates a new user in the database, and returns a success response along with an authentication token.

---

### HTTP Method

`POST`

---

### Request Body

The following fields are required in the request body:

| Field       | Type   | Required | Description                                    |
| ----------- | ------ | -------- | ---------------------------------------------- |
| `firstname` | String | Yes      | The first name of the user (min 2 chars).      |
| `lastname`  | String | No       | The last name of the user (min 2 chars).       |
| `email`     | String | Yes      | The email address of the user (must be valid). |
| `password`  | String | Yes      | The password for the user (min 6 chars).       |

Example JSON:

```json
{
  "firstname": "John",
  "lastname": "Doe",
  "email": "john.doe@example.com",
  "password": "securepassword"
}
```

---

### Response

#### Success Response

- **Status Code:** `201 Created`
- **Body:**
  ```json
  {
    "success": true,
    "message": "User created successfully",
    "data": {
      "user": {
        "_id": "64b7f9c2e4b0f5a1d8c9e123",
        "fullname": {
          "firstname": "John",
          "lastname": "Doe"
        },
        "email": "john.doe@example.com",
        "createdAt": "2023-10-01T12:00:00.000Z",
        "updatedAt": "2023-10-01T12:00:00.000Z"
      },
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
  }
  ```

#### Validation Error Response

- **Status Code:** `400 Bad Request`
- **Body:**
  ```json
  {
    "success": false,
    "errors": {
      "email": { "msg": "Invalid email" },
      "firstname": { "msg": "First name must be at least 2 characters" },
      "password": { "msg": "Password must be at least 6 characters" }
    }
  }
  ```

#### Server Error Response

- **Status Code:** `500 Internal Server Error`
- **Body:**
  ```json
  {
    "common": { "msg": "An unexpected error occurred" }
  }
  ```

---

### Notes

- The `password` field is hashed before being stored in the database.
- The `token` returned in the response can be used for authentication in subsequent requests.
- Ensure the `email` provided is unique, as duplicate emails will result in an error.

---

### User Login Endpoint Documentation

## Endpoint: `/login`

### Description

This endpoint allows a user to log in using their email and password. Upon successful authentication, it returns the user's details along with a JWT token for subsequent requests.

---

### HTTP Method

`POST`

---

### Request Body

The following fields are required in the request body:

| Field      | Type   | Required | Description                                    |
| ---------- | ------ | -------- | ---------------------------------------------- |
| `email`    | String | Yes      | The email address of the user (must be valid). |
| `password` | String | Yes      | The password for the user.                     |

Example JSON:

```json
{
  "email": "john.doe@example.com",
  "password": "securepassword"
}
```

---

### Response

#### Success Response

- **Status Code:** `200 OK`
- **Body:**
  ```json
  {
    "success": true,
    "message": "Login successful",
    "data": {
      "user": {
        "_id": "64b7f9c2e4b0f5a1d8c9e123",
        "fullname": {
          "firstname": "John",
          "lastname": "Doe"
        },
        "email": "john.doe@example.com",
        "createdAt": "2023-10-01T12:00:00.000Z",
        "updatedAt": "2023-10-01T12:00:00.000Z"
      },
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
  }
  ```

#### Validation Error Response

- **Status Code:** `400 Bad Request`
- **Body:**
  ```json
  {
    "success": false,
    "errors": {
      "email": { "msg": "Email is required" },
      "password": { "msg": "Password is required" }
    }
  }
  ```

#### Unauthorized Error Response

- **Status Code:** `401 Unauthorized`
- **Body:**
  ```json
  {
    "success": false,
    "message": "Invalid email or password"
  }
  ```

#### Server Error Response

- **Status Code:** `500 Internal Server Error`
- **Body:**
  ```json
  {
    "common": { "msg": "An unexpected error occurred" }
  }
  ```

---

### Notes

- The `token` returned in the response can be used for authentication in subsequent requests.
- Ensure the `email` and `password` provided are correct, as invalid credentials will result in an error.
- The endpoint uses secure hashing to validate the password against the stored hash.

---
