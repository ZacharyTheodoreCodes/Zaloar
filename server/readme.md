link server: https://retailcms.zacharytheodore.site

## Endpoints

List of Available Endpoints:

Admin and Staff Endpoints:

- `POST /register`
- `POST /login`
- `POST /google-sign-in`
- `GET /products`
- `POST /products`
- `GET /products/:id`
- `PUT /products/:id`
- `PATCH /products/:id`
- `DELETE /products/:id`
- `GET /categories`
- `POST /categories`
- `PUT /categories/:id`
- `DELETE /categories/:id`
- `GET /histories`

Public Endpoints:

- `POST /pub/login`
- `POST /pub/register`
- `POST /pub/google-sign-in`
- `GET /pub/products`
- `GET /pub/products/:id`
- `GET /pub/categories`
- `GET /pub/bookmarks`
- `GET /pub/bookmarks/:ProductId`
- `DELETE /pub/bookmarks/:id`

## Admin and Staff Endpoints

### POST /register

#### Description

- Register a new account

#### Request

- Body

  ```json
  {
    "username": String,
    "email": String,
    "password": String,
    "phoneNumber": String,
    "address": String,
  }
  ```

#### Response

_201 - CREATED_

- Body
  ```json
  {
    "message": "user with email <email_name> and username <username> is created"
  }
  ```

_400 - Bad Request_

- Body

  ```json
  {
    "message": "Email and password is required"
  }
  ```

### POST /login

#### Description

- Login to be directed to home page

#### Request

- Body

  ```json
  {
    "email": String,
    "password": String,
  }
  ```

#### Response

_200 - OK_

- Body
  ```json
  {
  "access_token": String,
  "id" : Integer,
  "username" : String
  }
  ```

_401 - Unauthorized_

- Body

  ```json
  {
    "message": "Invalid email or password"
  }
  ```

### POST /google-sign-in

#### Description

- Sign in and Log in using google

#### Response

_200 - OK_

- Body
  ```json
  {
  "access_token": String,
  "id" : Integer,
  "username" : String,
  "role" : String,
  "email" : String
  }
  ```

### GET /products

#### Description

- Get all the products data

#### Request

- Headers

  ```json
  {
    "access_token": String,
  }
  ```

#### Response

_200 - OK_

- Body
  ```json
  {
    "message": "OK",
    "products": [
      ....,
      {
        "id": Integer,
        "name": String,
        "description": String,
        "price": Integer,
        "stock": Integer,
        "imgUrl": String,
        "categoryId": Integer,
        "authorId" : Integer,
        "createdAt" : Date,
        "updatedAt" : Date
      },
      ...
    ]
  }
  ```

### POST /products

#### Description

- Create a new product data

#### Request

- Headers

  ```json
  {
    "access_token": String,
  }
  ```

- Body

  ```json
  {
    "name": String,
    "description": String,
    "price": Integer,
    "stock": Integer,
    "imgUrl": String,
    "categoryId": Integer,

  }
  ```

#### Response

_201 - Created_

- Body
  ```json
  {
    "newProduct": {
    "id": Integer,
    "name": String,
    "description": String,
    "price": Integer,
    "stock": Integer,
    "imgUrl": String,
    "categoryId": Integer,
    "authorId" : Integer,
    "createdAt": Date,
    "updatedAt": Date
    }
  }
  ```

_400 - Bad Request_

- Body
  ```json
  {
    "error": {
      "message": String
    }
  }
  ```

### GET /products/:id

#### Description

- Get product data by id

#### Request

- Headers

  ```json
  {
    "access_token": String,
  }
  ```

- Params

  ```json
  {
    "id": Integer,
  }
  ```

#### Response

_200 - OK_

- Body

  ```json
  {
    "productById": {
    "id": Integer,
    "name": String,
    "description": String,
    "price": Integer,
    "stock": Integer,
    "imgUrl": String,
    "categoryId": Integer,
    "authorId" : Integer,
    "createdAt": Date,
    "updatedAt": Date
  }
  }
  ```

  _404 - Not Found_

- Body
  ```json
  {
    "statusCode": 404,
    "error": {
      "message": "Product not found"
    }
  }
  ```

### PUT /products/:id

#### Description

- Edit a product

#### Request

- Headers

  ```json
  {
    "access_token": String,
  }
  ```

- Params

  ```json
  {
    "id": Integer,
  }
  ```

- Body

  ```json
  {
    "name": String,
    "description": String,
    "price": Integer,
    "stock": Integer,
    "imgUrl": String,
    "categoryId": Integer,

  }
  ```

#### Response

_200 - OK_

- Body
  ```json
  {
    "message": "<product_name> has been edited successfully"
  }
  ```

_400 - Bad Request_

- Body
  ```json
  {
    "error": {
      "message": String
    }
  }
  ```

_403 - Forbidden_

- Body

  ```json
  {
    "message": "Forbidden"
  }
  ```

### PATCH /products/:id

#### Description

- Edit product's status

#### Request

- Body

  ```json
  {
  "status": String
  }
  ```

- Headers

  ```json
  {
    "access_token": String,
  }
  ```

- Params

  ```json
  {
    "id": Integer,
  }
  ```

#### Response

_200 - OK_

- Body
  ```json
  {
    "message": "<product_name> status has been modified"
  }
  ```

_400 - Bad Request_

- Body
  ```json
  {
    "error": {
      "message": String
    }
  }
  ```

_403 - Forbidden_

- Body

  ```json
  {
    "message": "Forbidden"
  }
  ```

### DELETE /products/:id

#### Description

- Remove a company data based on given id

#### Request

- Headers

  ```json
  {
    "access_token": String,
  }
  ```

- Params

  ```json
  {
    "id": Integer,
  }
  ```

#### Response

_200 - OK_

- Body
  ```json
  {
    "statusCode": 200,
    "message": "<product name> has been deleted"
  }
  ```

_404 - Not Found_

- Body
  ```json
  {
    "statusCode": 404,
    "error": {
      "message": "Product not found"
    }
  }
  ```

_403 - Forbidden_

- Body

  ```json
  {
    "message": "Forbidden"
  }
  ```

### GET /categories

#### Description

- Get all categories

#### Request

- Headers

  ```json
  {
    "access_token": String,
  }
  ```

#### Response

_200 - OK_

- Body
  ```json
  {
    "categories": [
      ....,
      {
        "id": Integer,
        "name": String,
        "createdAt" : Date,
        "updatedAt" : Date
      },
      ...
    ]
  }
  ```

### POST /categories

#### Description

- Create a new category

#### Request

- Headers

  ```json
  {
    "access_token": String,
  }
  ```

- Body

  ```json
  {
    "name": String,
  }
  ```

#### Response

_201 - Created_

- Body
  ```json
  {
    "newCategory": {
    "id": Integer,
    "name": String,
    "createdAt": Date,
    "updatedAt": Date
    }
  }
  ```

_400 - Bad Request_

- Body
  ```json
  {
    "error": {
      "message": String
    }
  }
  ```

### PUT /categories/:id

#### Description

- Edit a category by given id

#### Request

- Headers

  ```json
  {
    "access_token": String,
  }
  ```

- Params

  ```json
  {
    "id": Integer,
  }

  ```

- Body

  ```json
  {
    "name": String,
  }
  ```

#### Response

_200 - Ok_

- Body
  ```json
  {
    "message": "<category_name> success to edit"
  }
  ```

_400 - Bad Request_

- Body
  ```json
  {
    "error": {
      "message": String
    }
  }
  ```

### DELETE /categories/:id

#### Description

- Remove a category based on given id

#### Request

- Headers

  ```json
  {
    "access_token": String,
  }
  ```

- Params

  ```json
  {
    "id": Integer,
  }
  ```

#### Response

_200 - Ok_

- Body
  ```json
  {
    "message": "<category_name> success to delete"
  }
  ```

_404 - Not Found_

- Body
  ```json
  {
    "statusCode": 404,
    "error": {
      "message": "Category not found"
    }
  }
  ```

### GET /histories

#### Description

- Get all the histories data

#### Request

- Headers

  ```json
  {
    "access_token": String,
  }
  ```

#### Response

_200 - OK_

- Body
  ```json
  {
    "categories": [
      ....,
      {
        "id": Integer,
        "title": String,
        "description": String,
        "updatedBy": String,
        "createdAt": Date,
        "updatedAt": Date
      },
      ...
    ]
  }
  ```

## Public Endpoints

### POST /pub/login

#### Description

- login for customer

#### Request

- Body

  ```json
  {
    "email": String,
    "password": String,
  }
  ```

#### Response

_200 - OK_

- Body

  ```json
  {
  "access_token": String,
  "id" : Integer,
  "email" : String,
  "role" : String
  }
  ```

  _401 - Unauthorized_

- Body

  ```json
  {
    "message": "Invalid email or password"
  }
  ```

### POST /pub/register

#### Description

- Register a new account for customer

#### Request

- Body

  ```json
  {
    "email": String,
    "password": String
  }
  ```

#### Response

_201 - CREATED_

- Body
  ```json
  {
    "message": "Register success"
  }
  ```

_400 - Bad Request_

- Body

  ```json
  {
    "message": "Email and password is required"
  }
  ```

### POST /google-sign-in

#### Description

- Sign in and Log in using google

#### Response

_200 - OK_

- Body
  ```json
  {
  "access_token": String,
  "id" : Integer,
  "username" : String,
  "role" : String,
  "email" : String
  }
  ```

### GET /pub/products

#### Description

- Get all the active products data

#### Request

- Query

  ```json
  {
    "name": String,
    "categoryId" : Integer,
    "page": Integer
  }
  ```

#### Response

_200 - OK_

- Body
  ```json
  {
    "products": [
      ....,
      {
        "id": Integer,
        "name": String,
        "description": String,
        "price": Integer,
        "stock": Integer,
        "imgUrl": String,
        "categoryId": Integer,
        "authorId" : Integer,
        "status" : "Active",
        "createdAt" : Date,
        "updatedAt" : Date,
        "Category" :{
          "id": Integer,
          "name" : String,
          "createdAt" : Date,
          "updatedAt" : Date,
        }
      },
      ...
    ],
    "total" : Integer
  }
  ```

### GET /pub/products/:id

- Get product data by id

#### Request

- Params

  ```json
  {
    "id": Integer,
  }
  ```

#### Response

_200 - OK_

- Body

  ```json
  {
    "product": {
    "id": Integer,
    "name": String,
    "description": String,
    "price": Integer,
    "stock": Integer,
    "imgUrl": String,
    "categoryId": Integer,
    "authorId" : Integer,
    "status" : "Active",
    "createdAt": Date,
    "updatedAt": Date,
    "Category" :{
      "id": Integer,
      "name" : String,
      "createdAt" : Date,
      "updatedAt" : Date,
    }
  },
  "qr": <SVG>
  }
  ```

  _404 - Not Found_

- Body
  ```json
  {
    "message": "Product not found"
  }
  ```

### GET /pub/categories

#### Description

- Get all categories

#### Response

_200 - OK_

- Body
  ```json
  {
    "categories": [
      ....,
      {
        "id": Integer,
        "name": String,
        "createdAt" : Date,
        "updatedAt" : Date
      },
      ...
    ]
  }
  ```

### GET /pub/bookmarks

#### Description

- Get all customers' bookmarks

#### Request

- Headers

  ```json
  {
    "access_token": String,
  }
  ```

#### Response

_200 - OK_

- Body
  ```json
  {
    "bookmarks": [
      ....,
      {
        "id": Integer,
        "CustomerId": Integer,
        "ProductId" : Integer,
        "createdAt" : Date,
        "updatedAt" : Date,
        "Product" :{
          "id" :Integer,
          "name" : String,
         "description": String,
          "price": Integer,
          "stock": Integer,
          "imgUrl": String,
          "categoryId": Integer,
          "authorId" : Integer,
          "status" : "Active",
          "createdAt": Date,
          "updatedAt": Date,
          "Category" :{
              "id": Integer,
              "name" : String,
              "createdAt" : Date,
              "updatedAt" : Date,
          }
        }
      },
      ...
    ]
  }
  ```

_401 - Unauthorized_

- Body

  ```json
  {
    "message": String

  }
  ```

### POST /pub/bookmarks/:ProductId

#### Description

- Add new product to the bookmark

#### Request

- Headers

  ```json
  {
    "access_token": String,
  }
  ```

- Params

  ```json
  {
    "ProductId": Integer,
  }

  ```

#### Response

_200 - Ok_

- Body
  ```json
  {
    "message": "<product_name> added to bookmark"
  }
  ```

_400 - Bad Request_

- Body
  ```json
  {
    "message": String
  }
  ```

### DELETE /pub/bookmarks/:id

#### Description

- Remove product from a bookmark based on given id

#### Request

- Headers

  ```json
  {
    "access_token": String,
  }
  ```

- Params

  ```json
  {
    "id": Integer,
  }
  ```

#### Response

_200 - Ok_

- Body
  ```json
  {
    "message": "<product_name> success to delete"
  }
  ```

_404 - Not Found_

- Body
  ```json
  {
    "message": "Product not found"
  }
  ```

### Global Errors

#### Response

_401 - Unauthorized_

- Body

  ```json
  {
    "message": "Invalid email or password"
  }
  ```

_500 - Internal Server Error_

- Body
  ```json
  {
    "statusCode": 500,
    "error": {
      "message": "Internal Server Error"
    }
  }
  ```
