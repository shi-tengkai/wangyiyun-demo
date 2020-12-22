(function () {

  let methods = stk.methods
  let service = stk.service
  let plugin = stk.plugin
  let $ = stk.$
  let $all = stk.$all
  let ajax = stk.ajax

  function init () {
    methods.go('login.html');
    methods.operateFn() //ALL委托包装
    // 轮播初始化
    ajax(service.user,function(mess){
      plugin.user_msg(mess)
    })
    ajax(service.banner,function(mess){
      plugin.banner(mess)
    })
    ajax(service.modules,function(mess){
      plugin.modules(mess)
    })
    ajax(service.rdl,function(mess){
      plugin.rdl(mess)
    })
    ajax(service.foot,function(mess){
      plugin.foot(mess)
    })
  }

  init();


  
  
})();