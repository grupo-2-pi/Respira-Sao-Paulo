#!/bin/bash

echo "========= Iniciando Respira São Paulo ========"


echo "Atualizando repositorio ubuntu"  
sudo apt update

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
sudo docker rm -f respira-web &>/dev/null

echo "Iniciando containers"
sudo docker run -d --name respira-web -p 3000:3000 furqas/respira-web
sudo docker run -d --name respira-bd -p 3306:3306 furqas/respira-bd