// Main App view handler

var app = app || {};

var ENTER_KEY = 13;

$(function() {
    // Kick things off by creating the **App**.
    new app.AppView();

});

// log enable or disable , check the behaviour
var debug = true;
function DebugMsg(msg){
    if (debug){
        console.log(msg);
    }
}