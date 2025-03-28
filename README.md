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

### User Profile Endpoint Documentation

## Endpoint: `/profile`

### Description

This endpoint retrieves the profile details of the authenticated user. It requires a valid JWT token to access.

---

### HTTP Method

`GET`

---

### Request Headers

The following header is required:

| Header          | Type   | Required | Description                     |
| --------------- | ------ | -------- | ------------------------------- |
| `Authorization` | String | Yes      | Bearer token for authentication |

Example Header:

```
Authorization: Bearer <your-jwt-token>
```

---

### Response

#### Success Response

- **Status Code:** `200 OK`
- **Body:**
  ```json
  {
    "success": true,
    "message": "User profile fetched successfully",
    "data": {
      "_id": "64b7f9c2e4b0f5a1d8c9e123",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com",
      "createdAt": "2023-10-01T12:00:00.000Z",
      "updatedAt": "2023-10-01T12:00:00.000Z"
    }
  }
  ```

#### Unauthorized Error Response

- **Status Code:** `401 Unauthorized`
- **Body:**
  ```json
  {
    "success": false,
    "message": "Authentication required"
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

- Ensure the `Authorization` header contains a valid JWT token.
- This endpoint is protected and requires the user to be authenticated.

---

### User Logout Endpoint Documentation

## Endpoint: `/logout`

### Description

This endpoint logs out the authenticated user by clearing the authentication token from the client.

---

### HTTP Method

`POST`

---

### Response

#### Success Response

- **Status Code:** `200 OK`
- **Body:**
  ```json
  {
    "success": true,
    "message": "User logged out successfully"
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

- This endpoint clears the authentication token from the client-side storage (e.g., cookies).
- No request body or headers are required for this endpoint.

---

## Captain Registration Endpoint Documentation

### Endpoint: `/captains/register`

### Description

This endpoint is used to register a new captain in the system. It validates the input data, creates a new captain in the database, and returns a success response along with an authentication token.

---

### HTTP Method

`POST`

---

### Request Body

The following fields are required in the request body:

| Field                 | Type   | Required | Description                                            |
| --------------------- | ------ | -------- | ------------------------------------------------------ |
| `fullname.firstname`  | String | Yes      | The first name of the captain (min 2 chars).           |
| `fullname.lastname`   | String | No       | The last name of the captain (min 2 chars).            |
| `email`               | String | Yes      | The email address of the captain (must be valid).      |
| `password`            | String | Yes      | The password for the captain (min 6 chars).            |
| `vehicle.color`       | String | Yes      | The color of the captain's vehicle.                    |
| `vehicle.plate`       | String | Yes      | The license plate of the captain's vehicle.            |
| `vehicle.capacity`    | Number | Yes      | The capacity of the captain's vehicle (min 1).         |
| `vehicle.vehicleType` | String | Yes      | The type of the vehicle (`car`, `motorcycle`, `auto`). |

Example JSON:

```json
{
  "fullname": {
    "firstname": "Jane",
    "lastname": "Doe"
  },
  "email": "jane.doe@example.com",
  "password": "securepassword",
  "vehicle": {
    "color": "Red",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  }
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
    "message": "Captain created successfully",
    "data": {
      "captain": {
        "_id": "64b7f9c2e4b0f5a1d8c9e456",
        "fullname": {
          "firstname": "Jane",
          "lastname": "Doe"
        },
        "email": "jane.doe@example.com",
        "vehicle": {
          "color": "Red",
          "plate": "ABC123",
          "capacity": 4,
          "vehicleType": "car"
        },
        "status": "active",
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
      "fullname.firstname": {
        "msg": "First name must be at least 2 characters"
      },
      "password": { "msg": "Password must be at least 6 characters" },
      "vehicle.color": { "msg": "Vehicle color is required" }
    }
  }
  ```

#### Conflict Error Response

- **Status Code:** `409 Conflict`
- **Body:**
  ```json
  {
    "success": false,
    "message": "Email already exists"
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
- Ensure the `email` and `vehicle.plate` provided are unique, as duplicates will result in an error.
- The `vehicle.vehicleType` must be one of the following: `car`, `motorcycle`, or `auto`.
