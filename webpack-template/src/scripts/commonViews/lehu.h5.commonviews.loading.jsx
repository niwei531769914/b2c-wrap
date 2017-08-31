// 加载组件
import React, {Component} from 'react';

import 'isloadingCss';

class IsLoading extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="is-loading">
                <em></em>
                <span>加载中....</span>
            </div>
        )
    }

}

export {IsLoading}
