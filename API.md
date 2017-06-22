#API Documentation

## Table of Contents

- **[Authentication]($authentication)**
  - [`POST /api/auth/login`](#login)
- **[Tickets](#tickets)**
  - [`GET /api/tickets/:id`](#get-tickets)
  - [`POST /api/tickets`](#create-ticket)
  - [`PUT /api/tickets/:id`](#update-ticket)
- **[Users](#users)**
  - [`GET /api/users/:id`](#get-user)
  - [`POST /api/users`](#create-user)
  - [`PUT /api/users/:id`](#update-user)
  - [`DELETE /api/users/:id`](#delete-user)

## Authentication

### Login

`POST` `api/auth/login`

## Tickets

### Get Tickets

`GET` `api/tickets`

Returns JSON data for a all tickets.
  
#### Parameters:

None

#### Data:

None

#### Response:

```
Status Code: 200 OK
Content-Type: application/json
```

```json
[
  {
    "id": 1,
    "username": "davidvassett",
    "firstName": "David",
    "lastName": "Vassett",
    "role": "admin"
  },
  {
    "id": 2,
    "username": "ericmai",
    "firstName": "Eric",
    "lastName": "Mai",
    "role": "admin"
  }
]
```

#### Example:

```js
$.ajax({
  url: 'api/tickets',
  type: 'GET',
  success: function(data) {
    console.log(data);
  }
});
```

### Create Ticket

Creates a single ticket.

`POST` `api/tickets`
  
##### Parameters:

None

#### Data:

```json
{
  "user_id": 1,
  "description": "Ticket description goes here.",
  "category": "Node",
  "status": "Opened"
}
```

#### Response:

```
Status Code: 201 CREATED
```

#### Example:

```js
$.ajax({
  url: 'api/tickets',
  type: 'POST',
  data: {
    user_id: 1,
    description: 'Ticket description goes here.',
    category: 'Node',
    status: 'Opened'
  },
  success: function(data) {
    console.log(data);
  }
});
```

### Update Ticket

Updates a single ticket.

`PUT` `api/tickets/:id`
  
#### Parameters:

* ##### Required:
 
  `id={integer}`

#### Data:

```json
{
  "user_id": 1,
  "description": "Ticket description goes here.",
  "category": "Node",
  "status": "Closed"
}
```

#### Response:

```
Status Code: 200 OK
```

#### Example:

```js
$.ajax({
  url: 'api/tickets/:id',
  type: 'PUT',
  data: {
    user_id: 1,
    description: 'Ticket description goes here.',
    category: 'Node',
    status: 'Closed'
  },
  success: function(data) {
    console.log(data);
  }
});
```

## Users

### Get User

`GET` `api/users/:id`

Returns JSON data for a single user.
  
#### Parameters:

* ##### Required:
 
  `id={integer}`

#### Data:

  None

#### Response:

```
Status Code: 200 OK
Content-Type: application/json
```

```json
[
  {
    "id": 1,
    "username": "davidvassett",
    "firstName": "David",
    "lastName": "Vassett",
    "role": "admin"
  }
]
```

#### Example:

```js
$.ajax({
  url: 'api/users/1',
  type: 'GET',
  success: function(data) {
    console.log(data);
  }
});
```

### Create User

Creates a single user.

`POST` `api/users`
  
##### Parameters:

None

#### Data:

```json
{
  "username": "davidvassett",
  "password": "password",
  "firstName": "David",
  "lastName": "Vassett",
  "role": "admin"
}
```

#### Response:

```
Status Code: 201 CREATED
```

#### Example:

```js
$.ajax({
  url: 'api/users',
  type: 'POST',
  data: {
    username: 'davidvassett',
    password: 'password',
    firstName: 'David',
    lastName: 'Vassett',
    role: 'admin'
  },
  success: function(data) {
    console.log(data);
  }
});
```

### Update User

Updates a single user.

`PUT` `api/users/:id`
  
#### Parameters:

* ##### Required:
 
  `id={integer}`

#### Data:

```json
{
  "username": "davidvassett",
  "password": "password",
  "firstName": "David",
  "lastName": "Vassett",
  "role": "admin"
}
```

#### Response:

```
Status Code: 200 OK
```

#### Example:

```js
$.ajax({
  url: 'api/users/1',
  type: 'PUT',
  data: {
    username: 'davidvassett',
    password: 'password',
    firstName: 'David',
    lastName: 'Vassett',
    role: 'admin'
  },
  success: function(data) {
    console.log(data);
  }
});
```

### Delete User

Deletes a single user.

`DELETE` `api/users/:id`
  
#### Parameters:

* ##### Required:
 
  `id={integer}`

#### Data:

None

#### Response:

```
Status Code: 200 OK
```

#### Example:

```js
$.ajax({
  url: 'api/users/1',
  type: 'DELETE',
  success: function(data) {
    console.log(data);
  }
});
```
