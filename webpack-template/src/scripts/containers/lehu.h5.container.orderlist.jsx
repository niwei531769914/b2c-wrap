//我的订单组件

import React, {Component} from 'react';


import {Header} from 'headerJsx';

import {encription} from 'query';

import {Api} from 'api';

import $ from 'jquery';

import md5 from 'md5';

class OrderList extends Component {

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
        this.token = '506f08bb82a05eff00d42197ff34da1d';

        //    事件绑定

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
        console.log(1);
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

                if (data.response.orders == null) {
                    this.setState({
                        orderList: [],
                        pageAmount: data.page.pageAmount,
                        loading:false
                    });
                    return false;
                }

                if(that.state.pageIndex == data.page.pageAmount){

                    that.setState({
                        loading: false
                    });

                }

                that.setState({
                    orderList: that.state.orderList.concat(data.response.orders),
                    pageAmount: data.page.pageAmount,
                });


            })
            .fail((error) => {
                alert("服务器错误!");
            })
    }

    //判断订单状态
    judgeStatus(status) {
        if (status == 1 || status == 0) {
            return "未付款";
        }
        else if (status == 2) {
            return "订单待审核";
        }
        else if (status == 3) {
            return "待发货";
        }
        else if (status == 4) {
            return "待收货";
        }
        else if (status == 5) {
            return "待评价";
        }
        else if (status == 6) {
            return "交易完成";
        }
        else if (status == 7) {
            return "已取消";
        }
        else if (status == 11) {
            return "退货处理中";
        }
        else if (status == 12) {
            return "退货完成";
        }
        else if (status == 40) {
            return "退款处理中";
        }
    }

    render() {
        let that = this;
        const {header} = this.props;
        const {orderList} = this.state;
        return (
            <div>
                {/*top*/}
                <Header header={ header }/>

                {/*content*/}
                <div className="order">
                    {/*tab*/}
                    <div className="order-tab">
                        <ul>
                            <li className="li_orderlist active" data-status="100">
                                <span>全部</span></li>
                            <li className="li_orderlist" data-status="101"><span>待付款</span>
                            </li>
                            <li className="li_orderlist" data-status="102"><span>待发货</span>
                            </li>
                            <li className="li_orderlist" data-status="103"><span>待收货</span>
                            </li>
                            <li className="li_orderlist" data-status="104"><span>待评价</span>
                            </li>
                        </ul>
                    </div>

                    {/*list*/}
                    <div className="order-list">
                        <div className="order-all">
                            {/*singe-order*/}
                            {
                                orderList instanceof Array && orderList.length > 0 ? orderList.map((item, index) => {
                                    let STATUS = that.judgeStatus(item.status);

                                    return (
                                        <div className="order-item border-1px" key={index}>

                                            <div className="order-item-title">
                                                <span className="item-store-name">店铺:<em>{item.storeName}</em></span>
                                                <span className="item-shopping-status">
                                                    {STATUS}
                                                </span>
                                            </div>

                                            <div className="order-item-list">
                                                {
                                                    item.orderDetails instanceof Array ? item.orderDetails.map((items, indexs) => {
                                                        return (
                                                            <div className="item-goods" key={indexs}>
                                                                <div className="item-goods-images">
                                                                    <img src={ items.img }/>
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
                                                    className="imb-num">￥{item.totalPrice}</em><em className="imb-tax">(含运费￥{item.logisticsFare})</em></span>
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
                        that.state.loading ? <div className="is-loading">
                            <em></em>
                            <span>加载中....</span>
                        </div> : null
                    }

                </div>
            </div>
        )
    }

}

export {OrderList}