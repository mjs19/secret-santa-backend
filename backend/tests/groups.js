const should = require('chai').should(),
  expect = require('chai').expect,
  supertest = require('supertest'),
  api = supertest('http://localhost:3000');

describe('GET groups', (done) => {
  it('should return a 200 status', () => {
    api.get('/groups')
      .set('Accept', 'application/json')
      .expect(200, done);
  });

  it('should return all groups', (done) => {
    api.get('/groups')
      .set('Accept', 'application/json')
      .end(function(error, response) {
        expect(response.body).to.be.an('array');
        done();
      });
  });
});

describe('GET group by :id', () => {
  it('should return a 200 status', (done) => {
    api.get('/groups')
      .set('Accept', 'application/json')
      .expect(200, done);
  });

  it('should return one group', (done) => {
    api.get('/groups/1')
      .set('Accept', 'application/json')
      .end(function(error, response) {
        expect(response.body.name).to.be.a('string');
        done();
      });
  });
});

describe('DELETE member from group', () => {
  it('should return a 200 status', (done) => {
    api.delete('/groups/Mock Group/deleteUser/99')
      .set('Accept', 'application/json')
      .expect(200, done);
  });

  it('should return a deleted message', (done) => {
    api.delete('/groups/Mock Group/deleteUser/Tim.Kane@gmail.com')
      .set('Accept', 'application/json')
      .end(function(error, response) {
        expect(response.body.message).to.be.equal('deleted');
        done();
      });
  });
});


