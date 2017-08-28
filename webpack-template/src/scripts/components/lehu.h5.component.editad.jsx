//jsx语法

import React, {Component} from 'react';

//api
import {Api} from '../config/api';

//query
import {parseQueryString} from 'query';

//zepto
import $ from 'jquery';

//header
import {Header} from 'headerJsx';


//地址Ui
class EditAd extends Component {

    //默认props属性
    static defaultProps = {
        header: {
            title: "编辑地址",
            name: "保存"
        },


    };

    constructor(props) {
        super(props);

        this.state = {
            addressid: "",
            name: "22",
            phone: "12121212",
            province: "江苏省",
            city: "南京市",
            area: "江宁区",
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

    }

    componentDidMount() {
        let params = parseQueryString(window.location.href);

        //设置addressid
        this.setState({
            addressid: params.addressid
        });


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
            .then((data) => {
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
            .catch((error) => {
                alert("服务器错误!");
            });
    }

    render() {
        const {header} = this.props;
        const {name, phone, province, city, area, address, idCardNumber, setdefault} = this.state;
        return (
            <div className="nwrapper">
                {/*头部*/}
                <Header header={ header }/>

                {/*/!*content*!/*/}
                <section className="OrderDetails-main">
                    <div id="Middle">
                        <input className="UserName" value={ name }  onChange={ this.changeName }/>
                        <input className="Telephone" value={ phone } onChange={ this.changePhone } />
                        <p className="Address">
                            <span
                                className="Address-title"><em>{ province }</em><em>{ city }</em><em>{ area }</em></span>
                            <span className="Address-tab"><img
                                src={ require('./../../images/editad/ic_chevron_right.png') }/></span>
                        </p>
                        <input className="DetailedAddress" value={ address } onChange={ this.changeAddress } />
                    </div>
                    <div className="identity">
                        <input className="identity-Serial" value={ idCardNumber } onChange={ this.changeIdCardNumber } />
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
            </div>
        )
    }

}

export default EditAd;