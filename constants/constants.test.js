let chai = require('chai');
let chaiHttp = require('chai-http');
chai.use(chaiHttp);
const should = require('should');

const { INITIAL_CENTER_POINT, INITIAL_RADIUS_LIMIT, PER_MIN_COST, PER_KM_COST, PINK_CAR_COST } = require("./constants");

describe("Constant File Test", () => {
    test("should return INITIAL_CENTER_POINT constant object", () => {
        (INITIAL_CENTER_POINT).should.eql({ latitude: 19.0065043, longitude: 72.8310389 });
    });
    
    test("should return INITIAL_RADIUS_LIMIT constant defined numerical 5", () => {
        (INITIAL_RADIUS_LIMIT).should.eql(5);
    });
    
    test("should return PER_MIN_COST constant defined numerical 1", () => {
        (PER_MIN_COST).should.eql(1);
    });
    
    test("should return PER_KM_COST constant defined numerical 2", () => {
        (PER_KM_COST).should.eql(2);
    });
    
    test("should return PINK_CAR_COST constant defined numerical 5", () => {
        (PINK_CAR_COST).should.eql(5);
    });
});