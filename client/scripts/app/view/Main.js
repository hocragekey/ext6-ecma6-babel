Ext.define('app.view.Main', {
    extend: 'Ext.tab.Panel',

    layout: 'fit',

    items: [
        {
            title: 'Sync + Generators',
            xtype: 'sync'
        },
        {
            title: 'Arrow Functions'
        }
    ]
});
