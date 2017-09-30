//jsx语法
/*
 * 编辑地址 容器主入口
 */
import React ,{ Component } from 'react';
import ReactDOM , { render } from 'react-dom';

//引入CSS
import 'commonCss';
import 'cartadCss';


//引入公共JS
import 'rem';

//引入分支ui组件
import { CartAd } from 'cartadJsx';

//render html
let cartad = document.getElementById('cartad');
render(<CartAd/>,
    cartad
);
