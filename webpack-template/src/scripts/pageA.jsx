
import React , { Component } from 'react';
import ReactDOM , { render } from 'react-dom';

import 'commonCss';
import '../css/pageA.css';

import { util } from './util/util';

import './config/config';

class Cond extends Component{

    constructor(props){
        super(props);

    }

    handleClick(){
        window.location.href = 'ress.html';
    }

    render(){
        return(
            <div ref="Input" className="header" onClick={this.handleClick.bind(this)}>
                23ssss3333333333www3wqwq
            </div>
        )
    }

}

//render html
let app = document.getElementById('app');
render(<Cond/>,
    app
);