# Learniee - Parent Dashboard

A responsive parent dashboard and course discovery platform built as a frontend/backend assessment for Learniee.

## What I Built

Learniee allows parents to create an account, log in, view their dashboard, and search for courses for their children.

### Features

- Parent signup and login
- Password hashing using bcrypt
- JWT-based authentication
- HTTP-only authentication cookie
- Protected dashboard experience
- Logged-in user information
- Course search by name and subject
- Grade filtering
- Subject filtering
- Price range filtering
- Teacher rating filtering
- Combinable filters
- Course sorting by price and rating
- Pagination
- No-results state
- Responsive UI for desktop and mobile
- Logout functionality

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Node.js
- bcrypt
- jose / JWT
- JSON data storage

## Data Storage

For this assessment version, user data is stored locally in:

`data/users.json`

Course data is stored in:

`lib/courses.ts`

### Example user row

```json
{
  "id": "example-user-id",
  "name": "Priya Sharma",
  "email": "priya@example.com",
  "password": "$2b$10$example-hashed-password"
}

<img width="1029" height="640" alt="l3" src="https://github.com/user-attachments/assets/4f2f33a2-8b44-436f-8865-1743ca474538" />
<img width="811" height="473" alt="l2" src="https://github.com/user-attachments/assets/eb090c90-65fa-4d3e-b9b6-0fcb94a13448" />
<img width="810" height="548" alt="l1" src="https://github.com/user-attachments/assets/4fcd2367-d3da-4171-befb-6d022b29da3c" />
