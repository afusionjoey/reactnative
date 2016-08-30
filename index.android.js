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
  Image,
} from 'react-native';
// import InfiniteScrollView from 'react-native-infinite-scroll-view';
import RefreshInfiniteListView from 'react-native-refresh-infinite-listview';

class ExperimentProject extends Component {
  constructor(props) {
    super(props);
    this.api = {
      uri: 'https://api.tumblr.com/v2/tagged',
      key: 'fuiKNFp9vQFvjLNvx4sUwti4Yb5yGutBN4Xh10LXZhhRKjWlV4',
      tag: 'lol'
    };
    this.state = {
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      before: null,
      list: []
    }
  }

  getData(before) {
    var url;

    if (typeof before !== 'undefined') {
      url = this.api.uri + '?api_key=' + this.api.key + '&tag=' + this.api.tag + '&before=' + before;
    } else {
      url = this.api.uri + '?api_key=' + this.api.key + '&tag=' + this.api.tag;
    }

    setTimeout(() => {
      fetch(url).then((res) => res.json())
      .then((resData) => {
        var list = this.state.list.concat(resData.response.filter(item => item.photos && item.photos.length > 0));
        var before = list.slice(-1)[0].timestamp;
        this.setState({list: list});
        this.setState({dataSource: this.state.dataSource.cloneWithRows(list)});
        this.setState({before: before});
        console.log(list);
      });
    }, 1000);
  }

  onInfinite() {
    this.getData(this.state.before);
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
      <ListView
        // ref = {(list) => {this.list = list}}
        dataSource={this.state.dataSource}
        renderRow={this.renderData.bind(this)}
        renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
        // loadedAllData={this.loadedAllData}
        // initialListSize={30}
        // scrollEventThrottle={10}
        style={styles.container}
        // onRefresh = {this.onRefresh}
        // onInfinite = {this.onInfinite.bind(this)}
        onEndReached = {this.onInfinite.bind(this)}
        // onEndReachedThreshold = {0}
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
