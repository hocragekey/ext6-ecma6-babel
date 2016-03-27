'use strict';
Ext.define('app.view.Sync', {
    extend: 'Ext.Container',

    xtype: 'sync',

    config: {
        layout: 'fit',
        itemId: 'sync',

        items: [
            {
                xtype: 'container',
                layout: 'vbox',
                width: '100%',
                height: 800,
                items: [
                    {
                        xtype: 'container',
                        layout: 'hbox',
                        width: '100%',
                        height: 85,

                        items: [
                            {
                                xtype: 'button',
                                itemId: 'sbutton',
                                text: '3 Sync Requests',
                                width: 350,
                                margin: 20,

                                handler: function () {
                                    this.up('#sync').callSync();
                                }
                            },
                            {
                                xtype: 'button',
                                itemId: 'pbutton',
                                text: '3 Parallel Requests',
                                width: 350,
                                margin: 20,

                                handler: function () {
                                    this.up('#sync').callParallel();
                                }
                            }
                        ]
                    },
                    {
                        xtype: 'panel',
                        itemId: 'ocont',
                        title: 'Console Output',
                        height: 600,
                        width: 600
                    }
                ]
            }

        ]
    },

    /*
     * Makes three asynchronous calls synchronously and then handles the actions in order.
     */
    callSync: function () {
        var fqn = this.callAjax.bind(this),
            hijack = this.hijackLog.bind(this),
            rlog = this.returnLog.bind(this),
            sp = new app.util.Perf();

        function* sync() {
            hijack();
            sp.start('synchronous calls');
            let r1 = yield fqn('123');
            let r2 = yield fqn('456');
            let r3 = yield fqn('789');
            console.log('Response: ' + r1 + r2 + r3);
            sp.end();
            rlog();
        }

        var r = new app.util.Runner();
        r.run(sync);
    },

    /*
     * Makes three asynchronous calls in parallel and then handles an action when all are completed.
     */
    callParallel: function () {
        //TODO: This sucks is there a better way?  Can't access 'this' within the generator
        var fqn = this.callAjax.bind(this),
            hijack = this.hijackLog.bind(this),
            rlog = this.returnLog.bind(this),
            pp = new app.util.Perf();

        function* parallel() {
            hijack();
            pp.start('parallel calls');
            let rarr = yield ['123', '456', '789'].map(fqn);
            console.log('Response: ');
            rarr.map(console.log);
            pp.end();
            rlog();
        }

        var r = new app.util.Runner();
        r.run(parallel);
    },

    /*
     * Hijacking the console output on screen
     */
    hijackLog: function () {
        var log = this.oldLog = console.log,
            ocont = this.down('#ocont');

        ocont.add({
            xtype: 'label',
            html: '<br/>'
        });

        console.log = function (str) {
            ocont.add({
                xtype: 'label',
                html: str
            })
        }
    },

    /*
     * Giving output log
     */
    returnLog: function () {
        console.log = this.oldLog;
    },

    /*
     * Example asynchronous method
     */
    callAjax: function (url) {
        return new Promise(function (resolve, reject) {
            fakeAjax({}, function (err, res) {
                if (err) {
                    return reject(err);
                }

                resolve(url);
            });
        });
    }
});
