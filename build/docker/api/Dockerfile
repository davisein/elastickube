FROM ubuntu

ENV DEBIAN_FRONTEND     noninteractive
ENV ELASTICKUBE_PATH    /opt/elastickube

WORKDIR ${ELASTICKUBE_PATH}

# Install pip
RUN apt-get -y update && apt-get -y install python-pip python-dev curl

RUN pip install --no-compile tornado motor PyJWT

CMD python ${ELASTICKUBE_PATH}/src/api/server.py
