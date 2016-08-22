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
      list: []
    }
  }

  getData() {
    var url = this.api.uri + '?api_key=' + this.api.key + '&tag=' + this.api.tag;

    fetch(url).then((res) => res.json())
    .then((resData) => {
      var list = resData.response.filter(item => item.photos && item.photos.length > 0);
      this.setState({list: list});
      this.setState({dataSource: this.state.dataSource.cloneWithRows(list)});
      console.log(list);
    });
  }

  onInfinite() {
    var url = this.api.uri + '?api_key=' + this.api.key + '&tag=' + this.api.tag;

    fetch(url).then((res) => res.json())
    .then((resData) => {
      console.log(this.state.list);
      var refreshedList = this.state.list.concat(resData.response.filter(item => item.photos && item.photos.length > 0));
      // resData.response.filter(item => item.photos && item.photos.length > 0).map((data) => {
      //   data.blog_name = data.blog_name + 1;
      //   // console.log(data);
      // });

      setTimeout(() => {
        this.list.hideFooter();
        this.setState({list: refreshedList});
        this.setState({dataSource: this.state.dataSource.cloneWithRows(refreshedList)});
        console.log(refreshedList);
      }, 1000);

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
      <RefreshInfiniteListView
        ref = {(list) => {this.list = list}}
        dataSource={this.state.dataSource}
        renderRow={this.renderData.bind(this)}
        renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
        // loadedAllData={this.loadedAllData}
        // initialListSize={30}
        // scrollEventThrottle={10}
        style={styles.container}
        // onRefresh = {this.onRefresh}
        onInfinite = {this.onInfinite.bind(this)}
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
