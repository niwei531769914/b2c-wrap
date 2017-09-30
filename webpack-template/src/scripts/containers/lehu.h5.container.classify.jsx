/*
 * 商品分类 容器组件
 */

import React, {Component} from 'react';

//引入iScroll插件

import IScroll from 'iscrollJs';
import {Nav} from 'navJsx';
import {Footer} from 'footerJsx'
import {MaskLoading} from 'maskloadingJsx'

import {Api} from 'api';
import {encription} from 'query';
import {Tip} from 'util';
import 'classifyCss';

class Classify extends Component {

    //初始化子组件展示
    static defaultProps = {
        setNav: {
            Location: true,
            home: true,
            title: '全部分类',
            search: true,
            shopping: true,
        },
        Routers: [1, 0, 1, 1, 1],
    };

    constructor(props) {
        super(props);

        this.state = {
            active: 0,
            show: true,
            categoryList: [],
            categoryItems: [],
        };

        //时间戳
        this.timeStamp = Date.parse(new Date());

        //事件绑定
        this.changeTab = this.changeTab.bind(this);
        this.TabRequest = this.TabRequest.bind(this);

    }

    componentDidMount() {

        let that = this;

        //监听页面尺寸是否改变
        this._onresize();

        //初始化类目滚动
        this.Scroll = new IScroll('#category',
            {
                hScrollbar: false,
                probeType: 2,
                vScroll: true,
                preventDefault: false,
                tap: true,
                scrollbars: false,
                momentum: true,
            });

        //阻止滚动
        document.querySelector('#category').addEventListener('touchmove', function (e) {
            e.preventDefault();
        }, false);


        //初始化数据
        let data = {
            catId: 0,
            timeStamp: that.timeStamp,
            strUserId: 0,
            strToken: 0,
        };

        let params = {
            url: '/mobile-web-trade/ws/mobile/v1/goods/catList?sign=' + encription(data),
            method: 'post',
            params: JSON.stringify(data),
        };

        Api(params)
            .done((data) => {
                let firstCatId = data.response.category[0].catId;
                that.setState({
                    categoryList: data.response.category,
                });
                that.TabRequest(firstCatId);
            })
            .fail((error) => {
                Tip('服务器错误，程序员正在拖出去问斩');
            })
    }

    componentWillUnmount() {

        //移除事件 避免内存泄漏
        document.querySelector('#category').removeEventListener('touchmove', false);

    }

    TabRequest(carId) {
        let that = this;
        let data = {
            catId: carId,
            timeStamp: that.timeStamp,
            strUserId: 0,
            strToken: 0,
        };

        let params = {
            url: '/mobile-web-trade/ws/mobile/v1/goods/catList?sign=' + encription(data),
            method: 'post',
            params: JSON.stringify(data),
        };

        Api(params)
            .done((data) => {
                setTimeout(() => {
                    that.setState({
                        show: false,
                        categoryItems: data.response.category,
                    });
                    document.querySelector('#branchList').style.opacity = '1';
                },300);
            })
            .fail((error) => {
                Tip('服务器错误，程序员正在拖出去问斩');
            });

    }

    //计算高度
    _height() {
        let WindowHeight = document.documentElement.clientHeight || document.body.clientHeight;
        ;
        let HeaderHeight = document.querySelector('div.hy-nav-block').offsetHeight;
        let FooterHeight = document.querySelector('div.floor').offsetHeight;
        document.querySelector('#category').style.height = (WindowHeight - HeaderHeight - FooterHeight) + 'px';
        document.querySelector('div.category-viewport').style.paddingTop = HeaderHeight + 'px';
    }

    //窗口大小改变触发事件
    _onresize() {
        let that = this;
        that._height();
        window.onresize = function () {
            that._height();
        };
    }

    //切换tab
    changeTab(event) {
        let dataItem = event.currentTarget.getAttribute('data-item');
        let catId = event.currentTarget.getAttribute('data-catId');
        let ClassName = event.currentTarget.className;

        if (ClassName == 'active') {
            return false;
        }

        this.setState({
            active: dataItem
        }, () => {

            let PositionIndex = document.querySelector('#category li[class="active"]');
            //滚动中间 设为true，顶部设为false
            this.Scroll.scrollToElement(PositionIndex, 200, false, false);

            //过渡展示右侧页面
            document.querySelector('#branchList').style.opacity = '0';
            document.querySelector('#branchList').style.transition = 'opacity .3s linear 0s';

        });

        this.TabRequest(catId);

    }

    render() {
        const {Routers, setNav} = this.props;
        const {categoryList, categoryItems, active, show,} = this.state;
        return (
            <div className="page">
                <Nav nav={ setNav }/>

                <div className="category-viewport">

                    {/*left nameList*/}
                    <div className="hy-category-tab">
                        <div id="category">
                            <ul>
                                {
                                    categoryList.map((item, index) => {
                                        return <li data-catId={ item.catId } data-item={index} key={index}
                                                   onClick={ this.changeTab }
                                                   className={`${ active == index ? 'active' : ''}`}><a
                                            href="javascript: void (0)">{ item.catName }</a></li>
                                    }, this)
                                }
                            </ul>
                        </div>
                    </div>

                    {/*right content*/}
                    <div className="hy-category-content">
                        <div id="branchScroll" className="hy-category-content-wrapper">
                            <div id="branchList">
                                <div style={{height: '1000px', width: '100%'}} className="">
                                    {
                                        categoryItems && categoryItems.length > 0 ? categoryItems.map((item, index) => {

                                            return item && item.category.length > 0 ? item.category.map((itemt, indext) => {
                                                return (
                                                    <span data-catId={ itemt.catId } key={indext}>{itemt.catName}</span>
                                                )
                                            }) : null

                                        }) : null
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/*底部导航*/}
                <Footer router={ Routers }/>


                {/*页面加载中*/}
                {
                    show ? <MaskLoading/> : null
                }

            </div>
        )
    }

}


export  {Classify};