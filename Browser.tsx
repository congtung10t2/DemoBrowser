import React, { Component } from 'react';
import { WebView } from 'react-native-webview';
import { StyleSheet, View, TextInput, SafeAreaView, Button, RefreshControl, ScrollView } from 'react-native';
// ...
class Browser extends Component{
  webView: WebView<{}> | undefined;
  state = {site: "https://google.com.vn", refreshing: false}
  render() {
    return (
        
        <SafeAreaView style={{width:"100%", height:"100%"}}>
         <ScrollView contentContainerStyle={{ flexGrow: 1 }}
        onLayout={e => this.setState({ scrollViewHeight: e.nativeEvent.layout.height })}
        refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh}></RefreshControl>}
        > 
            <View style={{flex: 1}}>
            <View style={styles.inputBox}>
              <TextInput editable={true} placeholder="Enter your address" onChangeText={text => this.updateUrl(text)}
              style={styles.textField}
              ></TextInput>
            <Button 
            title="Search"
            onPress={() => { this.updateState()
            }} color="#333333"></Button>
             
            </View>
            <WebView
                onLoad={() => this.setState({refreshing: false})}
                onError={()=> this.setState({site: "https://www.google.com/search?q="+this.state.site })}
                ref={this.setWebViewRef}
            source={{uri: this.state.site}}
            style={styles.browser}
            />
           
        </View> 
        </ScrollView>
      </SafeAreaView>
    );
  }
  setWebViewRef = (ref: WebView) => {
    this.webView = ref
  }
  updateUrl(value: string) {
    if (value == "") {
      return
    }
    if (value.startsWith("https://")) {
        this.state.site = value
    } else {
        this.state.site = "https://" + value
    }
    
  }
  onRefresh = () =>  {
    this.setState({refreshing: true})
    if (this.webView != undefined) {

      this.webView.reload()
    }
  }
  updateState() {
    this.setState({ site: this.state.site }); 
    if (this.webView != undefined) {
      this.webView.reload()
    }
  }
}
export default Browser;
const styles = StyleSheet.create({
    inputBox: {
        top:0,
        alignContent: 'space-between'
    },
    textField: {
      borderColor: "#000",
      borderRadius: 1

    },
    scroll: {
        flexGrow: 1
    },

    browser: {
      top: 20,
      width: "100%",
      height: "100%"
    }
  });