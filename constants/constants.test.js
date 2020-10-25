const { INITIAL_CENTER_POINT, INITIAL_RADIUS_LIMIT, PER_MIN_COST, PER_KM_COST, PINK_CAR_COST } = require("./constants");

describe("Constant File Test", () => {
    test("should return an object", () => {
        expect(INITIAL_CENTER_POINT).toBe({ latitude: 19.0065043, longitude: 72.8310389 });
    })
});