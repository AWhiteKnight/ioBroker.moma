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
    }
    
});
