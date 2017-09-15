
/*
 * 编辑地址 容器主入口
 */
import React ,{ Component } from 'react';
import ReactDOM , { render } from 'react-dom';

//引入CSS
import 'commonCss';

//引入公共JS
//import 'config';

//引入分支ui组件
import { LightBox } from './containers/lehu.h5.container.lightbox';

//render html
let lightbox = document.getElementById('lightbox');
render(<LightBox/>,
    lightbox
);
