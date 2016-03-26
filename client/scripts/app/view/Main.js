Ext.define('app.view.Main', {
    extend: 'Ext.TabPanel',

    config: {
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

    }
});
