!function(){

  function init(){
    stk.methods.go()
  }
  init()


  stk.$('button[name=login_btn]').onclick = function (){
    stk.ajax(stk.service.user,function(mess){
      let msg = mess[0]
      let username = stk.$('input[name=username]')
      let password = stk.$('input[name=password]')
      let flag = false
      if(!username.value || !password.value){
        return alert('用户名或密码为空')
      }
      for(let item in msg){
        if(msg[item].username == username.value && msg[item].password == password.value){
          flag = true
          break
        }
      }
      if(flag){
        if(!stk.getCookie('username')){
          stk.setCookie('username',username.value)
          location.href = 'home.html'
        }
      }else{
        return alert('密码错误')
      }

    })
  }
}();