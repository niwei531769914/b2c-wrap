
/*
 * 商品分类 容器主入口
 */
import React ,{ Component } from 'react';
import ReactDOM , { render } from 'react-dom';


//引入CSS
import 'commonCss';
//引入分支ui组件
import { Area } from 'areasJsx'

//render html
let area = document.getElementById('area');
render(<Area/>,
    area
);
