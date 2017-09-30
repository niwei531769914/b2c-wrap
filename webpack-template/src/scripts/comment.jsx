

/*
 * 评价列表 容器主入口
 */
import React ,{ Component } from 'react';
import ReactDOM , { render } from 'react-dom';


//引入CSS
import 'commonCss';
import 'rem';

//引入分支ui组件
import { Comment } from 'commentJsx';

//render html
let comment = document.getElementById('comment');
render(<Comment/>,
    comment
);
