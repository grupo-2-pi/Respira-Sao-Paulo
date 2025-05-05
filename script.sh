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
sudo docker --version &>/dev/null
if [ $? -eq 0 ]; then
    echo "Docker instalado"
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

sudo docker pull furqas/respira-web
if [ $? -ne 0 ]; then
    echo "Erro ao baixar a imagem furqas/respira-web."
    exit 1
fi
echo "Imagem baixada: furqas/respira-web"

sudo docker pull furqas/respira-bd
if [ $? -ne 0 ]; then
    echo "Erro ao baixar a imagem furqas/respira-bd."
    exit 1
fi
echo "Imagem baixada: furqas/respira-bd"

echo "Limpando containers"

sudo docker rm -f respira-web
sudo docker rm -f respira-bd

if [ $? -eq 0 ]; then
    echo "Git instalado"
else
    echo "Instalando Git..."

    sudo apt install -y git

    if [ $? -ne 0 ]; then
        echo "Erro ao instalar o Git."
        exit 1
    fi

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
    git clone -b java-data https://github.com/grupo-2-pi/Respira-Sao-Paulo.git

    if [ $? -ne 0 ]; then
        echo "Erro ao clonar o repositório."
        exit 1
    fi

    echo "Compilando o java.."

    ls

    cd LOGgrupo2

    mvn clean package -f ./pom.xml

    ls
fi

echo "Iniciando containers"
sudo docker run -d --name respira-web -p 3000:3000 furqas/respira-web
sudo docker run -d --name respira-bd -p 3306:3306 furqas/respira-bd

