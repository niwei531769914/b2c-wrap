/*
 * 我的订单 容器组件
 */
import React, {Component} from 'react';

import {Search} from 'searchJsx';
import {IsLoading} from 'loadingJsx';
import {Top} from 'topJsx';

import {encription} from 'query';
import {Tip} from 'util';

import {Api} from 'api';

import $ from 'jquery';

import {imgLazyLoad} from 'piclazyLoad';

class Home extends Component {

    static defaultProps = {
        header: {
            title: "我的订单",
        },
    };

    constructor(props) {
        super(props);

        this.state = {
            orderList: [],
            pageIndex: 1,
            pageAmount: 0,
            loading: true
        };

        //时间戳
        this.timeStamp = Date.parse(new Date());

        //订单状态
        this.status = 100;

        //页数
        this.pageIndex = 1;
        this.pageAmount = 1;

        //设置userId和token
        this.userId = '187131';
        this.token = '1cd425494c9d50c78aad428b7ea18395';


    }

    componentDidMount() {

        let that = this;

        //页面初始化数据 显示状态100
        this.apiRequest();

        //切换订单状态
        $('.li_orderlist').on('click', function () {

            if ($(this).hasClass('active')) {
                return false;
            }

            //获取订单状态改变状态
            let STATUS = $(this).attr('data-status');
            that.status = STATUS;

            //切换状态
            $('.order-tab ul li').removeClass('active');
            $(this).addClass('active');

            //loading
            that.setState({
                loading: true
            });

            that.changeOrder();
        });

        //滚动加载初始化
        that.bindScroll();

    }

    /**
     * @author niwei
     * @description 初始化上拉加载数据事件
     */

    bindScroll() {
        let that = this;
        let range = 400; //距下边界长度/单位px
        let huadong = true;
        let totalheight = 0;
        //节流阀
        $(window).scroll(function () {
            let srollPos = $(window).scrollTop(); //滚动条距顶部距离(页面超出窗口的高度)

            if (that.state.pageIndex >= that.state.pageAmount) {
                return false;
            }

            totalheight = parseFloat($(window).height()) + parseFloat(srollPos); //滚动条当前位置距顶部距离+浏览器的高度

            if (($(document).height() == totalheight)) {
                that.setState({
                    pageIndex: that.state.pageIndex + 1
                });
                that.apiRequest();

            } else {
                if (($(document).height() - totalheight) <= range) { //页面底部与滚动条底部的距离<range
                    if (huadong) {
                        huadong = false;
                        that.setState({
                            pageIndex: that.state.pageIndex + 1
                        });
                        that.apiRequest();
                    }
                } else {
                    huadong = true;
                }
            }
        });
    }

    changeOrder() {

        //页面状态初始化
        this.setState({
            orderList: [],
            pageIndex: 1,
            pageAmount: 0
        });

        this.apiRequest();
    }

    //请求数据
    apiRequest() {
        let that = this;

        let data = {
            "userId": that.userId,
            "orderStatus": that.status,
            "toPage": that.state.pageIndex,
            "pageRows": "10",
            "strToken": that.token,
            "strUserId": that.userId,
            "timeStamp": that.timeStamp
        };

        let param = {
            url: "/mobile-web-trade/ws/mobile/v1/order/list?sign=" + encription(data),
            method: "post",
            params: JSON.stringify(data)
        };

        Api(param)
            .done((data) => {
                console.log(data)

                if (data.response.orders == null) {
                    this.setState({
                        orderList: [],
                        pageAmount: data.page.pageAmount,
                        loading: false
                    });
                    return false;
                }

                if (that.state.pageIndex == data.page.pageAmount) {

                    that.setState({
                        loading: false
                    });

                }

                that.setState({
                    orderList: that.state.orderList.concat(data.response.orders),
                    pageAmount: data.page.pageAmount,
                });


                //img图片懒加载
                $.imgLazyLoad();

            })
            .fail((error) => {
                alert("服务器错误!");
            })
    }

    render() {
        let that = this;
        const {
            orderList
        } = this.state;
        return (
            <div>
                {/*top*/}
                <Search/>

                {/*content*/}
                <div className="order">
                    {/*tab*/}
                    <div className="order-tab">
                        <ul>
                            <li className="li_orderlist active" data-status="100"><span>推荐1</span></li>
                            <li className="li_orderlist" data-status="101"><span>推荐2</span>
                            </li>
                            <li className="li_orderlist" data-status="102"><span>推荐3</span>
                            </li>
                            <li className="li_orderlist" data-status="103"><span>推荐4</span>
                            </li>
                            <li className="li_orderlist" data-status="104"><span>推荐5</span>
                            </li>
                        </ul>
                    </div>

                    {/*list*/}
                    <div className="order-list">
                        <div className="order-all">
                            {/*singe-order*/}
                            {
                                orderList instanceof Array && orderList.length > 0 ? orderList.map((item, index) => {


                                    return (

                                        <div className="order-item border-1px" key={index} onClick={this.Alert}>
                                            <div className="order-item-list">
                                                {
                                                    item.orderDetails instanceof Array ? item.orderDetails.map((items, indexs) => {
                                                        return (
                                                            <div className="item-goods" key={indexs}>
                                                                <div className="item-goods-images">
                                                                    <img className="lazyload"
                                                                         src={require('./../../images/goods_back.png')}
                                                                         data-img={items.img}/>
                                                                </div>
                                                                <div className="item-goods-content">
                                                                    <div className="goods-content-name">
                                                                        <span
                                                                            className="goods-name">{items.goodsName}</span>
                                                                        <span
                                                                            className="goods-price"> ￥{items.price}</span>
                                                                    </div>
                                                                    <div className="goods-content-spec">
                                                                        <em>{items.normsValue}</em>
                                                                    </div>
                                                                    <div className="goods-content-fot">
                                                                        <span
                                                                            className="goods-tax">税费:<em>￥{items.taxPrice}</em></span>
                                                                        <span
                                                                            className="goods-num">x<em>{items.quantity}</em></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    }) : null
                                                }
                                            </div>

                                            <div className="order-item-cf">
                                                <span className="order-true-payed">实付款:<em
                                                    className="imb-num">￥{item.totalPrice}</em>{item.logisticsFare == 0 ? null :
                                                    <em>(含运费￥{item.logisticsFare})</em>}</span>
                                                <div className="order-btn-box">
                                                    <a href="javascript: void (0)" className="imb-btn">查看物流</a>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }) : null
                            }
                        </div>
                    </div>

                    {/*isLoading*/}
                    {
                        that.state.loading ? <IsLoading/> : null
                    }

                </div>
                <Top/>
            </div>
        )
    }

}

export {Home}
