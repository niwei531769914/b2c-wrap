//jsx语法

import React, {
	Component
} from 'react';

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

		this.state = {
			less: false
		};

		this.handleclick = this.handleclick.bind(this);
		this.delete = this.delete.bind(this);
	}

	handleclick(event) {
		let element = event.target;
		console.log(element);

		this.setState((oldState) => {
			return {
				less: !this.state.less
			};
		})
	}

	edit() {
		window.location.href = "http://localhost:8080/dist/editad.html";
	}

	delete(event) {
		let element = event.target;
		$(element).parents("li").remove()
	}

	render() {
		const {
			header
		} = this.props;
		let numbers = ["王鹏", "倪伟", "刚刚"];
		let SPANLIST = (this.state.less ? <img src = {require('../../images/management/ic_check_box_outline.png')}/> : <img src={require('../../images/management/ic_check_box.png')}/>);
			return(
				<div>
	        {/*头部*/}
	        <Header header={ header }/>
	         {/*内容区*/}
	        <ul className="content">
		 			{
	 	　　　　　　numbers.map(function(item, index){
	 	　　　　　　　　return (
	 						<li key={index} index={index}>
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
								<div onClick = { this.handleclick } className="address_management_left">
								{SPANLIST}设为默认么地址
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
				<button className="newAddress">新增地址</button>
			</div>
	        
	     </div>
			)
		}
	}

	export default Management;