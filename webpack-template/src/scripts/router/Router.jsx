import React, { Component, ProTypes } from 'react';

import { Router, Route, Redirect, IndexRoute, browserHistory } from 'react-router';

import { Footer } from 'footerJsx';

import { Index } from 'indexJsx';

class Roots extends Component {

	render() {
		return(
			<div className="name">
				<div className="content">
                    {this.props.children}
				</div>
				<Footer/>
			</div>
		)
	}
}


//首页
const sindex = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../containers/lehu.h5.container.index').default)
    }, 'index')
};

//分类
const classify = (location, cb) => {
	require.ensure([], require => {
		cb(null, require('../containers/lehu.h5.container.classify').default)
	}, 'classify')
};



const RouterConfig = (
    <Router history={ browserHistory }>
        <Route path="/" component={ Roots }>
            <IndexRoute component={ Index }/>//首页
            <Route path="sindex" getComponent={ sindex }/>
			<Route path="classify" getComponent={classify}/>
        </Route>
    </Router>
);

export { RouterConfig };