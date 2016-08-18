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
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    }
  }

  getData() {
    var url = this.api.uri + '?api_key=' + this.api.key + '&tag=' + this.api.tag;
    var arr = [];

    fetch(url).then((res) => res.json())
    .then((resData) => {
      this.setState({dataSource: this.state.dataSource.cloneWithRows(resData.response.filter(item => item.photos && item.photos.length > 0))});
      console.log(resData.response[0].photos[0].alt_sizes[2].url);
    });
  }

  componentDidMount() {
    this.getData();
  }

  renderData(data) {
    return(
      <Image source={{ uri: data.photos[0].alt_sizes[2].url }} style={styles.backgroundImage}>
        <Text>{data.blog_name} {data.timestamp}</Text>
      </Image>
    )
  }

  render() {
    return (
      // <Image source={{uri: this.state.imageUrl}} style={{width: 100, height: 100}} />
      <ListView
        style={styles.container}
        dataSource={this.state.dataSource}
        renderRow={this.renderData.bind(this)}
        renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
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
  separator: {
    flex: 1,
    height: 2,
    backgroundColor: '#8E8E8E',
  },
  backgroundImage: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    height: 150,
  },
});

AppRegistry.registerComponent('ExperimentProject', () => ExperimentProject);
