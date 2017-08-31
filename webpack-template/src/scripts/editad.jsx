
/*
* 编辑地址 容器主入口
*/
import React ,{ Component } from 'react';
import ReactDOM , { render } from 'react-dom';

//引入CSS
import 'commonCss';
import '../css/editad.css';


//引入公共JS
import 'config';

//引入分支ui组件
import EditAD from 'editadJsx';

//render html
//let editAd = document.getElementById('editad');
ReactDOM.render(
	<EditAD/>,
   	document.getElementById('editad')
);
