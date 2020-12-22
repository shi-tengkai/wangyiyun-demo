!function (){
  let methods = stk.methods
  let service = stk.service
  let plugin = stk.plugin
  let $ = stk.$
  let $all = stk.$all
  let cross = stk.cross
  Object.assign(stk.plugin,{
    getUserMsg : function (msg){
      let username = stk.getCookie('username')
          for(let item in msg[0]){
            if(username == item){
              return msg[0][item]
            }
      } 
    },
    //轮播核心内容
    banner_c : function () {
      let alist = $('.ban_l').children

       //轮播图片的显示隐藏
       methods.control_css(alist,'opacity',1,0,alist[stk.cross.t_index])

       //大背景的显示隐藏
       stk.ajax(service.banner,function (mess){
         let oblimgs = mess[0].outer
         $('.banner').style.backgroundImage = 'url('+oblimgs['oblimg_'+stk.cross.t_index]+')'
       })

       //dot

       let dots = $all('dl[name=ban_index] dd')
       methods.control_css(dots,'background','#f00','#fff',dots[stk.cross.t_index])
    },
    //轮播初始化组件
    banner : function(msg) {

      //轮播图生成
      let bl_cs = $('.ban_l').childNodes
      let arr = []
      let node
      let el
      for(let i = 0 ; i < bl_cs.length ; i++){
        if(bl_cs[i].nodeType === 8){
          node = bl_cs[i].nodeValue
        }
      }
      for(let i = 0 ; i < 10 ; i++){
        el = node.replace(/%url%/,msg[0].within['blimg_'+i])
        arr.push(el)
      }
      $('.ban_l').innerHTML = arr.join('')


      let alist = $('.ban_l').children
   

      stk.cross.t_index = 0
      stk.cross.timer = setInterval(function () {
        stk.cross.t_index++
        if(stk.cross.t_index > alist.length-1){
          stk.cross.t_index = 0
        }

        plugin.banner_c()
        
      },3000)
      //客户端下载

      
    },
    nmtimer_c : function (element,target) {
      clearInterval(element.timer)
        element.timer = setInterval(function(){
          cross.nm_leader = cross.nm_leader + (target - cross.nm_leader)/10
          element.style.left = cross.nm_leader + 'px'
        },10)
    },
    // 模块初始化组件
     ann_c: function (param){
      let mc_ann = $(param).childNodes
      let node
      for(let i = 0 ; i < mc_ann.length ; i++){
        if(mc_ann[i].nodeType === 8){
          node = mc_ann[i].nodeValue
        }
      }
      return node
    },
    //热门推荐初始化组件
    modules : function(msg) {

      // 模块框架生成
      let mdl_names = msg[0].mdl_msg.mdl_names
      let cnode_classes = msg[0].mdl_msg.cnode_classes
      let node = plugin.ann_c('.wrap_l')
      let arr = []
      let element
      for(let i = 0 ; i < mdl_names.length ; i++){
        element = node.replace(/%m_title%/g,mdl_names[i])
                  .replace(/%cnode_class%/g,cnode_classes[i])
        arr.push(element)
      }

      $('.wrap_l').innerHTML = arr.join('')


      let mc_anns = $all('script[name=mc_ann]')

      // 热门推荐生成
      let msg_hr = msg[0].hot_rmd
      let hrimgs = msg_hr.hrimgs
      let hrvcs = msg_hr.hrvcs
      let hrtits = msg_hr.hrtits
      let node2
      arr= []
      let str

      let hot_mc = $('.hot_mc')
      hot_mc.innerHTML = mc_anns[0].innerText


      node = plugin.ann_c('.hot_mc')


      for(let i = 0 ; i < hrimgs.length ; i++){
        
        str = node.replace(/%url%/g,hrimgs[i])
                  .replace(/%vc%/g,hrvcs[i])
                  .replace(/%tit%/g,hrtits[i])
        element = document.createElement('li')
        element.setAttribute('class','com')
        element.innerHTML = str
        $('.hot_mc').appendChild(element)
      }
      


      // 个性推荐生
      let indiv_mc = $('.indiv_mc')
      indiv_mc.innerHTML = mc_anns[1].innerText

      element = document.createElement('li')
      element.className = 'dateIndiv_li flow_l'
      element.innerHTML = $('script[name=mc_annc]').innerText
      indiv_mc.insertBefore(element,indiv_mc.childNodes[0])

      let msg_ir = msg[0].indiv_rmd
      let irimgs = msg_ir.irimgs
      let irvcs = msg_ir.irvcs
      let irtits = msg_ir.irtits
      let irtitdescs = msg_ir.irtitdescs
      arr= []
      node = plugin.ann_c('.indiv_mc')
      node2 = plugin.ann_c('.dateIndiv_li')
      let time = new Date();
      let week_arr = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六']

      str = node2.replace(/%url%/g,irimgs[irimgs.length-1])
                  .replace(/%url2%/g,irimgs[irimgs.length-1])
                  .replace(/%tit%/g,irtits[irtits.length-1])
                  .replace(/%desc%/g,irtitdescs[irtitdescs.length-1])
                  .replace(/%week%/g,week_arr[time.getDay()])
                  .replace(/%date%/g,time.getDate())
                  
      $('.dateIndiv_li').innerHTML = str



      for(let i = 0 ; i < irvcs.length ; i++){

        str = node.replace(/%url%/g,irimgs[i])
                  .replace(/%vc%/g,irvcs[i])
                  .replace(/%tit%/g,irtits[i])
                  .replace(/%desc%/g,irtitdescs[i])
          element = document.createElement('li')
          element.setAttribute('class','com')
          element.innerHTML = str
          $('.indiv_mc').appendChild(element)
      }


      //新碟上架

      let new_rmd = msg[0].new_rmd
      let nrimgs = new_rmd.nrimgs
      let album_names = new_rmd.album_name
      let singer_names = new_rmd.singer_name
      let new_mc = $('.new_mc')
      for(let i = 0 ; i < nrimgs.length ; i++){
        element = document.createElement('div')
        element.className = 'nm_key'
        if(i === 0){
          element.setAttribute('name','nm_lkey')
          element.innerText = "◁"
        }else if(i === 1){
          element = document.createElement('ul')
          element.className ='nm_wrap'
        }else if(i === 2){
          element.setAttribute('name','nm_rkey')
          element.innerText = "▷"
        }
        new_mc.appendChild(element)
      }

      let nm_wrap = $('.nm_wrap')
      for(let i = 0 ; i < nrimgs.length ; i++){
        element = document.createElement('li')
        element.setAttribute('name','nm_item')
        nm_wrap.appendChild(element)
      }

      let nm_items = $all('li[name=nm_item]')
      let ni_ann = $('script[name=ni_item]')
      nm_items[0].innerHTML = ni_ann.innerText
      node = plugin.ann_c('li[name=nm_item]')

      for(let i = 0 ; i < nm_items.length ; i++){
        arr = []
        for(let m = 0 ; m < nrimgs[i].length ; m++){
          element = node.replace(/%url%/g,nrimgs[i][m])
                    .replace(/%a_name%/g,album_names[i][m])
                    .replace(/%s_name%/g,singer_names[i][m])
          arr.push(element)
        }
        nm_items[i].innerHTML = arr.join('')
      }


      //小轮播
      cross.nm_index = 0
      cross.nm_leader = 0
      let nm_item = $all('li[name=nm_item]')[0].offsetWidth + 50
      cross.nm_timer = setInterval(function () {
        cross.nm_index++
        if(cross.nm_index > 2){
          cross.nm_index = 1
          cross.nm_leader = 0
        }
        plugin.nmtimer_c(nm_wrap,-nm_item*cross.nm_index)
      },4000)


      // 榜单
      let mess = msg[0].top_rmd
      let tr_tit = mess.tr_tit
      let tr_list = mess.tr_list
      let tr_img = mess.tr_img
      let ti_ann = $('script[name=ti_item]').innerText
      let top_mc = $('.top_mc')

      // 三纵
      for(let i = 0 ; i < tr_tit.length ; i++){
        element = document.createElement('li')
        element.setAttribute('name','tm_item')
        top_mc.appendChild(element)
      }

      let tm_item = $all('li[name=tm_item]')
      tm_item[0].innerHTML = ti_ann
      node = plugin.ann_c('li[name=tm_item]')
      

      for(let i = 0 ; i < tm_item.length ; i++){
        element = node.replace(/%ti_title%/g,tr_tit[i])
                  .replace(/%url%/g,tr_img[i])
        tm_item[i].innerHTML = element
      }

      let ti_item = $all('ul.ti_item')
      for(let i = 0 ; i < ti_item.length ; i++){
        for(let m = 0 ; m < tr_list[0].length+1 ; m++){
          element = document.createElement('li')
          element.setAttribute('class','ti_list')
          element.style.backgroundColor = m%2===0 ? '#ccc' : "#fff"
          if(m<10){
            if(m<3){
              str = '<span style="color: #f00;" class="ls_com">'+(m+1)+
                    '</span><a href="#">'+tr_list[i][m]+
                    '</a><span title="收藏" name="show" class="ti_icon"  style="background: url(../img/index.png)no-repeat -297px -268px;"></span><span title="添加到播放列表" name="show" class="ti_icon" style="background: url(../img/icon.png)no-repeat -20px -698px;"></span><span title="收藏" name="show" class="ti_icon" style="background: url(../img/index.png)no-repeat -267px  -268px;"></span>'
            }else{
              str = '<span class="ls_com">'+(m+1)+'</span><a href="#">'+tr_list[i][m]+'</a><span title="收藏" name="show" class="ti_icon"  style="background: url(../img/index.png)no-repeat -297px -268px;"></span><span title="添加到播放列表" name="show" class="ti_icon" style="background: url(../img/icon.png)no-repeat -20px -698px;"></span><span title="收藏" name="show" class="ti_icon" style="background: url(../img/index.png)no-repeat -267px  -268px;"></span>'
            }
          }else{
            str = '<a href="#" class="tm_more">查看全部></a>'
          }
          element.innerHTML = str
          ti_item[i].appendChild(element)
        }
      }
    },

    // 个人信息版
    user_msg : function(msg){
      let node = plugin.ann_c('.per_msg')
      let per_msg = $('.per_msg')
      let mess = plugin.getUserMsg(msg)
      let element = node.replace(/%username%/g,stk.getCookie('username'))
      .replace(/%uclass%/g,"LV."+mess.uclass)
      .replace(/%dsVal%/g,mess.dsVal)
      .replace(/%atteVal%/g,mess.atteVal)
      .replace(/%bvVal%/g,mess.bvVal)
      .replace(/%url%/g,mess.head_p)

      per_msg.innerHTML = element
    },

    // wrap_r的dl列表
    rdl : function(msg){
      let rdlt_mb = $('script[name=rdlt]').innerHTML
      let rdld_mb = $('script[name=rdld]').innerHTML
      let wrap_r = $('.wrap_r')
      let mess = plugin.getUserMsg(msg)
      let element2
      for(let i = 0 ; i < mess.rdl_tit.length ; i++){
        element = document.createElement('dl')
        element.className = "rdl_list "+ mess.rdl_clas[i]
        element.innerHTML = rdlt_mb.replace(/%rdl_tit%/g,mess.rdl_tit[i])
        for(let m = 0 ; m < mess.rdl_list[i].length ; m++){
          element2 = document.createElement('dd')
          element2.innerHTML = rdld_mb.replace('%url%',mess.rdl_list[i][m]['rdlt_img'])
                  .replace('%name%',mess.rdl_list[i][m]['rdlt_name'])
                  .replace('%msg%',mess.rdl_list[i][m]['rdlt_msg'])
                  .replace('%c_img%',mess.rdl_class[i][0])
                  .replace('%c_msg%',mess.rdl_class[i][2])
                  .replace('%c_name%',mess.rdl_class[i][1])
          element.appendChild(element2)
        }
        if(mess.rdl_tit[i] === '入驻歌手'){
          element2 = document.createElement('button')
          element2.className = 'apply_mcn'
          element2.innerText = '申请称为网易音乐人'
          element.appendChild(element2)
        }
        wrap_r.appendChild(element)
      }
    },
    // wrap_r的dl列表
    foot : function(msg){
      console.log(msg)
      let f_icons = $all('.f_icon')
      for(let i = 0 ; i < f_icons.length ; i++){
        f_icons[i].style.cssText = msg[i]
      }
    }
  })
}();