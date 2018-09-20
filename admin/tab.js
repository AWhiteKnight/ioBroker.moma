function MoMa(main) {
    'use strict';

    var that       = this;
    this.main      = main;
    this.list      = [];
    this.$tab      = $('#tab-moma');                        // anchor for tab 
    this.$tiles    = this.$tab.find('#moma-tiles');         // anchor for tiles view
    this.$table    = this.$tab.find('#moma-table');         // anchor for table
    this.$tHead    = this.$tab.find('#moma-table-head');    // anchor for table header
    this.$tBody    = this.$tab.find('#moma-table-body');    // anchor for table body
    this.inited    = false;
    this.isTiles   = true;
    this.words     = {};
}
