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
    saveConfig:     (attr, value) => {
        if (!main.config) return;
        if (attr) main.config[attr] = value;

        if (typeof storage !== 'undefined') {
            storage.set('adminConfig', JSON.stringify(main.config));
        }
    },
    showError:      (error, cb) => {
        main.showMessage(_(error),  _('Error'), 'alert', cb);
    },
    showMessage:    (message, title, icon, cb)  => {
        if (typeof title === 'function') {
            cb = title;
            title = null;
            icon = null;
        }
        if (typeof icon === 'function') {
            cb = icon;
            icon = null;
        }
        $dialogMessage.dialog('option', 'title', title || _('Message'));
        $('#dialog-message-text').html(message);

        if (icon) {
            if (!icon.match(/^ui\-icon\-/)) icon = 'ui-icon-' + icon;

            $('#dialog-message-icon')
                .show()
                .attr('class', '')
                .addClass('ui-icon ' + icon);
        } else {
            $('#dialog-message-icon').hide();
        }
        $dialogMessage.data('callback', cb);
        $dialogMessage.dialog('open');
    },
    confirmMessage: (message, title, icon, buttons, callback) => {
        if (typeof buttons === 'function') {
            callback = buttons;
            $dialogConfirm.dialog('option', 'buttons', [
                {
                    text: _('Ok'),
                    click: () => {
                        let cb = $(this).data('callback');
                        $(this).dialog('close');
                        if (cb) cb(true);
                    }
                },
                {
                    text: _('Cancel'),
                    click: () => {
                        let cb = $(this).data('callback');
                        $(this).dialog('close');
                        if (cb) cb(false);
                    }
                }

            ]);
        } else if (typeof buttons === 'object') {
            for (let b = 0; b < buttons.length; b++) {
                buttons[b] = {
                    text: buttons[b],
                    id: 'dialog-confirm-button-' + b,
                    click: (e) => {
                        let id = parseInt(e.currentTarget.id.substring('dialog-confirm-button-'.length), 10);
                        let cb = $(this).data('callback');
                        $(this).dialog('close');
                        if (cb) cb(id);
                    }
                }
            }
            $dialogConfirm.dialog('option', 'buttons', buttons);
        }

        $dialogConfirm.dialog('option', 'title', title || _('Message'));
        $('#dialog-confirm-text').html(message);
        if (icon) {
            $('#dialog-confirm-icon')
                .show()
                .attr('class', '')
                .addClass('ui-icon ui-icon-' + icon);
        } else {
            $('#dialog-confirm-icon').hide();
        }
        $dialogConfirm.data('callback', callback);
        $dialogConfirm.dialog('open');
    },
    initSelectId:   () => {
        if (main.selectId) return main.selectId;
        main.selectId = $('#dialog-select-member').selectId('init',  {
            objects: main.objects,
            states:  main.states,
            noMultiselect: true,
            imgPath: '../../lib/css/fancytree/',
            filter: {type: 'state'},
            getObjects: getObjects,
            texts: {
                select:   _('Select'),
                cancel:   _('Cancel'),
                all:      _('All'),
                id:       _('ID'),
                name:     _('Name'),
                role:     _('Role'),
                room:     _('Room'),
                value:    _('Value'),
                selectid: _('Select ID'),
                from:     _('From'),
                lc:       _('Last changed'),
                ts:       _('Time stamp'),
                wait:     _('Processing...'),
                ack:      _('Acknowledged')
            },
            columns: ['image', 'name', 'role', 'room', 'value']
        });
        return main.selectId;
    },
    subscribe:      (isSubscribe) => {
        if (!main.socket) return;
        if (isSubscribe) {
            console.log('Subscribe logs');
            main.socket.emit('subscribeObjects', 'script.*');
            main.socket.emit('subscribeObjects', 'system.adapter.*');
            main.socket.emit('requireLog', true);
        } else {
            console.log('Unsubscribe logs');
            main.socket.emit('unsubscribeObjects', 'script.*');
            main.socket.emit('unsubscribeObjects', 'system.adapter.*');
            main.socket.emit('requireLog', false);
        }
    },
    objects:        {},
    states:         {},
    currentHost:    '',
    instances:      [],
    objectsLoaded:  false,
    waitForRestart: false,
    selectId:       null
};

// sometimes we need that :-)
let that = this;

function Moma() {
    // prepare the table below buttons
    showHostsTable();

    // connect and enable buttons depending on data 
    $('#btnUpdateAll').click(() => {
        console.log('Button UpdateAll clicked');
    });

    $('#btnRebootAll').click(() => {
        console.log('Button RebootAll clicked');
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
        console.log('preparing table ' + JSON.stringify(this.list));
        text = '';
        for (var i = 0; i < this.list.length; i++) {
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
    // col for list of updates
    text += '<th>updateList</th>'
    // col for button Update
    text += '<th style="width: 20px">U</th>'
    // col for button Reboot
    text += '<th style="width: 20px">R</th>'

    text += '</tr>';
    return text;

}

function createHostRow(index) {
    let text = '<tr>';
    // hostname
    text += '<td>' + this.list[index]['id'] + '</td>'
    // list of updates
    text += '<td>' + this.list[index]['updates'] + '</td>'
    // button Update
    text += '<td>' + '*' + '</td>'
    // button Reboot
    text += '<td>' + 'x' + '</td>'

    text += '</tr>';

    return text;
}

// ==== start of tab creation =============================================================
let moma = new Moma();
