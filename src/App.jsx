import React, { Component } from "react";
import "./App.less";
import "./css/global.less";

/*<-----API----->*/
import api from "./api";

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
      coinsList: [],
      coins: ["BTC", "ETH", "ANAL"]
    };
  }

  updateDimensions = () => {
    this.setState({
      viewWidth: window.innerWidth
    });
  };

  componentWillMount() {
    api.getCoinList().then(coinsList => {
      this.setState({
        coinsList
      })
    }).catch(error => {
      console.log(error.response);
    })
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  render() {
    const { viewWidth } = this.state;
    return (
      <div className="App">
        <Navbar />
        <div className="app-container">
        <div className="portfolio-container">
        <Wallet viewWidth={viewWidth} />
        <div className="coins-container">
          <Coin viewWidth={viewWidth}/>
          <Coin viewWidth={viewWidth} />
          <Coin viewWidth={viewWidth} />
          <Coin viewWidth={viewWidth} />
          <Coin viewWidth={viewWidth} />
          <Coin viewWidth={viewWidth} />
        </div>
        </div>
        <SidePanel />
        </div>
      </div>
    );
  }
}

export default App;
