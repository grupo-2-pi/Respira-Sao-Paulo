FROM maven:3.9.4-eclipse-temurin-21 AS build
WORKDIR /app
COPY . /app
RUN mvn clean package -f /app/pom.xml
FROM openjdk:21
COPY --from=build /app/target/LOGgrupo2-1.0-jar-with-dependencies.jar .
# Aceita argumentos de build
ARG AWS_ACCESS_KEY_ID
ARG AWS_SECRET_ACCESS_KEY
ARG AWS_SESSION_TOKEN

# Transforma ARG em ENV dentro do container
ENV AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID
ENV AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY
ENV AWS_SESSION_TOKEN=$AWS_SESSION_TOKEN
ENTRYPOINT ["java", "-jar", "LOGgrupo2-1.0-jar-with-dependencies.jar"]