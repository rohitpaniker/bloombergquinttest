let chai = require('chai');
let chaiHttp = require('chai-http');
chai.use(chaiHttp);
let server = require('./app');
const should = require('should');

describe('Test APP.js', () => {
    it('accessing / should redirect to /api/v1 ', (done) => {
        chai.request(server)
            .get('/')
            .redirects(1)
            .end((err, resp) => {
                (resp.statusCode).should.be.eql(200)
                done();
            })
    })
})