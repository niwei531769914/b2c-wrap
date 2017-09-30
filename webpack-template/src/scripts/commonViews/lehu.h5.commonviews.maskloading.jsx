
/*
*  全局loading加载 阴影层
* */

import React, { Component } from 'react';

import 'maskloadingCss';

class MaskLoading extends Component{

    constructor(props){
        super(props)
    }

    render(){
        return(
            <div className="mask-loading">
                <div className="loading-mask">
                    <i></i>
                </div>
            </div>
        )
    }

}

export { MaskLoading }