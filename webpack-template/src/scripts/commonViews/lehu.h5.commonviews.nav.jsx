/*
 * 顶部导航tab
 * nav: Location 头部定位fixed / back 返回键 / home 键 / search 搜索键 / shopping 购物车  true 显现
 * */

import React, {Component} from 'react';

import 'navCss';

class Nav extends Component {

    constructor(props) {

        super(props);

        //事件绑定
        this.showNav = this.showNav.bind(this);
        // this.toIndex = this.toIndex.bind(this);
        // this.toClassify = this.toClassify.bind(this);
        // this.toProducts = this.toProducts.bind(this);
        // this.toShopping = this.toShopping.bind(this);
        // this.toMe = this.toMe.bind(this);
        this.toSearch = this.toSearch.bind(this);
        this.toShoppingCart = this.toShoppingCart.bind(this);

    }

    showNav(){
        window.location.href = 'http://www.baidu.com';
    }

    toSearch(){
        window.location.href = 'http://www.baidu.com';
    }

    toShoppingCart(){
        window.location.href = 'http://www.baidu.com';
    }

    render() {

        const { nav } = this.props;

        return(
            <div className="hy-nav-block" style={ nav.Location ? { position : 'fixed' } : ''  }>

                {/*left部分*/}
                <div className="nav-left">
                    { nav.back ? <a href="javascript: void (0)" className="nav-back" onClick={ this.props.toBack }></a> : null }
                    { nav.home ? <a href="javascript: void (0)" className="nav-home" onClick={ this.showNav }>
                        {/*<ul className="show-nav" style={ show ? { display: 'none' } : null }>*/}
                            {/*<li className="index" onClick={this.toIndex}>首页</li>*/}
                            {/*<li className="classify" onClick={this.toClassify}>全部分类</li>*/}
                            {/*<li className="products" onClick={this.toProducts}>产地</li>*/}
                            {/*<li className="shopping" onClick={this.toShopping}>购物车</li>*/}
                            {/*<li className="me" onClick={this.toMe}>我的乐虎</li>*/}
                        {/*</ul>*/}
                    </a> : null }
                </div>

                {/*title标题*/}
                <h2>{ nav.title }</h2>


                {/*right部分*/}
                <div className="nav-right">
                    { nav.search ? <a href="javascript: void (0)" className="nav-search" onClick={this.toSearch}></a> : null }
                    { nav.shopping ? <a href="javascript: void (0)" className="nav-shopping" onClick={this.toShoppingCart}></a> : null }
                </div>

            </div>
        )
    }

}

export { Nav }

