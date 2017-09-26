/*
 * 我的订单 容器组件
 */
import React, {Component} from 'react';

import {Search} from 'searchJsx';
import {IsLoading} from 'loadingJsx';
import {Top} from 'topJsx';

import IScroll from 'iscrollJs';
import {encription} from 'query';
import {Tip} from 'util';

import {Api} from 'api';

import $ from 'jquery';

import {imgLazyLoad} from 'piclazyLoad';

class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            categoryList: [],

        };
        //时间戳
        this.timeStamp = Date.parse(new Date());

    }

    componentDidMount() {

        let that = this;

        //页面初始化数据 显示状态100
        this.apiRequest();
    }

    componentWillUnmount() {

        //移除事件 避免内存泄漏
        $('#category ul li').unbind("tap");

    }

    //请求数据
    apiRequest() {
        let that = this;
        let param = {
            url: "/mobile-web-user/ws/mobile/v1/index/getTitle",
            method: "post",
            params: {}
        };

        Api(param)
            .done((data) => {
                if (data.code == 1) {

                    this.setState({
                        categoryList: data.response
                    });

                    //左右切换
                    let TotalLength = parseFloat($('#category ul li').width()) * parseFloat($('#category ul li').length);
                    $('#category ul').css({
                        'width': TotalLength + 'px'
                    });

                    that.Scroll = new IScroll('#category',
                        {
                            scrollX: true,
                            scrollY: false,
                            tap: true,
                        });

                    //绑定事件
                    $('#category ul li').on('tap', function () {
                        if ($(this).hasClass('active')) {
                            return false;
                        }
                        if ($(this).find('span').hasClass('span_active')) {
                            return false;
                        }
                        $('#category ul li').removeClass('active');
                        $('#category ul li').find('span').removeClass('span_active');
                        $(this).addClass('active');
                        $(this).find('span').addClass('span_active');
                        let PositionIndex = document.querySelector('#category li[class="active"]');
                        //滚动中间 设为true，顶部设为false
                        that.Scroll.scrollToElement(PositionIndex, 200,  true, true);

                        //过渡展示右侧页面
                        document.querySelector('#branchList').style.opacity = '0';
                        document.querySelector('#branchList').style.transition = 'opacity .3s linear 0s';
                        setTimeout(function () {
                            document.querySelector('#branchList').style.opacity = '1';
                            setTimeout(function () {
                                document.querySelector('#branchList').setAttribute('style', 'transform: translate(0px, 0px);');
                            }, 300)
                        }, 300);

                    });

                    document.querySelector('#category').addEventListener('touchmove', function (e) {
                        e.preventDefault();
                    }, false);
                    document.querySelector('#branchScroll').addEventListener('touchmove', function (e) {
                        e.preventDefault();
                    }, false);

                }
                else {
                    alert(data.msg);
                }
                //img图片懒加载
                $.imgLazyLoad();
            })
            .fail((error) => {
                alert("服务器错误!");
            })
    }

    render() {
        let that = this;
        const {categoryList} = this.state;
        return (
            <div>
                {/*top*/}
                <Search/>
                {/*nav*/}
                <div className="category-viewport">
                    {/*left nameList*/}
                    <div className="hy-category-tab">
                        <div id="category">
                            <ul>
                                {
                                    categoryList.map((item, index) => {
                                        return (index == 0 ? <li key={index} className="active"><a
                                                href="javascript: void (0)">{item.titlename}<span className="span_active"></span></a></li> :
                                            <li key={index}><a href="javascript: void (0)">{item.titlename}<span></span></a>
                                            </li>)
                                    }, this)
                                }
                            </ul>
                        </div>
                    </div>
                    {/*right content*/}
                    <div className="hy-category-content">
                        <div id="branchScroll" className="hy-category-content-wrapper">
                            <div id="branchList">
                                <div style={{height: '1000px', backgroundColor: 'yellow', width: '100%'}} className="">
                                    22
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }

}

export {Home}
