From node:8.3.0-alpine

# ADD SUPERVISORD

ENV PYTHON_VERSION=2.7.13-r1
ENV PY_PIP_VERSION=9.0.1-r1
ENV SUPERVISOR_VERSION=3.3.3

RUN apk update && apk add -u python=$PYTHON_VERSION py-pip=$PY_PIP_VERSION
RUN pip install supervisor==$SUPERVISOR_VERSION

ADD ./supervisord.conf /etc/supervisord.conf

#END ADD SUPERVISORD

# ADD PROJECT

WORKDIR /usr/src/app
COPY package.json .
RUN npm install --ignore-scripts

COPY . .

# END ADD PROJECT

ENTRYPOINT ["supervisord", "--nodaemon", "--configuration", "/etc/supervisord.conf"]
