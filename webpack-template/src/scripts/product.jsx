
/*
 * 商品详情 容器主入口
 */
import React ,{ Component } from 'react';
import ReactDOM , { render } from 'react-dom';


//引入CSS
import 'commonCss';
import 'productCss';

//引入分支ui组件
import { Product } from 'productJsx';

//render html
let product = document.getElementById('product');
render(<Product/>,
    product
);
