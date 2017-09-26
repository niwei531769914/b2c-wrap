/*
*   地址选择组件 初始化传入地址
* */

import React , { Component } from 'react';

import $ from 'zepto';

import 'areasCss';

import { provinceList } from 'main';

class Area extends Component{

    constructor(props){
        super(props);

    }

    componentDidMount() {

        let Provincial, City, Area;

        function init(provincial, city, area) {
            let provincialIndex , cityIndex , areaIndex;
            if(provincial){
                provincialIndex = $.inArray(provincial,arguments)
            }
            if(city){
                cityIndex = $.inArray(city,arguments)
            }
            if(area){
                areaIndex = $.inArray(area,arguments)
            }
            //屏幕宽度
            let WindowWidth = $(window).width();
            Provincial = provinceList;
            //省存在
            provinceList.map(function (item, index) {
                let provincialHtml = '';
                if (provincial && item.name == provincial) {
                    $('.hy-tab-nav li').eq(provincialIndex).html(item.name);
                    //填充数据
                    provincialHtml += '<li class="cur">' + item.name + '</li>';
                    //市存在
                    if (city && item.cityList) {
                        City = item.cityList;
                        let Cement = -(1 * parseFloat(WindowWidth));
                        document.querySelector('.hy-tab-content').style.transform = 'translate(' + Cement + 'px, 0px) translateZ(0px)';
                        item.cityList.map(function (items, indexs) {
                            let cityHtml = '';
                            if (city && items.name == city) {
                                $('.hy-tab-nav li').eq(1).html(items.name);
                                $('.hy-tab-box').eq(1).find('li').eq(indexs).addClass('cur');
                                cityHtml += '<li class="cur">' + items.name + '</li>';
                                //区存在
                                if(area && items.areaList){
                                    Area = items.areaList;
                                    Cement = -(2 * parseFloat(WindowWidth));
                                    document.querySelector('.hy-tab-content').style.transform = 'translate(' + Cement + 'px, 0px) translateZ(0px)';
                                    items.areaList.map(function (itemst, indexst) {
                                        let areaHtml = '';
                                        if (area && itemst == area) {
                                            areaHtml += '<li class="cur">' + itemst  + '</li>';
                                            $('.hy-tab-nav li').eq(2).html(itemst);
                                            $('.hy-tab-box').eq(2).find('li').eq(indexst).addClass('cur');
                                        }
                                        else {
                                            areaHtml += '<li>' + itemst  + '</li>';
                                        }
                                        $('.area').append(areaHtml);
                                    })
                                }
                            }
                            else {
                                cityHtml += '<li>' + items.name + '</li>';
                            }
                            $('.city-list').eq(cityIndex).append(cityHtml);
                        })
                    }
                }
                else {
                    provincialHtml += '<li>' + item.name + '</li>';
                }
                $('.city-list').eq(provincialIndex).append(provincialHtml);

            });

            if(provincial && !city && !area){
                $('.hy-tab-nav li').eq(provincialIndex).addClass('current');
            }
            if( provincial && city && !area){
                $('.hy-tab-nav li').eq(cityIndex).addClass('current');
            }
            if( provincial && city && area){
                $('.hy-tab-nav li').eq(areaIndex).addClass('current');
            }
        }

        init('重庆', '市');
    }

    componentWillUnmount() {

    }

    render() {

        const { address }  = this.props;


        return (
            <div>
                <div className="cmp-nav hy-block">

                    <div className="cmp-nav-title of">地址选择</div>

                </div>

                <section className="content-address overtouch">
                    <div className="hy-tab choose">
                        <ul className="hy-tab-nav wbox">
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                    </div>
                    <div className="hy-tab-content wbox" style={{width: '300%', transform: 'translate(0px, 0px) translateZ(0px)'}}>

                        <div className="hy-tab-box wbox-flex">
                            <ul className="city-list provincial">
                            </ul>
                        </div>

                        <div className="hy-tab-box wbox-flex">
                            <ul className="city-list city">

                            </ul>
                        </div>

                        <div className="hy-tab-box wbox-flex">
                            <ul className="city-list area">

                            </ul>
                        </div>

                    </div>

                </section>
            </div>
        )
    }

}

export { Area }