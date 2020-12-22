!function(){
  let methods = stk.methods
  let service = stk.service
  let plugin = stk.plugin
  let $ = stk.$
  let $all = stk.$all
  let cross = stk.cross

  Object.assign(stk.methods,{
    trim : function (s){
      let reg = /\s/g;
      return s.replace(reg,'')
    },
    go : function (url) {
      if(url){
        if(!stk.getCookie('username')){
          location.href = 'login.html'
        }
      }else{
        if(stk.getCookie('username')){
          location.href = 'home.html'
        }
      }
    },
    //各种属性修改
    control_class : function (arr,attr,value,target) {
      for(let i = 0; i < arr.length ; i++){
        arr[i].setAttribute(attr,'')
      }
      target.setAttribute(attr,value)
    },
    //各种css修改
    control_css : function (arr,attr,value,value2,target) {
      for(let i = 0; i < arr.length ; i++){
        arr[i].style.cssText = ''+attr+':'+value2+';'+''
      }
      target.style.cssText = ''+attr+':'+value+';'+''
    },

    operateFn : function () {

         // 导航栏切换

      stk.$('.nav_bar').onmouseover = function (e){
        let target = e.target
        let aes = stk.$all('a',this)
    
        if(target.nodeName === 'SPAN'){
          
          methods.control_class(aes,'name','n_mouse',target.parentNode)
        }
        stk.$('.nav_bar').onclick = function (e) {
        
          if(target.nodeName === 'SPAN'){
            methods.control_class(aes,'class','mouse',target.parentNode)
            for(let i = 0; i < aes.length ; i++){
              aes[i].parentNode.children[1].style.display =  ''
            }
            target.parentNode.parentNode.children[1].style.display = 'block'
            console.log(target.parentNode.parentNode.children[1])
          }
        }
        stk.$('.nav_bar').onmouseleave = function (e){
          methods.control_class(aes,'name','',target)
        } 
      }
     

      // 二级导航栏

      stk.$('.nav_bottom').onmouseover = function (e){
        let target = e.target
        let aes = stk.$all('a',this)
        if(target.nodeName === 'EM'){
          methods.control_class(aes,'name','on',target.parentNode)
        }
        stk.$('.nav_bottom').onclick = function (e) {
          if(target.nodeName === 'EM'){
            methods.control_class(aes,'class','on',target.parentNode)
          }
        } 
        stk.$('.nav_bottom').onmouseleave = function (e){
          methods.control_class(aes,'name','',target)
        }
      }
      

      //客户端按钮移入移出

      $('.down_load a').onmouseover = function () {
        this.setAttribute('name','dl_btn')
        $('.down_load a').onmouseleave = function () {
          this.setAttribute('name','')
        }
      }
      

      //轮播控制

      $('.banner').onmouseover = function () {
        let alist = $('.ban_l').children
        clearInterval(stk.cross.timer)
        
        $('.banner').onclick = function(e){
          let target = e.target
          if(target.getAttribute('com') === 'bankey'){
            if(target.getAttribute('name') === 'ban_lkey'){
              stk.cross.t_index--
              if(stk.cross.t_index <0){
                stk.cross.t_index = alist.length-1 
              }
              plugin.banner_c()           
            }
            if(target.getAttribute('name') === 'ban_rkey'){
              stk.cross.t_index++
              if(stk.cross.t_index > alist.length-1){
                stk.cross.t_index = 0
              }
              plugin.banner_c()
            }
          }
        }

        $('.banner').onmouseleave = function() {
          stk.cross.timer = setInterval(function () {
            stk.cross.t_index++
            if(stk.cross.t_index > alist.length-1){
              stk.cross.t_index = 0
            }
            plugin.banner_c()
          },3000)
        }
      }
      

      $('.wrap_l').onmouseover = function (e) {
        let target = e.target

        //小轮播控制

        $('.new_mc').onmouseover = function (e) {
          clearInterval(cross.nm_timer)
          $('.new_mc').onclick = function (e) {
            let target = e.target
            let nm_item = $all('li[name=nm_item]')[0].offsetWidth + 50
            let nm_wrap = $('.nm_wrap')
            if(target.className === 'nm_key'){
              if(target.getAttribute('name') === 'nm_lkey'){
                cross.nm_index--
                if(cross.nm_index < 0){
                  cross.nm_index = 1
                  cross.nm_leader = nm_item*2                   
                }
                plugin.nmtimer_c(nm_wrap,-nm_item*cross.nm_index)
              }
              if(target.getAttribute('name') === 'nm_rkey'){
                cross.nm_index++
                if(cross.nm_index > 2){
                  cross.nm_index = 1
                  cross.nm_leader = 0
                }
                plugin.nmtimer_c(nm_wrap,-nm_item*cross.nm_index)
              }
            }
          }
          
        }
       
        if(target.nodeName === "A"){
          if(target.getAttribute('class') === 'icon_play flow_r'){
            target.style.background = 'url(../img/iconall.png) no-repeat 0px -60px'
            target.onmouseleave = function () {
              target.style.background = 'url(../img/iconall.png) no-repeat 0px 0px' 
            }
          }
        }

        if(target.nodeName === 'SPAN'){
          if(target.getAttribute('class') === 'ti_icon1 dis_in_block'){
            target.style.background = 'url(../img/iconall.png) no-repeat -43px -55px'
            target.onmouseleave = function () {
            target.style.background = 'url(../img/iconall.png) no-repeat -43px -25px'
            }
          }
          if(target.getAttribute('class') === 'ti_icon2 dis_in_block'){
            target.style.background = 'url(../img/index.png) no-repeat -300px -237px'
            target.onmouseleave = function () {
              target.style.background = 'url(../img/index.png) no-repeat -300px -207px'
            }
          }
        }
        


        $('.top_mc').onmouseover = function (e) {
          let target = e.target
          if(target.getAttribute('class') == 'ti_list'){
            let ti_icons = $all('.ti_icon',target)
            for(let i = 0 ; i < ti_icons.length ; i++){
              ti_icons[i].setAttribute('name','')
            }
           target.onmouseleave = function (e) {
              if(target.getAttribute('class') == 'ti_list'){
                for(let i = 0 ; i < ti_icons.length ; i++){
                  ti_icons[i].setAttribute('name','show')
                }
              }
            }
          }
          
        }
  
        
      }

      // $('.wrap_r',$('.content')).onmouseover = function (e) {
      //   let target = e.target
      //   if(target.nodeName === 'DD'){
      //     let dd_list = $all('dd',$('.enter_singers'))
      //     for(let i = 0 ; i< dd_list.length ; i++){
      //       dd_list[i].style.backgroundColor = "#fafafa"
      //     }

      //       target.style.backgroundColor = "#000"
          

      //     target.onmouseover = function(e){
      //       if(target.nodeName === 'DD'){
      //         target.style.backgroundColor = "#fafafa"

      //     }
      //   }
      // }


      



      document.onscroll = function() {
        if(document.documentElement.scrollTop === 900){
          $('.return_to_top').style.display = 'block'
        }else if(document.body.scrollTop < 900){
          $('.return_to_top').style.display = ''
        }
      }
      $('.return_to_top').onclick = function (){
        if(document.documentElement.scrollTop){
          document.documentElement.scrollTop=0;
        }else if(document.body.scrollTop){
          document.body.scrollTop=0;
        }
      }
      


    },

    






    
  })
}();