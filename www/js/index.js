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
// Global InAppBrowser reference
var iabRef = null;

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener("deviceready", this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    //onLine event
    onOnline:function(){
        //app.receivedEvent('online');
        //window.location = "http://pedesorange.rapapp.com/m";
        var id = 'deviceready';
        var parentElement = document.getElementById(id);
        var receivedElement = parentElement.querySelector('.received');

        receivedElement.textContent = "Connecting";
        iabRef = window.open('http://pedesorange.rapapp.com/m', '_self', 'location=no');
        //iabRef.addEventListener('loadstart', this.iabLoadStart,false);
        //iabRef.addEventListener('loadstop', this.iabLoadStop,false);
        //iabRef.addEventListener('exit', this.iabClose,false);
    },
    //onOffline event handler
    onOffline:function(){
        //app.receivedEvent('offline');
        var id = 'deviceready';
        var parentElement = document.getElementById(id);
        var receivedElement = parentElement.querySelector('.received');

        receivedElement.textContent = "Unable to connect";

        console.log('Fired offline event ');
    },
    checkConnection: function() {
        var networkState = navigator.network.connection.type;

        var states = {};
        states[Connection.UNKNOWN]  = 'Unknown connection';
        states[Connection.ETHERNET] = 'Ethernet connection';
        states[Connection.WIFI]     = 'WiFi connection';
        states[Connection.CELL_2G]  = 'Cell 2G connection';
        states[Connection.CELL_3G]  = 'Cell 3G connection';
        states[Connection.CELL_4G]  = 'Cell 4G connection';
        states[Connection.NONE]     = 'No network connection';

        console.log('Connection type: ' + states[networkState]);
        return networkState;
    },
    iabLoadStart:function(event) {
        console.log(event.type + ' - ' + event.url);
    },
    iabLoadStop:function(event) {
        console.log(event.type + ' - ' + event.url);
    },
    iabClose:function(event) {
        console.log(event.type);
        iabRef.removeEventListener('loadstart', iabLoadStart);
        iabRef.removeEventListener('loadstop', iabLoadStop);
        iabRef.removeEventListener('exit', iabClose);
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
        receivedElement.textContent = "Checking connectivity";

        console.log('Registred listeners:' );
        document.addEventListener("online", this.onOnline, false);
        document.addEventListener("offline",this.onOffline, false);

        if(app.checkConnection() == Connection.NONE){
            app.onOffline();
        }else{
            app.onOnline();
        }
        console.log('Received Event: ' + id);
    }
};
