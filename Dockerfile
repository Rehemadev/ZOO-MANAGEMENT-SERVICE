# Build stage
FROM maven:3.9.6-eclipse-temurin-17 AS build
COPY . .
RUN mvn clean package -DskipTests

# Run stage
FROM eclipse-temurin:17-jre-jammy
COPY --from=build /target/*.jar app.jar
EXPOSE 8081
# Optimize for 512MB RAM on Render Free Tier
ENTRYPOINT ["java", "-Xmx320m", "-Xms128m", "-XX:+UseContainerSupport", "-jar", "/app.jar"]
