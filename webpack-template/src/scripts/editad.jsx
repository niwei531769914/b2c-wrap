
/*
* 编辑地址 容器主入口
*/
import React ,{ Component } from 'react';
import ReactDOM , { render } from 'react-dom';

//引入CSS
import 'commonCss';
import '../css/editad.css';


//引入公共JS
import 'rem';

//引入分支ui组件
import { EditAd } from 'editadJsx';

//render html
let editAd = document.getElementById('editad');
render(<EditAd/>,
    editAd
);
