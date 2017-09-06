/*
 * 编辑地址 容器主入口
 */
import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';


class List extends Component {
    render() {
        return (
            <div>
                <input type="text" defaultValue={this.props.index}/>
                <span onClick={this.props.delete} data-index={this.props.index}>X</span>
            </div>
        )
    }
}

class Lists extends Component {
    constructor(props) {
        super(props);
        this.add = this.add.bind(this);
        this.delete = this.delete.bind(this);
        this.state = {
            lists: []
        }
    }

    add() {
        var lists = this.state.lists;
        lists.push(
            <List key={this.state.lists.length} index={this.state.lists.length} delete={this.delete}/>
        );
        this.setState(
            {lists: lists}
        )
    }

    delete(e) {
        var lists = this.state.lists;
        var index = e.target.getAttribute("data-index");
        console.log(index)
        lists.splice(index, 1, "");
        this.setState(
            {lists: lists}
        )

    }

    render() {
        return (<div>
            <span onClick={this.add}>添加</span>
            {this.state.lists}
        </div>)
    }
}

ReactDOM.render(
    <Lists/>,
    document.getElementById('lists');
);
