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

   // If the adapter may call process.exit during startup, define here which exit codes are allowed.
    // By default, no exit codes are allowed.
    // allowedExitCodes: [11],

    // If the adapter startup unit tests sometimes fail with a timeout, 
    // you can optionally increase the default timeout here.
    // startTimeout: 60000, // 15000 is the default

    // optionally define which modules should be mocked.
    additionalMockedModules: {
        "noble": nobleMock,
        "@abandonware/noble": nobleMock,
        // Use the {CONTROLLER_DIR} placeholder to access the path where JS-Controller would be installed.
        // Don't forget to provide mocks for every module you need, as they don't exist in unit tests
        "{CONTROLLER_DIR}/lib/tools.js": {}, 
    },

    // Optionally overwrite the default adapter config
    // overwriteAdapterConfig(config: Record<string, any>) {
    overwriteAdapterConfig(config) {
        // Change the object as needed
        // Interval Once
        config.baseboard = true;
        config.chassis = true;
        config.bios = true;
        config.system = true;
        config.cpu = true;
        config.cpuFlags = true;
        config.memLayout = true;
        config.diskLayout = true;
        // Interval 0
        config.time = true;
        config.cpuCurrentSpeed = true;
        config.networkConnections = true;
        config.currentLoad = true;
        config.processes = true;
        // Interval 1
        config.cpuTemperature = true;
        config.mem = true;
        config.networkStats = true;
        config.fullLoad = true;            
        // Interval 2
        config.battery = true;
        config.users = true;
        config.fsSize = true;
        config.blockDevices = true;
        config.fsStats = true;
        config.disksIO = true;
        // Interval 3
        config.graphics = true;
        config.networkInterfaces = true;
        config.networkInterfaceDefault = true;
        config.dockerContainers = true;
        // Interval 4
        config.updates = true;
        config.checkBatteries = true;
        config.osInfo = true;
        config.uuid = true;
        config.shell = true;
        config.versions = true;
        // Don't forget to return it
        return config;
    },

    // If the startup tests need require specific behavior of the mocks 
    // or if you are using methods that don't have a default implementation on the mocks,
    // you can define the behavior here. This method is called before every predefined test
    defineMockBehavior(database, adapter) {
        // e.g.
        // adapter.objects.rename.callsFake( /* implementation here */ );
        // or
        // adapter.objects.getUserGroup.returns("a string");
    },

    // Define your own tests inside defineAdditionalTests. 
    // If you need predefined objects etc. here, you need to take care of it yourself
    defineAdditionalTests() {
        // it("works", () => {
            // see below how these could look like
        // });
    },
});
