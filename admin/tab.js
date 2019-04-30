//'use strict';
console.log('starting moma admin-tab script');

//==== socket.io connection ======================================
let firstConnect = true;
let main = {
    socket: io.connect(location.protocol + '//' + location.host, {
        query: 'ws=true'
    }),
    subscribe: (isSubscribe) => {
        if (!main.socket) return;
        if (isSubscribe) {
            console.log('subscribe objects');
            main.socket.emit('subscribeObjects', 'moma.meta.*');
            main.socket.emit('requireLog', true);
        } else {
            console.log('unsubscribe objects');
            main.socket.emit('unsubscribeObjects', 'moma.meta.*');
            main.socket.emit('requireLog', false);
        }
    }
};

main.socket.on('connect',() => {
    main.subscribe(true);
});

main.socket.on('disconnect', () => {
    main.subscribe(false);
});

main.socket.on('objectChange', (id, obj) => {
    console.log(id);
});

main.socket.on('stateChange', (id, obj) => {
    console.log(id);
});

//==== moma tab ==================================================
// to avoid conflicts with different "this" objects
// sometimes we need that :-)
let that = this;

// access to admin-tab moma
that.$tab = $('#tab-moma');
// data for each host
that.list;
// translation
that.words = {};
that.main = main; 

function update(i) {
    console.log('updating ' + that.list[i]['instance']);
    main.socket.emit('sendTo', that.list[i]['instance'], 'send', 'doUpdates', (result) => {
        console.log(result);
        that.list[i].numUpdates = 0;
        window.document.querySelector('#btnUpdate'+i+'').style.visibility='hidden';
    });
}

function reboot(i) {
    console.log('rebooting ' + that.list[i]['instance']);
    main.socket.emit('sendTo', that.list[i]['instance'], 'send', 'scheduleReboot', (result) => {
        console.log(result);
    });
}

function Moma() {
    // prepare the table below buttons
    showHostsTable();

    // connect and enable global buttons depending on data 
    $('#btn-view-mode').click(() => {
        console.log('button ViewMode');
    });

    $('#btn-reload').click(() => {
        console.log('button Reload');
        showHostsTable();        
    });

    $('#btn-update-all').click(() => {
        console.log('button Update');
        for (let i = 0; i < that.list.length; i++) {
            if(that.list[i]['numUpdates'] > 0) {
                update(i);
            }
        }
    });

    $('#btn-reboot-all').click(() => {
        console.log('button Reboot');
        for (let i = 0; i < that.list.length; i++) {
            if(that.list[i]['needsReboot'] > 0) {
                reboot(i);
            }
        }
    });
}

function fetchData(callback) {
    that.list = [];
    that.main.socket.emit('getForeignObjects', 'moma.meta.hosts.*',  'channel', function (err, res) {
        if(res) {
            // console.log(res);
            for(let line in res) {
                // console.log(line);
                let host = {};
                host.id = line.split('.')[3];
                that.main.socket.emit('getForeignStates', line + '.*', function (err2, res2) {
                    if(res2) {
                        // console.log('res2: ' + JSON.stringify(res2));
                        for(let state in res2) {
                            // console.log('state: ' + JSON.stringify(state));
                            let name = state.split('.')[4];
                            host[name] = res2[state]['val'];
                        }
                        // console.log(host);
                        that.list.push(host);
                        // console.log('list', that.list);
                        if (callback) callback();
                    } else if (err2) {
                        console.log('err2: ' + JSON.stringify(err2));
                    }
                });
            }
        } else if (err) {
            console.log('err: ' + JSON.stringify(err));
        }
    });
}

function showHostsTable() {
    // create table header
    let text = createHostHeader();
    let header = that.$tab.find('#table-hosts-head');
    header.html(text);
    header.show();
    
    // fetch data before creating table body
    fetchData(function() {
        // console.log('preparing table ' + JSON.stringify(that.list));
        text = '';
        for (let i = 0; i < that.list.length; i++) {
            text += createHostRow(i);
        }
        let body = that.$tab.find('#table-hosts-body');
        body.html(text);
        body.show();
        for (let i = 0; i < that.list.length; i++) {
            let button= window.document.querySelector('#btnUpdate'+i+'');
            if(that.list[i].numUpdates > 0) {
                button.style.visibility='visible';
                button.addEventListener('click', function(obj) { update(i); } );
            } else {
                button.style.visibility='hidden';
            }
            button= window.document.querySelector('#btnReboot'+i+'');
            if(that.list[i].needsReboot) {
                button.style.visibility='visible';
                button.addEventListener('click', function(obj) { reboot(i); } );
            } else {
                button.style.visibility='hidden';
            }
        }
    });
}

function createHostHeader() {
    let text = '<tr>';
    // col for hostname
    text += '<th style="width: 80px">hostname</th>'
    // col for number of updates
    text += '<th style="width: 20px">#</th>'
    // col for list of updates
    text += '<th>updates</th>'
    // col for button Update
    text += '<th style="width: 20px"> </th>'
    // col for button Reboot
    text += '<th style="width: 20px"> </th>'

    text += '</tr>';
    return text;
}

function createHostRow(index) {
    let text = '<tr>';
    // hostname
    text += '<td>' + that.list[index]['id'] + '</td>'
    // number of updates
    text += '<td>' + that.list[index]['numUpdates'] + '</td>'
    // list of updates
    text += '<td title="' + that.list[index]['updates'] +'">' + that.list[index]['updates'] + '</td>'
    // button Update
    text += '<td><button type="button" title="update" class="update" id="btnUpdate' + index + '">U</button></td>'
    // button Reboot
    text += '<td><button type="button" title="reboot" class="reboot" id="btnReboot' + index + '">R</button></td>'
    text += '</tr>';

    return text;
}

// ==== start of tab creation =============================================================
let moma = new Moma();
