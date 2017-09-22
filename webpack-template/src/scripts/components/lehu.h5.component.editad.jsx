//jsx语法

import React, {Component} from 'react';

//api
import {Api} from '../config/api';

//query
import {parseQueryString} from 'query';

//jquery
import $ from 'zepto';

//header
import {Header} from 'headerJsx';

import  Swiper  from 'swiperJs';

import { provinceList } from 'main';

import 'areaCss';
import 'swiper';


//地址Ui
class EditAd extends Component {

    //默认props属性
    static defaultProps = {
        header: {
            title: "编辑地址",
            name: "保存"
        },
        areaHeader: {
            title: "地址选择"
        }


    };

    constructor(props) {
        super(props);

        this.state = {
            addressid: "",
            name: "22",
            phone: "12121212",
            province: "江苏省南京市江宁区",
            address: "量子国际",
            idCardNumber: "1212109938899",
            setdefault: 0
        };

        //事件绑定
        this.delete = this.delete.bind(this);
        this.check = this.check.bind(this);
        this.changeName = this.changeName.bind(this);
        this.changePhone = this.changePhone.bind(this);
        this.changeAddress = this.changeAddress.bind(this);
        this.changeIdCardNumber = this.changeIdCardNumber.bind(this);
        this.setdefaultAddress = this.setdefaultAddress.bind(this);
        this.area = this.area.bind(this);

    }

    componentDidMount() {

        let that = this;

        //获取url后的参数并转换为对象
        let params = parseQueryString(window.location.href);

        //设置addressid
        this.setState({
            addressid: params.addressid
        });

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

            let $self = $(this);
            //递归函数实现thunk处理方式
            function digui($self) {
                let $next = $self.next();
                if($next.length > 0){
                    $next.html("");
                    digui($next);
                }
            }
            digui($self);

            $('.head-address-ul .head-address-li').removeClass('head-address-li');
            $(this).addClass('head-address-li');
            let Index = $(this).index();

            //将该索引值之后的p元素removeClass active
            let $selft = $('.address-ul').eq(Index);
            //递归函数实现thunk处理方式
            function diguit($selft) {
                let $nextt = $selft.next();
                if($nextt.length > 0){
                    $nextt.find('p.active').removeClass('active');
                    diguit($nextt);
                }
            }
            diguit($selft);

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
                return false;
            }

        });


    }

    componentWillUnmount() {

    }

    //删除地址
    delete() {
        console.log(2);
    }

    //改变值
    changeName(event) {
        this.setState({
            name: event.target.value
        })
    }

    changePhone(event){
        this.setState({
            phone: event.target.value
        })
    }

    changeAddress(event){
        this.setState({
            address: event.target.value
        })
    }

    changeIdCardNumber(event){
        this.setState({
            idCardNumber: event.target.value
        })
    }

    //设置默认地址
    check(event) {
        const {setdefault} = this.state;
        let element = event.target;
        this.setdefaultAddress(element, setdefault);

    }

    area(){
       $('.choose-address-page').addClass('show');
    }

    changArea(addressName){
        this.setState({
            province: addressName
        })
    }

    setdefaultAddress(element, Setdefault) {
        let param = {
            method: 'post',
            url: "/mobile-web-user/ws/mobile/v1/address/setdefaultAddress",
            params: {
                'userId': 187131,
                'id': 22,
                //0--取消默认  1--设置默认
                'setdefault': Setdefault
            }
        };
        Api(param)
            .done((data) => {
                if (data.code == 1) {
                    alert(data.msg);
                    if (this.state.setdefault == 0) {
                        this.setState({
                            setdefault: 1
                        });
                        $(element).removeClass('active');
                    }
                    else {
                        this.setState({
                            setdefault: 0
                        });
                        $(element).addClass('active');
                    }
                }
                else {
                    alert(data.msg);
                }
            })
            .fail((error) => {
                alert("服务器错误!");
            });
    }

    render() {
        const {header ,areaHeader} = this.props;
        const {name, phone, province, address, idCardNumber, setdefault} = this.state;
        return (
            <div >
                {/*头部*/}
                <Header header={ header }/>

                {/*/!*content*!/*/}
                <section className="OrderDetails-main" ref={(ref) => { this.Input = ref }}>
                    <div id="Middle">
                        <input type="text" className="UserName" value={ name }  onChange={ this.changeName }/>
                        <input type="text" className="Telephone" value={ phone } onChange={ this.changePhone } />
                        <p className="Address" onClick={this.area}>
                            <span className="Address-title"><em>{ province }</em></span>
                            <span className="Address-tab"><img src={ require('./../../images/editad/ic_chevron_right.png') }/></span>
                        </p>
                        <input type="text" className="DetailedAddress" value={ address } onChange={ this.changeAddress } />
                    </div>
                    <div className="identity">
                        <input type="text" className="identity-Serial" value={ idCardNumber } onChange={ this.changeIdCardNumber } />
                        <div className="identity-content">
                            <span className="identity-upload">上传身份证</span>
                            <div className="identity-picture">
                                <a href="javascript:void (0)"><img src={ require('./../../images/editad/pic_id.png') }/></a>
                                <a href="javascript:void (0)"><img src={ require('./../../images/editad/pic_id.png') }/></a>
                            </div>
                        </div>
                    </div>
                    <div className="default">
                        <p data-value={ setdefault } className="check" onClick={this.check}>设置为默认地址</p>
                    </div>
                    <div className="delete">
                        <a onClick={this.delete}>删除地址</a>
                    </div>
                </section>

                {/*area change*/}
                <div className="choose-address-page" >

                    {/*top*/}
                    <div className="head-fix">
                        <Header header={ areaHeader }/>

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

            </div>
        )
    }

}

export { EditAd };