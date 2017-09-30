/*
 * 地址编辑 容器组件
 */

import React , { Component } from 'react';

import { Header } from 'headerJsx';
import { Area } from 'areasJsx';

import { Api } from 'api';
import { Tip , CheckPhone } from 'util';

class CartAd extends Component{

    static defaultProps = {
        header: '修改收货地址'
    };

    constructor(props){
        super(props);

        //初始化数据
        this.state = {
            show: false,  //地址弹窗
            nameShow: true, //收货人删除btn
            phoneShow: true, //联系方式删除btn
            adDetailShow: true, //详细地址删除btn
            address: {
                name: '倪伟',
                phone: '18602523203',
                provincial: '江苏',
                city: '南京市',
                area: '江宁区',
                adDetail: '横溪镇丹阳社区',
            },
        };

        //事件绑定
        this.showEdit = this.showEdit.bind(this);
        this.hideSpec = this.hideSpec.bind(this);
        this.BtnArea = this.BtnArea.bind(this);
        this.changeName = this.changeName.bind(this);
        this.changePhone = this.changePhone.bind(this);
        this.changeAdDetail = this.changeAdDetail.bind(this);
        this.blurPhone = this.blurPhone.bind(this);

    }

    componentDidMount() {

        let that = this;
        //请求数据
        let data = {

        }

    }

    componentWillUnmount() {

    }

    //地址弹出窗
    showEdit(event){
        let { address } = this.state;
        this.refs['child'].changeArea(address.provincial, address.city, address.area);
        this.hideSpec();
    }

    hideSpec(){
        this.setState({
            show : !this.state.show
        })
    }

    //改变姓名
    changeName(event){
        let { address } = this.state;
        let Name = event.currentTarget.value;
        address.name = Name;
        this.setState(address);
    }
    //改变电话号码
    changePhone(event){
        let { address } = this.state;
        let Phone = event.currentTarget.value;
        address.phone = Phone;
        this.setState(address);
    }
    //改变详细地址
    changeAdDetail(event){
        let { address } = this.state;
        let AdDetail = event.currentTarget.value;
        address.adDetail = AdDetail;
        this.setState(address);
    }

    blurPhone(event){
        let { phoneShow } = this.state;
        let Phone = event.currentTarget.value;
        if(!CheckPhone(Phone)){
            Tip('手机号码必须是以1开头的11位数字');
        }
        this.setState({ phoneShow: true })
    }

    //子组件改变父组件state
    BtnArea(...arg){
        let { address } = this.state;
        address.provincial = arg[0];
        address.city = arg[1];
        address.area = arg[2];
        this.setState(address);
        //隐藏数据
        this.hideSpec();
    }

    render(){
        const { header } = this.props;
        let { show, address, nameShow, phoneShow, adDetailShow } = this.state;
        return(
            <div className="hy-mask">

                {/*头部*/}
                <Header header = { header } />

                {/*content*/}
                <section className="cart-page">

                    <ul className="cart-list">
                        <li className="cart-list-item">
                            <label className="form-input-label">
                                收货人
                            </label>
                            <div className="form-input">
                                <input onBlur={(e) => this.setState({nameShow: true})} onFocus={(e) => this.setState({nameShow:false})} type="text" name="username" maxLength="20" placeholder="收货人姓名" value={address.name} onChange={this.changeName} />
                                    <em style={ address.name.length == 0 || nameShow  ? { display : 'none' } : { display: 'block'} } value={address.name}>
                                    </em>
                            </div>
                        </li>
                        <li className="cart-list-item">
                            <label className="form-input-label">
                                联系方式
                            </label>
                            <div className="form-input">
                                <input onBlur={this.blurPhone} onFocus={(e) => this.setState({phoneShow:false})}  type="tel" name="username" maxLength="11" placeholder="收货人手机号码" value={address.phone} onChange={this.changePhone} />
                                    <em style={ address.phone.length == 0 || phoneShow ? { display : 'none' } :null }>
                                    </em>
                            </div>
                        </li>
                        <li className="cart-list-item">
                            <label className="form-input-label">
                                所在地区
                            </label>
                            <div className="form-href" onClick={this.showEdit}>
                                <div className="">{ address.provincial}{address.city}{address.area}</div>
                            </div>
                        </li>
                        <li className="cart-list-item">
                            <label className="form-input-label">
                                详细地址
                            </label>
                            <div className="form-input">
                                <input onBlur={(e) => this.setState({adDetailShow: true})} onFocus={(e) => this.setState({adDetailShow:false})}  type="text" name="username" maxLength="40" placeholder="街道详细地址" value={address.adDetail} onChange={this.changeAdDetail} />
                                    <em style={ address.adDetail.length == 0 || adDetailShow ? { display : 'none' } :null }>
                                    </em>
                            </div>
                        </li>
                        <li className="cart-list-item">
                            <label className="form-input-label">
                                设置为默认地址
                            </label>
                            <input type="checkbox" className="input-reset hy-checkbox" />
                        </li>
                    </ul>

                    {/*按钮*/}
                    <a href="javascript: void (0)" className={`hy-btn hy-btn-block`}>
                        保存并使用
                    </a>

                </section>

                {/*弹出阴影层*/}
                <section className={`cmp-fixed${ show ? ' cover-mask-toggle':'' }`} onClick={this.hideSpec}>

                </section>

                {/*地址弹出层*/}
                <section className={`fourth-cover${ show ? ' fourth-cover-toggle':''}`}>
                    <Area ref="child" btnarea={ this.BtnArea }/>
                </section>

            </div>
        )
    }

}

export { CartAd }