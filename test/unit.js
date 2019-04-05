const path = require("path");
const { tests } = require("@iobroker/testing");

// You can also mock external modules to create a more controlled environment during testing.
// Define the mocks as objects and include them below
const nobleMock = {
    on() {},
    state: "poweredOff",
}

// Run unit tests - See https://github.com/ioBroker/testing for a detailed explanation and further options
tests.unit(path.join(__dirname, ".."), {
    //     ~~~~~~~~~~~~~~~~~~~~~~~~~
    // This should be the adapter's root directory

});
