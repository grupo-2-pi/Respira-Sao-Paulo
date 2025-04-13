FROM maven:3.9.4-eclipse-temurin-21 AS build
WORKDIR /app
COPY LOGgrupo2 /app
RUN mvn clean package -f /app/pom.xml
FROM openjdk:21
COPY --from=build /app/target/LOGgrupo2-1.0-jar-with-dependencies.jar .
ENTRYPOINT ["java", "-jar", "LOGgrupo2-1.0-jar-with-dependencies.jar"]