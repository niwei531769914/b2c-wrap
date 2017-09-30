
import React, { Component } from 'react';


import 'headerCss';

export class Header extends Component{
    constructor(props){
        super(props);

    }

    render(){
        return(
            <header className="hy-nav" style={ { position:'fixed' } }>
                <a href="javascript:void (0)" className="hy-nav-back" ></a>
                <div className="hy-nav-title of">rewrew</div>
            </header>
        )
    }

}