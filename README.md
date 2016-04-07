# react-native-qrcode-logo

A react-native component to generate QRCode with logo, not only support English.

## this module support iOS and Android

## Installation
```sh
npm install react-native-qrcode-logo
```
## Usage
```jsx
'use strict';

var React = require('react-native');
var QRCode = require('react-native-qrcode-logo');
var {
    AppRegistry,
    StyleSheet,
    View,
    TextInput
} = React;

var helloworld = React.createClass({
    getInitialState: function() {
        return {
            text: 'https://www.baidu.com/',
            logo: 'http://pic2.ooopic.com/01/37/79/28b1OOOPIC30.jpg'
        };
    },
    render: function() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => this.setState({text: text})}
                    value={this.state.text}
                />
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => this.setState({logo: text})}
                    value={this.state.logo}
                />
                <QRCode className='qrcode' 
                  value={this.state.text}
                  size={300}
                  fgColor='black'
                  bgColor='white'
                  logo={this.state.logo}
                />
            </View>
        );
    }
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },

    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        margin: 10,
        borderRadius: 5,
        padding: 5,
    }
});

AppRegistry.registerComponent('helloworld', () => helloworld);

module.exports = helloworld;
```
## Available Props

prop      | type                 | default value
----------|----------------------|--------------
`value`   | `string`             | `https://www.baidu.com/`
`logo`    | `string`             | `http://pic2.ooopic.com/01/37/79/28b1OOOPIC30.jpg`
`size`    | `number`             | `128`
`bgColor` | `string` (CSS color) | `"#FFFFFF"`
`fgColor` | `string` (CSS color) | `"#000000"`

<!-- <img src='qrcode.png' height = '256' width = '256'/>

 -->