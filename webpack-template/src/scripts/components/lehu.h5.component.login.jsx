import React, {
    View,
    Text,
    TextInput,
    TouchableOpacity
} from 'react-native';
//import Welcome from './Welcome';

//引入分支ui组件
import Welcome from 'welcomeJsx';
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: null,
            age: null,
        }
    }
    _openPage() {//打开welcome页面，将welcome页面压入navigator里面
        this.props.navigator.push({
            component: Welcome,
            params: {
                name: this.state.name,
                age: this.state.age,
                changeMyAge: (age) => {//获取值存入welcome.state里面
                    this.setState({ age })
                }
            }
        })
    }
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#FFFFFF' }}>
                <Text>Form Page</Text>
                <TextInput
                    value={this.state.name}
                    onChangeText={name => this.setState({ name })}
                    placeholder={'Enter your name'}
                    style={{ height: 40, width: 200 }} />
                <Text>My age: {this.state.age ? this.state.age : 'Unknown'}</Text>
                <TouchableOpacity onPress={this._openPage.bind(this)}>
                    <Text style={{ color: '#55ACEE' }}>Update my age</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default Login;