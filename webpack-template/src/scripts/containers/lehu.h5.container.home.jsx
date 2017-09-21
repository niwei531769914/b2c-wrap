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
            tablist: [],

        };
        //时间戳
        this.timeStamp = Date.parse(new Date());

    }

    componentDidMount() {

        let that = this;


        //绑定事件
        $('#scroller ul li').on('tap', function () {

            if ($(this).hasClass('active')) {
                return false;
            }

            $('#scroller ul li').removeClass('active');
            $(this).addClass('active');
            let PositionIndex = document.querySelector('#scroller li[class="active"]');
            //滚动中间 设为true，顶部设为false
            that.Scroll.scrollToElement(PositionIndex, 200, false, false);

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

        //页面初始化数据 显示状态100
        this.apiRequest();
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
                    console.log(data)
                    this.setState({
                        tablist: data.response
                    });

                    that.Scroll = new IScroll('#wrapper',
                        {
                            preventDefault: false,
                            tap: true,
                            scrollbars: false,
                            hScroll: true,
                            hScrollbar: false,
                        });
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
        const {
            tablist
        } = this.state;
        return (
            <div>
                {/*top*/}
                <Search/>
                {/*nav*/}
                <div id="wrapper">
                    <ul>  {
                        tablist instanceof Array && tablist.length > 0 ? tablist.map((item, index) => {
                            return (
                                <li>{item.titlename}<span></span></li>
                            )
                        }) : null
                    }
                    </ul>
                </div>

            </div>
        )
    }

}

export {Home}
