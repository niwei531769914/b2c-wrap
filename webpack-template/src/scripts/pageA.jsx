
import React , { Component } from 'react';
import ReactDOM , { render } from 'react-dom';

import '../css/name.css';

import style from '../css/pageA.css';

import {Alert } from './layouts/util';

class Cond extends Component{

    constructor(props){
        super(props);

    }

    handleClick(){
        let Name = this.refs.Input.innerHTML;
        Alert(Name);
    }

    render(){
        return(
            <div ref="Input" className="header" onClick={this.handleClick.bind(this)}>
                23
            </div>
        )
    }

}

//render html
let app = document.getElementById('app');
render(<Cond/>,
    app
);