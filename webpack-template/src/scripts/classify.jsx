
/*
 * 商品分类 容器主入口
 */
import React ,{ Component } from 'react';
import ReactDOM , { render } from 'react-dom';


//引入CSS
import 'commonCss';
import 'rem';
//引入分支ui组件
import { Classify } from 'classifyJsx'

//render html
let classify = document.getElementById('classify');
render(<Classify/>,
    classify
);
