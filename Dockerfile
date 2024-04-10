FROM gradle:8.6

WORKDIR /app

RUN apt-get update -y
RUN apt-get upgrade -y
RUN apt-get install -y zlib1g-dev libssl-dev gperf default-jdk libc++-dev libc++abi-dev

COPY . .
RUN gradle build -x test

ENTRYPOINT ["java", "-Xdebug","-agentlib:jdwp=transport=dt_socket,server=y,address=*:8082,suspend=n", "-jar", "/app/build/libs/iosu-0.0.1-SNAPSHOT.jar"]
