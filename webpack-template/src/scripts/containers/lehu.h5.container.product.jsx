/*
 * 商品详情 容器组件
 */

import React, {Component} from 'react';

import { Area } from 'areasJsx';

import $ from 'zepto';

class Product extends Component {

    constructor(props) {
        super(props);

        //数据初始化

        //事件绑定
        this.changeSpec = this.changeSpec.bind(this);
        this.hideSpec = this.hideSpec.bind(this);
        this.changeArea = this.changeArea.bind(this);
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    //弹出规格窗
    changeSpec(){

        this.ScrollTop = $(window).scrollTop();
        $('html').addClass('hidescroll');
        $('body').addClass('hidescroll');
        $('.cmp-fixed').show().addClass('cover-mask-toggle');
        $('#fourth_color').addClass('fourth-cover-toggle');

    }

    hideSpec(){

        $('html').removeClass('hidescroll');
        $('body').removeClass('hidescroll');
        $('.cmp-fixed').hide().removeClass('cover-mask-toggle');
        $('#fourth_color').removeClass('fourth-cover-toggle');
        $('#fourth-area').removeClass('fourth-cover-toggle');
        $(window).scrollTop(this.ScrollTop);

    }

    changeArea(){
        this.ScrollTop = $(window).scrollTop();
        $('html').addClass('hidescroll');
        $('body').addClass('hidescroll');
        $('.cmp-fixed').show().addClass('cover-mask-toggle');
        $('#fourth-area').addClass('fourth-cover-toggle');

    }

    render() {

        return (
            <div className="page">

                {/*头部*/}
                <header className="fourth-header">
                    <div className="hy-nav">
                        <div className="hy-nav-back">
                            <a href="javascript: void (0)"></a>
                        </div>
                        <div className="hy-nav-main">
                            <span>商品详情</span>
                        </div>
                        <div className="hy-nav-action">
                            <a href="javascript: void (0)" className="hy-nav-search"></a>
                            <a href="javascript: void (0)" className="hy-nav-shopCart"></a>
                        </div>
                    </div>
                </header>

                
                {/*主题内容*/}
                <div className="main-content" style={{paddingBottom: '50px'}}>
                    <div className="container">
                        <section className="fourth-banner">
                            <div className="pic-slider">

                            </div>
                        </section>

                        <section className="product-main ju-main">
                            <div className="product-price">

                            </div>
                        </section>

                        <section className="product-main">

                            <div className="product-title">
                                <h1 className="name">
                                    【童年记_多味瓜子 500g】独立小包 休闲零食炒货坚果五 休闲零食炒货 休闲零食炒货 休闲零食炒货 休闲零食炒货香葵瓜子 白瓜子...
                                </h1>
                            </div>

                            <div className="product-sale">
                                <div className="sale-price">

                                </div>
                                <div className="sale-goods-status">
                                    <span>海外直邮商品</span>
                                </div>
                            </div>

                            <div className="open-member">

                            </div>

                        </section>

                        <section className="additional-info bdr-b">

                            <div className="info-container bdr-b">

                            </div>

                            <div className="info-coupon">

                            </div>

                        </section>

                        <section className="address-colortype selected-colortype" onClick={this.changeSpec}>
                            <div className="fourth-cells bdr-b bdr-f">
                                <div className="fourth-cell">
                                    <span className="cell-tag-hd">已&nbsp;&nbsp;选&nbsp;&nbsp;</span>
                                    <div className="cell-primary">
                                        紫色1件
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="address-colortype">
                            <div className="fourth-cells bdr-b bdr-f">
                                <div className="fourth-cell address-select" onClick={this.changeArea}>
                                    <span className="cell-tag-hd">送&nbsp;&nbsp;至&nbsp;&nbsp;</span>
                                    <div className="cell-primary">
                                        <div className="address-icon-wrap">
                                            <span className="to-address">上海卢湾区</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="fourth-cells">
                                <div className="fourth-cell">
                                    <span className="cell-tag-hd">运&nbsp;&nbsp;费&nbsp;&nbsp;</span>
                                    <div className="cell-primary">
                                        <span className="pur-tips">免运费</span>
                                    </div>
                                </div>
                            </div>
                        </section>


                        <section className="product-evaluate">
                            <div className="fourth-cells">
                                <div className="fourth-cell">
                                    <div className="cell-primary">评价(1500+)</div>
                                </div>
                            </div>

                            <div className="evaluate-content bdr-f bdr-b">
                                <ul className="evaluate-list">
                                    <li className="evaluate-item"></li>
                                </ul>
                            </div>

                        </section>

                    </div>

                    <div className="pull-detail"></div>
                </div>


                {/*弹窗规格*/}
                <section className="fourth-cover" id="fourth_color">

                    <header className="cover-head">

                    </header>

                    <div className="cover-body">
                        <div className="slider">

                        </div>
                    </div>

                    <div className="cover-action">
                        <a href="javascript: void (0)" className="addtocart">立即购买</a>
                        <a href="javascript: void (0)" className="buy">加入购物车</a>
                    </div>

                </section>

                {/*弹出地址选择窗口*/}
                <section className="fourth-cover" id="fourth-area">

                </section>

                {/*弹出阴影层*/}
                <section className="cmp-fixed" onClick={this.hideSpec}>

                </section>
                
                {/*底部购买*/}
                <section className="action-bar">
                    <div className="action-list">
                        <ul className="action-other">
                            <li className="item server"></li>
                            <li className="item favourite"></li>
                        </ul>
                        <a className="item addtocart" href="javascript: void (0)">立即购买</a>
                        <a className="item buy" href="javascript: void (0)">加入购物车</a>
                    </div>
                </section>

            </div>
        )
    }


}


export {Product}