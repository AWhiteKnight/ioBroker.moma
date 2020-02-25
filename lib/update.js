'use strict'

const os = require('os');
const cmd = require('child_process');

switch(os.platform()) {
    case 'linux':
        cmd.execSync('iobroker stop', {cwd:'/opt/iobroker'});
        cmd.execSync('iobroker upgrade self', {cwd:'/opt/iobroker'});
        cmd.execSync('iobroker start', {cwd:'/opt/iobroker'});
        break;
    case 'win32':
        cmd.execSync('iobroker stop', {cwd:'C:\\iobroker'});
        cmd.execSync('iobroker upgrade self', {cwd:'C:\\iobroker'});
        cmd.execSync('iobroker start', {cwd:'C:\\iobroker'});
        break;
    case 'darwin':
    default:
        console.log('update js-controller not implemented for ' + os.platform());
        break;
}
