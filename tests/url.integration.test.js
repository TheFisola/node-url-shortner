const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
const db = require('../models');

chai.should();
chai.use(chaiHttp);

describe('URL api tests', () => {
  let urlKey;
  const longUrl = 'https://www.facebook.com/';

  before(() => {
    db.sequelize.sync();
  });

  after(() => {
    db.urls.destroy({ truncate: true });
  });

  // Encode URL
  describe('POST /api/v1/encode', () => {
    it('It should successfully encode url', (done) => {
      chai
        .request(server)
        .post('/api/v1/encode')
        .send({
          description: 'Facebook home page',
          longUrl: `${longUrl}`,
        })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql(true);
          res.body.data.should.have.property('urlKey');
          urlKey = res.body.data.urlKey;
          done();
        });
    });

    it('It should fail when parameters are invalid', (done) => {
      chai
        .request(server)
        .post('/api/v1/encode')
        .send({
          description: 'Facebook home page',
          longUrl: 'facebook',
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('status').eql(false);
          done();
        });
    });
  });

  // Decode URL
  describe('GET /api/v1/decode', () => {
    it('It should decode url successfully', (done) => {
      chai
        .request(server)
        .get(`/api/v1/decode?urlKey=${urlKey}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.data.should.have.property('longUrl').eql(longUrl);
          done();
        });
    });

    it('It should fail when urlKey does not exist', (done) => {
      chai
        .request(server)
        .get('/api/v1/decode?urlKey=XXXXX')
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('status').eql(false);
          done();
        });
    });

    it('It should fail when urlKey parameter is not passed', (done) => {
      chai
        .request(server)
        .get('/api/v1/decode')
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });

  // Get Url Stats
  describe('GET /api/v1/statistics/:urlKey', () => {
    it('It should get url stats successfully', (done) => {
      chai
        .request(server)
        .get(`/api/v1/statistics/${urlKey}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.data.should.have.property('visitCount').eql(1);
          done();
        });
    });

    it('It should fail when urlKey does not exist', (done) => {
      chai
        .request(server)
        .get('/api/v1/statistics/XXXXX')
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });
});
