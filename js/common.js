!function () {

  //请求节点
  
    function $(selector,obj) {
      obj = obj || document;
      return obj.querySelector(selector);
    }
    
    function $all(selector,obj) {
      obj = obj || document;
      return obj.querySelectorAll(selector);
    }
  
  // ajax数据请求
  
    function getXHR() {
      return window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP')
    }
  
    function ajax(url,callback) {
      let xhr = getXHR();
      xhr.onreadystatechange = function () {
        if(xhr.readyState == 4 && xhr.status == 200){
           let data = JSON.parse(xhr.responseText)
          callback(data)
        }
      }
  
      let time = new Date()
      xhr.open('GET',url+'?time='+time.getTime(),true)//解决status为304问题，加一个时间戳，为了每一次都能到后台请求成功
      xhr.send()
    }
  
  // cookie一系列操作
  
    function setCookie(key,value) {
      let data = new Date()
      let day = 2
      let expires
      data.setTime(data.getTime()+day*2*24*60*60*1000)
  
      expires = 'expires='+data.toGMTString()
      
      document.cookie = key + '='+value+';'+expires
      
    }
  
    function getCookie(key){
      let arr = document.cookie.split(';')
      let obj = {}
      let methods = stk.methods
      let trim = methods.trim
      let ar
      for(let i = 0 ; i < arr.length ; i++){
        ar=arr[i].split('=')
        obj[trim(ar[0])] = ar[1]
      }
      console.log(obj)
      return obj[key]
    }
  
    function removeCookie(key){
      let data = new Date()
      let day = -2
      let expires
      data.setTime(data.getTime()+day*2*24*60*60*1000)
  
      expires = 'expires='+data.toGMTString()
      
      document.cookie = key + '='+this.getCookie(key)+';'+expires+';path=/'
    }
    
    

    var obj = {
      $ : $,
      $all : $all,
      ajax : ajax,
      setCookie : setCookie,
      getCookie : getCookie,
      removeCookie : removeCookie,
      //@业务逻辑
      methods : {},
      //@请求文件地址
      service : {},
      //@组件
      plugin : {},

      cross : {}
      
    }
  
    this.stk = obj
  }();