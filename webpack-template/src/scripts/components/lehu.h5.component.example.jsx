import React, {
    View,
    Text,
    TouchableOpacity
} from 'react-native';
//import Login from './Login';

//引入分支ui组件
import Login from 'loginJsx';

class Splash extends React.Component {
    _openPage() {//打开login页面
        this.props.navigator.push({
            title: 'Login',
            component: Login
        })
    }
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#FFFFFF' }}>
                <Text>Splash Page</Text>

                <TouchableOpacity onPress={this._openPage.bind(this)}>
                    <Text style={{ color: '#55ACEE' }}>Open New Page</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default Splash;