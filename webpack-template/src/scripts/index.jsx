
/*
 *  首页 容器主入口
 *  路由切换组件，js懒加载
  * */

import React ,{ Component } from 'react';
import ReactDOM , { render } from 'react-dom';

import 'commonCss';
import 'rem';


import { Index } from 'indexJsx';


//render html
let index = document.getElementById('index');
render(<Index/>,
    index
);

