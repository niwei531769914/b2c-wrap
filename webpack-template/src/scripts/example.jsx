/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {
    AppRegistry,
    Platform,
    Component,
    TouchableOpacity,
    StyleSheet,
    Navigator,
    View,
    Text
} from 'react-native';

//引入分支ui组件
import Splash from 'exampleJsx';
//import Splash from './Splash';

const defaultRoute = {//设置默认页面
    component: Splash
};

class navigation extends Component {
    _renderScene(route, navigator) {//注册route
        let Component = route.component;
        return (//将route值传入navigator里面
            <Component {...route.params} navigator={navigator}/>
        );
    }

    _renderNavBar() {
        const styles = {
            title: {
                flex: 1, alignItems: 'center', justifyContent: 'center'
            },
            button: {
                flex: 1, width: 50, alignItems: 'center', justifyContent: 'center'
            },
            buttonText: {
                fontSize: 18, color: '#FFFFFF', fontWeight: '400'
            }
        }
/**
 *定义页面navigator.NavigationBar变量
 */
        var routeMapper = {
            LeftButton(route, navigator, index, navState) {//左边按钮
                if (index > 0) {
                    return (
                        <TouchableOpacity
                            onPress={() => navigator.pop()}//退栈
                            style={styles.button}>
                            <Text style={styles.buttonText}>Back</Text>
                        </TouchableOpacity>
                    );
                } else {
                    return (
                        <TouchableOpacity
                            onPress={() => navigator.pop()}
                            style={styles.button}>
                            <Text style={styles.buttonText}>Logo</Text>
                        </TouchableOpacity>
                    );
                }
            },
            RightButton(route, navigator, index, navState) {//右边按钮
                if (index > 0 && route.rightButton) {
                    return (
                        <TouchableOpacity
                            onPress={() => navigator.pop()}
                            style={styles.button}>
                            <Text style={styles.buttonText}></Text>
                        </TouchableOpacity>
                    );
                } else {
                    return null
                }

            },
            Title(route, navigator, index, navState) {//主标题
                return (
                    <View style={styles.title}>
                        <Text style={styles.buttonText}>{route.title ? route.title : 'Splash'}</Text>
                    </View>
                );
            }
        };

        return (
            <Navigator.NavigationBar
                style={{
                    alignItems: 'center',
                    backgroundColor: '#55ACEE',
                    shadowOffset: {
                        width: 1,
                        height: 0.5,
                    },
                    shadowColor: '#55ACEE',
                    shadowOpacity: 0.8,
                }}
                routeMapper={routeMapper}
            />
        );
    }

    render() {
        return (
            <Navigator
                initialRoute={defaultRoute}
                renderScene={this._renderScene}
                sceneStyle={{paddingTop: (Platform.OS === 'android' ? 66 : 74)}}
                navigationBar={this._renderNavBar()}/>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

//render html
let example = document.getElementById('example');
render(<navigation/>,
    example
);

//AppRegistry.registerComponent('navigation', () => navigation);