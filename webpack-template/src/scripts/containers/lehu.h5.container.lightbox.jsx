

/*
 * 图片方大 容器组件
 */

import React, {Component} from 'react';


import { lightbox } from '../util/lehu.h5.lightbox';


import './../../css/lightbox.css';


export class LightBox extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

        //初始化数据
        new lightbox();

    }

    render() {
        return (
            <div className="lightbox">
                <ul className="lightbox-images">
                    <img data-index="0" className="light-box"
                         src="https://m.360buyimg.com/n12/jfs/t5173/344/395338844/105515/a3fe2506/58ff1e65N3c07d2d2.jpg!q70.jpg"/>
                    <img data-index="1" className="light-box"
                         src="https://m.360buyimg.com/n12/s828x828_jfs/t5278/146/409482536/83388/9c947720/58ff1e7dNf1f90d5b.jpg!q70.jpg"/>
                    <img data-index="2" className="light-box"
                         src="https://m.360buyimg.com/n12/s828x828_jfs/t5278/146/409482536/83388/9c947720/58ff1e7dNf1f90d5b.jpg!q70.jpg"/>
                    <img data-index="3" className="light-box"
                         src="https://m.360buyimg.com/n12/s828x828_jfs/t5278/146/409482536/83388/9c947720/58ff1e7dNf1f90d5b.jpg!q70.jpg"/>
                    <img data-index="4" className="light-box"
                         src="https://m.360buyimg.com/n12/s828x828_jfs/t5278/146/409482536/83388/9c947720/58ff1e7dNf1f90d5b.jpg!q70.jpg"/>
                    <img data-index="5" className="light-box"
                         src="https://m.360buyimg.com/n12/s828x828_jfs/t5278/146/409482536/83388/9c947720/58ff1e7dNf1f90d5b.jpg!q70.jpg"/>
                    <img data-index="6" className="light-box"
                         src="https://m.360buyimg.com/n12/s828x828_jfs/t5278/146/409482536/83388/9c947720/58ff1e7dNf1f90d5b.jpg!q70.jpg"/>
                </ul>
                <ul className="lightbox-images">
                    <img data-index="0" className="light-box"
                         src="https://m.360buyimg.com/n12/jfs/t5173/344/395338844/105515/a3fe2506/58ff1e65N3c07d2d2.jpg!q70.jpg"/>
                    <img data-index="1" className="light-box"
                         src="https://m.360buyimg.com/n12/s828x828_jfs/t5278/146/409482536/83388/9c947720/58ff1e7dNf1f90d5b.jpg!q70.jpg"/>
                    <img data-index="2" className="light-box"
                         src="https://m.360buyimg.com/n12/s828x828_jfs/t5278/146/409482536/83388/9c947720/58ff1e7dNf1f90d5b.jpg!q70.jpg"/>
                    <img data-index="3" className="light-box"
                         src="https://m.360buyimg.com/n12/s828x828_jfs/t5278/146/409482536/83388/9c947720/58ff1e7dNf1f90d5b.jpg!q70.jpg"/>
                    <img data-index="4" className="light-box"
                         src="https://m.360buyimg.com/n12/s828x828_jfs/t5278/146/409482536/83388/9c947720/58ff1e7dNf1f90d5b.jpg!q70.jpg"/>
                    <img data-index="5" className="light-box"
                         src="https://m.360buyimg.com/n12/s828x828_jfs/t5278/146/409482536/83388/9c947720/58ff1e7dNf1f90d5b.jpg!q70.jpg"/>
                    <img data-index="6" className="light-box"
                         src="https://m.360buyimg.com/n12/s828x828_jfs/t5278/146/409482536/83388/9c947720/58ff1e7dNf1f90d5b.jpg!q70.jpg"/>
                    <img data-index="7" className="light-box"
                         src="https://m.360buyimg.com/n12/s828x828_jfs/t5278/146/409482536/83388/9c947720/58ff1e7dNf1f90d5b.jpg!q70.jpg"/>
                    <img data-index="8" className="light-box"
                         src="https://m.360buyimg.com/n12/s828x828_jfs/t5278/146/409482536/83388/9c947720/58ff1e7dNf1f90d5b.jpg!q70.jpg"/>
                </ul>
                <ul className="lightbox-images">
                    <img data-index="0" className="light-box"
                         src="https://m.360buyimg.com/n12/jfs/t5173/344/395338844/105515/a3fe2506/58ff1e65N3c07d2d2.jpg!q70.jpg"/>
                    <img data-index="1" className="light-box"
                         src="https://m.360buyimg.com/n12/s828x828_jfs/t5278/146/409482536/83388/9c947720/58ff1e7dNf1f90d5b.jpg!q70.jpg"/>
                    <img data-index="2" className="light-box"
                         src="https://m.360buyimg.com/n12/s828x828_jfs/t5278/146/409482536/83388/9c947720/58ff1e7dNf1f90d5b.jpg!q70.jpg"/>
                    <img data-index="3" className="light-box"
                         src="https://m.360buyimg.com/n12/s828x828_jfs/t5278/146/409482536/83388/9c947720/58ff1e7dNf1f90d5b.jpg!q70.jpg"/>
                    <img data-index="4" className="light-box"
                         src="https://m.360buyimg.com/n12/s828x828_jfs/t5278/146/409482536/83388/9c947720/58ff1e7dNf1f90d5b.jpg!q70.jpg"/>
                    <img data-index="5" className="light-box"
                         src="https://m.360buyimg.com/n12/s828x828_jfs/t5278/146/409482536/83388/9c947720/58ff1e7dNf1f90d5b.jpg!q70.jpg"/>
                </ul>
            </div>
        )
    }

}