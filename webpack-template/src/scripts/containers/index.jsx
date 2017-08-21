//jsx语法


//首页

import React, {Component} from 'react';

import APi from '../config/api';
import { IScroll } from '../lib/iscroll';


class Index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            getTitle: []
        }
    }

    componentDidMount() {
        let myscroll;
        let that = this;

        let params = {
            url: 'http://mobile.vision-world.cn:8080/mobile-web-user/ws/mobile/v1/index/getTitle',
            method: 'post',
            params: {}
        };

        APi(params)
            .then(data => {
                if (data.code == 1) {
                    that.setState({
                        getTitle: data.response
                    })
                }
                else {
                    alert(data.msg);
                }

                //iscroll init
                myscroll = new IScroll("wrapper", {
                    hScroll:true,
                    vScroll:false,
                    bounce: true,
                    hScrollbar: false,
                    hideScrollbar: true
                });

            })
            .catch(error => {
                console.log(error);
            });

    }


    render() {
        let {getTitle} = this.state;
        return (
            <div>
                <div className="navbar-header">
                    <header>
                        <div className="search-placeholder">
                            <span>搜索你想要的商品</span>
                        </div>
                    </header>

                    <div className="navbar-main-menu">
                        <div className="scroll-wrap" id="wrapper">
                            <ul className="equal-table fixed">
                                {
                                    getTitle.map((item, index) => {
                                        if (index == 1) {
                                            return <li key={index}
                                                       className="nav-current"><a
                                                href="javascript:void (0)"><span>{item.titlename}</span></a></li>
                                        }
                                        else {
                                            return <li key={index} ><a
                                                href="javascript:void (0)"><span>{item.titlename}</span></a></li>
                                        }
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Index


