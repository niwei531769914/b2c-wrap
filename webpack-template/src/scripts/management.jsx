
/*
* 编辑地址 容器主入口
*/
import React ,{ Component } from 'react';
import ReactDOM , { render } from 'react-dom';

//引入CSS
import 'commonCss';
import '../css/management.css';


//引入公共JS
import 'config';

//引入分支ui组件
import Management from 'managementJsx';

//render html
let root = document.getElementById('root');
render(<Management/>,
    root
);
