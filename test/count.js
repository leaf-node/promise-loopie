#! /usr/bin/env node

// Created 2016 Andrew Engelbrecht
//
// This program is released under CC0
//
// https://creativecommons.org/publicdomain/zero/1.0/
//

// Test and demonstrate the use of the promise-loopie library

/*global Promise */
/*jslint unparam: true */


var promiseLoop, main, addTenThousandPromises, testIfDone, maxLoops;

// normally: promiseLoop = require('promise-loopie');
promiseLoop = require('../src/main.js');


maxLoops = 100; // Increase to observe long-term low memory use.


// Start loop; handle result
main = function () {

    "use strict";

    var endOfChain;

    endOfChain = Promise.resolve(0);

    // loop
    promiseLoop(addTenThousandPromises, testIfDone, endOfChain).then(function (result) {

        console.log("all done: " + result);

    }).catch(function (error) {

        console.log(error);
        //process.exit(1); // for outermost function of nodejs program
    });

};

// Your replacement of this function may generate long or short promise chains,
// but don't make them too long. This function generates a chain of 10,000
// promises. Use smaller chunks if your chains are too long.
addTenThousandPromises = function (endOfChain) {

    "use strict";

    var i, addOne;

    addOne = function (number) {
        return number + 1;
    };

    for (i = 0; i < 10000; i += 1) {

        // The current end of the promise chain must refer to the new one.
        endOfChain = endOfChain.then(addOne);
    }
    // Return the new chain end.
    return endOfChain;
};

// return true if the loop should continue, otherwise false.
testIfDone = function (currentValue, loopCount) {

    "use strict";

    console.log(currentValue);

    //if (currentValue > 50000) {
    //    throw new Error("test error");
    //}

    if (loopCount >= maxLoops) {
        return true;
    }

    return false;
};

// begin
main();

