# Versão do node que o docker vai buscar para criar a imagem
FROM node:18

# Definição do diretório de trabalho que a imagem vai rodar
WORKDIR /app

# Copia os arquivos de configuração do npm, como as dependencias necessárias e etc.
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante dos arquivos da aplicação
COPY . .

# Expoe a aplicação na porta 3333
EXPOSE 3333

# Inicia a aplicação
CMD ["node", "app.js"]
