#!/bin/bash

KUBECTL="/opt/kubernetes/$(ls /opt/kubernetes | head -n 1)/bin/kubectl"

# Rebuild image
docker build --file=../../src/api/Dockerfile --tag=elasticbox/elastickube ../../src/api

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

# Stop replication controller if running
if [[ -n $(${KUBECTL} get rc --namespace=kube-system | grep elastickube-server) ]]
then
    ${KUBECTL} delete rc elastickube-server --namespace=kube-system
fi

# Recreate replication controller
${KUBECTL} create -f elastickube-server-rc.yaml