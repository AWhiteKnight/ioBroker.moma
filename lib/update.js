'use strict'

const cmd = require('child_process');
console.log('step1');
cmd.execSync('iobroker stop');
console.log('step2');
cmd.execSync('iobroker update');
console.log('step3');
cmd.execSync('iobroker upgrade self');
console.log('step4');
cmd.execSync('iobroker start');
console.log('finish');
