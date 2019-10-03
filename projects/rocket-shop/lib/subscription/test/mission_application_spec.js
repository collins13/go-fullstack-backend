const assert = require('assert');
const MembershipApplication = require('../models/membership_application')

describe("Applying for a mission", function() {
    let validApp;
    before(function() {
        validApp = new MembershipApplication({
            first: "test",
            last: "user",
            email: "test@test.com",
            age: 30,
            height: 66,
            weight: 180
        });
    });

    describe("Using valid email adress, first, last, height, age, weight", function() {
        it("is valid", function() {
            assert(validApp.isValid(), "Not valid");
        });
        it('reports a valid email', function() {
            assert(validApp.emailIsValid());
        });
        it("report a valid name", function() {
            assert(validApp.nameIsValid());
        });
        it("reports a valid height", function() {
            assert(validApp.heightIsValid());
        });
        it("reports a valid age", function() {
            assert(validApp.ageIsValid());
        });
        it("reports a valid weight", function() {
            assert(validApp.weightIsValid());
        });

    });
});