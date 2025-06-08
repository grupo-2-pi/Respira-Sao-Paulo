#!/bin/bash

echo "========= Iniciando Respira São Paulo ========"


echo "Atualizando repositorio ubuntu"  
sudo apt update

echo "Verificando Java..."

java -version &>/dev/null

if [ $? -eq 0 ]; then
    echo "Java instalado"
else
    echo "Instalando Java..."
    sudo apt install -y openjdk-21-jre
    sudo apt install -y maven

    if [ $? -ne 0 ]; then
        echo "Erro ao instalar o Java."
        exit 1
    fi
fi

echo "Verificando Docker..."
if command -v docker &>/dev/null; then
	echo "Docker já está instalado."
else
	echo "Instalando Docker..."
	sudo apt update
	sudo apt install -y docker.io
	if [ $? -ne 0 ]; then
		echo "Erro ao instalar o Docker."
		exit 1
	fi
	sudo systemctl start docker
	sudo systemctl enable docker
fi

echo "Verificando Docker Compose..."
if docker compose version &>/dev/null; then
	echo "Docker Compose v2 já está instalado."
else
	echo "Instalando Docker Compose v2..."
	mkdir -p ~/.docker/cli-plugins
	curl -SL https://github.com/docker/compose/releases/latest/download/docker-compose-linux-x86_64 \
		-o ~/.docker/cli-plugins/docker-compose
	chmod +x ~/.docker/cli-plugins/docker-compose
	sudo groupadd docker
	sudo usermod -aG docker $USER
	newgrp docker
	if ! docker compose version &>/dev/null; then
		echo "Erro ao instalar o Docker Compose v2."
		exit 1
	fi

	echo "Docker Compose v2 instalado com sucesso."
fi

echo "Atualizando código Respira-Sao-Paulo..."

if [ -d "Respira-Sao-Paulo" ]; then

    cd Respira-Sao-Paulo

    echo "Pasta existe, fazendo git pull..." 

    git checkout java-data

    git pull origin java-data

    if [ $? -ne 0 ]; then
        echo "Erro ao atualizar a branch java-data."
        exit 1
    fi
    
    echo "Compilando o java.."

    ls

    cd LOGgrupo2

    mvn clean package -f ./pom.xml

    ls

else
    echo "Clonando repositório..."
    git clone -b dev https://github.com/grupo-2-pi/Respira-Sao-Paulo.git

    if [ $? -ne 0 ]; then
        echo "Erro ao clonar o repositório."
        exit 1
    fi

    cd Respira-Sao-Paulo

    echo "Compilando o java.."

    ls

    cd LOGgrupo2

    ls

    mvn clean package -f ./pom.xml    
fi

echo "Iniciando containers"
sudo docker run -d --name respira-web -p 3000:3000 furqas/respira-web
sudo docker run -d --name respira-bd -p 3306:3306 furqas/respira-bd

echo "Iniciando containers..."
docker compose up
