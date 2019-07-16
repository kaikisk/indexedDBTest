// service-worker.js
self.addEventListener('install', function(e) {
    console.log('[ServiceWorker] Install');
});
    
self.addEventListener('activate', function(e) {
    console.log('[ServiceWorker] Activate');
});
    
self.addEventListener('fetch', function(event) {});

setInterval(function(){
    const request = indexedDB.open( 'mydb', 1.0);
    var db;
    
    request.onsuccess = function(){
        db = this.result;
        var transaction = db.transaction(["mystore"], "readonly");
        var store = transaction.objectStore("mystore");
        var request1 = store.openCursor();

        request1.onsuccess = function (){
            console.log("request1:  key: " + this.result.key + " ,value: " + this.result.myvalue);
            this.result.continue();
        }
        console.log(db);
    }
}, 10000);