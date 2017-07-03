#API Documentation

## Table of Contents

- **[Tickets](#tickets)**
  - [`GET /api/tickets/:id`](#get-tickets)
  - [`POST /api/tickets`](#create-ticket)
  - [`PUT /api/tickets/:id`](#update-ticket)
- **[Users](#users)**
  - [`GET /api/users/:id`](#get-user)
  - [`POST /api/users`](#create-user)

## Tickets

### Get Tickets

`GET` `api/tickets`

Returns JSON data for all tickets.
  
#### Parameters:

* ##### Required:
 
  `id={integer}` - The users id
  
  `role={string}` - The users role
  
* ##### Optional:
 
  `category={string}`
  
  `status={string}`
  
  `timeWindow={timestamp}`
  

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
    "description": "Ticket description goes here",
    "category": "React",
    "status": "Opened",
    "location": "HR8-01",
    "claimedBy": "2",
    "createdAt": "2017-07-01 18:00:00.000",
    "claimedAt": "2017-07-01 18:15:00.000",
    "closedAt": "2017-07-01 18:30:00.000",
    "updatedAt": "2017-07-01 18:30:00.000",
    "user": {},
    "userClaimed": {}
  },
  {
    "id": 2,
    "description": "Ticket description goes here",
    "category": "MySQL",
    "status": "Claimed",
    "location": "HR8-02",
    "claimedBy": "3",
    "createdAt": "2017-07-01 18:00:00.000",
    "claimedAt": "2017-07-01 18:15:00.000",
    "closedAt": null,
    "updatedAt": "2017-07-01 18:15:00.000",
    "user": {},
    "userClaimed": {}
  }
]
```

#### Example:

```js
$.ajax({
  url: 'api/tickets',
  type: 'GET',
  data: {
  	id: 1,
  	role: 'admin',
  	category: 'React',
  	status: 'Closed'
  }
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
  "status": "Opened",
  "location": "HR8-01"
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
    status: 'Opened',
    location: 'HR8-01'
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
  "status": "Closed",
  "location": "HR8-01"
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
    status: 'Closed',
    location: 'HR8-01'
  },
  success: function(data) {
    console.log(data);
  }
});
```

## Users

### Get User

`GET` `api/users/:id`

Returns JSON data for the logged in user.
  
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
  }
]
```

#### Example:

```js
$.ajax({
  url: 'api/users',
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
  "role": "admin",
  "cohort": "HRSF77"
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
    role: 'admin',
    cohort: 'HRSF77'
  },
  success: function(data) {
    console.log(data);
  }
});
```
