
### Conversia Chat App

```
├── src
│   ├── auth
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   └── auth.module.ts
│   ├── chat
│   │   ├── chat.controller.ts
│   │   ├── chat.service.ts
│   │   └── chat.module.ts
│   │   └── chat.gateway.ts
│   ├── user
│   │   ├── user.controller.ts
│   │   ├── user.service.ts
│   │   └── user.module.ts
│   ├── main.ts
│   ├── shared
│   │   ├── redis.service.ts
│   │   ├── database.service.ts
│   │   └── shared.module.ts
│   ├── app.controller.ts
│   └── app.gateway.ts
│   └── app.service.ts
│   └── app.module.ts
│   └── main.ts
├── k8s
│   ├── deployment.yaml
│   ├── service.yaml
│   └── ingress.yaml
├── docker-compose.yml
└── .env

```

## Getting Started

### Prerequisites

- Node.js and npm
- Docker
- Kubernetes (minikube or similar)

### Installation

1. Clone the repository:
     

git clone https://github.com/your-username/conversia-chat-app.git
   ```

2. Navigate to the project directory:
   ```bash
   cd conversia-chat-app
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

## Running Locally

1. Start MongoDB and Redis:
   ```bash
   docker-compose up -d
   ```

2. Run the application:
   ```bash
   npm run start:dev
   ```

## Deployment

1. Build the Docker image:
   ```bash
   docker build -t conversia-chat-app .
   ```

2. Deploy to Kubernetes:
   ```bash
   kubectl apply -f k8s/deployment.yaml
   