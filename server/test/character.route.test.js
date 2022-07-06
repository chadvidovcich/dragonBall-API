const mongoose = require('mongoose');

// Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const Character = require('../models/character.model');
const server = require('../server');

const should = chai.should();

chai.use(chaiHttp);
// Our parent block
describe('Characters', () => {
  // remove all entries
  beforeEach((done) => { // Before each test we empty the database
    Character.deleteMany({}, (err) => {
      done();
    });
  });
  // GET /api/character
  describe('GET', () => {
    it('GET /api/character', (done) => {
      chai.request(server)
        .get('/api/character')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });

    it('GET /api/character/:name', (done) => {
      const testChar = new Character({ name: 'BlackGoku', planet: 'Earth' });
      testChar.save((err, character) => {
        chai.request(server)
          .get(`/api/character/${testChar.name}`)
          .send(testChar)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('name').eql(testChar.name);
            res.body.should.have.property('planet').eql(testChar.planet);
            done();
          });
      });
    });

    it('GET /api/character/ID/:id', (done) => {
      const testChar = new Character({ name: 'BlackGoku', planet: 'Earth' });
      testChar.save((err, character) => {
        chai.request(server)
          .get(`/api/character/ID/${testChar.id}`)
          .send(testChar)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('name').eql(testChar.name);
            res.body.should.have.property('planet').eql(testChar.planet);
            done();
          });
      });
    });
  });
});
