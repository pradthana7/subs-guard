# Auth & Subscription API

A Subscription Reminder API that automatically sends email notifications **7, 5, 2, and 1 days before auto-renewal**.
Built with **Node.js**, secured with **JWT authentication**, and powered by **Upstash** for scheduling reminder workflows to help users avoid unexpected charges.

---

## Base URL

```text
https://pradthana-subs-guard.vercel.app
```
## API Overview
## Authentication
| Method | Endpoint               | Description         | Auth Required |
|-------:|------------------------|---------------------|---------------|
|   POST | `/api/v1/auth/sign-up` | Register a new user | No            |
|   POST | `/api/v1/auth/sign-in` | Authenticate user   | No            |

## Subscription

| Method | Endpoint                         | Description                      | Auth Required |
|-------:|----------------------------------|----------------------------------|---------------|
|    GET | `/api/v1/subscriptions/user/:id` | Get all subscriptions for a user | Yes           |
|   POST | `/api/v1/subscriptions`          | Subscribe to a plan              | Yes           |

## Workflow
| Method | Endpoint                                  | Description                                                                         |
|-------:|-------------------------------------------|-------------------------------------------------------------------------------------|
|   POST | `/api/v1/workflows/subscription/reminder` | Trigger automated email reminders before subscription renewal (7, 5, 2, and 1 days) |
**Note:** This workflow is triggered internally and does not need to be called directly by clients.

## Authentication

### Sign Up
```text
Method: POST
Endpoint: /api/v1/auth/sign-up
``` 
#### Request Body
```json
{
  "name": "User Example",
  "email": "user@example.com",
  "password": "StrongPassword123"
}

```
##### Example Response
```json
{
  "success": true,
  "message": "User successfully created",
  "data": {
    "accessToken": "jwt_access_token_here",
    "user": {
      "id": "65a63e9bfa8c2e0012abc123",
      "name": "User Example",
      "email": "user@example.com",
      "createdAt": "2026-01-16T03:21:02.001Z"
    }
  }
}

```
---
### Sign In
#### Request Body
```json
{
  "email": "user@example.com",
  "password": "StrongPassword123"
}
```
##### Example Response
```json
{
  "success": true,
  "message": "User signed in successfully",
  "data": {
    "accessToken": "jwt_access_token_here",
    "user": {
      "id": "65a63e9bfa8c2e0012abc123",
      "name": "User Example",
      "email": "user@example.com",
      "createdAt": "2026-01-16T03:21:02.001Z"
    }
  }
}

```
---
## Authorization
#### For protected APIs, include the following header:
```text
Authorization: Bearer <access_token>
x-internal-test: <internal-testing-only, restricted>
```
---
### Create Subscription

When a subscription is created, the system automatically schedules email reminders
to be sent before the subscription renewal date.  
These reminders are managed internally by the
`/api/v1/workflows/subscription/reminder` workflow.

#### Request Body
````json
{
  "name": "Netflix",
  "price": 12,
  "currency": "USD",
  "frequency": "weekly",
  "category": "entertainment",
  "paymentMethod": "credit card",
  "startDate": "2026-01-16T00:00:00.000Z"
}
````
#### Response Body
```json
{
  "success": true,
  "data": {
    "subscription": {
      "id": "2543gfsd5643hdfg765ehdg",
      "name": "Netflix",
      "price": 12,
      "currency": "USD",
      "frequency": "weekly",
      "category": "entertainment",
      "paymentMethod": "credit card",
      "status": "active",
      "startDate": "2026-01-16T00:00:00.000Z",
      "renewalDate": "2026-01-23T00:00:00.000Z"
    },
    "workflowRunId": "wgt_fadshgdferqt-saVkLg3hAA3"
  }
}

```


