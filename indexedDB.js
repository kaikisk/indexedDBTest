var db;
  var indexedDB = window.indexedDB || window.mozIndexedDB || window.msIndexedDB;
  if (indexedDB) {
    // データベースを削除したい場合はコメントを外します。
    //indexedDB.deleteDatabase("mydb");
    var openRequest = indexedDB.open("mydb", 1.0);
     
    openRequest.onupgradeneeded = function(event) {
      // データベースのバージョンに変更があった場合(初めての場合もここを通ります。)
      db = event.target.result;
      var store = db.createObjectStore("mystore", { keyPath: "mykey"});
      store.createIndex("myvalueIndex", "myvalue");
    }
     
    openRequest.onsuccess = function(event) {
          db = event.target.result;
        }
  } else {
    window.alert("このブラウザではIndexed DataBase API は使えません。");
  }
   
  function setValue(event) {
    var key = document.getElementById("newkey").value;
    var value = Number(document.getElementById("newvalue").value);
     
    var transaction = db.transaction(["mystore"], "readwrite");
    var store = transaction.objectStore("mystore");
     
    var request = store.put({ mykey: key, myvalue: value});
    request.onsuccess = function (event) {
      document.getElementById("newkey").value = "";
      document.getElementById("newvalue").value = "";
    }
  }

  function getValue(event) {
    var key = document.getElementById("selectkey").value;
    var result = document.getElementById("result");
    result.innerHTML = "";
     
    var transaction = db.transaction(["mystore"], "readwrite");
    var store = transaction.objectStore("mystore");
     
    var request = store.get(key);
    request.onsuccess = function (event) {
     
      if (event.target.result === undefined) {
        result.innerHTML = "指定したキーは存在しません。";
      } else {
        result.innerHTML = event.target.result.myvalue + "<br/>";
      }
    }
}

function getAll(event) {
   
    var result = document.getElementById("result");
    result.innerHTML = "";
     
    var transaction = db.transaction(["mystore"], "readwrite");
    var store = transaction.objectStore("mystore");
    var request = store.openCursor();
     
    request.onsuccess = function (event) {
     
      if(event.target.result == null) {
        return;
      }
       
      var cursor = event.target.result;
          var data = cursor.value;
      result.innerHTML += "key："  + cursor.key +  "  value：" + data.myvalue + "<br/>";
       
      cursor.continue();
    }
}
   
  function getCount(event) {
   
    var result = document.getElementById("result");
    result.innerHTML = "";
     
    var transaction = db.transaction(["mystore"], "readwrite");
    var store = transaction.objectStore("mystore");
    var request = store.count();
     
    request.onsuccess = function (event) {
      result.innerHTML = event.target.result + "件";
    }
  }
   
  function deleteValue(event) {
    var key = document.getElementById("deletekey").value;
    var result = document.getElementById("result");
    result.innerHTML = "";
     
    var transaction = db.transaction(["mystore"], "readwrite");
    var store = transaction.objectStore("mystore");
     
    var request = store.delete(key);
    request.onsuccess = function (event) {
      result.innerHTML = "削除しました。";
    }
  }
   
  function deleteAll(event) {
   
    var result = document.getElementById("result");
    result.innerHTML = "";
     
    var transaction = db.transaction(["mystore"], "readwrite");
    var store = transaction.objectStore("mystore");
    var request = store.clear();
     
    request.onsuccess = function (event) {
      result.innerHTML = "クリアしました。";
    }
  }
   
  function getKey(event) {
   
    var value1 = Number(document.getElementById("selectValue1").value);
    var value2 = Number(document.getElementById("selectValue2").value);
     
    var result = document.getElementById("result");
    result.innerHTML = "";
     
    var transaction = db.transaction(["mystore"], "readwrite");
    var store = transaction.objectStore("mystore");
    var index = store.index("myvalueIndex");
     
    var range = IDBKeyRange.bound(value1, value2);
    var request = index.openCursor(range);
     
    request.onsuccess = function (event) {
     
      if(event.target.result == null) {
        return;
      }
       
      var cursor = event.target.result;
          var data = cursor.value;
      result.innerHTML += "value：" + data.myvalue + "  key："  + data.mykey + "<br/>";
       
      cursor.continue();
    }
  }
