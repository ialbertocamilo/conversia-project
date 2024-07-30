
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
├── docker-compose.yml
├── full-deployment.yml
└── .env

```

## Inicio

### Prerrequisitos

- Node.js and npm
- Docker
- Kubernetes (minikube o similar)

### Instalación

1. Clona el repositorio:
     
   ```
   git clone https://github.com/ialbertocamilo/conversia-project
    ```

2. Ir a carpeta *backend/*:
   ```bash
   yarn 
   ```

3. Ir a carpeta *frontend/*:
   ```bash
   yarn 
   ```

## Localmente

1. Iniciar MongoDB y Redis:
   ```bash
   docker-compose up -d
   ```

2. Iniciar frontend:
     ```bash
   yarn dev
   ```
3. Iniciar backend:
   ```bash
   yarn start:dev
   ```

## Despliegue

1. Es necesario agregar ```DOCKER_USERNAME y DOCKER_PASSWORD``` a las variables de entorno
2. Construir y subir imagen:
   ```bash
   ./backend/update.sh
   ./frontend/update.sh
   ```

2. Desplegar kubernetes:
   ```bash
   kubectl apply -f full-deployment.yaml
