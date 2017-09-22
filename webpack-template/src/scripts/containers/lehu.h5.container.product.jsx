/*
 * 商品详情 容器组件
 */

import React, {Component} from 'react';

//引入iScroll插件

import IScroll from 'iscrollJs';
import $ from 'zepto';

import  Swiper  from 'swiperJs';
import 'swiper';


class Product extends Component {

    constructor(props) {
        super(props);

        //数据初始化
        this.state = {
            reveal: false,
        };


        //事件绑定
        this.BackTop = this.BackTop.bind(this);
    }

    componentDidMount() {


        let that = this;

        //计算content的高度
        let Windowheight = document.documentElement.clientHeight;

        let Height = () => {
            $('.scroller-box').height(Windowheight - 91);
        };
        Height();

        window.onresize = function () {
            Windowheight = document.documentElement.clientHeight;
            Height();
        };

        //实例化幻灯片
        that.swiper = new Swiper('.swiper-container', {
            loop: false,
            speed: 300,
            preventClicks: false,
            onTouchStart: function () {
                console.log(1);
            },
            onTouchMove: function () {
                console.log(3);
            },
            onSlideChangeStart: function () {
                console.log(1);
                let $self = that.swiper;
                $('.hy-header-nav .current').removeClass('current');
                $('.hy-header-nav a').eq($self.activeIndex).addClass('current');
                if ($self.activeIndex == 0) {
                    that.detailScroll.scrollTo(0, 0, 300);
                }
                else if ($self.activeIndex == 1) {
                    that.basicScroll.scrollTo(0, 0, 300);
                }
                //判断Top按钮是否消失
                that.whetherTop();
            }
        });


        //事件绑定
        $('.hy-header-nav a').on('click', function () {
            let Index = $(this).index();
            that.swiper.slideTo(Index, 300, false);
            $('.hy-header-nav .current').removeClass('current');
            $(this).addClass('current');
            that.basicScroll.scrollTo(0, 0, 300);
            that.detailScroll.scrollTo(0, 0, 300);

            //判断Top按钮是否消失
            that.whetherTop();

        });


        //实例化iscroll
        //基本信息
        that.basicScroll = new IScroll('#hy-basic',
            {
                hScrollbar: false,
                click: false,
                probeType: 1,
                vScroll: true,
                tap: true,
                scrollbars: false,
                momentum: true,
                preventDefault: false,
            });
        //详情信息
        that.detailScroll = new IScroll('#hy-detail',
            {
                hScrollbar: false,
                probeType: 1,
                vScroll: true,
                tap: true,
                click: false,
                scrollbars: false,
                momentum: true,
                preventDefault: false,
            });
        //评价信息
        that.descScroll = new IScroll('#hy-desc',
            {
                hScrollbar: false,
                probeType: 1,
                vScroll: true,
                tap: true,
                click: false,
                scrollbars: false,
                momentum: true,
                preventDefault: false,
            });

        //基本信息板块上啦切换到下一屏

        let BasicScroll;
        that.basicScroll.on('scroll', () => {
            BasicScroll = that.basicScroll.y;

            //判断Top按钮是否消失
            that.whetherTop();

            if (BasicScroll < that.basicScroll.maxScrollY - 40) {
                $('.top-scroll').empty().html('释放切换到下一屏');
            }
            else {
                $('.top-scroll').empty().html('继续拖动，查看详情');
            }
        });

        that.basicScroll.on('scrollEnd', () => {
             if (BasicScroll <= that.basicScroll.maxScrollY - 40) {
                 console.log(44);
                 that.swiper.slideTo(1, 400, () => {
                    $('.hy-header-nav .current').removeClass('current');
                    $('.hy-header-nav a').eq(1).addClass('current');
                    $('.top-scroll').empty().html('继续拖动，查看详情');
                    that.detailScroll.scrollTo(0, 0, 300);

                    //判断Top按钮是否消失
                    that.whetherTop();

                 });
             }
        });

        //商品详情板块上啦切换到上一屏

        let DetailScroll;
        that.detailScroll.on('scroll', () => {
            DetailScroll = that.detailScroll.y;

            //判断Top按钮是否消失
            that.whetherTop();

            if (DetailScroll > 60) {
                $('.last-scroll').empty().html('释放回到基本信息');
            }
            else {
                $('.last-scroll').empty().html('下拉回到基本信息');
            }
        });

        that.detailScroll.on('scrollEnd', () => {
             if (DetailScroll > 60) {
                 that.swiper.slideTo(0, 400, () => {
                    $('.hy-header-nav .current').removeClass('current');
                    $('.hy-header-nav a').eq(0).addClass('current');
                    $('.last-scroll').empty().html('下拉回到基本信息');
                    that.basicScroll.scrollTo(0, 0, 300);

                    //判断Top按钮是否消失
                    that.whetherTop();

                 });
             }
        });


        that.descScroll.on('scroll', () => {
            //判断Top按钮是否消失
            that.whetherTop();

        });

        $('.swiper-slide').on('click',function (e) {
            e.preventDefault();
        },false);


        //阻止touch默认事件
        document.querySelector('#scroller').addEventListener('touchmove', function (e) {
            e.preventDefault();
        }, false);
        document.querySelector('#tscroller').addEventListener('touchmove', function (e) {
            e.preventDefault();
        }, false);
        document.querySelector('#thscroller').addEventListener('touchmove', function (e) {
            e.preventDefault();
        }, false);

    }

    BackTop() {

        //返回顶部
        this.basicScroll.scrollTo(0, 0, 1000);
        this.detailScroll.scrollTo(0, 0, 1000);
        this.descScroll.scrollTo(0, 0, 1000);

        this.whetherTop();

    }

    //监听滚动条高度来判断是否隐藏top按钮

    whetherTop() {

        setTimeout(() => {
            let that = this;

            if (Math.abs(that.basicScroll.y) > 200 || Math.abs(that.detailScroll.y) > 200 || Math.abs(that.descScroll.y) > 200) {
                that.setState({
                    reveal: true,
                })
            }
            else {
                that.setState({
                    reveal: false,
                })
            }
        }, 300);

    }


    componentWillUnmount() {
        //解除绑定
        $('.hy-header-nav a').unbind("click");

        //在不需要使用iScoll的时候调用iScroll实例的公共方法destroy()可以释放一些内存。
        that.basicScroll.destroy();
        that.basicScroll = null;

        that.detailScroll.destroy();
        that.detailScroll = null;

        that.descScroll.destroy();
        that.descScroll = null;

    }

    render() {

        const {reveal} = this.state;

        return (
            <div className="page">

                {/*header导航条*/}
                <div className="header-dom">
                    <div className="hy-header-warp">
                        <header className="hy-header-nav">
                            <a href="javascript: void (0)" className="summary current" data-index={0}>基本信息</a>
                            <a href="javascript: void (0)" className="desc" data-index={1}>商品详情</a>
                            <a href="javascript: void (0)" className="review" data-index={2}>评价172</a>
                        </header>
                    </div>
                </div>


                {/*content主内容*/}
                <div id="content" className="content">
                    <div className="hy-page-scroll swiper-container">
                        <div className="swiper-wrapper">
                            <div className="swiper-slide hy-summary">
                                <div id="hy-basic" className="scroller-box" style={{overflow:'hidden'}}>
                                    <div id="scroller" className="scroller">
                                        <div className="top-scroll">继续拖动，查看详情</div>
                                    </div>
                                </div>
                            </div>
                            <div className="swiper-slide hy-summary">
                                <div id="hy-detail" className="scroller-box" style={{overflow:'hidden'}}>
                                    <div id="tscroller" className="scroller">
                                        2
                                    </div>
                                    <div className="last-scroll">下拉回到基本信息</div>
                                </div>
                            </div>
                            <div className="swiper-slide hy-summary">
                                <div id="hy-desc">
                                    <div id="thscroller" className="scroller" style={{overflow:'hidden'}}>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                {/*foot底部按钮*/}
                <div className="hy-actionBar-container">
                    <div className="action-bar-wrap">
                        <ul className="action-other">
                            <li className="item service"></li>
                            <li className="item favourite"></li>
                            <li className="item shop"></li>
                        </ul>
                        <a href="javascript: void (0)" className="item addtocart">立即购买</a>
                        <a href="javascript: void (0)" className="item buy">加入购物车</a>
                    </div>
                </div>

            </div>
        )
    }


}


export {Product}