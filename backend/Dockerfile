FROM openjdk:11.0.2-jdk-slim-stretch
VOLUME /tmp

WORKDIR /opt/app

ARG JAR_FILE
ADD target/${JAR_FILE} /opt/app/masi.jar

EXPOSE 8080

ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/opt/app/masi.jar"]