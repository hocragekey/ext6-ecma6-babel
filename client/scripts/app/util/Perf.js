'use strict';
Ext.define('app.util.Perf', {
    xtype: 'Perf',
    alias: 'Perf',

    start: function (name) {
        var s = this.s = +new Date();
        this.name = name;
        console.log(name + ' perf timer started at ' + s + ' ms');
    },

    end: function () {
        var e = this.e = +new Date(),
            s = this.s,
            t = e - s,
            name = this.name;

        console.log(name + ' perf timer ended at ' + e + ' ms');
        console.log(name + ' process total time taken is ' + t + ' ms');
    }

});