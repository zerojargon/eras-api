# Readme

[![Greenkeeper badge](https://badges.greenkeeper.io/zerojargon/eras-api.svg)](https://greenkeeper.io/)

## What is this?
The API designed to front the product library for Eras of Style. A simple CRUD API with products, categories and images.
For protected routes, it uses JWT authentication.
For image manipulation, it uses the sharp library.

## Endpoints
`* within a payload denotes a required property`
### General
```
  POST: /token
  payload: {
    email: example@test.com, // email of user
    password: password // password of user
  }
```
This returns the JWT for consumption on protected endpoints

```
  POST: /users
  payload: {
    email: 'example@test.com', // email of user
    password: 'password' // password of user
  }
```
Creates a new user (protected endpoint)

### Products
```
  GET: /products
  query: {
    limit: 25, // limits the resultset
    offset: 0, // offset the resultset
    orderBy: ['name', 'publishedAt'], // array of properties to order results by. Default of ID
    orderDirection: ['DESC'], // array of ASC / DESC, matching key of orderBy. Default of ASC
  }
```
Returns a list of products

```
  GET: /products/{id}
  query: {
    include: ['image', 'category'] // array of linked resources to include
  }
```
Returns a single product

```
  POST: /products/
  payload: {
    name*: 'productName',
    stockCode: 'ABC01',
    price: '10000', // prices are inserted in pence
    discountedPrice: 8000,
    description: 'Awesome product you probably want',
    primaryImageId: 1,
    width: 150 , // dimensions are inserted in cm
    height: 200 , // dimensions are inserted in cm
    depth: 30 , // dimensions are inserted in cm
    publishedAt: '2016-12-25 00:00:00', // a datetime in ISO format to publish the product
    categoryIds: [1, 2] // an array of categoryIds to attach the product to
  }
```
Creates a product

```
  PATCH: /products/{id}
  payload: {
    name*: 'productName',
    stockCode: 'ABC01',
    price: 10000, // prices are inserted in pence
    discountedPrice: 8000,
    description: 'Awesome product you probably want',
    primaryImageId: 1,
    width: 150 , // dimensions are inserted in cm
    height: 200 , // dimensions are inserted in cm
    depth: 30 , // dimensions are inserted in cm
    publishedAt: '2016-12-25 00:00:00', // a datetime in ISO format to publish the product
    categoryIds: [1, 2] // an array of categoryIds to attach the product to
  }
```
Updates a product

```
  DELETE: /products/{id}
```
Soft-deletes a product

### Categories
```
  GET: /categories
  query: {
    limit: 25, // limits the resultset
    offset: 0, // offset the resultset
    orderBy: ['name'], // array of properties to order results by. Default of ID
    orderDirection: ['DESC'], // array of ASC / DESC, matching key of orderBy. Default of ASC
  }
```
Returns a list of categories

```
  GET: /categories/{id}
  query: {
    include: ['product'] // array of linked resources to include
  }
```
Returns a single category

```
  POST: /categories/
  payload: {
    name*: 'categoryName'
  }
```
Creates a category

```
  PATCH: /categories/{id}
  payload: {
    name*: 'categoryName'
  }
```
Updates a category

```
  DELETE: /categories/{id}
```
Soft-deletes a category

### Images

```
  GET: /images/{id}/{fileName?}
  query: {
    width: 250, // width of image to return
    height: 400 // height of image to return
  }
```
Returns a single image. This endpoint creates an image with the dimensions in the query, and will re-use that created image on each subsequent request for the same image with the same dimensions.

```
  POST: /images/
  payload: {
    image*: file, // the image to be uploaded
    productIds: [1, 3] // an array of products to attach the image to
  }
```

## Issues

Please see the github issues at https://github.com/zerojargon/eras-api/issues
