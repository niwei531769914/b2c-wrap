/*
 * 商品分类 容器组件
 */

import React, {Component} from 'react';

//引入iScroll插件

import IScroll from 'iscrollJs';
import $ from 'zepto';
import {Header} from 'headerJsx';

import 'classifyCss';

class Classify extends Component {


    static defaultProps = {
        header: {
            title: "商品分类",
            name: '保存',
        },
    };

    constructor(props) {
        super(props);

        this.state = {
            categoryList: [
                {name: '我是1'},
                {name: '我是2人'},
                {name: '我是3人'},
                {name: '我是4人'},
                {name: '我是5人'},
                {name: '我是6人'},
                {name: '我是7人'},
                {name: '我是8人'},
                {name: '我是9人'},
                {name: '我是9人'},
                {name: '我是9人'},
                {name: '我是9人'},
                {name: '我是9人'},
                {name: '我是9人'},
                {name: '我是9人'},
                {name: '我是9人'},
                {name: '我是9人'},
                {name: '我是9人'},
                {name: '我是01人'},
                {name: '我是1人'},
                {name: '我是00人'},
                {name: '我是92人'},
                {name: '我19人'},
                {name: '我是10人'},
                {name: '我是19人'},
            ]
        };

        //事件绑定

    }

    componentDidMount() {

        let that = this;

        this._onresize();

        that.Scroll = new IScroll('#category',
            {
                hScrollbar:false,
                probeType: 2,
                vScroll:true,
                preventDefault: false,
                tap: true,
                scrollbars: false,
                momentum:true,
            });

        that.RScroll = new IScroll('#branchScroll',
            {
                preventDefault: false,
                tap: true,
                scrollbars: false,
            });

        //绑定事件
        $('#category ul li').on('tap', function () {

            if ($(this).hasClass('active')) {
                return false;
            }

            $('#category ul li').removeClass('active');
            $(this).addClass('active');
            let PositionIndex = document.querySelector('#category li[class="active"]');
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

        document.querySelector('#category').addEventListener('touchmove', function (e) {
            e.preventDefault();
        }, false);
        document.querySelector('#branchScroll').addEventListener('touchmove', function (e) {
            e.preventDefault();
        }, false);


    }

    componentWillUnmount() {

        //移除事件 避免内存泄漏
        $('#category ul li').unbind("tap");

    }

    //计算高度
    _height() {
        let WindowHeight = document.body.offsetHeight;
        let HeaderHeight = document.querySelector('header.header').offsetHeight;
        document.querySelector('#category').style.height = (WindowHeight - HeaderHeight ) + 'px';
        document.querySelector('#branchScroll').style.height = (WindowHeight - HeaderHeight ) + 'px';
    }

    //窗口大小改变触发事件
    _onresize() {
        let that = this;
        that._height();
        window.onresize = function () {
            that._height();
        };
    }


    render() {
        const {header,images ,loop , time} = this.props;
        const {categoryList} = this.state;
        return (
            <div>
                <Header header={ header }/>

                <div className="category-viewport">


                    {/*left nameList*/}
                    <div className="hy-category-tab">
                        <div id="category">
                            <ul>
                                {
                                    categoryList.map((item, index) => {
                                        return (index == 0 ? <li key={index} className="active"><a
                                            href="javascript: void (0)">{ item.name }</a></li> :
                                            <li key={index}><a href="javascript: void (0)">{ item.name }</a></li>)
                                    }, this)
                                }
                            </ul>
                        </div>
                    </div>


                    {/*right content*/}
                    <div className="hy-category-content">
                        <div id="branchScroll" className="hy-category-content-wrapper">
                            <div id="branchList">
                                <div style={{height: '1000px', backgroundColor: 'red', width: '100%'}} className="">
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


export  { Classify };