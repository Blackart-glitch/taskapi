# Table of Contents

- [Todo API Service](#todo-api)
  - [Endpoints](#endpoints)
    - [Create a New Todo](#create-a-new-todo)
    - [Get All Todos for the Logged-in User](#get-all-todos-for-the-logged-in-user)
    - [Update a Todo](#update-a-todo)
    - [Delete a Todo](#delete-a-todo)
    - [Add or Update Subtask in a Todo](#add-or-update-subtask-in-a-todo)
    - [Delete a Subtask from a Todo](#delete-a-subtask-from-a-todo)
    - [Search and Filter Todos](#search-and-filter-todos)
- [User API Service](#user-api-service)
  - [User Registration](#user-registration)
  - [User Login](#user-login)
  - [User Logout](#user-logout)
- [Authentication](#authentication)
- [License](#license)

# Todo API

This is an API service for managing todos, built with Node.js and Express.js. The API provides endpoints to create, read, update, and delete todos. JWT authentication is required for all endpoints.

## Endpoints

### Create a New Todo
- URL: `/api/todos`
- Method: POST
- Auth required: Yes

Request Body:
```json
{
    "title": "Buy groceries",
    "description": "Buy milk, bread, and eggs",
    "due_date": "2024-07-01T00:00:00.000Z",
    "priority": "high",
    "subtasks": [
        { "title": "Buy milk", "completed": false },
        { "title": "Buy bread", "completed": false }
    ]
}
```

Response:
```json
{
    "_id": "60d21b4667d0d8992e610c85",
    "userId": "60d21b4067d0d8992e610c84",
    "title": "Buy groceries",
    "description": "Buy milk, bread, and eggs",
    "due_date": "2024-07-01T00:00:00.000Z",
    "priority": "high",
    "subtasks": [
        { "_id": "subtask_id", "title": "Buy milk", "completed": false },
        { "_id": "subtask_id", "title": "Buy bread", "completed": false }
    ],
    "completed": false,
    "createdAt": "2024-06-23T12:00:00.000Z",
    "updatedAt": "2024-06-23T12:00:00.000Z"
}
```

### Get All Todos for the Logged-in User
- URL: `/api/todos`
- Method: GET
- Auth required: Yes

Response:
```json
[
    {
        "_id": "60d21b4667d0d8992e610c85",
        "userId": "60d21b4067d0d8992e610c84",
        "title": "Buy groceries",
        "description": "Buy milk, bread, and eggs",
        "due_date": "2024-07-01T00:00:00.000Z",
        "priority": "high",
        "subtasks": [
            { "_id": "subtask_id", "title": "Buy milk", "completed": false },
            { "_id": "subtask_id", "title": "Buy bread", "completed": false }
        ],
        "completed": false,
        "createdAt": "2024-06-23T12:00:00.000Z",
        "updatedAt": "2024-06-23T12:00:00.000Z"
    },
    ...
]
```

### Update a Todo
- URL: `/api/todos/:id`
- Method: PUT
- Auth required: Yes

Request Body:
```json
{
    "title": "Buy groceries and fruits",
    "description": "Buy milk, bread, eggs, and bananas",
    "due_date": "2024-07-02T00:00:00.000Z",
    "priority": "high",
    "completed": true,
    "subtasks": [
        { "_id": "subtask_id", "title": "Buy milk", "completed": true },
        { "_id": "subtask_id", "title": "Buy bread", "completed": true }
    ]
}
```

Response:
```json
{
    "_id": "60d21b4667d0d8992e610c85",
    "userId": "60d21b4067d0d8992e610c84",
    "title": "Buy groceries and fruits",
    "description": "Buy milk, bread, eggs, and bananas",
    "due_date": "2024-07-02T00:00:00.000Z",
    "priority": "high",
    "subtasks": [
        { "_id": "subtask_id", "title": "Buy milk", "completed": true },
        { "_id": "subtask_id", "title": "Buy bread", "completed": true }
    ],
    "completed": true,
    "createdAt": "2024-06-23T12:00:00.000Z",
    "updatedAt": "2024-06-23T12:00:00.000Z"
}
```

### Delete a Todo
- URL: `/api/todos/:id`
- Method: DELETE
- Auth required: Yes

Response:
```json
{
    "msg": "Todo removed"
}
```

### Add or Update Subtask in a Todo
- URL: `/api/todos/:id/subtasks`
- Method: POST
- Auth required: Yes

Request Body:
```json
{
    "title": "Buy bananas"
}
```

Response:
```json
{
    "_id": "60d21b4667d0d8992e610c85",
    "userId": "60d21b4067d0d8992e610c84",
    "title": "Buy groceries and fruits",
    "description": "Buy milk, bread, eggs, and bananas",
    "due_date": "2024-07-02T00:00:00.000Z",
    "priority": "high",
    "subtasks": [
        { "_id": "subtask_id", "title": "Buy milk", "completed": true },
        { "_id": "subtask_id", "title": "Buy bread", "completed": true },
        { "_id": "subtask_id", "title": "Buy bananas", "completed": false }
    ],
    "completed": true,
    "createdAt": "2024-06-23T12:00:00.000Z",
    "updatedAt": "2024-06-23T12:00:00.000Z"
}
```

### Delete a Subtask from a Todo
- URL: `/api/todos/:id/subtasks/:subtaskId`
- Method: DELETE
- Auth required: Yes

Response:
```json
{
    "_id": "60d21b4667d0d8992e610c85",
    "userId": "60d21b4067d0d8992e610c84",
    "title": "Buy groceries and fruits",
    "description": "Buy milk, bread, eggs, and bananas",
    "due_date": "2024-07-02T00:00:00.000Z",
    "priority": "high",
    "subtasks": [
        { "_id": "subtask_id", "title": "Buy bread", "completed": true },
        { "_id": "subtask_id", "title": "Buy bananas", "completed": false }
    ],
    "completed": true,
    "createdAt": "2024-06-23T12:00:00.000Z",
    "updatedAt": "2024-06-23T12:00:00.000Z"
}
```

### Search and Filter Todos
To be implemented.

# User API Service

## Endpoints

### User Registration
- URL: `/api/users/register`
- Method: POST
- Auth required: No

Request Body:
```json
{
  "username": "johndoe",
  "email": "johndoe@example.com",
  "password": "securepassword123"
}
```

Response:
```json
{
  "token": "your_jwt_token",
  "user": {
    "_id": "60d21b4667d0d8992e610c85",
    "username": "johndoe",
    "email": "johndoe@example.com",
    "createdAt": "2024-06-23T12:00:00.000Z",
    "updatedAt": "2024-06-23T12:00:00.000Z"
  }
}
```

### User Login
- URL: `/api/users/login`
- Method: POST
- Auth required: No

Request Body:
```json
{
  "email": "johndoe@example.com",
  "password": "securepassword123"
}
```

Response:
```json
{
  "token": "your_jwt_token",
  "user": {
    "_id": "60d21b4667d0d8992e610c85",
    "username": "johndoe",
    "email": "johndoe@example.com",
    "createdAt": "2024-06-23T12:00:00.000Z",
    "updatedAt": "2024-06-23T12:00:00.000Z"
  }
}
```