# 🏷 Task Management API

> A fullstack-style backend API that allows users to manage personal and assigned tasks with JWT-based authentication, built with Node.js, Express, Sequelize ORM, and PostgreSQL.

---

## 📌 Problem Statement

Many productivity tools — like Todoist or Trello — rely on a secure backend to manage user data and task workflows. This project replicates a real-world task management backend, emphasizing authentication, data relationships, and status workflows, and demonstrates the ability to build production-ready RESTful APIs with secure access control.

---

## 🎯 Project Goals

- Allow users to register and authenticate securely
- Enable creating, reading, updating, and deleting tasks
- Link tasks to users via assignments (who a task is assigned to / created by)
- Protect task routes with JWT-based authentication middleware
- Seed sample data for testing and demo purposes

---

## 🛠 Tech Stack

**Backend:**
- Node.js
- Express

**Database:**
- PostgreSQL
- Sequelize ORM

**Authentication & Security:**
- JWT (`jsonwebtoken`)
- Password hashing (`bcryptjs`)

**Other Tools:**
- Git & GitHub
- Postman
- Render / Vercel (Deployment)

---

## 🖥 Features

- JWT-based user authentication (register / login)
- Password hashing with bcrypt
- Protected routes (auth middleware)
- CRUD operations on tasks
- Task status workflow (`todo`, `in-progress`, `done`)
- Task assignment to users
- Input validation and sanitization
- Filtering by status and due date
- Pagination support (`?limit=10&offset=0`)
- Overdue task queries
- Centralized error handling
- Rate limiting (to be configured)

---

## ⚙ Installation & Setup

### Prerequisites

- Node.js (v16+)
- PostgreSQL running locally or remotely

### 1. Clone the repository

```bash
git@github.com:ndang11/task-management-db.git
cd task-management-db
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the project root:

```env
PORT=5000
DB_USER=taskdb
DB_PASSWORD=task_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=taskdb
JWT_SECRET=your_jwt_secret_key
```

Update the `DATABASE_URL` as needed for your PostgreSQL instance.

### 4. Create the database

Ensure PostgreSQL is running and create the `taskdb` database:

```bash
createdb taskdb
```

### 5. Seed the database with sample data

```sql
-- Users
INSERT INTO users (username, email, password_hash, created_at)
VALUES
  ('johndoe', 'john@example.com',   crypt('password123', gen_salt('bf')), NOW()),
  ('janedoe', 'jane@example.com',   crypt('password123', gen_salt('bf')), NOW()),
  ('bobsmith', 'bob@example.com',   crypt('password123', gen_salt('bf')), NOW());

-- Tasks
INSERT INTO tasks (title, description, due_date, status, assigned_to, created_by, created_at)
VALUES
  ('Design login page', 'Create wireframes and mockups',   '2025-06-05', 'todo',     1, 1, NOW()),
  ('Set up PostgreSQL', 'Create schema and tables',        '2025-05-28', 'in-progress',1, 1, NOW()),
  ('Write auth middleware', 'JWT verification logic',      '2025-05-30', 'done',     1, 1, NOW()),
  ('API documentation', 'Write Swagger docs',              '2025-06-15', 'todo',     2, 1, NOW()),
  ('Fix bug #12', 'Resolve login token issue',             '2025-05-29', 'in-progress',2, 2, NOW()),
  ('Code review PR #4', 'Review feature branch',           '2025-06-20', 'todo',     2, 3, NOW()),
  ('Deploy to staging', 'Push to staging environment',     '2025-06-10', 'todo',     3, 3, NOW()),
  ('Unit tests for auth', 'Add auth route tests',          '2025-06-08', 'in-progress',2, 2, NOW()),
  ('Update README', 'Add API docs and curl examples',      '2025-06-01', 'done',     1, 1, NOW()),
  ('Performance profiling', 'Audit slow queries',          '2025-06-25', 'todo',     3, 3, NOW());
```

### 6. Run the project

```bash
npm start
 node index.js
```

The API will start on `http://localhost:5000` (or the port set in `.env`).

---

## 📚 API Endpoints

### Authentication (Public)

#### `POST /api/auth/register`

Register a new user.

**Request body:**
```json
{
  "username": "newuser",
  "email": "newuser@example.com",
  "password": "securePassword123"
}
```

**Response (201 Created):**
```json
{
  "token": "<jwt_token>",
  "user": {
    "id": 4,
    "email": "newuser@example.com",
    "name": "newuser"
  }
}
```

---

#### `POST /api/auth/login`

Log in an existing user.

**Request body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200 OK):**
```json
{
  "token": "<jwt_token>",
  "user": {
    "id": 1,
    "email": "john@example.com",
    "name": "johndoe"
  }
}
```

**Response (401 Unauthorized):**
```json
{
  "message": "Invalid credentials"
}
```

---

### Tasks (Protected — all mutations require Bearer token)

All task requests must include the header:

```
Authorization: Bearer <your_jwt_token>
```

#### `GET /api/tasks`

List all tasks visible to the authenticated user (own created + assigned tasks).

**Query parameters:**
- `?status=todo` — filter by status
- `?due_before=YYYY-MM-DD` — filter by due date before a given date
- `?limit=10&offset=0` — pagination

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "title": "Design login page",
    "description": "Create wireframes and mockups",
    "due_date": "2025-06-05T00:00:00.000Z",
    "status": "todo",
    "assigned_to": 1,
    "created_by": 1,
    "created_at": "2025-05-18T13:00:00.000Z"
  }
]
```

---

#### `GET /api/tasks/:id`

Fetch a single task by ID (only if created by or assigned to the current user).

**Response (200 OK):**
```json
{
  "id": 1,
  "title": "Design login page",
  "description": "Create wireframes and mockups",
  "due_date": "2025-06-05T00:00:00.000Z",
  "status": "todo",
  "assigned_to": 1,
  "created_by": 1,
  "created_at": "2025-05-18T13:00:00.000Z"
}
```

---

#### `POST /api/tasks`

Create a new task.

**Request body:**
```json
{
  "title": "New feature request",
  "description": "Implement dark mode toggle",
  "due_date": "2025-06-30",
  "assigned_to": 2
}
```

- `title` — required
- `description` — optional
- `due_date` — optional (must be a future date)
- `assigned_to` — optional (user ID)

**Response (201 Created):**
```json
{
  "id": 11,
  "title": "New feature request",
  "description": "Implement dark mode toggle",
  "due_date": "2025-06-30T00:00:00.000Z",
  "status": "todo",
  "assigned_to": 2,
  "created_by": 1,
  "created_at": "2025-05-18T13:51:00.000Z"
}
```

---

#### `PUT /api/tasks/:id`

Update an existing task (only by the creator or assignee). Allows updating title, description, due date, and status. Status transitions are validated (e.g. `done` cannot revert to `todo` without explicit reset logic).

**Request body:**
```json
{
  "title": "Updated title",
  "status": "in-progress"
}
```

**Response (200 OK):**
```json
{
  "id": 1,
  "title": "Updated title",
  "description": "Create wireframes and mockups",
  "due_date": "2025-06-05T00:00:00.000Z",
  "status": "in-progress",
  "assigned_to": 1,
  "created_by": 1,
  "created_at": "2025-05-18T13:00:00.000Z",
  "updated_at": "2025-05-18T14:10:00.000Z"
}
```

---

#### `DELETE /api/tasks/:id`

Delete a task (only by the task creator).

**Response (200 OK):**
```json
{
  "message": "Task deleted successfully"
}
```

---

#### `PATCH /api/tasks/:id/complete`

Mark a task as `done` (sets the status to `done` and optionally records a completion timestamp).

**Response (200 OK):**
```json
{
  "id": 1,
  "title": "Design login page",
  "status": "done",
  "updated_at": "2025-05-18T14:15:00.000Z"
}
```

---

## 🧠 Challenges Faced

- Securing authenticated routes with JWT middleware and proper token expiry
- Validating business rules such as status transitions and due date logic
- Managing ownership checks (creator vs. assignee) across multiple endpoints
- Handling input sanitization to prevent SQL injection when using raw queries
- Implementing concurrency-safe updates with transactions
- Resolving conflicts between Sequelize model field naming and API payloads

---

## 📚 What I Learned

- Structuring a modular Node.js/Express API with separation of concerns (controllers, routes, middlewares, models, utils)
- Implementing and verifying JWT stateless authentication flows
- Password hashing best practices using bcrypt
- Writing Sequelize ORM models with associations and validations
- Building RESTful task workflows with proper HTTP method semantics
- Centralized error handling middleware in Express
- Pagination, filtering, and overdue query logic in PostgreSQL

---

## 🔮 Future Improvements

- Add role-based access control (admin / user roles)
- Integrate Swagger/OpenAPI documentation (swagger-jsdoc + swagger-ui-express)
- Write unit and integration tests with Jest or Mocha
- Add rate limiting (express-rate-limit) to auth endpoints
- Implement task notifications (email/in-app) on status changes
- Add task categories, tags, and priority levels
- Enable file attachments on tasks
- Write database migration scripts (sequelize-cli) for production schema management

---

## 👨🏽‍💻 Author

**Your Name**  
 NDANG-KAH A
📩 Email: ndangkahambei@email.com  
🌍 Based in Cameroon | Open to remote opportunities
