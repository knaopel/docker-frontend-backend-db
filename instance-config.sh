#!/bin/bash

# Actualizar los paquetes del sistema
echo "UPDATING SYSTEM"
sudo yum update -y

# Instalar Docker
echo "DOCKER INSTALATION"
sudo yum install -y docker

# Verificar la versión de Docker
echo "DOCKER VERSION"
docker --version

# Iniciar el servicio de Docker
echo "DOCKER START"
sudo service docker start

# Añadir el usuario 'ec2-user' al grupo 'docker' para usar Docker sin sudo
echo "ADDING EC2 TO DOCKER GROUP"
sudo usermod -a -G docker ec2-user

# Instalar Docker Compose
echo "DOCKER-COMPOSE INSTALATION"
sudo curl -L https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose

# Hacer ejecutable el binario de Docker Compose
echo "CHANGING DOCKER PERMISSIONS"
sudo chmod +x /usr/local/bin/docker-compose

# Verificar la versión de Docker Compose
echo "DOCKER-COMPOSE VERSION"
sudo docker-compose version

# Ejecutar Docker Compose en modo 'detached' (en segundo plano)
echo "INITIALIZING DOCKER COMPOSE"
sudo docker-compose up -d

echo "SCRIPT ENDS"
