Ext.define('app.store.StockData', {
    extend: 'Ext.data.Store',

    alias: 'store.stocks',
    autoload: false,

    fields: [
        'time', 'ask', 'bid'
    ],

    proxy: {
        type: 'ajax',
        url : 'sdata.json'
    }
});
