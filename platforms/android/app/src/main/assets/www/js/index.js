/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
// document.addEventListener('deviceready', onDeviceReady, false);

// function onDeviceReady() {
//     // Cordova is now initialized. Have fun!

//     console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
//     document.getElementById('deviceready').classList.add('ready');
// }

// This state represents the state of our application and will be saved and
// restored by onResume() and onPause()


// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

// function onDeviceReady() {
//     // Cordova is now initialized. Have fun!
//     console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
//     document.getElementById('deviceready').classList.add('ready');
//     document.getElementById("uploadFile").addEventListener("click", app.uploadFile);
// }




var logOb;

function fail(e) {
    console.log("FileSystem Error");
    console.dir(e);
}

function onDeviceReady() {

    window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function(dir) {
        console.log("got main dir", dir);
        dir.getFile("log.txt", { create: true }, function(file) {
            console.log("got the file", file);
            logOb = file;
            writeLog("App started");
        });
    });

    document.querySelector("#actionOne").addEventListener("touchend", function(e) {
        //Ok, normal stuff for actionOne here
        //
        //Now log it
        writeLog("actionOne fired");
    }, false);

    document.querySelector("#actionTwo").addEventListener("touchend", function(e) {
        //Ok, normal stuff for actionTwo here
        //
        //Now log it
        writeLog("actionTwo fired");
    }, false);

}

function writeLog(str) {
    if (!logOb) return;
    var log = str + " [" + (new Date()) + "]\n";
    console.log("going to log " + log);
    logOb.createWriter(function(fileWriter) {

        fileWriter.seek(fileWriter.length);

        var blob = new Blob([log], { type: 'text/plain' });
        fileWriter.write(blob);
        console.log("ok, in theory i worked");
    }, fail);
}

function justForTesting() {
    logOb.file(function(file) {
        var reader = new FileReader();

        reader.onloadend = function(e) {
            console.log(this.result);
        };

        reader.readAsText(file);
    }, fail);

}