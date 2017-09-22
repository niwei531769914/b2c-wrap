/*
 * 首页 容器组件
 */

import React, {Component} from 'react';

import { Footer } from 'footerJsx';

class Index extends Component{

    static defaultProps = {
        Routers: [0,1,1,1,1],
    };

    constructor(props){
        super(props);

    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    render(){

        const { Routers } = this.props;

        return(
            <div style={{ width: '100%',height:'200px',backgroundColor:'red'}}>

                {/*引进主题内容*/}
                <div style={{width:'100%',height: '100px', maxWidth: '750px',backgroundColor:'#000', margin:'0 auto'}}>
                </div>

                <Footer router = { Routers } />
            </div>
        )
    }

}

export { Index }