import React, { Component } from "react";
import "./App.less";
import "./css/global.less";

/*<-----Components----->*/
import Navbar from "./components/Navbar/Navbar";
import Wallet from "./components/Wallet/Wallet";
import Coin from "./components/Coin/Coin";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Wallet />
        <div className="coins-container">
          <Coin />
          <Coin />
          <Coin />
          <Coin />
          <Coin />
          <Coin />
        </div>
      </div>
    );
  }
}

export default App;
