// service-worker.js
self.addEventListener('install', function(e) {
    console.log('[ServiceWorker] Install');
});
    
self.addEventListener('activate', function(e) {
    console.log('[ServiceWorker] Activate');
});
    
// 現状では、この処理を書かないとService Workerが有効と判定されないようです
self.addEventListener('fetch', function(event) {});

const request = indexedDB.open( 'mydb', 1.0);
var db;

var transaction = db.transaction(["mystore"], "readonly");
var store = transaction.objectStore("mystore");
var request1 = store.get("1");

request.onsuccess = function(){
    db = this.result;
    console.log(db);
    console.log("request1: " + request1);
}