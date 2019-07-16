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

request.onsuccess = function(){
    db = this.result;
    var transaction = db.transaction(["mystore"], "readonly");
    var store = transaction.objectStore("mystore");
    var request1 = store.get("1");
    console.log(db);
    console.log("request1: " + request1);
}