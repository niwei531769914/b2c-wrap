
/*
 * 评论列表 容器组件
 */

import React , { Component } from 'react';

//容器css
import 'commentCss';

//引入评论子组件
import { Review } from 'reviewJsx';
import { MaskLoading } from 'maskloadingJsx'
import { IsLoading } from 'loadingJsx';

import { Api } from 'api';
import { parseQueryString } from 'query';
import { Tip } from 'util';

class Comment extends Component{

    constructor(props){
        super(props);

        this.state = {
            status: 0 ,  //tab状态
            show: true, //页面加载中
            loading: false, //数据正在加载中
            active: 0,   //tab切换
            toPage: 1,   //页面
            pageAmount: 0 , //总页面
            evaCount: 0,
            goodCount: 0,
            generalCount: 0,
            poorCount: 0,
            imageListCount: 0,
            list: [],   //评论列表
        };

        this.goodsItemId = parseQueryString(window.location.href).goodsitemid;
        console.log(parseQueryString(window.location.href));
        //事件绑定
        this.changeList = this.changeList.bind(this);

    }

    componentDidMount(){

        //初始化数据
        this.apiRequest(0);

        //上拉滚动加载中
        this.bindScroll();
    }

    componentWillUnmount() {

    }

    /**
     * @author niwei
     * @description 初始化上拉加载数据事件
     */

    bindScroll(){

        let that = this;
        let range = 400; //距下边界长度/单位px
        let huadong = true;
        let totalheight = 0;

        //监听滚动条事件  //节流阀
        window.onscroll = () => {
            let { toPage, pageAmount, } = this.state;   //init
            let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            let WindowHeight =  document.documentElement.clientHeight || document.body.clientHeight;
            let DocumentHeight = parseFloat(document.documentElement.offsetHeight || document.body.offsetHeight);

            //当前页面等于总页面不执行
            if ( toPage >= pageAmount ) {
                return false;
            }

            totalheight = parseFloat(WindowHeight) + parseFloat(scrollTop); //滚动条当前位置距顶部距离+浏览器的高度

            //判断几种下拉发送请求
            if( DocumentHeight == totalheight ){
                that.setState({
                    toPage: toPage + 1
                });
                that.apiRequest();
            }
            else{
                if ( (DocumentHeight - totalheight) <= range ) { //页面底部与滚动条底部的距离<range
                    if (huadong) {
                        huadong = false;
                        that.setState({
                            toPage: toPage + 1
                        });
                        that.apiRequest();
                    }
                } else {
                    huadong = true;
                }
            }

        }

    }

    //请求数据
    changeList(event){

        let showStatus = event.currentTarget.getAttribute('data-status');
        //改变tab状态
        this.setState({
            status: showStatus ,
            active: showStatus,
            toPage: 1,
            pageAmount: 0,
            list: [], //数据初始化
            loading: true, //数据正在加载中
        },() => { this.apiRequest() });
    }

    apiRequest(){

        let that = this;

        let { status , toPage, evaCount, goodCount, generalCount, poorCount, imageListCount } = this.state;
        let data = {
            goodsItemId: that.goodsItemId,
            toPage: toPage,
            pageRows: 10,
            showStauts: status,
        };

        let param = {
            url : '/mobile-web-search/ws/mobile/v1/search/evaList',
            method : 'post',
            params : JSON.stringify(data),
        };

        Api(param)
            .done((data) => {
                if(data.code == 1){

                    that.setState({
                        list: that.state.list.concat(data.response.evaListVO.list),
                        pageAmount: parseFloat(data.response.evaListVO.totalPages),  //保存总页数
                        evaCount: evaCount == 0 ? data.response.evaListVO.evaCount : evaCount,
                        goodCount: goodCount == 0 ? data.response.evaListVO.goodCount : goodCount,
                        generalCount: generalCount == 0 ? data.response.evaListVO.generalCount : generalCount,
                        poorCount: poorCount == 0 ? data.response.evaListVO.poorCount : poorCount,
                        imageListCount: imageListCount == 0 ? data.response.evaListVO.imageListCount : imageListCount,
                        show: false,     //判断页面是否在加载
                        loading: toPage == parseFloat(data.response.evaListVO.totalPages) ? false : true  ,//判断数据是否在加载中
                    });
                }
            })
            .fail((error) => {
                that.setState({
                    show: false,
                });
                Tip('服务器发生错误，程序员正在被宰杀中，请重新进入页面');
            })

    }

    render(){

        let { list , evaCount, goodCount, generalCount, poorCount, imageListCount, active, show, loading } = this.state;
        return(
            <div className="page">

                {/*评论主体*/}
                <div className="comment-tab">

                    {/*好评率*/}
                    <div className="comments-rate">
                        <span className="comment-score">评分</span>
                        <ul>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                        <span className="comment-sign">94.4% 好评</span>
                    </div>

                    {/*评论状态栏*/}
                    <div className="comments-tag-list">
                        <ul>
                            { parseFloat(evaCount) > 0 ? <li className={`${active == 0 ? 'active':''}`} data-status="0" onClick={this.changeList}>全部&nbsp;(&nbsp;{evaCount}&nbsp;)</li>: null}
                            { parseFloat(goodCount) > 0 ? <li className={`${active == 1 ? 'active':''}`}  data-status="1" onClick={this.changeList}>好评&nbsp;(&nbsp;{goodCount}&nbsp;)</li>: null}
                                { parseFloat(generalCount) > 0 ? <li className={`${active == 2 ? 'active':''}`}  data-status="2" onClick={this.changeList}>中评&nbsp;(&nbsp;{generalCount}&nbsp;)</li>: null}
                                    { parseFloat(poorCount) > 0 ? <li className={`${active == 3 ? 'active':''}`}  data-status="3" onClick={this.changeList}>差评&nbsp;(&nbsp;{poorCount}&nbsp;)</li>: null}
                                        { parseFloat(imageListCount) > 0 ? <li className={`${active == 4 ? 'active':''}`}  data-status="4" onClick={this.changeList}>有图&nbsp;(&nbsp;{imageListCount}&nbsp;)</li>: null}
                        </ul>
                    </div>

                    {/*评论列表*/}
                    <Review reviewList = { list  } />

                    {/*isLoading*/}
                    {
                        loading ? <IsLoading/> : null
                    }

                </div>

                {/*页面加载中*/}
                {
                    show ? <MaskLoading/> : null
                }

            </div>
        )

    }

}

export  { Comment }