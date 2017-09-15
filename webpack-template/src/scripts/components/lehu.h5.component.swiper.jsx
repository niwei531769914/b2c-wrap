
/*
*  Swiper封装组件
*  Time 时间  Loop 循环 Images 需要传递的参数
* */

import React , { Component } from 'react';

import  Swiper  from 'swiperJs';

import 'swiper';

export class SWiper extends Component{

    constructor(props){
        super(props);

    }

    componentDidMount() {

        let that = this;
        const { Loop ,Time } = that.props;

        let swiper = new Swiper('.swiper-container', {
            autoplay :  Time ? Time : 0 ,
            autoHeight: true,
            loop : Loop,
            pagination: '.swiper-pagination',
            paginationType: 'bullets',
        });
    }

    render(){

        const { Images } = this.props;

        return (
            <div className="swiper-container">
                <div className="swiper-wrapper">
                    {
                        Images.map((item,index) => {
                            return ( <div key={index} className="swiper-slide"><img style={{ width: '100%', height: 'auto' }} src={item.img} className="swiper-lazy" /></div> )
                        })
                    }
                </div>
                {/*Add Pagination*/}
                <div className="swiper-pagination"></div>
            </div>
        )


    }

}