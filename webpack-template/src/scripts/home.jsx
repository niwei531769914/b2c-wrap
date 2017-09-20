
/*
 * 编辑地址 容器主入口
 */
import React ,{ Component } from 'react';
import ReactDOM , { render } from 'react-dom';

//引入CSS
import 'commonCss';
import 'homeCss';


//引入公共JS
//import 'config';

//引入分支ui组件
import { Home } from 'homeJsx';

//render html
let home  = document.getElementById('home');
render(<Home />,
    home 
);
