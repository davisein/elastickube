#!/bin/bash

KUBECTL="/opt/kubernetes/$(ls /opt/kubernetes | head -n 1)/bin/kubectl"

# Rebuild images
docker build --file=../docker/api/Dockerfile --tag=elasticbox/elastickube-api /opt/elastickube/src/api
docker build --file=../docker/nginx/Dockerfile --tag=elasticbox/elastickube-nginx ../docker/nginx

# Ensure mongo controller is running
if [[ -z $(${KUBECTL} get rc --namespace=kube-system | grep elastickube-mongo) ]]
then
    ${KUBECTL} create -f elastickube-mongo-rc.yaml
fi

# Ensure mongo service is running
if [[ -z $(${KUBECTL} get svc --namespace=kube-system | grep elastickube-mongo) ]]
then
    ${KUBECTL} create -f elastickube-mongo-svc.yaml
fi

# Ensure elastickube controller is running
if [[ -z $(${KUBECTL} get rc --namespace=kube-system | grep elastickube-server) ]]
then
    ${KUBECTL} create -f elastickube-server-rc.yaml
fi