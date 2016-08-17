/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  Image
} from 'react-native';

class ExperimentProject extends Component {
  constructor(props) {
    super(props);
    this.api = {
      uri: 'https://api.tumblr.com/v2/tagged',
      key: 'fuiKNFp9vQFvjLNvx4sUwti4Yb5yGutBN4Xh10LXZhhRKjWlV4',
      tag: 'lol'
    };
    this.state = {
      imageUrl: [],
      blogName: [],
      timestamp: [],
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    }
  }

  getData() {
    var url = this.api.uri + '?api_key=' + this.api.key + '&tag=' + this.api.tag;

    fetch(url).then((res) => res.json())
    .then((json) => json.response.filter(item => item.photos && item.photos.length > 0)
      .map((item) => {
        this.setState({
          imageUrl: item.photos[0].alt_sizes[2].url,
          blogName: item.blog_name,
          timestamp: item.timestamp,
        });

        console.log(this.state.blogName);
      })
    );
  }

  componentDidMount() {
    this.getData();
  }

  // renderData(data) {
  //   return(
  //     // <TouchableHighlight>
  //       <Image source={{uri: data.}}
  //   )
  // }

  render() {
    return (
      // <Image source={{uri: this.state.imageUrl}} style={{width: 100, height: 100}} />
      <ListView
        style={styles.container}
        dataSource={this.state.dataSource}
        renderRow={(data) => <View><Text>{data}</Text></View>}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    padding: 10,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#F5FCFF',
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

AppRegistry.registerComponent('ExperimentProject', () => ExperimentProject);
