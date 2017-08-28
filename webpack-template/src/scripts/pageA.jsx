
import React , { Component } from 'react';
import ReactDOM , { render } from 'react-dom';

import 'commonCss';
import '../css/pageA.css';

import { Tip } from './util/util';

import {Header , Footer} from './components/header';

import './config/config';

class Cond extends Component{

    constructor(props){
        super(props);

        this.state ={
            less:false
        };

        //事件bind
        this.handleClick = this.handleClick.bind(this);

    }

    handleClick(){
        Tip('2');
        this.setState((oldState) =>{
            return {
                less: !this.state.less
            };
        })
    }

    render(){
        let SPANLIST = (this.state.less ? <span>333</span> : <span>4444</span>);
        return(
            <div ref="Input" className="header" onClick={this.handleClick}>
                <Header/>
                <Footer/>
                <span>121212</span>
                {SPANLIST}
            </div>
        )
    }

}

//render html
let app = document.getElementById('app');
render(<Cond/>,
    app
);