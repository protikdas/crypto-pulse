import React, { Component } from "react";
import "./App.less";
import "./css/global.less";

/*<-----Components----->*/
import Navbar from "./components/Navbar/Navbar";
import SidePanel from "./components/SidePanel/SidePanel";
import Wallet from "./components/Wallet/Wallet";
import Coin from "./components/Coin/Coin";

class App extends Component {
  constructor() {
    super();

    this.state = {
      coinsMetaData: [],
      coins: []
    };
  }

  render() {
    return (
      <div className="App">
        <Navbar />
        <div className="app-container">
        <div className="portfolio-container">
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
        <SidePanel />
        </div>
      </div>
    );
  }
}

export default App;
