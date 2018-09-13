'use strict';

// needs access to os information
const os = require('os');
// we read from file system
const fs = require('fs');
// we want to spawn commands
const cmd = require('child_process');

/*
 * structure containing all Info of this machineInfo
 */

const machine = {
  // name of the host as stated in /etc/hostname
  hostname: os.hostname(),
  // arm,arm64,ia32,mips,mipsel,ppc,ppc64,s390,s390x,x32,x64
  arch: os.arch(),
  //  aix,darwin,freebsd,linux,openbsd,sunos,win32
  platform: os.platform(),
  // Darwin, Linux, Windows_NT
  ostype: os.type(),
  // maintained by coding call function getListOfUpdates(false|true)
  numUpdates: 0,
  // scaling factor for load measuring
  // TODO currently only linux implemented
  scaling: 100/os.cpus().length,
};

/*
 * initialize module internal fields
 */
module.exports.init = () => {
  getListOfUpdates(true);
  return;
}

/*
 * reload module internal fields which might have changed
 */
module.exports.reload = () => {
  machine.hostname = os.hostname();
  getListOfUpdates(true);
  return;
}

module.exports.getHostname = () => {
  return machine.hostname;
}

/*
 * converts time value from seconds to a literal 'd:h:mm:ss'
 */
module.exports.getUptime = () => {
  let time = os.uptime();
  let t1 = time%86400;
  let d = (time-t1)/86400;
  let t2 = t1%3600;
  let h = ((t1-t2)/(3600));
  t1 = t2%60;
  let mm = (t2-t1)/60;
  let ss = t1-t1%1;

  // minutes and seconds always with two digits
  if(mm < 10) {
    mm = '0' + mm;
  }
  if(ss < 10) {
    ss = '0' + ss;
  }

  // concatenate the string
  return `${d}:${h}:${mm}:${ss}`;
}

module.exports.getLoad = () => {
  switch(machine.platform) {
    case 'linux':
      return ((os.loadavg()[0])*machine.scaling).toFixed(0);
      //break;
    case 'win32':
      return '32';
      //break;
    //aix,darwin,freebsd,openbsd,sunos
    default:
      return '22';
      //break;
  }
}

module.exports.getTemp = () => {
  switch(machine.platform) {
    case 'linux':
      try {
        //return cmd.execSync('cat /sys/class/thermal/thermal_zone0/temp 2> /dev/null')/1000;
        return String(fs.readFileSync('/sys/class/thermal/thermal_zone0/temp')).replace('\n','');
      } catch (err) {
        // no temp info available => -274°C is impossible
        return '-274'
      }
      //break;
    case 'win32':
      // no temp info available => -274°C is impossible
      return '-274';
      //break;
    //aix,darwin,freebsd,openbsd,sunos
    default:
      return '-274';
      //break;
  }
}

module.exports.getNumUpdates = () => {
  return machine.numUpdates;
}

/*
 * function splits OS release string into several sub-elements
 */
const getOsReleaseAsArray = () => {
  let elements = os.release().toString().split('.');
  // last version part sometimes has '-' in it
  let k = elements.length-1;
  let elements2 = elements[k].split('-');
  for(let i in elements2.length) {
    if(elements2[i].length > 0) {
      elements[k++] = elements2[i];
    }
  }
  return elements;
}

/*
 * fetches the list of updates available for the machine
 * parameter: log - if set to true, the full information will be returned, otherweise only package name
 * format: [package-info|package-info|...]
 */
function getListOfUpdates(long) {
  let list = [];
  switch(machine.platform) {
    case 'linux':
      // TODO implement for different package managers
      // debian packages with apt
      let lines = cmd.execSync('apt list --upgradeable 2> /dev/null').toString().split('\n');
      let k = 0;
      for(let i = 0; i < lines.length; i++) {
        if(lines[i].length > 16) {
          if(!long) {
            let pkg = lines[i].toString().split('/');
            list[k++] = pkg[0];
          } else {
            list[k++] = lines[i];
          }
        }
      }
      break;
    case 'win32':
      // TODO implement
      // win10 mit powershell
      if(machine.osversion[0] >= 10 ) {
      /* für die PowerShell unter win10:
        $UpdateSession = New-Object -ComObject Microsoft.Update.Session
  			$UpdateSearcher = $UpdateSession.CreateUpdateSearcher()
  			$UpdateSearcher.ServerSelection = 3
  			$UpdateSearcher.ServiceID = "7971F918-A847-4430-9279-4A52D1EFE18D"
  			$WUPacks = @($UpdateSearcher.Search("IsHidden=0 and IsInstalled=0").Updates)
      */
    } else {
      /* no PowerShell */

    }
      break;
    default:
      break;
  }

  // maintain machine state
  machine.numUpdates = list.length;
  return list;
}
