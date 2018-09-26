function MoMa(main) {
    'use strict';

    var that = this;
    this.main = main;
    this.list = [];
    // places within the document
    this.$tab   = $('#tab-moma');                       // anchor for content 
    this.$tiles = this.$tab.find('#moma-tiles');        // anchor for tiles view
    this.$table = this.$tab.find('#moma-table');        // anchor for table
    this.$tHead = this.$tab.find('#moma-table-head');   // anchor for table header
    this.$tBody = this.$tab.find('#moma-table-body');   // anchor for table body
    // flag that we subscribed to objects and states
    this.hasSubscribed = false;
    this.isTiles = false;
    this.words = {};

    /**
     * set the icon within the switch-view button
     */
    function setViewIcon() {
        // set the appropriate icon
        // find('i') works, because it is the first (and currently only) icon
        if (that.isTiles) {
            $(this).find('i').text('view_list');
        } else {
            $(this).find('i').text('view_module');
        }
    }

    /**
     *
     */
    this.prepare = function () {
        // get configuration for view mode
        this.isTiles = (this.main.config.momaIsTiles !== undefined && this.main.config.momaIsTiles !== null) ? this.main.config.momaIsTiles : false;

        // fix for old IE versions -> no tiles possible
        if (this.main.browser === 'ie' && this.main.browserVersion <= 10) {
            this.isTiles = false;
            this.$tab.find('.btn-switch-tiles').hide();
        }
        // set icon for btn-switch-view
        setViewIcon();

        // the view mode switch button
        this.$tab.find('.btn-switch-view').off('click').on('click', function () {
            that.isTiles = !that.isTiles;
            // set the appropriate icon
            setViewIcon();
        });
        
        setTimeout(function () {
            that._postInit();
        }, 50);
    }

    /**
     * create one tile
     */
    function createOneTile(index) {
        let text = '';
        text += 'TilesTilesTiles';
        return text;
    }

    /**
     * show content as tile
     */
    function showAsTiles() {
        // create table rows an insert in document
        var tilesText = '';
        for(let i = 0; i < 4; i++) {
            tilesText += createOneTile(i);
        }
        that.$tbody.html('');
        that.$table.hide();
        that.$tiles.html(tilesText).show();
    }

    /**
     * create one row for the table
     */
    function createOneRow(index) {
        // create a table row in HTML
        let text = '<tr>';
        text += '<td>' + 'o' + '</td>';                     // LED
        text += '<td>' + 'Hostname' + index + '</td>';      // Hostname
        text += '<td>' + '0:0:22:32' + '</td>';             // Uptime
        text += '<td>' + '20' + ' %</td>';                  // Load
        text += '<td>' + '42' + ' °C</td>';                 // CPU-Temperature
        text += '<td>' + '123' + '</td>';                   // Number of Updates
        text += '</tr>';
        
        // return the concatenated HTML for the table-row
        return text;
    }

    /**
     * show content as table
     */
    function showAsTable() {
        // create table rows an insert in document
        var tableText = '';
        for(let i = 0; i < 4; i++) {
            tableText += createOneRow(i);
        }
        that.$tbody.html(tableText);

        // set visibility
        that.$tiles.html('').hide();
        that.$table.show();
    }


    /**
     *
     */
    this._postInit = function () {
        // both of the anchorpoints are necessary
        //if (typeof that.$tiles !== 'undefined' && typeof that.$table !== 'undefined') {
            if (this.isTiles) {
                showAsTiles();
            } else {
                showAsTable();
            }
        //}
    }

    /**
     * initialize everything
     */
    this.init = function (update) {
        // are we already initialized?
        if (this.hasSubscribed && !update) {
            return;
        }

        this.getHosts(function () {
            that._postInit();
        });

        // subscribe to objects and states
        if (!this.hasSubscribed) {
            this.hasSubscribed = true;
            //this.main.subscribeObjects('system.host.*');
            //this.main.subscribeStates('system.host.*');
        }
    };

    /**
     * cleanup everything when closing the view/page
     */
    this.destroy = function () {
        // unsubscribe objects and states
        if (this.hasSubscribed) {
            this.hasSubscribed = false;
            //this.main.unsubscribeObjects('system.host.*');
            //this.main.unsubscribeStates('system.host.*');
        }
    };

    /**
     *
     */
    this.getHosts = function (callback) {
        if (callback) callback();
    };

    /**
     *
     */
    this.objectChange = function (id, obj, action) {
    };

    /**
     *
     */
    this.stateChange = function (id, state) {
    };
}
