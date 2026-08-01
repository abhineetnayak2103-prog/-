FROM eclipse-temurin:17-jre

# Pin a Lavalink release (override with --build-arg LAVALINK_VERSION=...)
ARG LAVALINK_VERSION=v3.6.5
ENV LAVALINK_JAR="Lavalink.jar"

WORKDIR /app

# Install curl & ca-certificates, download Lavalink JAR
RUN apt-get update && apt-get install -y curl ca-certificates && rm -rf /var/lib/apt/lists/* \
  && curl -L -o ${LAVALINK_JAR} "https://github.com/freyacodes/Lavalink/releases/download/${LAVALINK_VERSION}/Lavalink.jar" \
  && chmod +x ${LAVALINK_JAR}

# Copy config into image
COPY application.yml /app/application.yml

EXPOSE 2333

# Run Lavalink; spring will read application.yml
CMD ["java", "-jar", "Lavalink.jar", "--spring.config.location=application.yml"]
