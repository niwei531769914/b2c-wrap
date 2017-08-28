
import React, { Component } from 'react';


import 'headerCss';

export class Header extends Component{
    constructor(props){
        super(props);
    }

    render(){
        const { header } = this.props;
        let RightLinker = this.props.header.name ? <a href="javascript:void (0)" className="rightlink">{header.name}</a>: null;
        return(
            <header className="header">
                <a href="javascript:void (0)" className="back"></a>
                <h2>{header.title}</h2>
                { RightLinker }
            </header>
        )
    }

}