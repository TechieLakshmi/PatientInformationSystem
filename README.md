# Patient Information System
The purpose of this project is to develop a hospital management system (HMS) that streamlines the day-to-day operations of a tertiary care hospital that serves approximately 2000 patients daily. 

### Building docker image from Docker File
docker-compose build

### To create deployment from yaml manifest
kubectl apply -f deployment.yaml <br />
kubectl get pods <br />
kubectl get deployments 

### To create service from yaml to access your deployment
kubectl apply -f services.yaml <br />
kubectl get services

### Expose services
kubectl expose deployment authentication --type=NodePort --name=authentication-service <br />
kubectl expose deployment patients --type=NodePort --name=patients-service <br />
kubectl expose deployment wardmanager --type=NodePort --name=wardmanager-service <br />
kubectl get services
