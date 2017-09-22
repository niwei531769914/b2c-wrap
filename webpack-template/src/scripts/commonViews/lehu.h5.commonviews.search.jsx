import React, {Component} from 'react';


import 'searchCss';

export class Search extends Component {
    constructor(props) {
        super(props);
    }

    render() {
         return (
             <header>
				<div className="search-placeholder">
					<span>搜索你想要的商品</span>
				</div>
 			</header>
        )
    }

}
