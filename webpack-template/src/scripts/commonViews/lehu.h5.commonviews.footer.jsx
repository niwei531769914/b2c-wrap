
/*
* 首页/分类/购物车/我的个人中心/底部切换tab
* Routers: [0,1,1,1,1], 传长度为5个的数组，0 不跳转 1 跳转
* */

import React, {Component} from 'react';

import 'footerCss';

//底部btn
class Btn extends Component{
    render(){
        const { btnImage , toGo , toHref } = this.props;
        return(
            <li data-href = { toHref } onClick={toGo} ><span className="bar-img"><img src={ btnImage } /></span></li>
        )
    }
}

class Footer extends Component{
    static defaultProps = {
        btns: [
            { activeImage: 'https://st.360buyimg.com/m/images/index/a-recommend.png',image:'https://st.360buyimg.com/m/images/index/n-find.png',toHref:'http://www.baidu.com' },
            { activeImage: 'https://st.360buyimg.com/m/images/index/a-recommend.png',image:'https://st.360buyimg.com/m/images/index/n-find.png',toHref:'http://www.baidu.com' },
            { activeImage: 'https://st.360buyimg.com/m/images/index/a-recommend.png',image:'https://st.360buyimg.com/m/images/index/n-find.png',toHref:'http://www.baidu.com' },
            { activeImage: 'https://st.360buyimg.com/m/images/index/a-recommend.png',image:'https://st.360buyimg.com/m/images/index/n-find.png',toHref:'http://www.baidu.com' },
            { activeImage: 'https://st.360buyimg.com/m/images/index/a-recommend.png',image:'https://st.360buyimg.com/m/images/index/n-find.png',toHref:'http://www.baidu.com' }
        ],
    };

    constructor(props){
        super(props);

        //事件绑定
        this.toLocation = this.toLocation.bind(this);
    }

    toLocation(event){
        let element = event.currentTarget;
        let HREF = element.getAttribute('data-href');
        if( HREF == null ){
            return false;
        }
        window.location.href = HREF;
    }

    render(){

        const { router , btns } = this.props;

        return(
            <div className="floor bottom-bar-pannel bdr-top">
                <div className="floor-container">
                    <ul className="tab">
                        {/*map遍历*/}
                        {
                            btns.map((item,index) => {
                                return <Btn toGo={ this.toLocation } toHref = { router[index] == 1 ? item.toHref: null }  btnImage = { router[index] == 1 ? item.activeImage: item.image }  />
                            })

                        }
                    </ul>
                </div>
            </div>
        )
    }

}

export { Footer }