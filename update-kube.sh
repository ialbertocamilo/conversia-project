#!/usr/bin/env bash

kubectl delete deployments --all
kubectl apply -f full-deployment.yaml