var Promise = require('bluebird');
var express = require('express');
var makeStub = require('mocha-make-stub');
var request = require('supertest');
var should = require('should');
var trending = require('github-trending');

var trendingApi = require('../routes/trending');
require('./nock-fixtures');

//var nock = require('nock');
//nock.recorder.rec();

Promise.promisifyAll(request.Test.prototype);

describe('trending-api', function() {
  var app = express();
  app.use(trendingApi);

  describe('GET /repositories', function() {
    it('responds with trending repositories', function() {
      return request(app)
        .get('/repositories')
        .endAsync()
        .then(function(res) {
          should.exist(res.body);
          res.body.map(function(o) {
            return o.title;
          }).should.containEql('hashcat');
        });
    });

    it('is able to filter by language', function() {
      return request(app)
        .get('/repositories')
        .query({
          language: 'haskell',
        })
        .endAsync()
        .then(function(res) {
          should.exist(res.body);
          res.body.should.containEql({
            title: 'elm-compiler',
            owner: 'elm-lang',
            description: 'Compiler for the Elm programming language. Elm aims to make web development more pleasant. Elm is a type inferred, functional reactive language that compiles to HTML, CSS, and JavaScript.',
            url: 'https://github.com/elm-lang/elm-compiler',
            language: 'Haskell',
            star: '10 stars today'
          });
        });
    });
  });

  describe('GET /languages', function() {
    it('responds with available languages', function() {
      return request(app)
        .get('/languages')
        .endAsync()
        .then(function(res) {
          should.exist(res.body);
          res.body.should.containEql('haskell');
        });
    });

    describe('when hitting again', function() {
      makeStub(trending, 'languagesAsync', function() {
        return Promise.resolve(['haskell']);
      });

      it('the second hit doesn\'t use the GH API', function() {
        var _this = this;
        return request(app)
          .get('/languages')
          .endAsync()
          .then(function(res) {
            res.body.should.containEql('haskell');
            _this.languagesAsync.calledOnce.should.equal(false, 'Didn\'t hit the cache');
          });
      });
    });
  });
});
