//jsx语法

import React, {Component} from 'react';

//jquery
import $ from 'jquery';
import  Swiper  from 'swiperJs';

import { provinceList } from 'main';

import 'areaCss';
import 'swiper';


//header
import {Header} from 'headerJsx';

class Area extends Component{
    constructor(props){
        super(props);

    }

    componentDidMount() {

        let that = this;

        //设置选择地址
        let address = {};

        let swiper = new Swiper('.address-container .swiper-container', {
            visibilityFullFit: true,
             noSwiping: true,
            noSwipingClass: 'stop-swiping',
        });

        // 初始化高度
        let Height = () => {
            let headerHeight = $('.head-fix').height();
            let TotalHeight = $(window).height();
            $('.swiper-container').height(TotalHeight - headerHeight);
        };

        Height();

        //初始书数据
        let area = () =>{
            let Length = provinceList.length;
            let html = '';
            for (let i = 0; i < Length; i++) {
                html += '<p data-value = "' + i + '">' + provinceList[i].name + '</p>';
            }
            $('.address-container .swiper-slide').eq(0).empty().append(html);
        };

        area();

        $('.head-address-ul li').on('click', function () {
            if ($(this).text() == "") {
                return false;
            }

            $(this).nextAll().html("");

            $('.head-address-ul .head-address-li').removeClass('head-address-li');
            $(this).addClass('head-address-li');
            let Index = $(this).index();

            //将该索引值之后的p元素removeClass active
            $('.address-ul').eq(Index).nextAll().find('p.active').removeClass('active');

            swiper.slideTo(Index, 300, false);
        });


        $(document).on('click', '.address-ul p', function () {

            let addressName = "";

            $(this).parents('.swiper-slide').find('p').removeClass('active');
            $(this).addClass('active');

            let LoIndex = $(this).parents('.swiper-slide').index();
            let Index = parseFloat(LoIndex + 1);
            let Name = $(this).html();
            $('.head-address-ul li').eq(LoIndex).empty().html(Name);

            let value = $(this).attr('data-value');

            if (LoIndex == 0) {
                address = provinceList[value];
                let Length = address.cityList.length;
                $('.head-address-ul .head-address-li').removeClass('head-address-li');
                $('.head-address-ul li').eq(Index).empty().append("请选择").addClass('head-address-li');
                let html = '';
                for (let i = 0; i < Length; i++) {
                    html += '<p data-value = "' + i + '">' + address.cityList[i].name + '</p>';
                }
                $('.address-container .swiper-slide').eq(Index).empty().append(html);
                swiper.slideTo(Index, 300, false);
            }
            else if (LoIndex == 1) {
                let areaAddress = address.cityList[value];
                if(!areaAddress.hasOwnProperty("areaList")){
                    $('.address-container p.active').each((index,item) => {
                        addressName += $('.address-container p.active').eq(index).html();
                    });
                    $('.choose-address-page').removeClass('show');
                    that.changArea(addressName);
                    console.log(addressName);
                    return false;
                }
                let Length = areaAddress.areaList.length;
                $('.head-address-ul .head-address-li').removeClass('head-address-li');
                $('.head-address-ul li').eq(Index).empty().append("请选择").addClass('head-address-li');
                let html = '';
                for (let i = 0; i < Length; i++) {
                    html += '<p data-value = "' + i + '">' + areaAddress.areaList[i] + '</p>';
                }
                $('.address-container .swiper-slide').eq(Index).empty().append(html);
                swiper.slideTo(Index, 300, false);
            }
            else if(LoIndex == 2){

                $('.address-container p.active').each((index,item) => {
                    addressName += $('.address-container p.active').eq(index).html();
                });
                $('.choose-address-page').removeClass('show');
                that.changArea(addressName);
                console.log(addressName);
                return false;
            }

        });
    }

    changArea(addressName){
        $('.Address-title em').empty().html(addressName);
    }

    render(){

        return(
            <div className="choose-address-page">

                {/*top*/}
                <div className="head-fix">
                    <header className="header">
                        <a href="javascript: void (0)" className="back"></a>
                        <h2>地址选择</h2>
                    </header>

                    <ul className="head-address-ul">
                        <li className="head-address-li">请选择</li>
                        <li ></li>
                        <li ></li>
                        <li ></li>
                    </ul>
                </div>

                {/*address container*/}

                <div className="address-container">
                    <div className="swiper-container">
                        <div className="swiper-wrapper">
                            <div className="swiper-slide stop-swiping address-ul"></div>
                            <div className="swiper-slide stop-swiping address-ul"></div>
                            <div className="swiper-slide stop-swiping address-ul"></div>
                            <div className="swiper-slide stop-swiping address-ul"></div>
                        </div>
                    </div>
                </div>

            </div>
        )

    }
}

export { Area }