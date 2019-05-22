#!/usr/bin/env bash

docker run -p 8080:8080 \
-e spring.datasource.url=jdbc:postgresql://host.docker.internal:5432/masi \
-e frontend.url=* \
$(cat target/docker/image-name)