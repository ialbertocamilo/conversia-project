#!/usr/bin/env bash

APP_NAME="conversia-frontend"
VERSION="latest"

echo $DOCKER_USERNAME
echo $DOCKER_PASSWORD


echo "$DOCKER_USERNAME/$APP_NAME:latest"
echo "Iniciando sesión en Docker Hub..."
echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password "$DOCKER_PASSWORD"

echo "Construyendo la imagen Docker..."
docker build -t "$APP_NAME:$VERSION" .

echo "Etiquetando la imagen..."
docker tag "$APP_NAME:$VERSION" "$DOCKER_USERNAME/$APP_NAME:latest"

echo "Subiendo la imagen a Docker Hub..."
docker push "$DOCKER_USERNAME/$APP_NAME:latest"

echo "¡Imagen subida con éxito!"