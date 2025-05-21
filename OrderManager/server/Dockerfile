FROM eclipse-temurin:17-alpine

RUN apk add --no-cache maven git bash

WORKDIR /app

COPY pom.xml mvnw ./
COPY .mvn .mvn

RUN ./mvnw dependency:go-offline
COPY . .

CMD ["./mvnw", "spring-boot:run", "-Dspring-boot.run.fork=false"]
