# Hocus PHocus

A themeable resource-management and productivity platform that transforms
real-life activities, goals, and progress into game-inspired experiences.

## Themes

### PHocusFarm

A cozy farming-inspired experience where real-life progress is represented
through cultivation, growth, and resource management.

### HyperPHocus

A planned science-fiction experience that reinterprets the same underlying
data and mechanics through jobs, contacts, resources, and reputation.

## Technology

- React
- TypeScript
- Python
- FastAPI
- MongoDB
- Docker

## Status

Early development.

## Development

### Prerequisites

- WSL2 / Linux development environment
- Node.js and npm
- Python 3
- Docker with Docker Compose

### First-Time Setup

#### Backend

From the project root:

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

Create `backend/.env` using `backend/.env.example` as a template.

#### Frontend

```bash
cd frontend
npm install
```

### Starting the Development Environment

Hocus PHocus currently uses three local services.

#### 1. MongoDB

From the project root:

```bash
docker compose up -d
```

Verify MongoDB is running:

```bash
docker compose ps
```

MongoDB runs on port `27017`.

#### 2. FastAPI Backend

Open another terminal:

```bash
cd ~/projects/hocus-phocus/backend
source .venv/bin/activate
uvicorn app.main:app --reload
```

The backend is available at:

- API: `http://localhost:8000`
- Swagger UI: `http://localhost:8000/docs`
- Health check: `http://localhost:8000/health`

#### 3. React Frontend

Open another terminal:

```bash
cd ~/projects/hocus-phocus/frontend
npm run dev
```

Use the URL reported by Vite, normally `http://localhost:5173` or `http://127.0.0.1:5173`.

### Stopping the Development Environment

Stop Vite and Uvicorn with `Ctrl+C` in their respective terminals.

MongoDB can be stopped from the project root with:

```bash
docker compose down
```

The MongoDB Docker volume is retained, so stopping or recreating the container does not delete development data.

### Typical Development Startup

After the initial setup, a normal development session requires:

```text
Terminal 1: docker compose up -d

Terminal 2:
cd backend
source .venv/bin/activate
uvicorn app.main:app --reload

Terminal 3:
cd frontend
npm run dev
```