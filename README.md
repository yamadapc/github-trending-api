# github-trending-api
[![Build Status](https://travis-ci.org/yamadapc/github-trending-api.svg?branch=master)](https://travis-ci.org/yamadapc/github-trending-api)
[![Docker Image Size](https://img.shields.io/imagelayers/image-size/yamadapc/github-trending-api/latest.svg)](https://hub.docker.com/r/yamadapc/github-trending-api/)
[![Docker Image Pulls](https://img.shields.io/docker/pulls/yamadapc/github-trending-api.svg)](https://hub.docker.com/r/yamadapc/github-trending-api/)
[![Coverage Status](https://coveralls.io/repos/yamadapc/github-trending-api/badge.svg?branch=master&service=github)](https://coveralls.io/github/yamadapc/github-trending-api?branch=master)

- - -
This module is an API for the `github-trending` NPM module. So it can be ran as
an "ultra-micro-service". It has an in-memory cache for results; so _mostly_ you
can use it from another point of the application and not worry about anything
else.

It exposes a standalone `express` app, which can be ran from the command-line
with:
```
$ npm install github-trending-api
$ github-trending-api
```

And an `express.Router` instance, which is what `require('github-trending-api')`
returns.

_A write-up on its stack is pending._

## Docker
This repository has automated image builds on hub.docker.com. So you can also
run:
```
$ docker-machine start default
$ eval $(docker-machine env default)
$ docker run -it -p 3000:3000 yamadapc/github-trending-api
$ curl `docker-machine ip default`:3000/repositories
```

## Endpoints
### `GET /repositories`
Responds with a list of trending repositories; accepts an optional `language`
QueryString parameter.

### `GET /languages`
Responds with the list of valid languages.

## License
This code is licensed under MIT license. See [LICENSE](/LICENSE).
