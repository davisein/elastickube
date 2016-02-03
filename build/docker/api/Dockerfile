FROM python:2.7.11

ENV ELASTICKUBE_PATH    /opt/elastickube

WORKDIR ${ELASTICKUBE_PATH}

RUN pip install --no-compile tornado motor PyJWT

CMD python ${ELASTICKUBE_PATH}/src/api/server.py
