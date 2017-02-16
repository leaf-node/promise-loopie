// Created 2016 Andrew Engelbrecht
//
// This program is released under CC0
//
// https://creativecommons.org/publicdomain/zero/1.0/
//

// promise-loopie - a memory and stack efficient pattern for infinite
//                  asynchronous looping/chaining with promises
//

/*global Promise */


// This fucntion loops asynchronously over functions that extend promise
// chains.
module.exports = function (chainingFunction, testFunction, endOfChain) {

    "use strict";

    var asyncLoop, loopCount;

    loopCount = 0;

    return new Promise(function (resolve, reject) {

        asyncLoop = function () {

            endOfChain = chainingFunction(endOfChain);

            // Wait for resolution of the entire promise chain before continuing.
            endOfChain.then(function (currentValue) {

                loopCount += 1;

                if (testFunction(currentValue, loopCount)) {

                    endOfChain.then(resolve);
                    return;
                }

                if (typeof setImmediate === "function") {
                    setImmediate(asyncLoop);
                } else {
                    setTimeout(asyncLoop, 0);
                }

            }).catch(reject);
        };

        asyncLoop();
    });
};

