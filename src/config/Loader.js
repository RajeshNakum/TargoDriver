import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator, Modal,Text } from 'react-native';
// import Modal from 'react-native-modal';
export default class Loader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      title:""
    };
  }

  render() {
    return (
      <Modal
        backdropOpacity={0}
        style={{ margin: 0 }}
        transparent={true}
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}
        visible={this.state.loading}>
        <View style={styles.container}>
          <ActivityIndicator size="large" color={"#1172BA"} />
          {this.state.title ? <Text>{this.state.title}</Text>:<></>}
        </View>
      </Modal>
    );
  }

  toggleLoader(shouldShow,title) {
    if(title){
      this.setState({title:title});
    }else{
      this.setState({title:""});
    }
    this.setState({ loading: shouldShow });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#00000070',
  },
});
