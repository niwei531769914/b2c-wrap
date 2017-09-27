
/*
* 编辑地址 容器主入口
*/
import React ,{ Component } from 'react';
import ReactDOM , { render } from 'react-dom';

//引入CSS
import 'commonCss';
import 'addressCss';


//引入公共JS
import 'rem';

//引入分支ui组件
import { Address } from 'addressJsx';

//render html
let address = document.getElementById('address');
render(<Address/>,
    address
);
