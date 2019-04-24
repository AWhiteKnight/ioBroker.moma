//'use strict';
console.log('starting moma admin-tab script');

// access to admin-tab moma
this.$tab = $('#tab-moma');
// data for each host
this.list = [];
// translation
this.words = {};
// socket.io connection
this.firstConnect = true;
this.main = {
    socket: io.connect(location.protocol + '//' + location.host, {
        query: 'ws=true'
    }),
    subscribe: (isSubscribe) => {
        if (!main.socket) return;
        if (isSubscribe) {
            console.log('Subscribe objects');
            main.socket.emit('subscribeObjects', 'moma.meta.*');
            main.socket.emit('requireLog', true);
        } else {
            console.log('Unsubscribe objects');
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

// sometimes we need that :-)
let that = this;

function Moma() {
    // prepare the table below buttons
    showHostsTable();

    // connect and enable buttons depending on data 
    $('#btnUpdateAll').click(() => {
        for (let i = 0; i < that.list.length; i++) {
            if(that.list[i]['numUpdates'] > 0) {
                console.log('updating ' + that.list[i]['instance']);
                main.socket.emit('sendTo', that.list[i]['instance'], 'send', 'doUpdates', (result) => {
                    console.log(result);
                });
            }
        }
    });

    $('#btnRebootAll').click(() => {
        for (let i = 0; i < that.list.length; i++) {
            if(that.list[i]['needsReboot'] > 0) {
                console.log('rebooting ' + that.list[i]['instance']);
                main.socket.emit('sendTo', that.list[i]['instance'], 'send', 'scheduleReboot', (result) => {
                    for(x in result){
                        console.log(x);
                    }
                });
            }
        }
    });
}

function fetchData(callback) {
    this.main.socket.emit('getForeignObjects', 'moma.meta.hosts.*',  'channel', function (err, res) {
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
    let text = createHostHeader();
    let header = this.$tab.find('#table-hosts-head');
    header.html(text);
    header.show();
    
    // fetch data
    fetchData(function() {
        // console.log('preparing table ' + JSON.stringify(this.list));
        text = '';
        for (let i = 0; i < this.list.length; i++) {
            text += createHostRow(i);
        }
        let body = this.$tab.find('#table-hosts-body');
        body.html(text);
        body.show();
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
    text += '<td>' + this.list[index]['id'] + '</td>'
    // number of updates
    text += '<td>' + this.list[index]['numUpdates'] + '</td>'
    // list of updates
    text += '<td title="' + this.list[index]['updates'] +'">' + this.list[index]['updates'] + '</td>'
    // button Update
    text += '<td><button title="update">U</button></td>'
    // button Reboot
    text += '<td><button title="reboot">R</button></td>'
    text += '</tr>';

    return text;
}

// ==== start of tab creation =============================================================
let moma = new Moma();
