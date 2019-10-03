const { _ } = require("underscore");
const membershipApplication = (args) => {
    _.extend(this, args);
    this.emailIsValid = () => {
        return this.email && this.email > 3 && this.email.indexOf("@") > -1;

    }
    this.heightIsValid = () => {
        return this.height && this.height > 60 && this.height < 75;


    }
    this.ageIsValid = () => {
        return this.age && this.age < 100 && this.age > 15;

    }
    this.weightIsvalid = () => {
        return this.weight && this.weight > 100 && this.weight < 300;
    }
    this.nameIsvalid = () => {
        return this.name && this.name > 100 && this.name < 300;

    }
    this.isValid = () => {
        return this.emailIsValid() &&
            this.heightIsValid() &&
            this.ageIsValid() &&
            this.weightIsvalid();
        this.nameIsvalid();

    }
}
module.exports = membershipApplication