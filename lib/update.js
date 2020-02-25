'use strict'

const os = require('os');
const cmd = require('child_process');
console.log('update js-controller for ' + os.platform());

switch(os.platform()) {
    case 'linux':
        console.log('step1');
        cmd.execSync('iobroker stop', {cwd:'/opt/iobroker'});
        console.log('step2');
        // npm install iobroker.js-controller@2.2.9 --unsafe-perm --loglevel error --prefix "/opt/iobroker"
        cmd.execSync('iobroker upgrade self', {cwd:'/opt/iobroker'});
        console.log('step3');
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
console.log('finish');
