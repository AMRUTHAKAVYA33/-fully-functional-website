# Full Stack Task Manager

A full stack task management application with:

- React + Vite frontend
- Spring Boot backend
- H2 embedded database
- JWT authentication
- Tailwind CSS responsive UI

## Project Structure

```text
.
|-- backend
|-- frontend
|-- netlify.toml
|-- render.yaml
```

## Backend Features

- `POST /register` to create a user account
- `POST /login` to authenticate and receive a JWT
- `GET /tasks` to fetch logged-in user tasks
- `POST /tasks` to create tasks
- `PUT /tasks/{id}` to update tasks
- `DELETE /tasks/{id}` to delete tasks

## Frontend Features

- Signup page
- Login page
- Protected dashboard page
- Add, edit, delete task flows
- Logout support
- Responsive Tailwind CSS design

## Backend Setup

The backend now uses an embedded H2 database, so you do not need MySQL.

1. Optional environment variables:

```env
SPRING_DATASOURCE_URL=jdbc:h2:file:./data/task-manager-db;AUTO_SERVER=TRUE
SPRING_DATASOURCE_USERNAME=sa
SPRING_DATASOURCE_PASSWORD=
APP_JWT_SECRET=replace-with-a-long-secret
APP_CORS_ALLOWED_ORIGINS=http://localhost:5173
```

2. Run the backend:

```bash
cd backend
./mvnw spring-boot:run
```

On Windows PowerShell:

```powershell
cd backend
.\mvnw.cmd spring-boot:run
```

The database file will be created automatically inside `backend/data/`.

Optional:

- H2 console: `http://localhost:8080/h2-console`
- Backend default port: `8081`
- H2 console: `http://localhost:8081/h2-console`
- JDBC URL for console login: `jdbc:h2:file:./data/task-manager-db`
- Username: `sa`
- Password: leave it empty unless you set one

## Frontend Setup

1. Install dependencies:

```bash
cd frontend
npm install
```

2. Create an environment file:

```env
VITE_API_URL=http://localhost:8080
```

3. Start the frontend:

```bash
cd frontend
npm run dev
```

## Verified Locally

- Frontend production build completed successfully on April 19, 2026 with `npm run build`
- Backend package build completed successfully on April 19, 2026 with `.\mvnw.cmd clean package -DskipTests`
- No external database server is required for local use

## Deployment

### Frontend on Netlify

- Import the repository in Netlify.
- Set the base directory to `frontend`.
- Build command: `npm run build`
- Publish directory: `dist`
- Set `VITE_API_URL` to your Render backend URL.

### Backend on Render

- Create a new web service from the repository.
- Set the root directory to `backend`.
- Render will use the included `Dockerfile`.
- Add the required environment variables:
  - `SPRING_DATASOURCE_URL`
  - `SPRING_DATASOURCE_USERNAME`
  - `SPRING_DATASOURCE_PASSWORD`
  - `APP_JWT_SECRET`
  - `APP_CORS_ALLOWED_ORIGINS`

## Notes

- Passwords are stored using BCrypt hashing.
- JWT is required for all task endpoints.
- The backend auto-creates the tables using JPA/Hibernate.
