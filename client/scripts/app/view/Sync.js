'use strict';
Ext.define('app.view.Sync', {
    extend: 'Ext.Container',

    xtype: 'sync',

    config: {
        layout: 'fit',
        title: 'Synchronous Process Built Via Generators',

        listeners: {
            activate: function (...args) {
                var fqn = this.callAjax.bind(this),
                    sp = new app.util.Perf(),
                    pp = new app.util.Perf();

                function* sync() {
                    sp.start('synchronous calls');
                    let r1 = yield fqn('123');
                    let r2 = yield fqn('456');
                    let r3 = yield fqn('789');
                    console.log(r1 + r2+ r3);
                    sp.end();
                }

                function* parallel() {
                    pp.start('parallel calls');
                    let rarr = yield ['123', '456', '789'].map(fqn);
                    console.log(...rarr);
                    pp.end();
                }

                var r = new app.util.Runner();

                r.run(sync);
                r.run(parallel);
            }
        },

        items : [
            {
                xtype: 'button',
                text: '3 Requests in Parallel'
            }
        ]
    },

    /* ----- helper functions -------*/
    callAjax: function (url) {
        return new Promise(function (resolve, reject) {
            fakeAjax({}, function (err, res) {
                if (err) {
                    return reject(err);
                }
                //console.log(url);
                resolve(url);
            });
        });
    }
});
