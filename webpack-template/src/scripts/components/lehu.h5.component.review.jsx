/*
 *   评论列表列表子组件 初始化传入props 可复用
 * */


import React, {Component} from 'react';


//引入子组件样式
import 'reviewCss';

class Review extends Component {

    constructor(props) {
        super(props);

    }

    componentDidUpdate() {

    }

    componentWillUnmount() {

    }

    render() {

        const {reviewList} = this.props;

        let list = (length) => {
            let res = [];
            for (let i = 0; i < length; i++) {
                res.push(<li key={i}></li>)
            }
            return res
        };

        return (
            <div className="comments-list">
                <ul>

                    {/*单个评论*/}
                    {

                        reviewList && reviewList instanceof Array && reviewList.length > 0 ? reviewList.map((item, index) => {
                            return (
                                <li key={index}>
                                    <div className="m-comment">
                                        <div className="m-comment-header">

                                            <div className="left">
                                                <img src={ item.userImg }/>
                                                <span>{ item.userName }</span>
                                                {/*<i>v1</i>*/}
                                            </div>
                                            <div className="right">
                                                <ul>
                                                    {
                                                        list(item.evaGrade)
                                                    }
                                                </ul>
                                            </div>

                                        </div>
                                        <span className="m-comment-time">{ item.evaDate }</span>
                                        <div className="m-comment-info">
                                            <div className="inner">{ item.content }</div>
                                        </div>
                                        {
                                            item.imgUrl && item.imgUrl != '' ? <div className="m-comment-pic">
                                                {
                                                    item.imgUrl.split(',').map((item,index) => {
                                                        return <img key={index} src={item} />
                                                    })
                                                }
                                            </div> : null
                                        }
                                        {/*判断是否有回复*/}
                                        {
                                            item.reply ?
                                                <div className="m-comment-footer">
                                                    <div className="comment-service">
                                                        <span className="comment-service-title">小编回复:</span>
                                                        <span className="comment-service-content">{item.reply}</span>
                                                    </div>
                                                </div>
                                                : null
                                        }

                                    </div>
                                </li>
                            )
                        }) : null

                    }

                </ul>
            </div>
        )

    }

}

export {Review}