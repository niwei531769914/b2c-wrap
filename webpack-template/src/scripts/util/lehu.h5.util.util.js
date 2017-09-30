

import $ from 'zepto';

//检查邮箱地址
export const checkEmail = (data) => {
    return /^([a-zA-Z0-9-_]*[-_\.]?[a-zA-Z0-9]+)*@([a-zA-Z0-9]*[-_]?[a-zA-Z0-9]+)+[\.][a-zA-Z]{2,3}([\.][a-zA-Z]{2})?$/.test(data)
};

//判断用户登录设备代理
export const isMobile =  {
    Android() {
        return navigator.userAgent.match(/Android/i);
    },
    AndroidApp() {
        return navigator.userAgent.match(/Android/i) && navigator.userAgent.match(/Adr/i);
    },
    BlackBerry() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    iOSApp() {
        return navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    },
    Opera() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    Firefox() {
        return (navigator.userAgent.indexOf("Firefox") > -1)
    },
    QQ() {
        return (navigator.userAgent.indexOf('QQ') > -1);
    },
    WeChat() {
        let isWeChat = navigator.userAgent.match(/MicroMessenger/i);
        if (isWeChat) {
            store.remove('IS_APP');
        }
        return isWeChat
    },
    AlipayChat() {
        let isAlipayChat = navigator.userAgent.match(/AlipayClient/i);
        if (isAlipayChat) {
            store.remove('IS_APP');
        }

        return isAlipayChat
    },
    APP() {
        let isApp = config.setting['is_app'] || store.get('IS_APP');

        let hash = window.location.hash;
        let search = window.location.search;
        let whole = search + hash;

        if (isApp) {
            return isApp;
        } else if (whole.indexOf('platform=android') > -1) {
            store.set('IS_APP', 'android');
            return 'android';
        } else if (whole.indexOf('platform=ios') > -1) {
            store.set('IS_APP', 'ios');
            return 'ios';
        } else {
            return false;
        }
    },

    onlineApp() {
        if (this.APP() && !window.cordova) {
            return true;
        } else {
            return false;
        }
    },

    localApp() {
        if (this.APP() && window.cordova && window.sf) {
            return true;
        } else {
            return false;
        }
    },

    any() {
        return (this.Android() || this.BlackBerry() || this.iOS() || this.Opera() || this.Windows()) || this.Firefox();
    }
};

//弹窗
export const Tip =  (message,time) => {
    let $el = $('<div class="dialog-cart"><div class="dialog-cart-inner"><span>' + message + '</span></div></div>');
    if ($('.dialog-cart').length > 0) {
        return false;
    };
    $(document.body).append($el);
    setTimeout(function() {
        $el.remove();
    }, time || "3000");
};

//检查电话号码首字符是否为1,且输入字符只能是数字
export const CheckPhone = (phone) => {
    return /^1\d{10}$/.test(phone);
};

//动态获取host
export const HTTP = () =>{
    let HOST = window.location.host;
    if(HOST.indexOf("http://") == -1){
        HOST = "http://" + HOST;
    }
    return HOST;
};
