
import React , { Component } from 'react';
import ReactDOM , { render } from 'react-dom';

import '../css/name.css';

import style from '../css/pageA.css';

class Cond extends Component{

    constructor(props){
        super(props);

    }

    render(){
        return(
            <div className={style.page-a}>
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