# github-trending-api
[![Build Status](https://travis-ci.org/yamadapc/github-trending-api.svg?branch=master)](https://travis-ci.org/yamadapc/github-trending-api)
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

## Endpoints
### `GET /repositories`
Responds with a list of trending repositories; accepts an optional `language`
QueryString parameter.

### `GET /languages`
Responds with the list of valid languages.

## License
This code is licensed under MIT license. See [LICENSE](/LICENSE).
