const path = require("path");
const { tests } = require("@iobroker/testing");

// Validate the package files - See https://github.com/ioBroker/testing for a detailed explanation and further options
tests.packageFiles(path.join(__dirname, '..'));
//                 ~~~~~~~~~~~~~~~~~~~~~~~~~
// This should be the adapter's root directory
