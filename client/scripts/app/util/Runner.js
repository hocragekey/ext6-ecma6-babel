'use strict';
Ext.define('app.util.Runner', {
    xtype: 'Runner',
    alias: 'Runner',

    run: function (g) {
        var it = g(), ret, v;

        //This expects everything returned to be a promise OR an array of promises, will return the value of the
        return (function iterate(val) {
            ret = it.next(val);
            v = ret.value;

            //Handles in parallel calls passed via array
            if (Array.isArray(v)) {
                let darr = [],
                    c = 0,
                    pfqn = function parallel(idx, resp) {
                        darr[idx] = resp;

                        c++;
                        if(c === v.length) {
                            console.log('all urls hit');
                            var p = new Promise(function(resolve, reject) {
                                resolve(darr);
                            });

                            p.then(iterate);
                        }
                    };

                v.map((cv, i) => cv.then( (resp) => pfqn.call(undefined, i, resp )));
            //Handles single promises
            } else {
                if (!ret.done) {
                    ret.value.then(iterate);
                }
            }

        })();
    }

});