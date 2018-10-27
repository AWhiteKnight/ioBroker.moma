![Logo](admin/moma.png)
# ioBroker.moma


**MoMa** is an adapter for **Mo**nitoring and **Ma**intenance of an ioBroker based home automation installation.
**MoMa** aims at home (automation) installations which are a bit more complex than a single machine running all in one or a small number of machines doing some basic load balancing within one network.

It is not intended as a replacement for administration tools like **Puppet**, **Chef**, **Salt** or **Ansible**.
Those are for large environments with many computers and are capable of remote installation of packages. **MoMa** will only be able to remotely update existing installations, no remote installation and no remote configuration.


I am using it for monitoring my IT-Infrastructure at home (including home automation) and keeping it up to date.

## Changelog
### 0.0.5 (2018-10-26)
* Checking for updates in interval 4

### 0.0.4 (2018-10-14)
* New intervals: 0 with high frequency, 4 daily. Extended configuration

### 0.0.3 (2018-10-02)
* Basic functions of 'systeminformation' implemented, some documentation

### 0.0.2 (2018-09-30)
* Library 'systeminformation' integrated. First set of calls implemented


### 0.0.1
* (AWhiteKnight) initial release : Get the Adapter running and show first values of the machines.

## Installation

Use "Adapter - Install from URL" with https://github.com/AWhiteKnight/ioBroker.moma

Works also in multihost environments - ensure that the correct instance is selected before installation.

## Core Concept

still under construction - ideas, proposals, hints, ... are welcome!


Basic idea is to have 
+ a tree for each instance (moma.\<instance-id\>) containing all the informations of the machine the instance is running on. 
+ a common tree (moma.meta) below which every instance creates a device \<hostname\> containing a reference to the instance and some monitoring informations.

## Reference

Following functions of library systeminformation are called on startup:
* baseboard
* bios
* system
* cpu 
* cpuFlags
* memLayout
* diskLayout
* graphics
* osInfo


Following functions of library systeminformation are called in interval 0 (default every second):
* time
* cpuCurrentSpeed
* networkConnections
* currentLoad
* processes (overview - no pids)


Following functions of library systeminformation are called in interval 1 (default every 10 seconds):
* mem
* battery
* cpuTemperature
* networkStats
* fullLoad


Following functions of library systeminformation are called in interval 2 (default every minute):
* users
* fsSize
* blockDevices
* fsStats
* disksIO
* networkInterfaceDefault
* networkInterfaces


Following functions of library systeminformation are called in interval 3 (default every hour):
* none

Following functions of library systeminformation are called in interval 4 (default every day):
* none

Following functions of moma are called in interval 4 (default every day):
* updates - checks for pending updates and shows the amount of updates in moma.meta.\<hostname\>.updates (currently only Ubuntu, Debian, openSUSE, RedHat)


## License
The MIT License (MIT)

Copyright (c) 2018 'A White Knight' <awhiteknight@unity-mail.de>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
