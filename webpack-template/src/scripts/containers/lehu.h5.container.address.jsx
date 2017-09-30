/*
 * 地址列表 容器组件
 */


import React, {Component} from 'react';


//引入头部
import {Header} from 'headerJsx';


//引入api请求
import {Api} from 'api';
import {encription} from 'query'

class Address extends Component {

    static defaultProps = {
        header: '选择收货地址'
    };

    constructor(props) {
        super(props);

        //时间戳
        this.timeStamp = Date.parse(new Date());

        //设置userId和token
        this.userId = '187131';
        this.token = '74847679e89848f50b298822c7c36fb5';

        this.state = {
            addressList: []
        }

    }

    componentDidMount() {

        let that = this;
        //请求数据
        let data = {
            userId: that.userId,
            strToken: that.token,
            strUserId: that.userId,
            timeStamp: that.timeStamp,
        };

        let param = {
            url: '/mobile-web-user/ws/mobile/v1/address/list?sign=' + encription(data),
            method: 'post',
            params: JSON.stringify(data)
        };

        Api(param)
            .done((data) => {
                this.setState({
                    addressList: data.response
                })
            })
            .fail((error) => {
                console.log(error);
            })

    }

    componentWillUnmount() {

    }

    render() {

        const {header} = this.props;
        let {addressList} = this.state;

        return (
            <div className="page">
                <Header header={ header}/>
                <section className="cart-page">
                    <h1>配送地址<p>增加配送地址</p></h1>

                    {/*地址列表*/}
                    <ul>
                        {
                            addressList instanceof Array && addressList.length > 0 ?
                                addressList.map((item, index) => {
                                    return (<li key={index}>

                                        {/*信息*/}
                                        <div className="info">

                                        </div>

                                        <div className="edit">

                                        </div>

                                    </li>)
                                })
                                : null
                        }
                    </ul>

                </section>
            </div>
        )
    }

}

export {Address}