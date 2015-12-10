var Promise = require('bluebird');
var TtlCache = require('ttl-cache');
var express = require('express');
var expressPromise = require('express-promise');
var log = require('../config/logger');
var trending = require('github-trending');

Promise.promisifyAll(trending);
var trendingAsync = Promise.promisify(trending);

var router = express.Router();
router.use(expressPromise());
exports = module.exports = router;

// TODO The users should never miss the cache. The application should manage
// it's state in memory to do this. It'll end-up being implemented on another
// place.

// Cache for 8m
router.cacheTtl = 60 * 8;
// Update cache every 2m, so maximum cache time is 10m by default
router.cacheInterval = 60 * 2;

// Use memory cache for now; will add redis when necessary
router.cache = new TtlCache({
  ttl: router.cacheTtl,
  interval: router.cacheInterval,
});

function getRepositoriesCached(language) {
  var cacheKey = 'repositories' + (language ? '.' + language : '');
  var repositories = router.cache.get(cacheKey);

  if(repositories) return repositories;

  if(router.enableLog) {
    log.warn('Cache miss for `' + cacheKey + '`. Hitting GitHub.');
  }

  return (language != null ?
    trendingAsync(language) :
    trendingAsync()).tap(function(repositories) {
    router.cache.set(cacheKey, repositories);
  });
}

router.get('/repositories', function(req, res) {
  res.json(getRepositoriesCached(req.query.language));
});

function getLanguagesCached() {
  var languages = router.cache.get('languages');
  if(languages) return languages;

  if(router.enableLog) {
    log.warn('Cache miss for `languages`. Hitting GitHub.');
  }

  return trending.languagesAsync().tap(function(languages) {
    router.cache.set('languages', languages);
    return languages;
  });
}

router.get('/languages', function(req, res) {
  res.json(getLanguagesCached());
});
