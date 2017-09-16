//滚动到最顶端

import React, {Component} from 'react';

import 'topCss';

class Top extends Component {
    constructor(props) {
        super(props);

        //事件绑定
        this.backTop = this.backTop.bind(this);

    }

    componentDidMount() {

        let topElement = document.querySelector(".bottom-to-top");

        //滚动判断
        window.addEventListener("scroll", () => {
            let clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
            let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            if (scrollTop > clientHeight) {
                topElement.style.display = "block"
            } else {
                topElement.style.display = "none"
            }
        }, false);

    }

    //回到顶部
    backTop() {
        let topElement = document.querySelector(".bottom-to-top");
        window.scroll(0, 0);
        topElement.style.display = "none";
    }

    componentWillUnmount() {
        window.removeEventListener('scroll');
    }

    render() {
        return (
            <div className="bottom-to-top" onClick={this.backTop}>
                <img src={require('../../images/scroll-to-top-icon.png')}/>
            </div>
        )
    }
}

export {Top}
