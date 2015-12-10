FROM node:5.1.0

ADD . /github-trending-api
WORKDIR /github-trending-api
RUN npm install --production

CMD ./bin/github-trending-api
