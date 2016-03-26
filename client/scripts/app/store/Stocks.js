Ext.define('app.store.Stocks', {
    extend: 'Ext.data.Store',

    alias: 'store.stocks',

    fields: [
        'name', 'symbol'
    ],

    proxy: {
        type: 'ajax',
        url : 'stocks.json'
    }
});
