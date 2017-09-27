/*
 * 商品详情 容器组件
 */

import React, {Component} from 'react';

import {Area} from 'areasJsx';
import {Top} from 'topJsx';

import $ from 'zepto';

import {Api} from 'api';
import {Tip} from 'util';
import Swiper from 'swiperJs';
import 'swiper';

import {encription} from 'query';

class Product extends Component {

    constructor(props) {
        super(props);

        //数据初始化
        this.state = {
            goods: {
                addressFreight: {},
                evaInfo: {},
                goodsInfo: {},
                promotionInfo: {},
                focuStatus: null,
            }
        };

        //时间戳
        this.timeStamp = Date.parse(new Date());

        //事件绑定
        this.changeSpec = this.changeSpec.bind(this);
        this.hideSpec = this.hideSpec.bind(this);
        this.changeArea = this.changeArea.bind(this);
        this.BtnArea = this.BtnArea.bind(this);
    }

    componentDidMount() {

        let that = this;

        let data = {
            "goodsId": "3142",
            "goodsItemId": "3153",
            "userId": 187131,
            "cityId": 0,
            "areaId": 0,
            "timeStamp": that.timeStamp
        };

        let param = {
            url: "/mobile-web-trade/ws/mobile/v1/goods/goodsInfo?sign=" + encription(data),
            method: "post",
            params: JSON.stringify(data)
        };
        Api(param)
            .done((data) => {
                this.setState({
                    goods: data.response.goods,
                });

                let swiper = new Swiper('.pic-slider', {
                    loop: false,
                    pagination: '.pagination',
                    paginationType: 'fraction',
                    speed: 500,
                });

            })
            .fail((error) => {
                Tip('服务器错误');
            });

        this.ImageText();

    }

    ImageText() {

        let data = {
            goodsId: '3142'
        };

        let param = {
            url: "/mobile-web-trade/ws/mobile/v1/goods/goodsDetail",
            method: "post",
            params: JSON.stringify(data)
        };
        Api(param)
            .done((data) => {
                let CONTENT = data.response.goodsDetail;
                $('.pull-detail').append(CONTENT.goodsDesc);
                $('.pull-detail').append(CONTENT.serviceDesc);
            })
            .fail((error) => {
                Tip('服务器错误');
            })

    }

    componentWillUnmount() {

    }

    //弹出规格窗
    changeSpec() {

        this.ScrollTop = $(window).scrollTop();
        $('html').addClass('hidescroll');
        $('body').addClass('hidescroll');
        $('.cmp-fixed').show().addClass('cover-mask-toggle');
        $('#fourth_color').addClass('fourth-cover-toggle');

    }

    hideSpec() {

        $('html').removeClass('hidescroll');
        $('body').removeClass('hidescroll');
        $('.cmp-fixed').hide().removeClass('cover-mask-toggle');
        $('#fourth_color').removeClass('fourth-cover-toggle');
        $('#fourth-area').removeClass('fourth-cover-toggle');
        $(window).scrollTop(this.ScrollTop);

    }

    //弹出地址栏
    changeArea(event) {

        this.ScrollTop = $(window).scrollTop();
        $('html').addClass('hidescroll');
        $('body').addClass('hidescroll');
        $('.cmp-fixed').show().addClass('cover-mask-toggle');
        $('#fourth-area').addClass('fourth-cover-toggle');

        this.refs['child'].changeArea();

    }

    BtnArea(arg) {
        let  { goods } = this.state;
        this.hideSpec();
        goods.addressFreight.address = arg;

        this.setState(goods);

    }

    render() {

        const {goods} = this.state;

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
                        <section className="fourth-banner" style={{height: '225px'}}>
                            {/*幻灯片*/}
                            {
                                goods.goodsInfo.goodsImg ? <div className="pic-slider swiper-container">
                                    <div className="swiper-wrapper">

                                        {
                                            goods.goodsInfo.goodsImg.split(',').map((item, index) => {
                                                return (
                                                    <div className="swiper-slide" key={index}>
                                                        <img style={{
                                                            width: 'auto',
                                                            height: '100%',
                                                            overflow: 'hidden',
                                                            maxWidth: '320px',
                                                            margin: '0 auto'
                                                        }} src={item}/>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                    <div className="pagination"></div>
                                </div> : null
                            }
                        </section>
                        <section className="product-main ju-main">
                            <div className="product-price">

                            </div>
                        </section>

                        <section className="product-main">

                            {/*商品名*/}
                            <div className="product-title">
                                {
                                    goods.goodsInfo.goodsName ?
                                        <p className="name">{goods.goodsInfo.goodsName}</p> : null
                                }

                                {
                                    goods.goodsInfo.goodsSubtitle ?
                                        <p className="subhead">{goods.goodsInfo.goodsSubtitle}</p> : null
                                }
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

                        {
                            goods.addressFreight ? <section className="address-colortype">

                                <div className="fourth-cells bdr-b bdr-f">
                                    <div className="fourth-cell address-select" onClick={this.changeArea}
                                         data-cityid={ goods.addressFreight.cityId }
                                         data-addressid={ goods.addressFreight.addressId  }>
                                        <span className="cell-tag-hd">送&nbsp;&nbsp;至&nbsp;&nbsp;</span>
                                        <div className="cell-primary">
                                            <div className="address-icon-wrap">
                                                <span className="to-address">{goods.addressFreight.address}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {
                                    goods.addressFreight.freightInfo ? <div className="fourth-cells">
                                        <div className="fourth-cell">
                                            <span className="cell-tag-hd">运&nbsp;&nbsp;费&nbsp;&nbsp;</span>
                                            <div className="cell-primary">
                                                <span
                                                    className="pur-tips">{goods.addressFreight.freightInfo}</span>
                                            </div>
                                        </div>
                                    </div> : null
                                }
                            </section> : null
                        }

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

                    {/*图文详情*/}
                    <div className="pull-detail">

                    </div>
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

                    <Area ref="child" btnarea={ this.BtnArea }/>

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


                {/*返回顶部*/}
                <Top/>
            </div>
        )
    }


}


export {Product}