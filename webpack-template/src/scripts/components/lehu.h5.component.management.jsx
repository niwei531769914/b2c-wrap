//jsx语法

import React, { Component } from 'react';

//api
import { Api } from '../config/api';

//query
import { parseQueryString } from 'query';

//jquery
import $ from 'jquery';

//header
import { Header } from 'headerJsx';

//地址Ui
class Management extends Component {
 
	//默认props属性
	static defaultProps = {
		header: {
			title: "地址管理",
			name: "保存"
		},
 	};

	constructor(props) {
		super(props);
		
  		this.handleclick = this.handleclick.bind(this);
		this.delete = this.delete.bind(this);
	}
	
	//选中处理
	handleclick(event, index) {
	 	$(event.target).parents("ul").find("li .address_management_left_img img").removeClass("active");
	 	$(event.target).parents("ul").find("li .content_information_name img").css('display','none');
 		$(event.target).parents("li").find(".content_information_name img").css('display','block');
 		$(event.target).addClass("active");
 	}
 
	edit() {
		
		window.location.href = "http://localhost:8080/dist/editad.html";
	}

	delete(event) {
		
		let element = event.target;
		$(element).parents("li").remove()
	}
	
	componentDidMount() {
        let that = this;
        
        //页面初始化数据  
        this.apiRequest();
        $(".address_management_left_img").parents("ul").find("li .content_information_name img").css('display','none');
        $(".address_management_left_img").parents("ul").find("li").eq(0).find(".content_information_name img").css('display','block');
  		$(".content").find("li").eq(0).find(".address_management_left_img img").addClass("active");
    }
	
	//请求数据
    apiRequest() {
        let that = this;

        let data = {
            "userId": that.userId,
        };

        let param = {
            url: "http://118.178.227.135/mobile-web-user/ws/mobile/v1/address/list",
            method: "post",
            params: JSON.stringify(data)
        };

        Api(param)
            .done((data) => {

                console.log(data)

            })
            .fail((error) => {
                alert("服务器错误!");
            })
    }

	render() {
		const { header } = this.props;
		let numbers = ["王鹏", "倪伟", "刚刚"];
		 
			return(
				<div>
	        {/*头部*/}
	        <Header header={ header }/>
	         {/*内容区*/}
	        <ul className="content">
		 			{
	 	　　　　　　numbers.map(function(item, index){
	 	　　　　　　　　return (
	 						<li key={index} date-index={index}>
	 							<img src={require('../../images/management/bg_order_address.png')}/>
	 							<div className="content_information">
								<p className="content_information_name">
									<span>收货人 :</span>
									<em className="content_information_name_box">{item}</em>
	 								<img src={require('../../images/management/ic_card_credit.png')}/>
								</p>
								<p className="content_information_iphone">
									<span>联系方式 :</span>
									<em>18795888342</em>
								</p>
								<p className="content_information_address">
									<span>收货地址:</span>
									<em className="content_information_address_box">江苏省南京市江宁区天元东路莱茵量子国际大厦7楼</em>
								</p>
								</div>
								<div className="address_management">
								<div className="address_management_left">
									<div className="address_management_left_img" key={index} onClick = { this.handleclick }>
									<img src = {require('../../images/management/ic_check_box_outline.png')}/>
									</div>设为默认么地址
								</div>
								<div className="address_management_right">
									<button onClick={this.edit}>编辑地址</button>
									<button onClick={this.delete}>删除地址</button>
								</div>
							</div>
	 					</li>
	 					)
	 	　　　　　　}.bind(this))
	 	　　　　}
  			</ul>
  			<div>            
				<button onClick={this.edit} className="newAddress">新增地址</button>
			</div>
	        
	     </div>
			)
		}
	}

	export default Management;