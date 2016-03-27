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
        },
        {
            title: 'Object Deconstruction'
        },
        {
            title: 'Array Spread Operators'
        },
        {
            title: 'Observables'
        }
    ]
});
