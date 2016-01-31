#!/bin/bash

KUBECTL="/opt/kubernetes/$(ls /opt/kubernetes | head -n 1)/bin/kubectl"

# Rebuild images
docker build --file=../docker/api/Dockerfile --tag=elasticbox/elastickube-api ../docker/api
docker build --file=../docker/nginx/Dockerfile --tag=elasticbox/elastickube-nginx ../docker/nginx

# Ensure mongo controller is running
if [[ -z $(${KUBECTL} get rc --namespace=kube-system | grep elastickube-mongo) ]]
then
    ${KUBECTL} create -f elastickube-mongo-rc.yaml
fi

# Ensure mongo service is running
if [[ -n $(${KUBECTL} get svc --namespace=kube-system | grep elastickube-mongo) ]]
then
    ${KUBECTL} delete rc elastickube-server --namespace=kube-system
fi

# Recreate replication controller
${KUBECTL} create -f elastickube-server-rc.yaml